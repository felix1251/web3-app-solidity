import "../styles/menu.scss";
import { ReactComponent as Home } from "../images/home.svg";
import { ReactComponent as Notification } from "../images/notification.svg";
import { ReactComponent as Upload } from "../images/upload.svg";
import { ReactComponent as About } from "../images/about.svg";
import ProfileIcon from "./ProfileIcon";
import image from "../images/profile.jpg";

function Menu() {
  return (
    <div className="menu">
      <Home className="icon" />
      <Upload className="icon" />
      <Notification  className="icon"/>
      <About  className="icon"/>
      <ProfileIcon iconSize="small" image={image} />
    </div>
  );
}

export default Menu;
