// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {IERC721NonTransferable} from "@bnb-chain/greenfield-contracts/contracts/interface/IERC721NonTransferable.sol";
import {IERC1155NonTransferable} from "@bnb-chain/greenfield-contracts/contracts/interface/IERC1155NonTransferable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import {GroupApp, GroupStorage, IGroupHub, CmnStorage} from "@bnb-chain/greenfield-contracts-sdk/GroupApp.sol";

contract Blufield is GroupApp, ReentrancyGuardUpgradeable {
    IERC721NonTransferable public GROUP_TOKEN;
    IERC1155NonTransferable public MEMBER_TOKEN;

    mapping(address => uint256) public fieldIdOfUser;
    mapping(uint256 => string) public fieldIdToName;
    mapping(string => uint256) public fieldNameToId;
    mapping(uint256 => uint256) public subscriptionFee;
    mapping(address => mapping(uint256 => uint64)) public expirationOfUserSubscription;

    function initialize(
        address _groupHub,
        address _crossChain,
        uint256 _callbackGasLimit,
        uint8 _failureHandleStrategy
    ) public initializer {
        GROUP_TOKEN = IERC721NonTransferable(CmnStorage(_groupHub).ERC721Token());
        MEMBER_TOKEN = IERC1155NonTransferable(GroupStorage(_groupHub).ERC1155Token());
        __base_app_init_unchained(_crossChain, _callbackGasLimit, _failureHandleStrategy);
        __group_app_init_unchained(_groupHub);
    }

    function registerField(string calldata name, uint256 groupId, uint256 price) external nonReentrant {
        require(GROUP_TOKEN.ownerOf(groupId) == msg.sender, "Blufield: not owner");
        require(bytes(name).length > 0, "Blufield: name is empty");
        require(fieldIdOfUser[msg.sender] == 0, "Blufield: already registered");
        require(fieldNameToId[name] == 0, "Blufield: name already taken");
        require(price > 0, "Blufield: price is zero");
        fieldIdOfUser[msg.sender] = groupId;
        fieldIdToName[groupId] = name;
        fieldNameToId[name] = groupId;
        subscriptionFee[groupId] = price;
    }

    function subscribeField(uint256 groupId) external payable nonReentrant {
        require(bytes(fieldIdToName[groupId]).length > 0, "Blufield: field not registered");
        address owner = GROUP_TOKEN.ownerOf(groupId);
        require(owner != address(0), "Blufield: cannot subscribe to own field");
        
        uint256 fee = subscriptionFee[groupId];
        uint256 totalFee = _getTotalFee();
        require(msg.value >= fee + totalFee, "Blufield: insufficient payment");
        
        uint64 expiration;
        GroupStorage.UpdateGroupOpType opType;
        uint256 balance = MEMBER_TOKEN.balanceOf(msg.sender, groupId);
        if (balance == 0) {
            expiration = uint64(block.timestamp + 30 days);
            opType = GroupStorage.UpdateGroupOpType.AddMembers;
        } else {
            if (expirationOfUserSubscription[msg.sender][groupId] > block.timestamp) {
                expiration = uint64(expirationOfUserSubscription[msg.sender][groupId] + 30 days);
            } else {
                expiration = uint64(block.timestamp + 30 days);
            }
            opType = GroupStorage.UpdateGroupOpType.RenewMembers;
        }
        address[] memory members = new address[](1);
        uint64[] memory expirations = new uint64[](1);
        members[0] = msg.sender;
        expirations[0] = expiration;

        _updateGroupWithValue(owner, groupId, opType, members, expirations, msg.value - fee);
        payable(owner).transfer(fee);
    }

    function _updateGroupWithValue(
        address _owner,
        uint256 _tokenId,
        GroupStorage.UpdateGroupOpType _opType,
        address[] memory _members,
        uint64[] memory _expiration,
        uint256 _value
    ) private {
        GroupStorage.UpdateGroupSynPackage memory updatePkg = GroupStorage.UpdateGroupSynPackage({
            operator: _owner,
            id: _tokenId,
            opType: _opType,
            members: _members,
            extraData: "",
            memberExpiration: _expiration
        });

        uint256 totalFee = _getTotalFee();
        require(msg.value >= totalFee, string.concat("GroupApp: ", ERROR_INSUFFICIENT_VALUE));
        IGroupHub(groupHub).updateGroup{value: _value}(updatePkg);
    }
}
