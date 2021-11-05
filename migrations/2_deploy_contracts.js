const SoftwareDevelopers = artifacts.require("SoftwareDevelopers");

module.exports = async function(deployer) {
  await deployer.deploy(SoftwareDevelopers);
};
