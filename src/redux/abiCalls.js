
import Lixtagram from "../abis/Lixtagram.json"
import Web3 from "web3";
import { setUser } from "./userRedux";
import { setIsNetworkAddress } from "./initializeRedux";

export const getUser = async (dispatch) => {
  try {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      window.web3 = new Web3(window.ethereum);
      const web3 = window.web3;
      const networkId = await web3.eth.net.getId();
      const networkData = Lixtagram.networks[networkId];
      const lixtagram = new web3.eth.Contract(Lixtagram.abi, networkData.address);
      const userDetails = await lixtagram.methods.getUserDetails().call();
      dispatch(setIsNetworkAddress(networkData.address))
      dispatch(setUser(userDetails[0]))
    }
  } catch (err) {
    console.log(err.message)
  }
};
