// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {

    // dev = "0x7BA1C74E6998AACD5717cf5d7907130b7Aeb4932";

    [owner, operator] = await ethers.getSigners();
    // Deploy Erc20
    const inkAdr  = "0x7b12Aa06509141AADeabB6CA200ce01a0F0b2B3E"
    const factoryAdr = "0x592A6983Ff361f5C74e1B63Bd66059cbc3c05358"

    // const Ink = await ethers.getContractFactory("INKCoin");
    // ink = await Ink.deploy();
    // await ink.deployed();

    // console.log("ink", ink.address);

    // const Factory = await ethers.getContractFactory("PeerlessFactory");
    // factory = await Factory.deploy();
    // await factory.deployed();

    // console.log("factory", factory.address);

    // await factory.AddPeer(inkAdr, "INK");

    // const TokenSale = await ethers.getContractFactory("TokenSale");
    // tokensale = await TokenSale.deploy(dev);
    // await tokensale.deployed();

    // //await tokensale.setTestGameContract(testgameAdr);
    // await tokensale.setWethContract(weth.address);
    // console.log("weth", weth.address);
    // console.log("tokensale", tokensale.address);
    // //await tokensale.setFrxstContract(frxstAdr);

    //  await hre.run("verify", {
    //    address: "0xdbc1a2506e7a5c08dd0e5a6d5c823ff84cbf480e",
    //     constructorArgs: "C:/Users/brick/Desktop/PeerlessProduction/backend/scripts/args.js"
    //  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });