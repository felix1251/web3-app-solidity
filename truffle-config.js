require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKeys = ["da75f81b97e77a45c09322e9fd9acdbd0c76dfb606455770c8f4085c28117946", "b94fafa98debb8740b935c23f32119c114386114b6e916d16ac6babb6f0fc960"];

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: () => {
        return new HDWalletProvider(privateKeys, "https://ropsten.infura.io/v3/1a21a9550b6d4a87bb3de9bf9cfbc4ba")
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 3,
      skipDryRun: true
    }
  },
  
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}