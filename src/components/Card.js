import "../styles/card.scss";
import Profile from "./Profile";
import { ReactComponent as CardButton } from "../images/cardButton.svg";
import CardMenu from "./CardMenu";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";

function Card(props) {
  const {
    storyBorder,
    image,
    time,
    accountName,
    postId,
    lixtagram
  } = props;

  const [comments, setComments] = useState([])
  const [name, setName] = useState("")
  const [isLiker, setIsLiker] = useState(false)
  const [isFollowed, setIsFollowed] = useState(false)
  const [likerName, setLikername] = useState("")
  const [likes, setLikes] = useState([])
  const acc = useSelector(state => state.user.currUser)

  useEffect(() => {
    const load = async () => {
      const com = await lixtagram.methods.getComments(postId).call()
      const like = await lixtagram.methods.getLikes(postId).call()
      const name = await lixtagram.methods.getUsername(accountName).call()
      const likername = await lixtagram.methods.getUsername(like[0].adr).call()
      const isLiker = await lixtagram.methods.isLiker(acc?.uadd, postId).call()
      const isFollowed = await lixtagram.methods.isFollower(acc?.uadd, accountName).call()
      setIsFollowed(isFollowed)
      setIsLiker(isLiker)
      setName(name)
      setLikername(likername)
      setComments(com)
      setLikes(like)
    }
    load()
  }, [accountName, postId, lixtagram, acc])

  return (
    <div className="card">
      <header>
        <Profile iconSize="medium" username={name} currUser={accountName} setIsFollowed={setIsFollowed} storyBorder={storyBorder} follow={isFollowed ? "Followed" : "Follow"} lixtagram={lixtagram}/>
        <CardButton className="cardButton" />
      </header>
      <img className="cardImage" src={image} alt="card content" />
      <CardMenu isLiker={isLiker} setIsLiker={setIsLiker} postId={postId} lixtagram={lixtagram} acc={acc?.uadd}/>
      <div className="likedBy">
        <Profile iconSize="small" hideAccountName={true} currUser={likes[0]?.adr} />
        <span>
          Liked by <strong>{likerName}</strong>
          {likes.length > 1 &&
            <>
              {" "}and{" "}
              <strong>{likes.length - 1} others</strong>
            </>
          }
        </span>
      </div>
      <div className="comments">
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.time}
              accountName={comment.adr}
              comment={comment.comment}
              lixtagram={lixtagram}
            />
          );
        })}
      </div>
      <div className="timePosted">{` Posted ${moment.unix(time).fromNow()}`}</div>
      <div className="addComment">
        <div className="commentText">Add a comment...</div>
        <div className="postText">Post</div>
      </div>
    </div>
  );
}

export default Card;
