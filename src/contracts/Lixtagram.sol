pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

contract Lixtagram {

    struct Followers {
        address follower;
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
        string comment;
        uint time;
    }

    struct Likers {
        address adr;
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

    //User
    mapping(address => bool) public users;
    mapping(address => Followers[]) public followers;
    mapping(uint => Likers[]) public likers;
    mapping(uint => Comments[]) public comments;
    mapping(address => uint[]) public userPostPublicIndex;
    mapping(address => uint[]) public userPostPrivateIndex;
    mapping(address => uint[]) public userAllPost;
    mapping(address => string) public username;

    User[] public peeps;
    Post[] public posts;
   
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
        if(posts.length == 0){
            allPostCount = 0;
        }
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
        likers[randomId].push(Likers(msg.sender, now));
        comments[randomId].push(Comments(msg.sender, description ,now));
        userPostPublicIndex[msg.sender].push(allPostCount);
        userAllPost[msg.sender].push(allPostCount);

        for (uint256 i = 0; i < peeps.length; i++) {
            if (peeps[i].uadd == msg.sender) {
                peeps[i].postsCount++;
                break;
            }
        }
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

    function followUser(address adr) public {
        address author = followers[adr][0].follower;
        uint len = followers[adr].length;
        require(msg.sender !=  adr, "you can't folow your own account");
        for(uint i = 0; i < len; i++){
            if(msg.sender == followers[adr][i].follower){
                require(msg.sender !=  followers[adr][i].follower, "You already follow the user!");
                break;
            }
        }
        followers[adr].push(Followers(msg.sender, now));
        for (uint256 i = 0; i < peeps.length; i++) {
            if (peeps[i].uadd == author) {
                peeps[i].tokens += 1;
                peeps[i].redeemTokens += 1;
                break;
            }
        }
    }

    function likePost(uint _id) public {
        address author = likers[_id][0].adr;
        require(msg.sender != author, "You own this post!");
        uint len = likers[_id].length;
        for(uint i = 0; i < len; i++){
            if(msg.sender == likers[_id][i].adr){
                require(msg.sender !=  likers[_id][i].adr, "You already like this post!");
                break;
            }
        }
        likers[_id].push(Likers(msg.sender, now));
        for (uint256 i = 0; i < peeps.length; i++) {
            if (peeps[i].uadd == author) {
                peeps[i].tokens += 1;
                peeps[i].redeemTokens += 1;
                break;
            }
        }
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

    function getComments(uint _id) public view returns (Comments[] memory){
      uint len  = comments[_id].length;
      Comments[] memory c = new Comments[](len);
      for(uint i =0 ; i < len; i++){
           c[i] = comments[_id][i];           
      }
      return c;
    }

    function getLikes(uint _id) public view returns (Likers[] memory){
      uint len  = likers[_id].length;
      Likers[] memory l = new Likers[](len);
      for(uint i =0 ; i < len; i++){
           l[i] = likers[_id][i];           
      }
      return l;
    }

    function getFollowers(address adr) public view returns (Followers[] memory){
      uint len  = followers[adr].length;
      Followers[] memory f = new Followers[](len);
      for(uint i =0 ; i < len; i++){
           f[i] = followers[adr][i];           
      }
      return f;
    }

    function getUsername(address adr) public view returns (string memory){
        return username[adr];
    }

    function getNumberOffollowwers(address adr) public view returns (uint){
        return followers[adr].length;
    }

    function getPostIsPublic() public view returns (Post[] memory){
        uint postLength = posts.length;
        Post[] memory p = new Post[](postLength);
        for (uint i = 0; i < postLength; i++) {
            Post storage post = posts[i];
            if(posts[i].isPublic == true){
                p[i] = post;
            }
        }
        return p;
    }


    function getPostsCount() public view returns (uint256) {
        return posts.length;
    }

    // function likePost(uint256 index, string memory currAdd) public {
    //     Post storage currPost = posts[index];
    //     require(
    //         !currPost.likedBy[msg.sender],
    //         "You have already liked this post!"
    //     );
    //     require(msg.sender != currPost.owner, "You cannot like your own post!");
       
    //     string memory curr = string(
    //         abi.encodePacked(currPost.likerList, currAdd, "/")
    //     );
    //     currPost.likerList = curr;
    //     currPost.likedBy[msg.sender] = true;
    //     currPost.likes++;

    //     address author = currPost.owner;
    //     for (uint256 i = 0; i < peeps.length; i++) {
    //         if (peeps[i].uadd == author) {
    //             peeps[i].tokens += 1;
    //             peeps[i].redeemTokens += 1;
    //             break;
    //         }
    //     }
    // }

    // function isLiker(uint256 index, address likerAdress) public view returns (bool){  
    //   return posts[index].likedBy[likerAdress];
    // }

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
        followers[msg.sender].push(Followers(msg.sender, now));
    }

    function isUser(address user) public view returns (bool) {
        return users[user];
    }

    // function postComment(uint256 index, string memory comm) public {
    //     Post storage currPost = posts[index];
    //     string memory curr = string(
    //         abi.encodePacked(currPost.comments, comm, "/")
    //     );
    //     currPost.comments = curr;
    // }

    // function getPostDetails(string memory postHash)
    //     public
    //     view
    //     returns (uint, string memory, string memory,string memory, uint, address, uint, string memory, string memory, bool)
    // {
    //     for (uint256 i = 0; i < posts.length; i++) {
    //         if ( keccak256(abi.encodePacked((posts[i].hash))) == keccak256(abi.encodePacked((postHash)))) {
    //             Post storage post = posts[i];
    //             return (
    //                 post.id,
    //                 post.hash,
    //                 post.description,
    //                 post.imgIpfsHash,
    //                 post.likes,
    //                 post.owner,
    //                 post.timestamp,
    //                 post.likerList,
    //                 post.comments,
    //                 post.isPublic
    //             );
    //         }
    //     }
    // }

    // function getUserDetails(address adr)public view returns (User[] memory){
    //     User[] memory u = new User[](peeps.length);
    //     for (uint256 i = 0; i < peeps.length; i++) {
    //         User storage user = peeps[i];
    //         if ( peeps[i].uadd == adr) {
    //             u[i] = user;
    //             break;
    //         }
    //     }
    //     return u;
    // }

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

    function redeemNTokens(uint256 ntokens, uint256 value) public {
        address(uint256(msg.sender)).transfer(value);
        for (uint256 i = 0; i < peeps.length; i++) {
            if (peeps[i].uadd == msg.sender) {
                peeps[i].redeemTokens -= ntokens;
                break;
            }
        }
    }

    function setChatHash(string memory chash) public {
        chatHash = chash;
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
    
}
