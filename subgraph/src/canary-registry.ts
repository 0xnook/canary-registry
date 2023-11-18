import { Address, ethereum, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  CanaryCreated as CanaryCreatedEvent,
  CanaryFed as CanaryFedEvent,
  CanaryFullyFed as CanaryFullyFedEvent,
  CanaryRegistry
} from "../generated/CanaryRegistry/CanaryRegistry"
import { Canary, CanaryCreated, CanaryFed, CanaryFullyFed } from "../generated/schema"

export function handleCanaryCreated(event: CanaryCreatedEvent): void {
  let entity = new CanaryCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.canaryId = event.params.canaryId
  entity.name = event.params.name
  entity.message = event.params.message
  entity.frequency = event.params.frequency
  entity.threshold = event.params.threshold
  entity.feeders = changetype<Bytes[]>(event.params.feeders)
  entity.creator = event.params.creator

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.expiryTimestamp = event.params.expiryTimestamp

  entity.save()

  let canary = new Canary(event.params.canaryId.toString())
  canary.canaryId = event.params.canaryId
  canary.name = event.params.name
  canary.message = event.params.message
  canary.frequency = event.params.frequency
  canary.threshold = event.params.threshold
  canary.feeders = changetype<Bytes[]>(event.params.feeders)
  canary.creator = event.params.creator
  canary.expiryTimestamp = event.params.expiryTimestamp
  canary.isAlive = true
  canary.save()
}

export function handleCanaryFed(event: CanaryFedEvent): void {
  let entity = new CanaryFed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.canaryId = event.params.canaryId
  entity.feeder = event.params.feeder
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCanaryFullyFed(event: CanaryFullyFedEvent): void {
  let entity = new CanaryFullyFed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.canaryId = event.params.canaryId
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBlock(block: ethereum.Block): void {
  let contract = CanaryRegistry.bind(Address.fromString("0x05D188E571cEdBab42860CFf1c3F68a5E1ef9408"))

  for (let i = new BigInt(0); i < contract.nextCanaryId(); i.plus(new BigInt(1))) {
    const isAlive = contract.isCanaryAlive(i)
    let canary = Canary.load(i.toString())
    if(!isAlive && canary) {
      canary.isAlive = false;
      canary.save()
    }
  }
}