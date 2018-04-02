var MedicalCardFactory = artifacts.require("./MedicalCardFactory.sol");
var Health = artifacts.require("./Health.sol");

module.exports = function(deployer) {
  deployer.deploy(MedicalCardFactory);
};
