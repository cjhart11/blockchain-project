//const utils = require("./helpers/utils");
//const { time } = require("@openzeppelin/test-helpers");
const { expect } = require('chai');
//const waffle = require('ethereum-waffle');
const { waffle } = require("hardhat");
const { deployContract } = waffle;
const provider = waffle.provider;


// `describe` is a Mocha function that allows you to organize your test. It's
// not actually needed, but having your test organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the test of that section. This callback can't be
// an async function.


describe("Cryptoprescription", function () {
    // Mocha has four functions that let you hook into the the test runner's
    // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

    // They're very useful to setup the environment for test, and to clean it
    // up after they run.

    // A common pattern is to declare some variables, and assign them in the
    // `before` and `beforeEach` callbacks.

    const prescriptionNames = ["product one", "product 2"];
    let CZ;
    let CZInstance;
    let alice;
    let bob;



    // `beforeEach` will run before each test, re-deploying the contract every
    // time. It receives a callback, which can be async.

    beforeEach(async function () {
        [alice, bob] = await ethers.getSigners();
        CZ = await ethers.getContractFactory("CryptoPrescription");
        CZInstance = await CZ.deploy();
    });


    // You can nest describe calls to create subsections.
    describe("Deployment and prescription creation", function () {
        it("Should be able to create a new prescription", async () => {
            await expect(CZInstance.createPrescriptionAll(prescriptionNames[0], 10, "location one", "location two" , "shipped"))
                .to.emit(CZInstance, 'NewPrescription')
            const x = await CZInstance.prescriptions(0);
            //console.log(x);
            expect(x.name).to.equal(prescriptionNames[0]);
        });
    });


    describe("Simple prescription ownership and transfer", function () {
        it("should transfer a prescription", async () => {
            const result = await CZInstance.createPrescriptionAll(prescriptionNames[0], 10, "location one", "location two" , "shipped");
            const prescriptionId = 0;
            await CZInstance.transferFrom(alice.address, bob.address, prescriptionId);
            const newOwner = await CZInstance.ownerOf(prescriptionId);
            expect(newOwner).to.equal(bob.address);
        })
    });

    describe("Two-step transfer scenario", async () => {
        it("should approve and then transfer a prescription when the approved address calls transferFrom", async () => {
            const result = await CZInstance.createPrescriptionAll(prescriptionNames[0], 10, "location one", "location two" , "shipped");
            const prescriptionId = 0;
            await CZInstance.approve(bob.address, prescriptionId);
            await CZInstance.connect(bob).transferFrom(alice.address, bob.address, prescriptionId);
            const newOwner = await CZInstance.ownerOf(prescriptionId);
            expect(newOwner).to.equal(bob.address);
        })

        it("should approve and then transfer a prescription when the owner calls transferFrom", async () => {
            const result = await CZInstance.createPrescriptionAll(prescriptionNames[0], 10, "location one", "location two" , "shipped");
            const prescriptionId = 0;
            await CZInstance.approve(bob.address, prescriptionId);
            await CZInstance.transferFrom(alice.address, bob.address, prescriptionId);
            const newOwner = await CZInstance.ownerOf([prescriptionId]);
            expect(newOwner).to.equal(bob.address);
        })
    })

    describe("querying scenarios", async () => {
        it("should return the address of owner of prescription given the prescription id", async () => {
            const result = await CZInstance.createPrescriptionAll(prescriptionNames[0], 10, "location one", "location two" , "shipped");
            const prescriptionId = 0;
            const owner = await CZInstance.ownerOf([prescriptionId]);
            expect(owner).to.equal(alice.address);
        })

        it("should return the name of the prescription give the prescription id" , async () => {
            const result = await CZInstance.createPrescriptionAll(prescriptionNames[0], 10, "location one", "location two" , "shipped");
            const prescriptionId = 0;
            const name = await CZInstance.findNameWithId(prescriptionId);
            expect(name).to.equal(prescriptionNames[0]);
        })

        it("should allow owner of a prescription to change name" , async () => {
            const result = await CZInstance.createPrescriptionAll(prescriptionNames[0], 10, "location one", "location two" , "shipped");
            const prescriptionId = 0;
            const newName = "updated";
            await CZInstance.updatePrescriptionName(prescriptionId, newName);
            const name = await CZInstance.findNameWithId(prescriptionId);
            expect(name).to.equal(newName);
        })

        it("should allow owner of a prescription to change quantity" , async () => {
            const result = await CZInstance.createPrescriptionAll(prescriptionNames[0], 10, "location one", "location two" , "shipped");
            const prescriptionId = 0;
            const newQuantity = 2730;
            await CZInstance.updatePrescriptionQuantity(prescriptionId, newQuantity);
            const quantity = await CZInstance.findQuantityWithId(prescriptionId);
            expect(quantity).to.equal(newQuantity);
        })

        it("should allow owner of a prescription to change origin" , async () => {
            const result = await CZInstance.createPrescriptionAll(prescriptionNames[0], 10, "location one", "location two" , "shipped");
            const prescriptionId = 0;
            const newOrigin = "space";
            await CZInstance.updatePrescriptionOrigin(prescriptionId, newOrigin);
            const origin = await CZInstance.findOriginWithId(prescriptionId);
            expect(origin).to.equal(newOrigin);
        })

        it("should allow owner of a prescription to change destination" , async () => {
            const result = await CZInstance.createPrescriptionAll(prescriptionNames[0], 10, "location one", "location two" , "shipped");
            const prescriptionId = 0;
            const newDestination = "earth";
            await CZInstance.updatePrescriptionDestination(prescriptionId, newDestination);
            const destination = await CZInstance.findDestinationWithId(prescriptionId);
            expect(destination).to.equal(newDestination);
        })

        it("should allow owner of a prescription to change status" , async () => {
            const result = await CZInstance.createPrescriptionAll(prescriptionNames[0], 10, "location one", "location two" , "shipped");
            const prescriptionId = 0;
            const newStatus = "delivered";
            await CZInstance.updatePrescriptionStatus(prescriptionId, newStatus);
            const status = await CZInstance.findStatusWithId(prescriptionId);
            expect(status).to.equal(newStatus);
        })
    })

})
