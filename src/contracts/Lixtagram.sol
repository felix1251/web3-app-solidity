pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

contract Lixtagram {

    struct Followers {
        address follower;
        string name;
        uint time;
    }

    struct Followings {
        address followed;
        string name;
        uint time;
    }

    struct User {
        string name;
        string profilePic;
        address uadd;
        uint256 tokens;
        uint256 postsCount;
        uint256 redeemTokens;
    }

    struct Comments {
        address adr;
        string adrName;
        string comment;
        uint time;
    }

    struct Likers {
        address adr;
        string adrName;
        uint time;
    }

    struct Post {
        uint id;
        string imgIpfsHash;
        uint256 likes;
        address owner;
        uint timestamp;
        bool isPublic;
    }

    struct ViewPost {
        uint id;
        string ownerName;
        string imgIpfsHash;
        uint256 likes;
        address owner;
        uint timestamp;
        bool isPublic;
        Comments[] comments;
        Likers[] likers;
    }
    //Mappings
    mapping(address => bool) private users;
    mapping(address => Followers[]) private followers;
    mapping(address => Followings[]) private followings;
    mapping(uint => Likers[]) private likers;
    mapping(uint => Comments[]) private comments;
    mapping(address => uint[]) private userPostPublicIndex;
    mapping(address => uint[]) private userPostPrivateIndex;
    mapping(address => uint[]) private userAllPost;
    mapping(address => string) private username;
    mapping(string => bool) private ipfsHash;

    User[] private peeps;
    Post[] private posts;
   
    //constructor 
    string public name;
    address public manager;
    uint256 public userCount;
    uint public allPostCount;

    //Community chat
    string public chatHash;

    constructor() public {
        name = "Lixtagram";
        manager = msg.sender;
        userCount = 0;
        allPostCount = 0;
    }

    function createPost(
        string memory description,
        string memory imgIpfsHash
    ) public payable {
        allPostCount++;
        if(posts.length == 0){
            allPostCount = 0;
        }
        require(ipfsHash[imgIpfsHash] != true, "this image already exist on the network or somebody own this");
        uint randomId = uint(keccak256(abi.encodePacked(now, msg.sender, block.difficulty)));
        Post memory newPost = Post({
            id: randomId,
            imgIpfsHash: imgIpfsHash,
            likes: 0,
            owner: msg.sender,
            timestamp: now,
            isPublic: true
        });
        posts.push(newPost);
        ipfsHash[imgIpfsHash] = true;
        likers[randomId].push(Likers(msg.sender, getUsername(msg.sender)  ,now));
        comments[randomId].push(Comments(msg.sender, getUsername(msg.sender) ,description ,now));
        userPostPublicIndex[msg.sender].push(allPostCount);
        userAllPost[msg.sender].push(allPostCount);
        for (uint256 i = 0; i < peeps.length; i++) {
            if (peeps[i].uadd == msg.sender) {
                peeps[i].postsCount++;
                break;
            }
        }
    }

    function checkIfImageExist(string memory _ipfsHash) public view returns(bool){
        return ipfsHash[_ipfsHash];
    }

    function signUp(string memory _name) public payable {
        require(!users[msg.sender], "Already a user");
        users[msg.sender] = true;
        username[msg.sender] = _name;
        userCount++;
        User memory newUser = User({
            name: _name,
            profilePic: "",
            uadd: msg.sender,
            tokens: 0,
            redeemTokens: 0,
            postsCount: 0
        });
        peeps.push(newUser);
        followers[msg.sender].push(Followers(msg.sender, getUsername(msg.sender) ,now));
    }

    function followUser(address adr) public payable{
        address author = followers[adr][0].follower;
        uint len = followers[adr].length;
        require(msg.sender !=  author || msg.sender !=  adr, "you can't folow your own account");
        for(uint i = 0; i < len; i++){
            if(msg.sender == followers[adr][i].follower){
                require(msg.sender !=  followers[adr][i].follower, "You already follow the user!");
                break;
            }
        }
        followers[adr].push(Followers(msg.sender, getUsername(adr), now));
        followings[msg.sender].push(Followings(adr, getUsername(msg.sender) ,now));
        for (uint256 i = 0; i < peeps.length; i++) {
            if (peeps[i].uadd == author) {
                peeps[i].tokens += 1;
                peeps[i].redeemTokens += 1;
                break;
            }
        }
    }

    function likePost(uint _id) public payable{
        address author = likers[_id][0].adr;
        require(msg.sender != author, "You own this post!");
        uint len = likers[_id].length;
        for(uint i = 0; i < len; i++){
            if(msg.sender == likers[_id][i].adr){
                require(msg.sender !=  likers[_id][i].adr, "You already like this post!");
                break;
            }
        }
        likers[_id].push(Likers(msg.sender, getUsername(msg.sender) ,now));
        for (uint256 i = 0; i < peeps.length; i++) {
            if (peeps[i].uadd == author) {
                peeps[i].tokens += 1;
                peeps[i].redeemTokens += 1;
                break;
            }
        }
    }

    function addComment(uint _id, string memory comment) public {
        comments[_id].push(Comments(msg.sender, getUsername(msg.sender), comment, now));
    }

    function getViewPost() public view returns (ViewPost[] memory){
        uint postLength = posts.length;
        ViewPost[] memory v = new ViewPost[](postLength);
        for (uint i = 0; i < postLength; i++) {
            Post storage post = posts[i];
            if(posts[i].isPublic == true){
                v[i].id = post.id;
                v[i].ownerName = getUsername(post.owner);
                v[i].imgIpfsHash = post.imgIpfsHash;
                v[i].likes = post.likes;
                v[i].owner = post.owner;
                v[i].timestamp = post.timestamp;
                v[i].isPublic = post.isPublic;
                v[i].comments = getComments(post.id);
                v[i].likers = getLikes(post.id);
            }
        }
        return v;
    }


    function getUserPublicPost(address adr) public view returns (Post[] memory){
        uint len = userPostPublicIndex[adr].length;
        uint index;
        Post[] memory p = new Post[](len);
        for(uint i = 0; i < len; i++){
            index = userPostPublicIndex[adr][i];
            Post storage post = posts[index];
            p[i] = post;
        }
        return p;
    }

    function getUserPrivatePost(address adr) public view returns (Post[] memory){
        uint len = userPostPrivateIndex[adr].length;
        uint index;
        Post[] memory p = new Post[](len);
        for(uint i = 0; i < len; i++){
            index = userPostPrivateIndex[adr][i];
            Post storage post = posts[index];
            p[i] = post;
        }
        return p;
    }

    function getComments(uint _id) private view returns (Comments[] memory){
      uint len  = comments[_id].length;
      Comments[] memory c;
      c = comments[_id];
      return c;
    }
     
    function getLikes(uint _id) private view returns (Likers[] memory){
      Likers[] memory l;
      l = likers[_id];
      return l;
    }

    function getFollowers(address adr) public view returns (Followers[] memory){
      Followers[] memory f;
      f = followers[adr];
      return f;
    }

    function getUsername(address adr) private view returns (string memory){
        return username[adr];
    }

    function getNumberOffollowwers(address adr) public view returns (uint){
        return followers[adr].length;
    }

    function getPostsCount() public view returns (uint256) {
        return posts.length;
    }

    // function deletePost(uint256 index) public {
    //     Post storage currPost = posts[index];
    //     require(currPost.owner == msg.sender, "You are not the owner of the post!");
    //     currPost.isPublic = false;
    // }

    function deletePost(uint id) public {
        for(uint i = 0; i < posts.length; i++ ){
            if(posts[id].id == id){
                require(posts[i].owner == msg.sender, "Only the owner can delete this post" ); 
                delete posts[i];
                break;
            }
        }
        for (uint256 i = 0; i < peeps.length; i++) {
            if (peeps[i].uadd == msg.sender) {
                peeps[i].postsCount--;
                break;
            }
        }
    }
    

     function getFollowedAndFollowersCount(address adr) public view returns (uint, uint) {
        uint len = followers[adr].length;
        uint len2 =  followings[adr].length;
        return(len, len2);
    }

    function getFollowedAndFollowers(address adr) public view returns (Followers[] memory, Followings[] memory) {
        Followers[] memory f;
        Followings[] memory fw;
        f = followers[adr];
        fw = followings[adr];
        return(f, fw);
    }

    function getUserDetails(address adr)
        public
        view
        returns (string memory, uint256, uint256, uint256, address)
    {
        string memory n;
        uint tokens;
        uint postsCount;
        uint redeemTokens;
        address uadd;
        for (uint256 i = 0; i < peeps.length; i++) {
            if (peeps[i].uadd == adr) {
                User storage user = peeps[i];
                n = user.name;
                tokens = user.tokens;
                postsCount = user.postsCount;
                redeemTokens = user.redeemTokens;
                uadd = user.uadd;
                break;
            }
        }
        return (n, tokens, postsCount, redeemTokens, uadd);
    }
 
    function redeemNTokens(uint256 ntokens, uint256 valueWie) public {
        uint oneIsEqualToWie = 1000000000000000;
        uint valueInWie = oneIsEqualToWie*ntokens;
        require(ntokens >= 20 || ntokens != 0 || valueInWie == valueWie, "input value is not allowed, only equal or greater than 20 is allowed and input must not zero" ); 
        for (uint256 i = 0; i < peeps.length; i++) {
            if (peeps[i].uadd == msg.sender) {
                require(peeps[i].redeemTokens >= 20 || peeps[i].redeemTokens > ntokens, "Didn't reach redeem requirements or validation failed" ); 
                address(uint256(msg.sender)).transfer(valueWie);
                peeps[i].redeemTokens -= ntokens;
                break;
            }
        }
    }


    function isUser(address user) private view returns (bool) {
        return users[user];
    }


    function isLiker(address user, uint _id) public view returns(bool){
        bool f;
        for(uint i = 0; i < likers[_id].length; i++){
            if(user == likers[_id][i].adr){
                f = true;
                break;
            }
        }
        return f;
    }

    function isFollower(address user, address owner) public view returns(bool){
        bool f;
        for(uint i = 0; i < followers[owner].length; i++){
            if(user == followers[owner][i].follower){
                f = true;
                break;
            }
        }
        return f;
    }


    function setChatHash(string memory chash) public {
        chatHash = chash;
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }
    
}
