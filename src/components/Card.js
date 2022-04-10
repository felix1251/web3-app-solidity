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
    ownerAdr,
    postId,
    lixtagram,
    comments,
    likes,
    ownerName
  } = props;

  const [isLiker, setIsLiker] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const acc = useSelector(state => state.user.currUser);

  useEffect(() => {
    const load = async () => {
      const isFollowed = await lixtagram.methods.isFollower(acc?.uadd, ownerAdr).call()
      const isLiker = await lixtagram.methods.isLiker(acc?.uadd, postId).call();
      setIsFollowed(isFollowed);
      setIsLiker(isLiker);
    }
    load()
  }, [ownerAdr, postId, lixtagram, acc])

  return (
    <div className="card">
      <header>
        <Profile iconSize="medium" username={ownerName} currUser={ownerAdr} setIsFollowed={setIsFollowed} storyBorder={storyBorder} follow={acc?.uadd === ownerAdr ? "You" : `${isFollowed ? "Followed" : "Follow"}`} lixtagram={lixtagram} />
        <CardButton className="cardButton" />
      </header>
      <img className="cardImage" src={image} alt="card content" />
      <CardMenu isLiker={isLiker} setIsLiker={setIsLiker} postId={postId} lixtagram={lixtagram} acc={acc?.uadd} ownerAdr={ownerAdr}/>
      <div className="likedBy">
        <Profile iconSize="small" hideAccountName={true} currUser={likes[0].adr} />
        <span>
          Liked by <strong>{likes[0].adrName}</strong>
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
              accountName={comment.adrName}
              accAdr={comment.adr}
              comment={comment.comment}
            />
          )
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
