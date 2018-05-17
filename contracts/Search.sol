pragma solidity 0.4.24;

contract Search {
	mapping(uint256 => bytes32[]) keywordsToResources;
	
	mapping(uint256 => address) public resourceToOwner;
	mapping(uint256 => uint256) public resourceToId;
	bytes[] public resources;
	
	function register(string _ipfsAddress) external {
	   // uint256 id = resurces.length;
	   
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
