import "../styles/profile.scss";
import ProfileIcon from "./ProfileIcon";
import { useSelector } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";

function Profile(props) {
  const {
    username,
    caption,
    urlText,
    iconSize,
    captionSize,
    storyBorder,
    hideAccountName,
    currUser,
    follow,
    lixtagram,
    setIsFollowed
  } = props;
  const user = useSelector(state => state.user.currUser)
  const accountName = username

  const followUser = async(event) => {
    if(follow === "Follow"){
      event.preventDefault()
      await lixtagram.methods.followUser(currUser).send({
        from: user?.uadd,
      });
      setIsFollowed(true)
    }
  }

  return (
    <div className="profile">
      <ProfileIcon
        iconSize={iconSize}
        storyBorder={storyBorder}
        image={username}
        currUser={currUser}
      />
      {(accountName || caption) && !hideAccountName && (
        <div className="textContainer">
          {user?.name
            ? <><span className="accountName">{accountName} {follow && <span className={follow} onClick={followUser}>{follow}</span>}</span> </>
            : <Skeleton animation="wave" height={20} width="80%" style={{ marginBottom: 5, backgroundColor: "#696969" }} />
          }
          {user?.name ? <span className={`caption ${captionSize}`}>{caption}</span> : <Skeleton animation="wave" height={16} width="60%" style={{ backgroundColor: "#696969" }} />}
        </div>
      )}
      {urlText && <a className="urlText" href="/">{urlText}</a>}
    </div>
  );
}

export default Profile;
