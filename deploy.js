require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile");

const provider = new HDWalletProvider(
  process.env.SECRET_WALLET_PHRASE,
  process.env.INFURA_RINKEBY_API
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attemting to deploy a contract from account", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: ["Hello There!"],
    })
    .send({
      from: accounts[0],
      gas: "1000000",
    });

  console.log("Contract deployed to: ", result.options.address);
  provider.engine.stop();
};

deploy();

//first deployed contract address(Rinkeby Network): 0x2041AD809C1C1B67Ae9b770d6F84Cea5594E5A3C;
