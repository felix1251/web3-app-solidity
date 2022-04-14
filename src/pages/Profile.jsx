import "../styles/ProfilePage.scss";
import { Gallery } from "../components/Gallery";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { useSelector } from "react-redux";
import Lixtagram from "../abis/Lixtagram.json"
import { Card, makeStyles } from "@material-ui/core";
import "../styles/_variables.scss"
import Profile from "../components/Profile";

const useStyles = makeStyles({
  root: {
    color: "white",
    display: "flex",
    backgroundColor: "#121212",
    flexDirection: "flex-left",
    padding: "20px",
    width: "100%",
  },
  text: {
    margin: "0px 25px",
    display: "flex",
    flexDirection: "column"
  },
  name: {
    fontSize: 20,
    fontWeight: 750,
    marginBottom: 7
  },
  address: {
    fontSize: 13,
    marginBottom: 8
  },
  details : {
    display: "flex",
    flexDirection: "row",
  },
  totalPost: {
    backgroundColor: "red",
    padding: "3px 12px",
    fontSize: 12,
    fontWeight: 600,
    borderRadius: "20px",
    marginRight: 10
  },
  tokens: {
    backgroundColor: "green",
    padding: "3px 12px",
    fontSize: 12,
    fontWeight: 600,
    borderRadius: "20px",
    marginRight: 10
  },
  redeem: {
    backgroundColor: "blue",
    padding: "3px 12px",
    fontSize: 12,
    fontWeight: 600,
    borderRadius: "20px",
    marginRight: 10
  }
});

const ProfilePage = () => {
  const user = useSelector(state => state.user.currUser)
  const [userPost, setUserPost] = useState([])
  const clasess = useStyles()

  useEffect(() => {
    const load = async () => {
      if (user?.name) {
        window.web3 = new Web3(window.ethereum)
        var web3 = window.web3
        const networkId = await web3.eth.net.getId();
        const networkData = Lixtagram.networks[networkId];
        const lixtagram = new web3.eth.Contract(Lixtagram.abi, networkData.address);
        const userPost = await lixtagram.methods.getUserPublicPost(user?.uadd).call()
        setUserPost(userPost)
      }
    }
    load()
  }, [user])

  console.log(user)
  return (
    <div >
      <main>
        <div className="main">
          <div>
            <div className="profile-card">
              <Card className={clasess.root}>
                <Profile
                  className="profile"
                  iconSize="extra-big"
                  currUser={user?.uadd}
                />
                <div className={clasess.text}>
                  <span className={clasess.name}>
                    felix
                  </span>
                  <span className={clasess.address}>
                    {user?.uadd}
                  </span>
                  <div className={clasess.details}>
                    <div className={clasess.totalPost}>
                        {user?.postsCount > 1 ? `${user?.postsCount} Posts` :  `${user?.postsCount} Posts`} 
                    </div>
                    <div className={clasess.tokens}>
                        {user?.tokens} Lixie
                    </div>
                    <div className={clasess.redeem}>
                        {user?.redeemTokens} to redeem
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <Gallery userPost={userPost} />
          </div>
        </div>
      </main>
    </div>
  );
}
export default ProfilePage;