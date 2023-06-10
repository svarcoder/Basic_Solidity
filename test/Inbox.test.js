const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { abi, evm } = require("../compile");

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
let contractInstance;
beforeEach(async () => {
  // Get a list of all unlocked accounts from ganache

  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: ["Hi there!"],
    })
    .send({
      from: accounts[0],
      gas: "1000000",
    });

  // Use one of those accounts to deploy the contract
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });
  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, "Hi there!");
  });
  it("can change message", async () => {
    const tx = await inbox.methods.setMessage("Hello").send({
      from: accounts[0],
      gas: "1000000",
    });
    console.log("tx", tx);
    const message = await inbox.methods.message().call();
    assert.equal(message, "Hello");
  });
});

//----------------------- just a small example for getting overview of testing with mocha -------------------------------------------------------------
// class Car {
//   park() {
//     return "stopped";
//   }

//   drive() {
//     return "vroom";
//   }
// }

// let car;

// beforeEach("Car", () => {
//   car = new Car();
// });

// describe("Car", () => {
//   it("can park", () => {
//     assert.equal(car.park(), "stopped");
//   });
//   it("can drive", () => {
//     assert.equal(car.drive(), "vroom");
//   });
// });
