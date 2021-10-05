const Eden = artifacts.require("Eden")

const EdenToken = artifacts.require("EdenToken");
const EdenWood = artifacts.require("EdenWood");
const Originee = artifacts.require("Originee");

module.exports = function(deployer) {
  deployer.deploy(Eden);
}

module.exports = function(deployer) {
  deployer.deploy(EdenToken);
}

module.exports = function(deployer) {
  deployer.deploy(EdenWood);
}

module.export = function(deployer) {
  deployer.deploy(Originee);
}
