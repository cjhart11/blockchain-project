pragma solidity >=0.5.0 <0.6.0;


import "./safemath.sol";
import "./Ownable.sol";

contract PrescriptionFactory is Ownable {

    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;

    event NewPrescription(uint prescriptionId, string name, uint quantity);

    struct Prescription {
        string name;
        uint pid;
        uint quantity;
        uint shipDate;
        string origin;
        string destination;
        string status;
        address owner;
    }

    modifier onlyOwnerOf(uint _prescriptionId){
        require(msg.sender == prescriptionToOwner[_prescriptionId]);
        _;
    }

    Prescription[] public prescriptions;

    mapping (uint => address) public prescriptionToOwner;
    mapping (address => uint) ownerPrescriptionCount;

    function _createPrescription(string memory _name, uint _quantity, string memory _origin, string memory  _destination, string memory  _status) internal {
        uint idCount = prescriptions.length;
        uint id = prescriptions.push(Prescription(_name, idCount, _quantity, now, _origin, _destination, _status, msg.sender)) - 1;
        prescriptionToOwner[id] = msg.sender;
        ownerPrescriptionCount[msg.sender] = ownerPrescriptionCount[msg.sender].add(1);
        emit NewPrescription(id, _name, _quantity);
    }

    function createPrescriptionAll(string memory _name, uint _quantity, string memory _origin, string memory _destination, string memory _status) public {
        _createPrescription(_name, _quantity, _origin, _destination, _status);
    }

    function findWithId(uint256 _tokenId) external view returns (string memory) {
        return prescriptions[_tokenId].name;// not sure if this is correct
    }

    function findNameWithId(uint256 _tokenId) external view returns (string memory) {
        return prescriptions[_tokenId].name;// not sure if this is correct
    }

    function findQuantityWithId(uint256 _tokenId) external view returns (uint) {
        return prescriptions[_tokenId].quantity;// not sure if this is correct
    }

    function findOriginWithId(uint256 _tokenId) external view returns (string memory) {
        return prescriptions[_tokenId].origin;// not sure if this is correct
    }

    function findDestinationWithId(uint256 _tokenId) external view returns (string memory) {
        return prescriptions[_tokenId].destination;// not sure if this is correct
    }

    function findStatusWithId(uint256 _tokenId) external view returns (string memory) {
        return prescriptions[_tokenId].status;// not sure if this is correct
    }

    function getPrescriptionsByOwner(address _owner) external view returns(uint[] memory) {
        uint[] memory result = new uint[](ownerPrescriptionCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < prescriptions.length; i++) {
            if (prescriptionToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function withdraw() external onlyOwner {
        address payable _owner = address(uint160(owner()));
        _owner.transfer(address(this).balance);
    }

    function updatePrescriptionName(uint256 _tokenId, string calldata _newName) external onlyOwnerOf(_tokenId){
        prescriptions[_tokenId].name = _newName;
    }

    function updatePrescriptionQuantity(uint256 _tokenId, uint _newQuantity) external onlyOwnerOf(_tokenId){
        prescriptions[_tokenId].quantity = _newQuantity;
    }

    function updatePrescriptionOrigin(uint256 _tokenId, string calldata _newOrigin) external onlyOwnerOf(_tokenId){
        prescriptions[_tokenId].origin = _newOrigin;
    }

    function updatePrescriptionDestination(uint256 _tokenId, string calldata _newDestination) external onlyOwnerOf(_tokenId){
        prescriptions[_tokenId].destination = _newDestination;
    }

    function updatePrescriptionStatus(uint256 _tokenId, string calldata _newStatus) external onlyOwnerOf(_tokenId){
        prescriptions[_tokenId].status = _newStatus;
    }

}
