// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

interface IERC1155Mintable {
    function mint(address to, uint256 id, uint256 amount, bytes memory data) external;
}