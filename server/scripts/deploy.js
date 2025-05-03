// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract factory to deploy
  const ArtifyNFT = await hre.ethers.getContractFactory("ArtifyNFT");
  
  console.log("Deploying ArtifyNFT...");
  
  // Deploy the contract
  const artifyNFT = await ArtifyNFT.deploy();

  // Wait for deployment to finish
  await artifyNFT.deployed();

  console.log("ArtifyNFT deployed to:", artifyNFT.address);
  
  // Store the contract address for later use
  const fs = require("fs");
  const contractsDir = __dirname + "/../contractData";
  
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }
  
  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ ArtifyNFT: artifyNFT.address }, undefined, 2)
  );
  
  // Copy the contract artifacts to make them easily accessible
  const artifactDir = __dirname + "/../artifacts/contracts";
  
  fs.copyFileSync(
    artifactDir + "/ArtifyNFT.sol/ArtifyNFT.json",
    contractsDir + "/ArtifyNFT.json"
  );
  
  console.log("Contract artifacts saved to:", contractsDir);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
