import { Button } from '@material-ui/core'
import React from 'react'
import { ReactComponent as Metamask } from "../../../images/metamaskLogo.svg";

const DownloadForm = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",marginTop: "5px" }}>
      <span style={{fontWeight: "700", margin: "10px"}}>Desktop Browser Extension</span>
      <Button variant='contained' color="primary" size="large">
        <Metamask style={{width: "35", height: "35", marginRight: "10px"}}/> Download MetaMask
      </Button>
      <span style={{fontWeight: "700", margin: "10px"}}>Mobile App (Android, IOS)</span>
      <Button variant='contained'  color="secondary" size="large">
        <Metamask style={{width: "35", height: "35", marginRight: "10px"}}/> Download MetaMask
      </Button>
    </div>
  )
}

export default DownloadForm