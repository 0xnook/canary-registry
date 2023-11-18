import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { CanaryCreated } from "../generated/schema"
import { CanaryCreated as CanaryCreatedEvent } from "../generated/CanaryRegistry/CanaryRegistry"
import { handleCanaryCreated } from "../src/canary-registry"
import { createCanaryCreatedEvent } from "./canary-registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let canaryId = BigInt.fromI32(234)
    let name = "Example string value"
    let message = "Example string value"
    let frequency = BigInt.fromI32(234)
    let threshold = BigInt.fromI32(234)
    let feeders = [
      Address.fromString("0x0000000000000000000000000000000000000001")
    ]
    let creator = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newCanaryCreatedEvent = createCanaryCreatedEvent(
      canaryId,
      name,
      message,
      frequency,
      threshold,
      feeders,
      creator
    )
    handleCanaryCreated(newCanaryCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CanaryCreated created and stored", () => {
    assert.entityCount("CanaryCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CanaryCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "canaryId",
      "234"
    )
    assert.fieldEquals(
      "CanaryCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "CanaryCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "message",
      "Example string value"
    )
    assert.fieldEquals(
      "CanaryCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "frequency",
      "234"
    )
    assert.fieldEquals(
      "CanaryCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "threshold",
      "234"
    )
    assert.fieldEquals(
      "CanaryCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "feeders",
      "[0x0000000000000000000000000000000000000001]"
    )
    assert.fieldEquals(
      "CanaryCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "creator",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
