import React from 'react'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const SignupForm = () => {
  return (
    <form style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <h3>Set your username</h3>
        <TextField id="outlined-basic" label="Username" variant="outlined" />
        <Button style={{marginTop: "10px"}} variant="contained" size="small" color="primary">
          Submit
        </Button>
    </form>
  )
}

export default SignupForm