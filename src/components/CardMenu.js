import "../styles/cardMenu.scss";
import { ReactComponent as Inbox } from "../images/inbox.svg";
import { ReactComponent as Comments } from "../images/comments.svg";
import { ReactComponent as Unlike } from "../images/heartUnlike.svg";
import { ReactComponent as Like } from "../images/heartLike.svg";
import { ReactComponent as Bookmark } from "../images/bookmark.svg";

function CardMenu(props) {
  const { isLiker, postId, lixtagram, acc, setIsLiker } = props;

  const likeThisPost = async (event) => {
    event.preventDefault()
    await lixtagram.methods.likePost(postId).send({
      from: acc,
    });
    setIsLiker(true)
  }

  return (
    <div className="cardMenu">
      <div className="interactions">
        {isLiker ? <Like className="icon" /> : <Unlike className="icon" onClick={likeThisPost} />}
        <Comments className="icon" />
        <Inbox className="icon" />
      </div>
      <Bookmark className="icon" />
    </div>
  );
}

export default CardMenu;
