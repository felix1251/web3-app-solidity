import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import Profile from "./pages/Profile";
// import Login from "./pages/Login";
import { setActiveStep, setIsDownloaded, setNetwork } from "./redux/initializeRedux";
import Lixtagram from "./abis/Lixtagram.json"
import Web3 from "web3";
import { setAddress, setUser } from "./redux/userRedux";
import Modal from "./components/Modal"
import Stepper from "./components/LoginStepperPage/Stepper"
import { useStyle } from './components/LoginLayout/styles';
import { Paper } from '@material-ui/core';

export default function App() {
  const dispatch = useDispatch()
  const classes = useStyle();
  const [modal, setModal] = useState(false)
  const network = useSelector(state => state.initialize.network)
  const activeStep = useSelector(state => state.initialize.activeStep)
  const user = useSelector(state => state.user.currUser)
  const isDownloaded = useSelector(state => state.initialize.isDownloaded)
  const address = useSelector(state => state.user.address)

  useEffect(() => {
    var web3 = null
    const loadWeb3 = async () => {
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        window.web3 = new Web3(window.ethereum)
        web3 = window.web3
        await window.ethereum.request({ method: "eth_requestAccounts" });
        await window.ethereum.on("chainChanged", () => { window.location.reload() });
        await window.ethereum.on("accountsChanged", () => { window.location.reload() });
        dispatch(setIsDownloaded(true))
        loadUser()
      } else {
        dispatch(setIsDownloaded(false))
      }
    }
    const loadUser = async () => {
      try {
        const networkId = await web3.eth.net.getId();
        const networkData = Lixtagram.networks[networkId];
        dispatch(setNetwork(networkData))
        const accs = await web3.eth.getAccounts();
        dispatch(setAddress(accs[0]))
        const lixtagram = new web3.eth.Contract(Lixtagram.abi, networkData.address);
        const userDetails = await lixtagram.methods.getUserDetails(accs[0]).call()
        const currUser = {
          name: userDetails[0],
          tokens: userDetails[1],
          postsCount: userDetails[2],
          redeemTokens: userDetails[3],
          uadd: userDetails[4],
          followerCount: userDetails[5],
          followers: userDetails[6],
        }
        dispatch(setUser(currUser))
        
      } catch (error) {
        console.log(error.message)
      }
    }
    loadWeb3()
  }, [dispatch, network])

  useEffect(() => {
    if (!isDownloaded) {
      setModal(true)
      dispatch(setActiveStep(0))
    } else if (!network) {
      setModal(true)
      dispatch(setActiveStep(1))
    } else if (user?.name === "" || !user ) {
      setModal(true)
      dispatch(setActiveStep(2))
    } else {
      setModal(false)
    }
  }, [isDownloaded, network, user, dispatch, address])

  const content = () => {
    return (
      <Paper className={classes.paper}>
        <Stepper activeStep={activeStep} />
      </Paper>
    )
  }

  return (
    <Router>
      <Modal open={modal} content={content()} />
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}