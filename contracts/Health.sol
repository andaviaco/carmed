pragma solidity ^0.4.18;

contract Health {
    address private owner;
    string public name;
    string public gender;
    uint public weight;
    string private diseases;
    string private medication;
    uint private privatedPass;

    function Health(
      string _name,
      string _gender,
      uint _weight,
      uint _privatedPass
    ) public {
      owner = msg.sender;
      name = _name;
      gender = _gender;
      weight = _weight;
      diseases = "";
      medication = "";
      privatedPass = _privatedPass;
    }

    function changeWeight(uint _privatedPass, uint _weight) public {
      require(privatedPass == _privatedPass);
      weight = _weight;
    }

    function addDisease(uint _privatedPass, string _diseases) public {
      require(privatedPass == _privatedPass);
      diseases = _diseases;
    }

    function addMedication(uint _privatedPass, string _medication) public {
      require(privatedPass == _privatedPass);
      medication = _medication;
    }

    function changePublicPass(uint _newPublicPass) public {
      require(msg.sender != owner);

      privatedPass = _newPublicPass;
    }

    function getName() public view returns (string) {
      return name;
    }
}