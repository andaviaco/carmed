pragma solidity ^0.4.18;

import "./Health.sol";

contract MedicalCardFactory {
    mapping(address => address) public cards;

    function createCard (
      string _name,
      string _gender,
      uint _weight,
      uint _newPublicPass
    ) public {
        address newContract = new Health(
          _name,
          _gender,
          _weight,
          _newPublicPass
        );
        cards[msg.sender] = newContract;
    }

    function getCardAddress(address _contractAddress) public view returns (address) {
      return cards[_contractAddress];
    }
}
