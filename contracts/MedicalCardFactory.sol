pragma solidity ^0.4.18;

import "./Health.sol";

contract MedicalCardFactory {
    mapping(address => address) public cards;

    function createCard (
      string _name,
      string _gender,
      uint8 _height,
      uint8 _weight,
      uint _privatedPass
    ) public {
        address newContract = new Health(
          _name,
          _gender,
          _height,
          _weight,
          _privatedPass
        );
        cards[msg.sender] = newContract;
    }

    function getCardAddress(address _contractAddress) public view returns (address) {
      return cards[_contractAddress];
    }
}
