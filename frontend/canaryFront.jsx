let canaryContract;
const goerliContract = "0x05D188E571cEdBab42860CFf1c3F68a5E1ef9408";

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

let tableData = fetch(
  "https://api.studio.thegraph.com/query/16231/canary-registry-test/v0.0.5",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
        canaries {
          id
          name
          message
          creator
          expiryTimestamp
          isAlive
        }
      }`,
    }),
  }
);

function createCanary(name, message, frequency, threshold, feeders) {
  const canaryRegistry = new ethers.Contract(
    canaryContract,
    canaryAbi,
    Ethers.provider().getSigner()
  );
  const freq = ethers.BigNumber.from(frequency * 86400);
  const thres = ethers.BigNumber.from(threshold);
  canaryRegistry.hatchCanary(name, message, freq, thres, feeders);
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
  gap: 25px;
  padding: 5px;
`;

State.init({ inputFeederAddresses: [] });

const Form = () => (
  <>
    <CreateCanary />
    <input
      placeholder="Name"
      value={state.inputName}
      onChange={(e) => State.update({ inputName: e.target.value })}
    />
    <input
      placeholder="Message"
      value={state.inputMessage}
      onChange={(e) => State.update({ inputMessage: e.target.value })}
    />
    <input
      type="number"
      placeholder="Frequency (days)"
      value={state.inputFrequency}
      onChange={(e) => State.update({ inputFrequency: e.target.value })}
    />
    <input
      placeholder="Input feeder addresses (comma separated)"
      value={state.inputFeederAddresses}
      onChange={(e) =>
        State.update({ inputFeederAddresses: e.target.value.split(",") })
      }
    />
    <input
      type="number"
      min="1"
      max={state.inputFeederCount}
      placeholder="Feeder threshold"
      onChange={(e) => State.update({ inputFeederCount: e.target.value })}
    />
    <button
      onClick={() =>
        createCanary(
          state.inputName,
          state.inputMessage,
          state.inputFrequency,
          state.inputFeederCount,
          state.inputFeederAddresses
        )
      }
    >
      Create Canary
    </button>
  </>
);

const FormStyle = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 3px;
  width: 30rem;
  text-align: center;
`;

const CreateCanary = () => {
  return <div class="create-canary-form">New Canary</div>;
};

const CanaryTable = ({ data }) => {
  const columns = ["ID", "Name", "Message", "Creator", "Expiry", "Is Alive"];

  return (
    <table
      style={{ borderSpacing: "0", width: "100%", borderCollapse: "collapse" }}
    >
      <thead>
        <tr style={{ borderBottom: "1px solid #ddd", background: "#f2f2f2" }}>
          {columns.map((column) => (
            <th key={column} style={{ padding: "8px", textAlign: "left" }}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.canaries.map((canary) => (
          <tr key={canary.id} style={{ borderBottom: "1px solid #ddd" }}>
            <td
              style={{
                padding: "8px",
                maxWidth: "50px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {canary.id}
            </td>
            <td
              style={{
                padding: "8px",
                maxWidth: "150px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {canary.name}
            </td>
            <td
              style={{
                padding: "8px",
                maxWidth: "150px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {canary.message}
            </td>
            <td
              style={{
                padding: "8px",
                maxWidth: "200px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {canary.creator}
            </td>
            <td
              style={{
                padding: "8px",
                maxWidth: "150px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {canary.expiryTimestamp}
            </td>
            <td
              style={{
                padding: "8px",
                maxWidth: "80px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {canary.isAlive.toString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

return (
  <Wrapper>
    <Web3Connect connectLabel="Connect with Web3" />
    <FormStyle>
      <Form />
    </FormStyle>
    <CanaryTable data={tableData.body.data} />
  </Wrapper>
);
