pragma solidity 0.4.24;

contract Search {

	struct Resource {
		string ipfsAddress;
		address owner;
	}

	mapping(uint => uint[]) private keywordToResources;
	mapping(uint => bool) private keywordToResourceExists;
	mapping(uint => string) public keywords;

	mapping(uint => uint) private resourceToId;
	mapping(uint => uint[]) public resourceToKeywords;
	Resource[] public resources;

	event LogResourceRegistered(uint _id, string _address);
	event LogResourceBinded(string _keyword, string _address);

	modifier onlyOwner(uint _resourceId) {
		require(resources[_resourceId].owner == msg.sender);
		_;
	}

	modifier onlyNewBinding(uint _resourceId, string _keyword) {
		require(!keywordToResourceExists[uint(keccak256(_resourceId, _keyword))]);
		_;
	}

	modifier onlyExistingResource(uint _resourceId) {
		require(resources.length > _resourceId);
		_;
	}

	function register(string _ipfsAddress) external {
	  uint id = resources.length;
	  resources.push(Resource(_ipfsAddress, msg.sender));
	  resourceToId[uint(keccak256(_ipfsAddress))] = id;
		emit LogResourceRegistered(id, _ipfsAddress);
	}

	function add(uint _resourceId, string _keyword) external
		onlyOwner(_resourceId)
		onlyNewBinding(_resourceId, _keyword) {
		uint keywordHash = uint(keccak256(_keyword));

		resourceToKeywords[_resourceId].push(keywordHash);

		uint[] storage _resources = keywordToResources[keywordHash];
		_resources.push(_resourceId);

		keywordToResourceExists[uint(keccak256(_resourceId, _keyword))] = true;

		_addKeyword(_keyword);
	}

	function find(string _keyword) external view returns (uint[]) {
		uint keywordHash = uint(keccak256(_keyword));
		return keywordToResources[keywordHash];
	}

	function _addKeyword(string _keyword) private {
		uint hash = uint(keccak256(_keyword));
		if (bytes(keywords[hash]).length == 0) {
			keywords[hash] = _keyword;
		}
	}

	function keywordsForResource(uint _resourceId) external view returns (uint[]){
		return resourceToKeywords[_resourceId];
	}
}
