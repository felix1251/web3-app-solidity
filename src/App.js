import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { setIsDownloaded, setNetwork } from "./redux/initializeRedux";
import Lixtagram from "./abis/Lixtagram.json"
import Web3 from "web3";
import { setUser } from "./redux/userRedux";


export default function App() {
  const dispatch = useDispatch()
  const network = useSelector(state => state.initialize.networkData)
  const user = useSelector(state => state.user.currUser)

  useEffect(() => {
    var web3 = null
    const loadWeb3 = async () => {
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        dispatch(setIsDownloaded(true))
        window.web3 = new Web3(window.ethereum)
        web3 = window.web3
        await window.ethereum.on("chainChanged", () => {window.location.reload()});
        await window.ethereum.on("accountsChanged", () => {window.location.reload()});
        await window.ethereum.request({ method: "eth_requestAccounts" });
        loadNetwork()
      } else {
        dispatch(setIsDownloaded(false))
      }
    }
    const loadNetwork = async () => {
      try {
        const networkId = await web3.eth.net.getId();
        const networkData = Lixtagram.networks[networkId];
        dispatch(setNetwork(networkData))
        loadUser()
      } catch (error) {
        console.log(error.message)
      }
    }
    const loadUser = async () => {
      try {
        const lixtagram = new web3.eth.Contract(Lixtagram.abi, network?.address);
        const userDetails = await lixtagram.methods.getUserDetails().call();
        dispatch(setUser(userDetails[0]))
      } catch (error) {
        console.log(error.message)
      }
    }
    loadWeb3()
  }, [dispatch])

  return (
    <Router>
      <Switch>
        {user &&
          <Route exact path="/">
            <Home />
          </Route>
        }
        <Route path="/login">
          <Login />
        </Route>
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}