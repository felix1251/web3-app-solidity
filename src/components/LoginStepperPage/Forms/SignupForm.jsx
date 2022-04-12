import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Web3 from "web3";
import Lixtagram from "../../../abis/Lixtagram.json"
import { setUser } from '../../../redux/userRedux';


const SignupForm = () => {
  const address = useSelector(state => state.user.address)
  const [name, setName] = useState("")
  const dispatch = useDispatch()

  const signIn = async (event) => {
    event.preventDefault();
    window.web3 = new Web3(window.ethereum)
    var web3 = window.web3
    const accs = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const networkData = Lixtagram.networks[networkId];
    const lixtagram = new web3.eth.Contract(Lixtagram.abi, networkData.address);
    try {
      await lixtagram.methods.signUp(name).send({
        from: accs[0],
        value: web3.utils.toWei("0.001", "ether"),
      });
      const userDetails = await lixtagram.methods.getUserDetails(accs[0]).call();
      const currUser = {
        name: userDetails[0],
        tokens: userDetails[1],
        postsCount: userDetails[2],
        redeemTokens: userDetails[3],
        uadd: userDetails[4]
      }
      dispatch(setUser(currUser))
    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <>
      {address ?
        <form style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <h3>Set your username</h3>
          <TextField id="outlined-basic" label="Username" variant="outlined" onChange={e => setName(e.target.value)} />
          <Button style={{ marginTop: "10px" }} variant="contained" size="small" color="primary" onClick={signIn}>
            Submit
          </Button>
        </form>
        :
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px" }}> Open metemask and login...</div>
      }
    </>

  )
}

export default SignupForm