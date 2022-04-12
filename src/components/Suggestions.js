import { useSelector } from "react-redux";
import "../styles/suggestions.scss";
import Profile from "./Profile";

function Suggestions() {
  const user = useSelector(state => state.user.currUser)
  return (
    <div className="suggestions">
      <div className="titleContainer">
        <div className="title">Suggestions For You</div>
        <a href="/">See All</a>
      </div>
      {user ? <>
        <Profile
          currUser={"hahaha"}
          caption="Followed by mapvault + 3 more"
          urlText="Follow"
          iconSize="medium"
          captionSize="small"/>
        <Profile
          currUser={"normaldude"}
          caption="Followed by dadatlacak + 1 more"
          urlText="Follow"
          iconSize="medium"
          captionSize="small" />
        <Profile
          currUser={"watsup"}
          caption="Follows you"
          urlText="Follow"
          iconSize="medium"
          captionSize="small" />
        <Profile
          currUser={"watsupdude"}
          caption="Followed by dadatlacak + 7 more"
          urlText="Follow"
          iconSize="medium"
          captionSize="small" />
        <Profile
          currUser={"girl"}
          caption="Followed by mapvault + 4 more"
          urlText="Follow"
          iconSize="medium"
          captionSize="small" />
      </>
        :
        <>
          <Profile
            urlText="Follow"
            iconSize="medium"
            captionSize="small" />
          <Profile
            urlText="Follow"
            iconSize="medium"
            captionSize="small" />
          <Profile
            urlText="Follow"
            iconSize="medium"
            captionSize="small" />
          <Profile
            urlText="Follow"
            iconSize="medium"
            captionSize="small" />
            <Profile
            urlText="Follow"
            iconSize="medium"
            captionSize="small" />
        </>

      }

    </div>
  );
}

export default Suggestions;
