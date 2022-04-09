import Skeleton  from "@material-ui/lab/Skeleton";
import { useSelector } from "react-redux";
import "../styles/profileIcon.scss";

function ProfileIcon(props) {
  const { iconSize, storyBorder, image, currUser } = props;
  const user = useSelector(state => state.user.currUser)
  const style = () =>{
    var style = null
    if(iconSize === "small"){
      style = {
        width:" 25px",
        height: "25px",
        backgroundColor: "#696969"
      }
      return style
    }else if(iconSize === "medium"){
      style = {
        width: "35px",
        height: "35px",
        backgroundColor: "#696969"
      }
      return style
    }else if(iconSize === "big"){
      style = {
        width: "60px",
        height: "60px",
        backgroundColor: "#696969"
      }
      return style
    }
  }

  const use = style()
  
  let profileImage = `https://avatars.dicebear.com/api/adventurer-neutral/${image}.svg`;
  let currUserImage = `https://avatars.dicebear.com/api/adventurer-neutral/${currUser}.svg`;
 
  return (
    <div className={storyBorder ? "storyBorder" : ""}>
      {user?.name
        ?
        <img
          className={`profileIcon ${iconSize}`}
          src={currUser ? currUserImage :profileImage }
          alt="profile"
        />
        :
        <Skeleton animation="wave" variant="circle" style={use}/>
      }

    </div>
  );
}

export default ProfileIcon;
