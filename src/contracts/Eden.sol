pragma solidity ^0.5.0;

import "./EdenWood.sol";

contract Eden {
  string  public name = "Eden";
  address public owner;
  EdenWood public edenWood;
  mapping(uint => Originee) public originees;
  mapping(address => bool) public hasOriginees;
  mapping(address => uint) public sawmillOwners;
  mapping(address => uint[]) public origineeOwners;
  mapping(uint => uint) public origineeLocation;
  uint public origineeCount = 0;

  event OrigineeCreation(
      uint256 _id,
      address indexed _owner
  );

  struct Sawmil {
    uint id;
    uint level;
    address owner;
  }
  struct Originee {
    uint id;
    address owner;
  }

  struct SawmilProduction {
    Originee worker;
    Sawmil sawmil;
    uint256 amount;
    uint64 sinceBlock;
    uint64 untilBlock;
  }

  constructor() public {
    owner = msg.sender;
  }

  function createOriginee(address _origineeOwner) public returns(bool){
    require(msg.sender == owner);
    uint currentId = origineeCount;
    originees[currentId] = Originee(currentId, _origineeOwner);
    origineeCount += 1;
    if(!hasOriginees[_origineeOwner]){
      origineeOwners[_origineeOwner] = [currentId];
      hasOriginees[_origineeOwner] = true;
    } else {
      origineeOwners[_origineeOwner].push(currentId);
    }
    emit OrigineeCreation(currentId, _origineeOwner);
    return true;
  }

  function getOwnerOriginee(address _origineeOwner, uint arrayId) public view returns(uint){
    return origineeOwners[_origineeOwner][arrayId];

  }

  function getOrigineesCount(address _origineeOwner) public view returns(uint){
      return origineeOwners[_origineeOwner].length;
  }
  // function getOriginees() public returns(uint[]){
  //   if(hasOriginees[msg.sender]){
  //     return origineeOwners[msg.sender];
  //   } else {
  //     return [];
  //   }
  //
  // }
  // function employWorker(Originee memory worker) public {
  //   return;
  // }

  // function releaseWorker() public {
  //   return;
  // }
  //
  // function levelUp() public {
  //   return;
  // }
  //
  // function produceWood() public {
  //   return;
  // }
  // function destroy() public {
  //   return;
  // }
}
