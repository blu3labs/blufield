// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {IERC721NonTransferable} from "@bnb-chain/greenfield-contracts/contracts/interface/IERC721NonTransferable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import {GroupApp, GroupStorage, CmnStorage} from "@bnb-chain/greenfield-contracts-sdk/GroupApp.sol";

contract Blufield is GroupApp, ReentrancyGuardUpgradeable {
    IERC721NonTransferable public GROUP_TOKEN;
    uint256 public creationFee;

    mapping(address => uint256) public fieldIdOfUser;
    mapping(uint256 => string) public fieldIdToName;
    mapping(string => uint256) public fieldNameToId;
    mapping(uint256 => uint256) public subscriptionFee;
    mapping(address => mapping(uint256 => uint64)) public expirationOfUserSubscription;
    mapping(address => uint256) public pendingWithdrawals;

    function initialize(
        address _groupHub,
        address _crossChain,
        uint256 _callbackGasLimit,
        uint8 _failureHandleStrategy
    ) public initializer {
        GROUP_TOKEN = IERC721NonTransferable(CmnStorage(_groupHub).ERC721Token());
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
        require(msg.value >= fee, "Blufield: insufficient payment");
        pendingWithdrawals[owner] += fee;
        
        uint64 expiration = expirationOfUserSubscription[msg.sender][groupId];
        GroupStorage.UpdateGroupOpType opType;
        if (expiration == 0) {
            expirationOfUserSubscription[msg.sender][groupId] = uint64(block.timestamp + 30 days);
            opType = GroupStorage.UpdateGroupOpType.AddMembers;
        } else {
            expirationOfUserSubscription[msg.sender][groupId] = expiration + 30 days;
            opType = GroupStorage.UpdateGroupOpType.RenewMembers;
        }
        address[] memory members = new address[](1);
        uint64[] memory expirations = new uint64[](1);
        members[0] = msg.sender;
        expirations[0] = expiration;
        _updateGroup(owner, groupId, opType, members, expirations);
    }

    function withdraw() external nonReentrant {
        uint256 amount = pendingWithdrawals[msg.sender];
        require(amount > 0, "Blufield: no pending withdrawals");
        pendingWithdrawals[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
}
