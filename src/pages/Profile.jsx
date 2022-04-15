import "../styles/ProfilePage.scss";
import { Gallery } from "../components/Gallery";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { useSelector } from "react-redux";
import Lixtagram from "../abis/Lixtagram.json"
import { Card, makeStyles, responsiveFontSizes, createTheme, Paper, Tabs, Tab, Typography, Box } from "@material-ui/core";
import "../styles/_variables.scss"
import Profile from "../components/Profile";
import FavoriteIcon from '@material-ui/icons/Favorite';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import ImageIcon from '@material-ui/icons/Image';


function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box>{children}</Box>
    </Typography>
  );
}

let theme = createTheme();
theme = responsiveFontSizes(theme);
const useStyles = makeStyles({
  root: {
    color: "white",
    display: "flex",
    backgroundColor: "#121212",
    flexDirection: "row",
    padding: "20px",
    width: "100%",
    [theme.breakpoints.down(800)]: {
      padding: "15px",
      marginTop: "5px"
    },
    [theme.breakpoints.down(640)]: {
      boxShadow: "none",
    },
  },
  tabPanel: {
    width: "684px",
    [theme.breakpoints.down(800)]: {
      width: "100%",
    },
    [theme.breakpoints.down(640)]: {
      boxShadow: "none",
    },
  },
  tabs: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#121212",
    marginTop: 6,
    [theme.breakpoints.down(640)]: {
      boxShadow: "none",
    },
  },
  icon: {
    color: "white",
  },
  text: {
    margin: "0px 25px",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down(600)]: {
      padding: "0px 15px",
      margin: "0px",
    },
  },
  name: {
    fontSize: 20,
    fontWeight: 750,
  },
  address: {
    fontSize: 13,
    marginTop: 10,
    [theme.breakpoints.down(600)]: {
      fontSize: 10,
      marginTop: 5,
      fontWeight: "bold"
    },
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "column"
  },
  details: {
    display: "flex",
    flexDirection: "row",
    marginTop: "8px"
  },
  totalPost: {
    backgroundColor: "#E41B17",
    padding: "3px 12px",
    fontSize: 12,
    fontWeight: 600,
    borderRadius: "20px",
    marginRight: 10,
    [theme.breakpoints.down(600)]: {
      fontSize: 10,
      marginBottom: 5,
      marginRight: 5,
      padding: "3px 8px",
    },
  },
  followers: {
    backgroundColor: "purple",
    padding: "3px 12px",
    fontSize: 12,
    fontWeight: 600,
    borderRadius: "20px",
    marginRight: 10,
    [theme.breakpoints.down(600)]: {
      fontSize: 10,
      marginBottom: 5,
      marginRight: 5,
      padding: "3px 8px",
    },
  },
  following: {
    backgroundColor: "#6C2DC7",
    padding: "3px 12px",
    fontSize: 12,
    fontWeight: 600,
    borderRadius: "20px",
    marginRight: 10,
    [theme.breakpoints.down(600)]: {
      fontSize: 10,
      marginBottom: 5,
      marginRight: 5,
      padding: "3px 8px",
    },
  },
  tokens: {
    backgroundColor: "#4863A0",
    padding: "3px 12px",
    fontSize: 12,
    fontWeight: 600,
    borderRadius: "20px",
    marginRight: 10,
    [theme.breakpoints.down(600)]: {
      fontSize: 10,
      marginBottom: 5,
      marginRight: 5,
      padding: "3px 8px",
    },
  },
  redeem: {
    backgroundColor: "#347C17",
    padding: "3px 12px",
    fontSize: 12,
    fontWeight: 600,
    borderRadius: "20px",
    marginRight: 10,
    [theme.breakpoints.down(600)]: {
      fontSize: 10,
      marginBottom: 5,
      marginRight: 5,
      padding: "3px 8px",
    },
  }
});

const ProfilePage = () => {
  const user = useSelector(state => state.user.currUser)
  const [userPost, setUserPost] = useState([])
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  return (
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
                {user?.name}
              </span>
              <div className={clasess.detailsContainer}>
                <div className={clasess.details}>
                  <div className={clasess.tokens}>
                    {user?.tokens} Lixie
                  </div>
                  <div className={clasess.redeem}>
                    {user?.redeemTokens} to redeem
                  </div>
                </div>
              </div>
              <span className={clasess.address}>
                {user?.uadd}
              </span>
              <div className={clasess.detailsContainer}>
                <div className={clasess.details}>
                  <div className={clasess.totalPost}>
                    {user?.postsCount > 1 ? `${user?.postsCount} Posts` : `${user?.postsCount} Posts`}
                  </div>
                  <div className={clasess.followers}>
                    {user?.followerCount} Followers
                  </div>
                  <div className={clasess.following}>
                    5 Following
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <Paper square className={clasess.tabs}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="primary"
            aria-label="icon tabs example"
          >
            <Tab className={clasess.tab} icon={<ImageIcon className={clasess.icon} />} aria-label="post"  {...a11yProps(0)} />
            <Tab className={clasess.tab} icon={<FavoriteIcon className={clasess.icon} />} aria-label="favorite"  {...a11yProps(1)} />
            <Tab className={clasess.tab} icon={<SupervisedUserCircleIcon className={clasess.icon} />} aria-label="person"  {...a11yProps(2)} />
          </Tabs>
        </Paper>
        <TabPanel value={value} index={0} className={clasess.tabPanel}>
          <Gallery userPost={userPost} />
        </TabPanel>
        <TabPanel value={value} index={1} className={clasess.tabPanel}>
        </TabPanel>
        <TabPanel value={value} index={2} className={clasess.tabPanel}>
        </TabPanel>
      </div>
    </div>

  );
}
export default ProfilePage;