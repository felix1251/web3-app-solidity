import { useEffect, useState } from "react";
import "../styles/comment.scss";

function Comment(props) {
  const [name, setName] = useState("")
  const { accountName, comment, lixtagram } = props;

  useEffect(() => {
    const load = async () => {
      const username = await lixtagram.methods.getUsername(accountName).call()
      setName(username)
    }
    load()
  }, [name, accountName, lixtagram])

  return (
    <div className="commentContainer">
      <div className="accountName">{name}</div>
      <div className="comment">{comment}</div>
    </div>
  );
}

export default Comment;
