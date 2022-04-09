import "../styles/menu.scss";
import { ReactComponent as Home } from "../images/home.svg";
import { ReactComponent as Notification } from "../images/notification.svg";
import { ReactComponent as Upload } from "../images/upload.svg";
import { ReactComponent as About } from "../images/about.svg";
import Modal from "./Modal"
import ProfileIcon from "./ProfileIcon";
import image from "../images/profile.jpg";
import UploadPhoto from "./Upload";
import { useSelector } from "react-redux";
import { useState } from "react";

function Menu() {
  const user = useSelector(state => state.user.currUser)
  const [open, setOpen] = useState(false)

  const onOpen = () => {
    setOpen(true)
  }
  const content = () => {
    return (
     <UploadPhoto/>
    )
  }
  return (
    <div className="menu">
      <Modal open={open} content={content()} setOpen={setOpen}/>
      <Home className="icon" />
      <Upload className="icon" onClick={onOpen}/>
      <Notification className="icon" />
      <About className="icon" />
      <ProfileIcon iconSize="small" image={image} currUser={user?.uadd}/>
    </div>
  );
}

export default Menu;
