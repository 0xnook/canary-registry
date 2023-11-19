// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {CanaryRegistry} from "../src/CanaryRegistry.sol";

contract DeployCanary is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerKey = vm.envUint("DEPLOYER_KEY");
        vm.startBroadcast(deployerKey);
        new CanaryRegistry();
        vm.stopBroadcast();
    }
}
