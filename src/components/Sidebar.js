import "../styles/sidebar.scss";
import Sticky from "react-sticky-el";
import Profile from "./Profile";
import Suggestions from "./Suggestions";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import Web3 from "web3";
import Lixtagram from "../abis/Lixtagram.json"
import { setFollowerCount } from "../redux/userRedux";

function Sidebar() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.currUser)
  const followerCount = useSelector(state => state.user.followerCount)

  useEffect(() => {
    const load = async() => {
      if(user){
        window.web3 = new Web3(window.ethereum)
        var web3 = window.web3
        const networkId = await web3.eth.net.getId();
        const networkData = Lixtagram.networks[networkId];
        const lixtagram = new web3.eth.Contract(Lixtagram.abi, networkData.address);
        const folCount = await lixtagram.methods.getNumberOffollowwers(user?.uadd).call();
        dispatch(setFollowerCount(folCount-1))
      }
    }
    load()
  }, [user, dispatch])
  
  return (
    <Sticky topOffset={-80}>
      <div className="sidebar">
        <Profile
          username={user?.name}
          // caption={followerCount <= 0 ? `No followers yet`: `Followed by ${followerCount <= 1 ? `${followerCount} person` : `${followerCount} people`}`}
          follow={`You have ${followerCount <= 1 ? `${followerCount <= 0 ? 0 : followerCount} follower`: `${followerCount <= 0 ? 0 : followerCount} followers` }`}
          urlText="My Profile"
          iconSize="big"
          currUser={user?.uadd}
        />
        <Suggestions />
        <Footer />
      </div>
    </Sticky>
  );
}

export default Sidebar;
