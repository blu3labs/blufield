// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {IERC721NonTransferable} from "@bnb-chain/greenfield-contracts/contracts/interface/IERC721NonTransferable.sol";
import {BucketApp, BucketStorage} from "@bnb-chain/greenfield-contracts-sdk/BucketApp.sol";
import {GroupApp} from "@bnb-chain/greenfield-contracts-sdk/GroupApp.sol";
import {ObjectApp} from "@bnb-chain/greenfield-contracts-sdk/ObjectApp.sol";

contract Blufield is BucketApp, GroupApp, ObjectApp {
    IERC721NonTransferable public BUCKET_TOKEN;
    IERC721NonTransferable public GROUP_TOKEN;
    IERC721NonTransferable public OBJECT_TOKEN;
    address public paymentAddress;
    uint256 public creationFee;

    mapping(address => uint256) public fieldIdOfUser;
    mapping(uint256 => string) public fieldIdToName;
    mapping(string => uint256) public fieldNameToId;

    function initialize(
        address _bucketHub,
        address _groupHub,
        address _objectHub,
        address _paymentAddress,
        address _crossChain,
        uint256 _callbackGasLimit,
        uint8 _failureHandleStrategy
    ) public initializer {
        BUCKET_TOKEN = IERC721NonTransferable(_bucketHub);
        GROUP_TOKEN = IERC721NonTransferable(_groupHub);
        OBJECT_TOKEN = IERC721NonTransferable(_objectHub);
        paymentAddress = _paymentAddress;

        __base_app_init_unchained(_crossChain, _callbackGasLimit, _failureHandleStrategy);
        __bucket_app_init_unchained(_bucketHub);
        __group_app_init_unchained(_groupHub);
        __object_app_init_unchained(_objectHub);
    }

    function createField(
        string calldata name,
        BucketStorage.BucketVisibilityType visibility,
        uint64 chargedReadQuota,
        address spAddress,
        uint256 expireHeight,
        bytes calldata sig
    ) external payable {
        require(fieldIdOfUser[msg.sender] == 0, "Blufield: user already has a field");
        require(bytes(name).length > 0, "Blufield: name is empty");
        require(fieldNameToId[name] == 0, "Blufield: name already taken");
        bytes memory _callbackData = bytes(name);
        _createBucket(
            msg.sender,
            name,
            visibility,
            paymentAddress,
            spAddress,
            expireHeight,
            sig,
            chargedReadQuota,
            msg.sender,
            failureHandleStrategy,
            _callbackData,
            callbackGasLimit
        );
    }

    function registerField(
        string calldata name,
        uint256 bucketId
    ) external {
        require(fieldIdOfUser[msg.sender] == 0, "Blufield: user already has a field");
        require(bytes(name).length > 0, "Blufield: name is empty");
        require(fieldNameToId[name] == 0, "Blufield: name already taken");
        require(BUCKET_TOKEN.ownerOf(bucketId) == msg.sender, "Blufield: user does not own the bucket");
        fieldIdOfUser[msg.sender] = bucketId;
        fieldIdToName[bucketId] = name;
        fieldNameToId[name] = bucketId;
    }

    // function createSubscriptionGroup(
    //     uint256 fieldId
    // ) external payable {
    //     require(fieldIdToName[fieldId] != "", "Blufield: field does not exist");

    // }

    function greenfieldCall(
        uint32 status,
        uint8 resourceType,
        uint8 operationType,
        uint256 resourceId,
        bytes calldata callbackData
    ) external override(BucketApp, ObjectApp, GroupApp) {
        require(
            msg.sender == bucketHub || msg.sender == objectHub || msg.sender == groupHub,
            string.concat("EbookShop: ", ERROR_INVALID_CALLER)
        );
        if (resourceType == RESOURCE_BUCKET) {
            _bucketGreenfieldCall(status, operationType, resourceId, callbackData);
        } else if (resourceType == RESOURCE_OBJECT) {
            _objectGreenfieldCall(status, operationType, resourceId, callbackData);
        } else if (resourceType == RESOURCE_GROUP) {
            _groupGreenfieldCall(status, operationType, resourceId, callbackData);
        } else {
            revert(string.concat("EbookShop: ", ERROR_INVALID_RESOURCE));
        }
    }
}
