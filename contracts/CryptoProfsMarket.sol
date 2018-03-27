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

    Bid NullBid;

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

    modifier onlyOwner() {
        require(msg.sender == owner);
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
        NullBid = Bid(0x00, 0);     
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
            sendFundsWithFee(existing.value, existing.bidder, 100);
        }

        ProfBids[_profId] = Bid(msg.sender, msg.value);
        AmtEscrowed += msg.value;
    }

    function AcceptBid(uint _profId)
    onlyOwnedBy(msg.sender, _profId) 
    public {
        //transfer prof
        Bid storage existing = ProfBids[_profId];
        profToOwner[_profId] = existing.bidder;

        //trasfer funds
        sendFundsWithFee(existing.value, msg.sender, 20);

        //zero out bid
        ProfBids[_profId] = NullBid;
    }

    function sendFundsWithFee(uint _value, address _to, uint fee) private {
        var refund = _value - (_value / fee);
        AmtEscrowed -= refund;
        if(!_to.send(refund)) {
               revert();
        }
    }

    function withdrawFees() onlyOwner public {
        if(!owner.send(this.balance - AmtEscrowed)) {
               revert();
        }
    }
}