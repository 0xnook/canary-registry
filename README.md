## CanaryBay

CanaryBay aims to implement warrant canary registry on-chain.

Warrant canary is used to implicitly convey a message, when explicit communication might not be feasible or possible.
This could be due to legal or other reasons.
The canary has a message and expiry date. The message could be something as simple as "I'm doing fine", and expiry date can be anything in the future. As the owner of the canary, the audience of the message will understand that the owner is fine, as long as the canary is not expired.
As long as the owner feels fine, they can extend the expiry date of the canary, and everything is business as usual. However if something happens, the owner of the canary can simply "forget" to extend it, and expired(dead) canary can be a signal for anyone watching.
Warrant canaries are commonly used by companies and organizations like hosting providers, or ISPs. You can also read longer and better description at https://en.wikipedia.org/wiki/Warrant_canary

Warrant canaries are not standardized currently, which makes them hard to find and manage. This project aims to utilize blockchain technology to create a registry for canaries, and allow anyone to create their own canary in the registry.
This way, all canaries are public and transparent, and allow for easy deadline extension.

CanaryBay allows users to:
 - create ("hatch") new canary
 - extend ("feed") canary expiry date
 - query the contract to see if any given canary is alive
 - set the addresses of allowed feeders of the canary
 - set the threshold of the canary
 - set the frequency of the canary (how long is the deadline extended for)
 
Threshold is a setting that indicates how many feeders are required to extend the deadline. Feeders are addresses that can extend the deadline by 'frequency' amount of time. Each feeder can only feed once during a feeding cycle. After canary is fed by enough feeders, the deadline is extended, and feeders can feed again.

In web3 world, we imagine such tool could be utilized by DAOs or protocols. Additionally, other contracts could build on a specific canary state. One could build a contract that acts on canary state, to perform other on-chain actions, effectively implementing dead man's switch.
The protocol implements push protocol using subgraph protocol integration, so that user's can get notified about canary death, or that a canary is about to expire. Subgraph integration allows us to send notifications without deploying any infrastructure specific to that.
The experimental frontend we developed during the hackathon is built using Near BOS technology to keep the frontend decentralized.

Overall we feel like warrant canary is a great fit for blockchain technology, and we aim to make it a public good that can live forever thanks to decentralization.

## Technical Summary

Contracts using foundry, decentralized frontend using Near's BOS, contract indexing using The Graph Protocol.

Figma design at: [https://www.figma.com/file/JvVHn3zi6PYXWrsDgaVpum/Untitled?type=design&node-id=0-1&mode=design](https://www.figma.com/file/JvVHn3zi6PYXWrsDgaVpum/Untitled?type=design&node-id=0-1&mode=design)

Demo at: [https://near.org/db30db3dd6d9a0b66da535706e04d4f9fc7f5d0ff5cd3f5da99f6f0d267a593f/widget/CanaryRegistry](https://near.org/db30db3dd6d9a0b66da535706e04d4f9fc7f5d0ff5cd3f5da99f6f0d267a593f/widget/CanaryRegistry)
Contract Deployments:

* Goeiuirli: [https://goerli.etherscan.io/address/0x05D188E571cEdBab42860CFf1c3F68a5E1ef9408](https://goerli.etherscan.io/address/0x05D188E571cEdBab42860CFf1c3F68a5E1ef9408)
* Arbitrum Sepolia: [https://sepolia.arbiscan.io/address/0x4d53D41692A54E3ed1A64BB4d0Ce46afFae6D201](https://sepolia.arbiscan.io/address/0x4d53D41692A54E3ed1A64BB4d0Ce46afFae6D201)
* Chilliz Spicy Testnet: [https://spicy-explorer.chiliz.com/address/0x2Df970bba00df87554791223A8A15711f9b8BdD8/transactions#address-tabs](https://spicy-explorer.chiliz.com/address/0x2Df970bba00df87554791223A8A15711f9b8BdD8/transactions#address-tabs)
* Mumbai Polygon Testnet: [https://mumbai.polygonscan.com/address/0xbEdEAdEc72369DA7f0FCBcE60C366C341CCD05D3](https://mumbai.polygonscan.com/address/0xbEdEAdEc72369DA7f0FCBcE60C366C341CCD05D3)
