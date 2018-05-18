pragma solidity 0.4.21;

contract Search {
	mapping(uint => uint[]) keywordsToResources;
	mapping(uint => bool) keywordToResourceExists;

	mapping(uint => address) public idToOwner;
	mapping(uint => uint) resourceToId;
	bytes[] public resources;

	event LogResourceRegistered(uint _id, string _address);
	event LogResourceBinded(string _keyword, string _address);

	modifier onlyOwner(uint _resourceId) {
		require(idToOwner[_resourceId] == msg.sender);
		_;
	}

	modifier onlyNewBinding(uint _resourceId, string _keyword) {
		require(!keywordToResourceExists[uint(keccak256(_resourceId, _keyword))]);
		_;
	}

	function register(string _ipfsAddress) external {
	  uint id = resources.length;
	  resources.push(bytes(_ipfsAddress));
	  idToOwner[id] = msg.sender;
	  resourceToId[id];
		emit LogResourceRegistered(id, _ipfsAddress);
	}

	function add(uint _resourceId, string _keyword) external
		onlyOwner(_resourceId)
		onlyNewBinding(_resourceId, _keyword) {
		uint keywordHash = uint(keccak256(_keyword));
		uint[] storage _resources = keywordsToResources[keywordHash];
		keywordToResourceExists[uint(keccak256(_resourceId, _keyword))] = true;
		_resources.push(_resourceId);
	}

	function find(string _keyword) external view returns (uint[]) {
		uint keywordHash = uint(keccak256(_keyword));
		return keywordsToResources[keywordHash];
	}
}
