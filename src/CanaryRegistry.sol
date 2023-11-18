// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract CanaryRegistry {
    mapping(uint256 => Canary) public canaries;
    uint256 nextCanaryId = 0;

    struct Canary {
        uint256 id;
        string name;
        string message;
        uint256 frequency;
        uint256 threshold;
        address[] feeders;
        uint256 initializationTimestamp;
        uint256 expiryTimestamp;
        mapping(address => bool) hasCalledFeed;
        uint256 feederCount;
        address creator;
    }

    event CanaryCreated(uint256 canaryId, string name, string message, uint256 frequency, uint256 threshold, address[] feeders);
    event CanaryFed(uint256 canaryId, address feeder, uint256 timestamp);
    event CanaryFullyFed(uint256 canaryId, uint256 timestamp);

    modifier onlyFeeder(uint256 canaryId) {
        Canary storage canary = canaries[canaryId];
        require(canary.hasCalledFeed[msg.sender] == false, "Feeder has already called feed");
        bool isFeeder = false;
        for (uint256 i = 0; i < canary.feeders.length; i++) {
            if (canary.feeders[i] == msg.sender) {
                isFeeder = true;
                break;
            }
        }
        require(isFeeder, "Only valid feeders can perform this action");
        _;
    }

    modifier notExpired(uint256 canaryId) {
        Canary storage canary = canaries[canaryId];
        require(block.timestamp < canary.expiryTimestamp, "Canary is expired");
        _;
    }

    function hatchCanary(
        string calldata name,
        string calldata message,
        uint256 frequency,
        uint256 threshold,
        address[] calldata feeders
    ) public {
        // Validate input parameters
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(message).length > 0, "Message cannot be empty");
        require(frequency > 0, "Frequency must be greater than 0");
        require(threshold > 0, "Threshold must be greater than 0");
        require(feeders.length > 0, "At least one feeder address is required");

        // Calculate initialization and expiry timestamps
        uint256 initializationTimestamp = block.timestamp;
        uint256 expiryTimestamp = initializationTimestamp + frequency;

        // Create a new canary
        Canary storage newCanary = canaries[nextCanaryId];
        newCanary.id = nextCanaryId;
        newCanary.name = name;
        newCanary.message = message;
        newCanary.frequency = frequency;
        newCanary.threshold = threshold;
        newCanary.feeders = feeders;
        newCanary.initializationTimestamp = initializationTimestamp;
        newCanary.expiryTimestamp = expiryTimestamp;
        newCanary.creator = msg.sender;

        ++nextCanaryId;

        // Additional validation for configuration
        // Example: Ensure the threshold is not greater than the number of feeders
        require(threshold <= feeders.length, "Threshold cannot be greater than the number of feeders");

        // Emit an event or perform other actions as needed
        emit CanaryCreated(nextCanaryId, name, message, frequency, threshold, feeders);
    }

    function feed(uint256 canaryId) external onlyFeeder(canaryId) notExpired(canaryId) {
        Canary storage canary = canaries[canaryId];

        // If not expired, check if the feeder has already called the function
        if (!canary.hasCalledFeed[msg.sender]) {
            // If not called, increment the feeder count and mark the feeder as called
            canary.feederCount++;
            canary.hasCalledFeed[msg.sender] = true;
            emit CanaryFed(canaryId, msg.sender, block.timestamp);
        }

        // Check if the threshold is reached
        if (canary.feederCount >= canary.threshold) {
            // If threshold is reached, extend the expiration
            canary.expiryTimestamp = block.timestamp + canary.frequency;
            emit CanaryFullyFed(canaryId, block.timestamp);
            // Reset the feeder count and hasCalledFeed mapping
            canary.feederCount = 0;
            for (uint256 i = 0; i < canary.feeders.length; i++) {
                canary.hasCalledFeed[canary.feeders[i]] = false;
            }
        }
    }

    function isCanaryAlive(uint256 canaryId) external view returns (bool) {
        Canary storage canary = canaries[canaryId];
        return block.timestamp < canary.expiryTimestamp;
    }
}
