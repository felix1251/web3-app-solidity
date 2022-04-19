import "../styles/card.scss";
import Profile from "./Profile";
import { ReactComponent as CardButton } from "../images/cardButton.svg";
import CardMenu from "./CardMenu";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: 'none',
      display: 'flex',
      alignItems: 'center',
      width: "100%",
    },
    input: {
      color: "white",
      flex: 1,
      fontSize: 13,
    },
    iconButton: {
      padding: 10,
      color: "white"
    },
  }),
);

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

  const classes = useStyles();
  const [isLiker, setIsLiker] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const acc = useSelector(state => state.user.currUser);
  const [comment, setComment] = useState("");
  const [comms, setComms] = useState([])

  useEffect(() => {
    const load = async () => {
      setComms(comments)
      const isFollowed = await lixtagram.methods.isFollower(acc?.uadd, ownerAdr).call()
      const isLiker = await lixtagram.methods.isLiker(acc?.uadd, postId).call();
      setIsFollowed(isFollowed);
      setIsLiker(isLiker);
    }
    load()
  }, [ownerAdr, postId, lixtagram, acc, comments])

  const addComment = async (event) => {
    event.preventDefault()
    if (comment.length !== 0) {
      await lixtagram.methods.addComment(postId, comment).send({ from: acc?.uadd });
      setComment("")
    } else {
      alert("Enter a comment first!")
    }
  }

  const inputChanged = (value) => {
    setComment(value)
  }

  return (
    <div className="card">
      <header>
        <Profile iconSize="medium" username={ownerName} currUser={ownerAdr} setIsFollowed={setIsFollowed} storyBorder={storyBorder} follow={acc?.uadd === ownerAdr ? "You" : `${isFollowed ? "Followed" : "Follow"}`} lixtagram={lixtagram} />
        <CardButton className="cardButton" />
      </header>
      <img className="cardImage" src={image} alt="card content" />
      <CardMenu isLiker={isLiker} setIsLiker={setIsLiker} postId={postId} lixtagram={lixtagram} acc={acc?.uadd} ownerAdr={ownerAdr} />
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
        {comms.map((comment, key) => {
          return (
            <Comment
              key={key}
              accountName={comment.adrName}
              accAdr={comment.adr}
              comment={comment.comment}
            />
          )
        })}
      </div>
      <div className="timePosted">{` Posted ${moment.unix(time).fromNow()}`}</div>
      <div className="addComment">
        <form className={classes.root} onSubmit={e => addComment(e)}>
          <InputBase
            value={comment}
            className={classes.input}
            placeholder="Add comment..."
            onChange={e => {inputChanged(e.target.value)}}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="send">
            <SendIcon />
          </IconButton>
        </form>
      </div>
    </div>
  );
}

export default Card;
