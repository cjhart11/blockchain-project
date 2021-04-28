# blockchain-project

## build process with deploying of contracts
step one: create hardhat.config.js that contains your private key and infura project ID and add it to the main directory

step two: run "npm install"

step three: compile contracts with "npx hardhat compile"

step four: test contracts with "npx hardhat test"

step five: deploy contracts with "npx hardhat run --network rinkeby scripts/deploy.js"

step six: copy address that contracts have been deployed to and add it to /medicaldapp/src/utils/initBlockchain.js at line 51 replacing the old address

step seven: copy newly built /build/contracts/CryptoPrescription.sol/CryptoPrescription.json file to /medicaldapp/src/ replacing old file

step eight: move into /medicaldapp/ directory and run "npm install"

step nine: launch the client with "npm start"
