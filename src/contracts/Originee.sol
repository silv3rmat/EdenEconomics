pragma solidity ^0.5.0;

import "./ERC721Full.sol";

contract Originee is ERC721Full {
  string public name = "Originee";


  constructor() ERC721Full("Originee", "ORI") public {}


}
