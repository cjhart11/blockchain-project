async function main() {

    const [deployer] = await ethers.getSigners();

    console.log(
        "Deploying contracts with the account:",
        deployer.address
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());

     const CZF = await ethers.getContractFactory("CryptoPrescription");
     const CZ = await CZF.deploy();
     console.log("CryptoPrescription contract address:", CZ.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

/*
npx hardhat run --network rinkeby scripts/deploy.js
 */
