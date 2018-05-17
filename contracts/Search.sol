pragma solidity 0.4.21;

contract Search {
	mapping(uint => bytes32[]) keywordsToResources;

	mapping(uint => address) public idToOwner;
	mapping(uint => uint) resourceToId;
	bytes[] public resources;

	event LogResourceRegistered(uint _id, string _address);

	function register(string _ipfsAddress) external {
	  uint id = resources.length;
	  resources.push(bytes(_ipfsAddress));
	  idToOwner[id] = msg.sender;
	  resourceToId[id];
		emit LogResourceRegistered(id, _ipfsAddress);
	}

	function getId(string _ipfsAddress) external view returns (uint) {

	}

	function add(bytes32 _ipfsAddress, string _keyword) external {
		uint256 keywordHash = uint256(keccak256(_keyword));
		bytes32[] storage resources = keywordsToResources[keywordHash];
		resources.push(_ipfsAddress);
	}

	function find(string _keyword) external view returns (bytes32[]) {
		uint256 keywordHash = uint256(keccak256(_keyword));
		return keywordsToResources[keywordHash];
	}
}
