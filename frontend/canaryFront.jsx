let canaryContract;
const goerliContract = "0xf8388c7Aa43D98bd04d9956f082f034E52e54B60";

const network = "goerli"; // "gorli" // "rinkeby" // "mainnet"

switch (network) {
  case "gorli":
    canaryContract = goerliContract;
    break;
  default:
    canaryContract = goerliContract;
    break;
}

const canaryAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "canaryId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "frequency",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "threshold",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "feeders",
        type: "address[]",
      },
    ],
    name: "CanaryCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "canaryId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "feeder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "CanaryFed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "canaryId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "CanaryFullyFed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "canaries",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "frequency",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "threshold",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "initializationTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expiryTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "feederCount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "canaryId",
        type: "uint256",
      },
    ],
    name: "feed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "frequency",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "threshold",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "feeders",
        type: "address[]",
      },
    ],
    name: "hatchCanary",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "canaryId",
        type: "uint256",
      },
    ],
    name: "isCanaryAlive",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const canaryRegistry = new ethers.Contract(
  canaryContract,
  canaryAbi,
  Ethers.provider().signer
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
  gap: 25px;
  padding: 5px;
`;

const FeederAddressesInput = () => {
  var inputs = [];
  for (var i = 0; i < state.feederCount; i++) {
    inputs.push(<input placeholder={`Feeder ${i} address`} />);
  }
  return inputs;
};

const Form = () => (
  <>
    <CreateCanary />
    <input placeholder="Name" />
    <input placeholder="Message" />
    <input placeholder="Frequency" />
    <input
      type="number"
      min="1"
      max="10"
      placeholder="Feeder count"
      value={state.feederCount}
      onChange={(e) => State.update({ feederCount: e.target.value })}
    />
    <FeederAddressesInput />

    <input
      type="number"
      min="1"
      max={state.feederCount}
      placeholder="Feeder threshold"
    />
    <button>Create Canary</button>
  </>
);

const FormStyle = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 3px;
  width: 20rem;
  text-align: center;
`;

const CreateCanary = () => {
  return <div class="create-canary-form">New Canary</div>;
};

return (
  <Wrapper>
    {<Web3Connect connectLabel="Connect with Web3" />}
    <FormStyle>
      <Form />
    </FormStyle>
  </Wrapper>
);
