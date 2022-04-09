import React from 'react'

const NetworkForm = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", fontWeight: "700"}}>
       <div style={{marginTop: "15px"}}>1. Open metemask</div>
       <div style={{margin: "10px"}}>2. Make sure you are logged in</div>
       <div>3. Set Network to Ropsten</div>
    </div>
  )
}

export default NetworkForm