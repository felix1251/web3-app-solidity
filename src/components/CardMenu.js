import "../styles/cardMenu.scss";
import { ReactComponent as Inbox } from "../images/inbox.svg";
import { ReactComponent as Comments } from "../images/comments.svg";
import { ReactComponent as Unlike } from "../images/heartUnlike.svg";
import { ReactComponent as Like } from "../images/heartLike.svg";
import { ReactComponent as Bookmark } from "../images/bookmark.svg";
import { ReactComponent as Lock } from "../images/likeLock.svg";
import Web3 from "web3";

function CardMenu(props) {
  window.web3 = new Web3(window.ethereum)
  var web3 = window.web3
  const { isLiker, postId, lixtagram, acc, setIsLiker, ownerAdr } = props;

  const likeThisPost = async (event) => {
    event.preventDefault()
    await lixtagram.methods.likePost(postId).send({
      from: acc,
      value: web3.utils.toWei("0.002", "ether"),
    });
    setIsLiker(true)
  }

  return (
    <div className="cardMenu">
      <div className="interactions">
        {ownerAdr === acc ? <Lock className="icon" />  :<>{isLiker ? <Like className="icon" /> : <Unlike className="icon" onClick={likeThisPost} />}</>} 
        <Comments className="icon" />
        <Inbox className="icon" />
      </div>
      <Bookmark className="icon" />
    </div>
  );
}

export default CardMenu;
