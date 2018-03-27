pragma solidity ^0.4.8;
contract CryptoProfsMarket {

    address owner;

    string public standard = 'CryptoProfs';
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    mapping (uint => address) public profToOwner;

    struct Offer {
        uint profId;
        address seller;
        uint minValue;          // in ether
        address onlySellTo;     // specify to sell only to a specific person
    }

    struct Bid {
        uint profId;
        address bidder;
        uint value;
    }

	modifier isRealProf(uint _profId) {
		require(_profId >= 15200);
		_;
	}    

    modifier onlyOwnedBy(address _requester, uint _profId) {
    	require(profToOwner[_profId] != _requester);
      	_;
    }

    /* Initializes contract with initial supply tokens to the creator of the contract */
    function CryptoProfsMarket() public payable {
        owner = msg.sender;
        totalSupply = 15200; 
        name = "CRYPTOProfs";            
        symbol = "Ͼ";        
        decimals = 0;                
    }

    // function GetProof(uint _profId) isRealProf(_profId) public view returns (address _owner) {
    //     return 
    // }

    function ClaimProf(uint _profId) onlyOwnedBy(0x00, _profId) public {
    	profToOwner[_profId] = msg.sender;
    }
}