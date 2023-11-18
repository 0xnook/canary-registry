import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  CanaryCreated,
  CanaryFed,
  CanaryFullyFed
} from "../generated/CanaryRegistry/CanaryRegistry"

export function createCanaryCreatedEvent(
  canaryId: BigInt,
  name: string,
  message: string,
  frequency: BigInt,
  threshold: BigInt,
  feeders: Array<Address>,
  creator: Address
): CanaryCreated {
  let canaryCreatedEvent = changetype<CanaryCreated>(newMockEvent())

  canaryCreatedEvent.parameters = new Array()

  canaryCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "canaryId",
      ethereum.Value.fromUnsignedBigInt(canaryId)
    )
  )
  canaryCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  canaryCreatedEvent.parameters.push(
    new ethereum.EventParam("message", ethereum.Value.fromString(message))
  )
  canaryCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "frequency",
      ethereum.Value.fromUnsignedBigInt(frequency)
    )
  )
  canaryCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "threshold",
      ethereum.Value.fromUnsignedBigInt(threshold)
    )
  )
  canaryCreatedEvent.parameters.push(
    new ethereum.EventParam("feeders", ethereum.Value.fromAddressArray(feeders))
  )
  canaryCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )

  return canaryCreatedEvent
}

export function createCanaryFedEvent(
  canaryId: BigInt,
  feeder: Address,
  timestamp: BigInt
): CanaryFed {
  let canaryFedEvent = changetype<CanaryFed>(newMockEvent())

  canaryFedEvent.parameters = new Array()

  canaryFedEvent.parameters.push(
    new ethereum.EventParam(
      "canaryId",
      ethereum.Value.fromUnsignedBigInt(canaryId)
    )
  )
  canaryFedEvent.parameters.push(
    new ethereum.EventParam("feeder", ethereum.Value.fromAddress(feeder))
  )
  canaryFedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return canaryFedEvent
}

export function createCanaryFullyFedEvent(
  canaryId: BigInt,
  timestamp: BigInt
): CanaryFullyFed {
  let canaryFullyFedEvent = changetype<CanaryFullyFed>(newMockEvent())

  canaryFullyFedEvent.parameters = new Array()

  canaryFullyFedEvent.parameters.push(
    new ethereum.EventParam(
      "canaryId",
      ethereum.Value.fromUnsignedBigInt(canaryId)
    )
  )
  canaryFullyFedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return canaryFullyFedEvent
}
