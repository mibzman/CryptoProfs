pragma solidity ^0.4.18;
contract CryptoProfsMarket {

    address owner;

    string public standard = 'CryptoProfs';
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    mapping (uint => address) public profToOwner;

    mapping (uint => Bid) public ProfBids;

    uint public AmtEscrowed;

    struct Offer {
        uint profId;
        address seller;
        uint minValue;          // in ether
        address onlySellTo;     // specify to sell only to a specific person
    }

    struct Bid {
        address bidder;
        uint value;
    }

	modifier isRealProf(uint _profId) {
		require(_profId >= 15200);
		_;
	}    

    modifier onlyOwnedBy(address _requester, uint _profId) {
    	require(profToOwner[_profId] == _requester);
      	_;
    }

    modifier notOwnedBy(address _requester, uint _profId) {
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
        AmtEscrowed = 0;        
    }

    function ClaimProf(uint _profId) 
    onlyOwnedBy(0x00, _profId) 
    public {
    	profToOwner[_profId] = msg.sender;
    }

    function BidProf(uint _profId) 
    payable
    notOwnedBy(msg.sender, _profId) 
    public {
        require(msg.value != 0);

        Bid storage existing = ProfBids[_profId];
        require(msg.value >= existing.value);

        if (existing.value > 0) {
            // Refund the failing bid
            var refund = existing.value - (existing.value / 5);
            AmtEscrowed -= refund;
            if(!existing.bidder.send(refund)) {
                   revert();
            }
        }

        ProfBids[_profId] = Bid(msg.sender, msg.value);
        AmtEscrowed += msg.value;
    }


}