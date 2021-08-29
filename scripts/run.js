async function main() {

    const [deployer, owner, otherAddress] = await ethers.getSigners();

    const TokenFactory = await hre.ethers.getContractFactory("HZSToken") //compile
    const tokenContract = await TokenFactory.deploy() //deploy
    await tokenContract.deployed()
    console.log("Contract Address:", tokenContract.address)
    console.log("Contract deployed by:", deployer.address)

    const TokenTimelockFactory = await hre.ethers.getContractFactory("HZSTokenTimelock") //compile
    const tokenTimelockContract = await TokenTimelockFactory.deploy(owner.address) //deploy
    await tokenTimelockContract.deployed()
    console.log("TokenTimelock Contract Address:", tokenTimelockContract.address)
    

    let contractBalance = await tokenContract.balanceOf(deployer.address)
    console.log("Balance: ", contractBalance.toString())

    let mintTxn = await tokenContract.mint(deployer.address,1000000)
    await mintTxn.wait()

    contractBalance = await tokenContract.balanceOf(deployer.address)
    console.log("Balance: ", contractBalance.toString())

    let burnTxn = await tokenContract.burn(500000)
    await burnTxn.wait()

    contractBalance = await tokenContract.balanceOf(deployer.address)
    console.log("Balance: ", contractBalance.toString())

    let approve = await tokenContract.approve(tokenTimelockContract.address, 888888)
    let deposit = await tokenTimelockContract.deposit(tokenContract.address, 888888)
    contractBalance = await tokenContract.balanceOf(deployer.address)
    console.log("Balance: ", contractBalance.toString())

    let withdraw = await tokenTimelockContract.withdraw(tokenContract.address, 888888)
}


main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e);
        process.exit(1)
    })