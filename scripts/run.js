async function main() {

    const [owner] = await ethers.getSigners();

    const TokenFactory = await hre.ethers.getContractFactory("HZSToken") //compile
    const tokenContract = await TokenFactory.deploy() //deploy
    await tokenContract.deployed()
    console.log("Contract Address:", tokenContract.address)
    console.log("Contract deployed by:", owner.address)
    

    let contractBalance = await tokenContract.balanceOf(owner.address)
    console.log("Balance: ", contractBalance.toString())

    let mintTxn = await tokenContract.mint(owner.address,1000000)
    await mintTxn.wait()

    contractBalance = await tokenContract.balanceOf(owner.address)
    console.log("Balance: ", contractBalance.toString())

    let burnTxn = await tokenContract.burn(500000)
    await burnTxn.wait()

    contractBalance = await tokenContract.balanceOf(owner.address)
    console.log("Balance: ", contractBalance.toString())
}


main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e);
        process.exit(1)
    })