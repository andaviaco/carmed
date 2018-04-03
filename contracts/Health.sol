pragma solidity ^0.4.18;

contract Health {
    address private owner;
    string public name;
    string public gender;
    uint8 public height;
    uint8 public weight;
    string private diseases;
    string private medication;
    string private allergies;
    string private surgeries;
    uint private privatedPass;
    uint public lastModification;

    function Health(
      string _name,
      string _gender,
      uint8 _height,
      uint8 _weight,
      uint _privatedPass
    ) public {
      owner = msg.sender;
      name = _name;
      gender = _gender;
      height = _height;
      weight = _weight;
      diseases = "";
      medication = "";
      allergies = "";
      surgeries = "";
      privatedPass = _privatedPass;
      lastModification = now;
    }

    function changeWeight(uint _privatedPass, uint8 _weight) public {
      require(privatedPass == _privatedPass);
      weight = _weight;
    }

    function changeHeight(uint _privatedPass, uint8 _height) public {
      require(privatedPass == _privatedPass);
      height = _height;
    }

    function addAllergies(uint _privatedPass, string _allergies) public {
      require(privatedPass == _privatedPass);
      allergies = _allergies;
    }

    function addDisease(uint _privatedPass, string _diseases) public {
      require(privatedPass == _privatedPass);
      diseases = _diseases;
    }

    function addSurgeries(uint _privatedPass, string _surgeries) public {
      require(privatedPass == _privatedPass);
      surgeries = _surgeries;
    }

    function addMedication(uint _privatedPass, string _medication) public {
      require(privatedPass == _privatedPass);
      medication = _medication;
    }

    function getAllergies() public view returns (string) {
      return allergies;
    }

    function getDiseases() public view returns (string) {
      return diseases;
    }

    function getMedication() public view returns (string) {
      return medication;
    }

    function getSurgeries() public view returns (string) {
      return surgeries;
    }


    function changePublicPass(uint _newPublicPass) public {
      require(msg.sender != owner);

      privatedPass = _newPublicPass;
    }
}
