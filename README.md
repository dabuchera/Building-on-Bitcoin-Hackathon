# StacksShare

This prototype is the submission for the [Building on Bitcoin Hackathon](https://building-on-btc-hack.devpost.com/?ref_feature=challenge&ref_medium=your-open-hackathons&ref_content=Submissions+open) by [dabuchera](https://github.com/dabuchera) and [hujens](https://github.com/hujens). It is part of our ongoing research with some additions (see also [here](https://github.com/dabuchera/web3-access)).

The prototype demonstrates how to use role-based and token-based smart contract access control for files and text snippets. The data is stored off-chain using a data storage protocol called [Gaia](https://github.com/stacks-network/gaia).

Follow the instructions below to test the prototype. 

**Most important**: Please be a bit patient. It takes time until transactions are confirmed and changes to the access logic are reflected in the prototype. You can always check the state of the transaction in the Stacks Explorer, e.g. for the [RolesAccess](https://explorer.stacks.co/txid/0x90d3f74e779db902ad530e234d25cdd7c5f199ae1ae6f6bbdceeb0b31cec80f8?chain=testnet) or [TokenAccess](https://explorer.stacks.co/txid/0xfad00174f87245fda375a12016b1a6a361e02eca174870973e978cb809e14a3e?chain=testnet) contract.

## Test the Prototype

We deployed a test intstance of the prototype. The dApp is accessible [here](https://building-on-bitcoin-hackathon.vercel.app/). The smart contracts are deployed on the Stacks testnet ([RolesAccess](https://explorer.stacks.co/txid/0x90d3f74e779db902ad530e234d25cdd7c5f199ae1ae6f6bbdceeb0b31cec80f8?chain=testnet), [TokenAccess](https://explorer.stacks.co/txid/0xfad00174f87245fda375a12016b1a6a361e02eca174870973e978cb809e14a3e?chain=testnet), [accessNFT](https://explorer.stacks.co/txid/0x9c5895ab833542325131d8953167c032a8de3a0393cea0988dba563cf5a23d14?chain=testnet), [ownershipNFT](https://explorer.stacks.co/txid/0x8fd200f5911ba9da78d22f40c867805cd6024dd15d69a6e4b985ef6659d61d36?chain=testnet)).

Follow this tutorial to store and access files:

### Getting Ready

1. Install [Hiro Wallet](https://wallet.hiro.so/) for the browser of your choice. Follow the set up process and carefully memorize your Seed and password if you plan to reuse your account at a later stage.
2. Enter the menu (top right) in the Hiro wallet and "Change Network" to "testnet".
3. Move to the [Testnet faucet](https://explorer.stacks.co/sandbox/faucet?chain=testnet) to receive some free STX so you can pay for transactions. You need to connect your wallet with the account you want to fund.
4. Access the [StacksShare dApp](https://building-on-bitcoin-hackathon.vercel.app/) and connect your account with the "Connect Wallet" button.

| ![home.png](/readme-img/home.png)|
|:--:|
| The landing page to connect the wallet. |

### Upload Data

- To upload a new file or text you can head to the ```/upload``` tab.
- Public files will not be encrypted.
- Private files (not public) will be encrypted and can only be accessed with the connected account that uploaded the file.

| ![upload.png](/readme-img/upload.png) |
|:--:|
| Upload page. |

### Enable Sharing of Data

- After the upload the file is visible under the main page.
- Files can be deleted or shared.

| ![yourfiles11.png](/readme-img/yourfiles11.png) |
|:--:|
| The uploaded private file. |

- When clicking "Allow Sharing", the dApp receives permission to share the data.
- The sharing control button becomes available, where role-based and token-based sharing can be specified.

| ![yourfiles12.png](/readme-img/yourfiles12.png) |
|:--:|
| After enabling sharing, the file is marked as shared. |


| ![yourfiles13.png](/readme-img/yourfiles13.png) |
|:--:|
| Shared, public, and private files are marked respectively. |

### Sharing Control

- The buttons trigger the access logic in the respective smart contracts. The smart contracts are deployed on the Stacks testnet ([RolesAccess](https://explorer.stacks.co/txid/0x90d3f74e779db902ad530e234d25cdd7c5f199ae1ae6f6bbdceeb0b31cec80f8?chain=testnet), [TokenAccess](https://explorer.stacks.co/txid/0xfad00174f87245fda375a12016b1a6a361e02eca174870973e978cb809e14a3e?chain=testnet)).


#### Role-Based Sharing
- **Role-Based sharing** means to share files on an address-basis. **Access-rights are non-transferable**.
- The owner account first needs to claim ownership by registering for the ownership role.
- Then the owner can register other accounts to grant them access to the data.

| ![accesscontrol1.png](/readme-img/accesscontrol1.png) |
|:--:|
| The sharing control page of the file: Role-Based access control. |


#### Token-Based Sharing
- **Token-based** sharing means to share files on a token basis. Every holder of an access-NFT can access the data. **This means access-rights are transferable**.
- The owner first claims the ownership-NFT.
- Afterwards, the owner holding the ownership-NFT can claim access-NFTs to send to other accounts to grant access.

| ![accesscontrol2.png](/readme-img/accesscontrol2.png) |
|:--:|
| The sharing control page of the file: Token-Based access control. |

| ![account1.png](/readme-img/account1.png) |
|:--:|
| Account 1 is the owner of the file. It owns the ownership-NFT and two access-NFTs that can be sent to other accounts. |

### Access Data

- If another account connects with the dApp without permssions to access files, it sees them as private in the ```/overview``` tab (even if they were shared with the dApp or other accounts).

| ![overviewfiles3.png](/readme-img/overviewfiles3.png) |
|:--:|
| Account 3 sees the shared files with the dApp also as private. |

- Account 2 received access permission through an accessNFT.
- The dApp recognizes the connected account holds an accessNFT and grants permission to access the data. It is also visible as shared in the ```/overview``` tab.
- In case Account 2 holds an access role, the dApp notices this in the same way as it notices wether it holds an access-NFT by reading the states of access roles from the smart contract.

| ![account2.png](/readme-img/account2.png) |
|:--:|
| Account 2 owns one of the access-NFTs. |

| ![overviewfiles2.png](/readme-img/overviewfiles2.png) |
|:--:|
| Account 2 can access the shared file in the dApp. |

## Local Development

### Deploy Contracts

We use [Stacks](https://www.stacks.co/) for this protoype with smart contracts written in [Clarity](https://book.clarity-lang.org/).

To run and test the smart contracts locally, you can deploy them to a local network.

- Install [Clarinet](https://github.com/hirosystems/clarinet).
- Install and run [Docker](https://www.docker.com/).
- Spwan a local Devnet and deploy the contracts:

```sh
## Move into /contracts folder
$ cd contracts

## Start the local network and deploy contracts
$ clarinet integrate
```

### Start Frontend

The frontend was built using [React](https://reactjs.org/) and [Chakra](https://chakra-ui.com/).


```sh
## Move into /frontend folder
$ cd frontend

# Install dependencies
$ npm install

# Start dev server
$ npm run dev
```

Access the frontend on the indicated localhost, most likely http://localhost:3000.

### Connect Wallet

You need a blockchain wallet to interact with the dApp and the smart contracts. The most popular choice for Stacks is for now the [Hiro Wallet](https://wallet.hiro.so/).

- Install Hiro for the browser of your choice.
- Set up a wallet with one of the default addresses listed in the [Devnet.toml](/contracts/settings/Devnet.toml) file (so you have a funded address to play with).
