// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.8.0;
pragma abicoder v2;

// import ERC721 iterface
import "./ERC721.sol";

// SoftwareDevelopers smart contract inherits ERC721 interface
contract SoftwareDevelopers is ERC721 {

  // this contract's token collection name
  string public collectionName;
  // this contract's token symbol
  string public collectionNameSymbol;
  // total number of software developers minted
  uint256 public cryptoBoyCounter;

  // define software developer struct
   struct SoftwareDeveloper {
    uint256 tokenId;
    string tokenName;
    string tokenURI;
    address payable mintedBy;
    address payable currentOwner;
    address payable previousOwner;
    uint256 price;
    uint256 numberOfTransfers;
    bool forSale;
  }

  // map softwaredeveloper's token id to software developer
  mapping(uint256 => SoftwareDeveloper) public allSoftwareDevelopers;
  // check if token name exists
  mapping(string => bool) public tokenNameExists;
  // check if color exists
  mapping(string => bool) public colorExists;
  // check if token URI exists
  mapping(string => bool) public tokenURIExists;

  // initialize contract while deployment with contract's collection name and token
  constructor() ERC721("Software Developers Collection", "CB") {
    collectionName = name();
    collectionNameSymbol = symbol();
  }

  // mint a new software developer
  function mintSoftwareDeveloper(string memory _name, string memory _tokenURI, uint256 _price, string[] calldata _colors) external {
    // check if thic fucntion caller is not an zero address account
    require(msg.sender != address(0));
    // increment counter
    cryptoBoyCounter ++;
    // check if a token exists with the above token id => incremented counter
    require(!_exists(cryptoBoyCounter));

    // loop through the colors passed and check if each colors already exists or not
    for(uint i=0; i<_colors.length; i++) {
      require(!colorExists[_colors[i]]);
    }
    // check if the token URI already exists or not
    require(!tokenURIExists[_tokenURI]);
    // check if the token name already exists or not
    require(!tokenNameExists[_name]);

    // mint the token
    _mint(msg.sender, cryptoBoyCounter);
    // set token URI (bind token id with the passed in token URI)
    _setTokenURI(cryptoBoyCounter, _tokenURI);

    // loop through the colors passed and make each of the colors as exists since the token is already minted
    for (uint i=0; i<_colors.length; i++) {
      colorExists[_colors[i]] = true;
    }
    // make passed token URI as exists
    tokenURIExists[_tokenURI] = true;
    // make token name passed as exists
    tokenNameExists[_name] = true;

    // creat a new software developer (struct) and pass in new values
    SoftwareDeveloper memory newSoftwareDeveloper = SoftwareDeveloper(
    cryptoBoyCounter,
    _name,
    _tokenURI,
    msg.sender,
    msg.sender,
    address(0),
    _price,
    0,
    true);
    // add the token id and it's software developer to all software developers mapping
    allSoftwareDevelopers[cryptoBoyCounter] = newSoftwareDeveloper;
  }

  // get owner of the token
  function getTokenOwner(uint256 _tokenId) public view returns(address) {
    address _tokenOwner = ownerOf(_tokenId);
    return _tokenOwner;
  }

  // get metadata of the token
  function getTokenMetaData(uint _tokenId) public view returns(string memory) {
    string memory tokenMetaData = tokenURI(_tokenId);
    return tokenMetaData;
  }

  // get total number of tokens minted so far
  function getNumberOfTokensMinted() public view returns(uint256) {
    uint256 totalNumberOfTokensMinted = totalSupply();
    return totalNumberOfTokensMinted;
  }

  // get total number of tokens owned by an address
  function getTotalNumberOfTokensOwnedByAnAddress(address _owner) public view returns(uint256) {
    uint256 totalNumberOfTokensOwned = balanceOf(_owner);
    return totalNumberOfTokensOwned;
  }

  // check if the token already exists
  function getTokenExists(uint256 _tokenId) public view returns(bool) {
    bool tokenExists = _exists(_tokenId);
    return tokenExists;
  }

  // by a token by passing in the token's id
  function buyToken(uint256 _tokenId) public payable {
    // check if the function caller is not an zero account address
    require(msg.sender != address(0));
    // check if the token id of the token being bought exists or not
    require(_exists(_tokenId));
    // get the token's owner
    address tokenOwner = ownerOf(_tokenId);
    // token's owner should not be an zero address account
    require(tokenOwner != address(0));
    // the one who wants to buy the token should not be the token's owner
    require(tokenOwner != msg.sender);
    // get that token from all software developers mapping and create a memory of it defined as (struct => SoftwareDeveloper)
    SoftwareDeveloper memory softwaredeveloper = allSoftwareDevelopers[_tokenId];
    // price sent in to buy should be equal to or more than the token's price
    require(msg.value >= softwaredeveloper.price);
    // token should be for sale
    require(softwaredeveloper.forSale);
    // transfer the token from owner to the caller of the function (buyer)
    _transfer(tokenOwner, msg.sender, _tokenId);
    // get owner of the token
    address payable sendTo = softwaredeveloper.currentOwner;
    // send token's worth of ethers to the owner
    sendTo.transfer(msg.value);
    // update the token's previous owner
    softwaredeveloper.previousOwner = softwaredeveloper.currentOwner;
    // update the token's current owner
    softwaredeveloper.currentOwner = msg.sender;
    // update the how many times this token was transfered
    softwaredeveloper.numberOfTransfers += 1;
    // set and update that token in the mapping
    allSoftwareDevelopers[_tokenId] = softwaredeveloper;
  }

  function changeTokenPrice(uint256 _tokenId, uint256 _newPrice) public {
    // require caller of the function is not an empty address
    require(msg.sender != address(0));
    // require that token should exist
    require(_exists(_tokenId));
    // get the token's owner
    address tokenOwner = ownerOf(_tokenId);
    // check that token's owner should be equal to the caller of the function
    require(tokenOwner == msg.sender);
    // get that token from all software developers mapping and create a memory of it defined as (struct => SoftwareDeveloper)
    SoftwareDeveloper memory softwaredeveloper = allSoftwareDevelopers[_tokenId];
    // update token's price with new price
    softwaredeveloper.price = _newPrice;
    // set and update that token in the mapping
    allSoftwareDevelopers[_tokenId] = softwaredeveloper;
  }

  // switch between set for sale and set not for sale
  function toggleForSale(uint256 _tokenId) public {
    // require caller of the function is not an empty address
    require(msg.sender != address(0));
    // require that token should exist
    require(_exists(_tokenId));
    // get the token's owner
    address tokenOwner = ownerOf(_tokenId);
    // check that token's owner should be equal to the caller of the function
    require(tokenOwner == msg.sender);
    // get that token from all software developers mapping and create a memory of it defined as (struct => SoftwareDeveloper)
    SoftwareDeveloper memory softwaredeveloper = allSoftwareDevelopers[_tokenId];
    // if token's forSale is false make it true and vice versa
    if(softwaredeveloper.forSale) {
      softwaredeveloper.forSale = false;
    } else {
      softwaredeveloper.forSale = true;
    }
    // set and update that token in the mapping
    allSoftwareDevelopers[_tokenId] = softwaredeveloper;
  }
}