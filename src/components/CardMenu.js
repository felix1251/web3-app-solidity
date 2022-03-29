import "../styles/cardMenu.scss";
import { ReactComponent as Inbox } from "../images/inbox.svg";
import { ReactComponent as Comments } from "../images/comments.svg";
import { ReactComponent as Unlike } from "../images/heartUnlike.svg";
import { ReactComponent as Like } from "../images/heartLike.svg";
import { ReactComponent as Bookmark } from "../images/bookmark.svg";

function CardMenu() {
  const like = true;
  return (
    <div className="cardMenu">
      <div className="interactions">
        {like ? <Like className="icon" /> : <Unlike className="icon" />}
        <Comments className="icon" />
        <Inbox className="icon" />
      </div>
      <Bookmark className="icon" />
    </div>
  );
}

export default CardMenu;
