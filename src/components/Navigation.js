import "../styles/navigation.scss";
import Menu from "./Menu";
import logo from "../images/LixtagramLogo.png";
import { Link } from "react-router-dom";
// import searchIcon from "../images/searchIcon.png";

function Navigation() {
  return (
    <div className="navigation">
      <div className="container">
        <Link to="/">
          <img className="logo" src={logo} alt="instagram logo" />
        </Link>
        {/* <div className="search">
          <img className="searchIcon" src={searchIcon} alt="search icon" />
          <span className="searchText">Search</span>
        </div> */}
        <Menu />
      </div>
    </div>
  );
}

export default Navigation;
