pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Lixtagram {

    struct Followers {
        address Follower;
        uint time;
    }

    struct User {
        string name;
        string profilePic;
        address uadd;
        uint256 tokens;
        uint256 postsCount;
        uint256 redeemTokens;
        Followers followers;
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
        string hash;
        string description;
        string imgIpfsHash;
        uint256 likes;
        address owner;
        uint timestamp;
        bool isPublic;
        Comments comments;
        Likers likers;
    }

    //User
    mapping(address => bool) public users;
    User[] public peeps;
    //post
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
        string memory imgIpfsHash,
        string memory hash
    ) public payable {
        // allPostCount++;

        if(posts.length == 0){
            allPostCount = 0;
        }

        uint randomId = uint(keccak256(abi.encodePacked(now, msg.sender, block.difficulty)));
        Comments memory commEmpty;
        Likers memory LikersEmpty;
        
        Post memory newPost = Post({
            id: randomId,
            hash: hash,
            description: description,
            imgIpfsHash: imgIpfsHash,
            likes: 0,
            owner: msg.sender,
            timestamp: now,
            isPublic: true,
            comments: commEmpty,
            likers: LikersEmpty
        });

        posts.push(newPost);

        for (uint256 i = 0; i < peeps.length; i++) {
            if (peeps[i].uadd == msg.sender) {
                peeps[i].postsCount++;
                break;
            }
        }
    }

    // function getPostisPublic() public view returns (uint[] memory, string[] memory, string[] memory){
    //   uint[] memory id = new uint[](allPostCount);
    //   string[] memory description = new string[](allPostCount);
    //   string[] memory img = new string[](allPostCount);
    //   for (uint i = 0; i < allPostCount; i++) {
    //       Post storage currpost = posts[i];
    //       id[i] = currpost.id;
    //       description[i] = currpost.description;
    //       img[i] = currpost.imgIpfsHash;
    //   }
    //   return (id, description, img);
    // }

    // function queryuser() public returns(Post[] memory) {
    //     Post memory post;
    //     for (uint256 i = 0; i < posts.length; i++) {
    //         Post storage currPost = posts[i];
    //         if (posts[i].isPublic == true) {
    //             post[i] = currPost;
    //         }
    //     }
    //     return posts;
    // }

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

    function getCurrProfilePost() public view returns (Post[] memory){
        uint postLength = posts.length;
        Post[] memory p = new Post[](postLength);
        for (uint i = 0; i < postLength; i++) {
            Post storage post = posts[i];
            if(posts[i].owner == msg.sender){
                p[i] = post;
            }
        }
        return p;
    }

    function getOtherProfilePost(address ownerAdr) public view returns (Post[] memory){
        uint postLength = posts.length;
        Post[] memory p = new Post[](postLength);
        for (uint i = 0; i < postLength; i++) {
            Post storage post = posts[i];
            if(posts[i].owner == ownerAdr && posts[i].isPublic == true){
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

    
    function signIn(string memory _name) public payable {
        require(!users[msg.sender], "Already a user");
        Followers memory follEmpty;
        users[msg.sender] = true;
        userCount++;
        User memory newUser = User({
            name: _name,
            profilePic: "",
            uadd: msg.sender,
            tokens: 0,
            redeemTokens: 0,
            postsCount: 0,
            followers: follEmpty
        });
        peeps.push(newUser);
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

    function getUserDetails(address addr)
        public
        view
        returns (string memory, uint256, uint256, uint256, address)
    {
        for (uint256 i = 0; i < peeps.length; i++) {
            if (peeps[i].uadd == addr) {
                User storage user = peeps[i];
                return (
                    user.name,
                    user.tokens,
                    user.postsCount,
                    user.redeemTokens,
                    user.uadd
                );
            }
        }
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
