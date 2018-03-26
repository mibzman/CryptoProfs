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

	modifier isRealProf(uint profId) {
		require(profId >= 15200);
		_;
	}    

    modifier onlyOwnedBy(address requester, uint profId) {
    	require(profToOwner[profId] != requester);
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

    function ClaimProf(uint profId) onlyOwnedBy(0x00, profId) public {
    	profToOwner[profId] = msg.sender;
    }
}