pragma solidity >=0.5.0 <0.6.0;

import "./PrescriptionFactory.sol";
import "./erc721.sol";
import "./safemath.sol";

contract PrescriptionOwnership is PrescriptionFactory, ERC721 {

    using SafeMath for uint256;

    mapping (uint => address) prescriptionApprovals;

    function balanceOf(address _owner) external view returns (uint256) {
        return ownerPrescriptionCount[_owner];
    }

    function ownerOf(uint256 _tokenId) external view returns (address) {
        return prescriptionToOwner[_tokenId];
    }

    function _transfer(address _from, address _to, uint256 _tokenId) private {
        ownerPrescriptionCount[_to] = ownerPrescriptionCount[_to].add(1);
        ownerPrescriptionCount[msg.sender] = ownerPrescriptionCount[msg.sender].sub(1);
        prescriptionToOwner[_tokenId] = _to;
        emit Transfer(_from, _to, _tokenId);
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) external payable {
        require (prescriptionToOwner[_tokenId] == msg.sender || prescriptionApprovals[_tokenId] == msg.sender);
        _transfer(_from, _to, _tokenId);
    }

    function approve(address _approved, uint256 _tokenId) external payable onlyOwnerOf(_tokenId) {
        prescriptionApprovals[_tokenId] = _approved;
        emit Approval(msg.sender, _approved, _tokenId);
    }

}
