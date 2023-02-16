const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("----------------------------------------------------")
    arguments = []
    const ERC223 = await deploy("ERC223", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    const arr=[1676570112,"0x84Ebf92fA78e90832a52F1b8b7c1eb35487c091B","0x85af0A74000002b8718a036F8B5316c0B94cb689","0xE10F72e9245D12D0a66f3e5E233824e5449063d2","0x82ad91E5e0d16B66165499A68927b6bB76F631b8",ERC223.address]
    const SBTTERC223 = await deploy("TokenVesting", {
        from: deployer,
        args: arr,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(ERC223.address, arguments)
    }
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...2")
        await verify(SBTTERC223.address, arr)
    }
}