import { Address, ethereum, BigInt, Bytes, log } from "@graphprotocol/graph-ts"
import {
  CanaryCreated as CanaryCreatedEvent,
  CanaryFed as CanaryFedEvent,
  CanaryFullyFed as CanaryFullyFedEvent,
  CanaryRegistry
} from "../generated/CanaryRegistry/CanaryRegistry"
import { Canary, CanaryCreated, CanaryFed, CanaryFullyFed, CanaryList } from "../generated/schema"

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

  let canaryList = CanaryList.load("0");
  if(canaryList == null) {
    canaryList = new CanaryList("0");
    canaryList.nextCanaryId = BigInt.fromI32(0);
  }
  canaryList.nextCanaryId = canaryList.nextCanaryId.plus(BigInt.fromI32(1));
  canaryList.save();

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
  canary.createdAt = event.block.timestamp
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
  let canaryList = CanaryList.load("0");
  if(canaryList == null) return;
  let nextCanaryId = canaryList.nextCanaryId;

  for (let i = new BigInt(0); i < nextCanaryId; i.plus(new BigInt(1))) {
    log.info(`KEYWORD {}`, [i.toString()]);
    // let canary = Canary.load(i.toString())
    // if(!canary) continue;
    // if(canary.expiryTimestamp.lt(block.timestamp)) {
    //   canary.isAlive = false;
    //   canary.save()
    // }
  }
}