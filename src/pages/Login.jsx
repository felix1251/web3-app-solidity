// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginLayout from '../components/LoginLayout/Layout';
import Stepper from '../components/LoginStepperPage/Stepper'
import { setActiveStep } from '../redux/initializeRedux';

const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const activeStep = useSelector(state => state.initialize.activeStep)
    const network = useSelector(state => state.initialize.networkData)
    const user = useSelector(state => state.user.currUser)
    const isDownloaded = useSelector(state => state.initialize.isDownloaded)

    useEffect(() => {
        if (!isDownloaded) {
            dispatch(setActiveStep(0))
        } else if (!network) {
            dispatch(setActiveStep(1))
        } else if (!user) {
            dispatch(setActiveStep(2))
        }else{
            history.push("/")
        }
      }, [isDownloaded, network, user, dispatch, history])

return (
    <LoginLayout>
        <Stepper activeStep={activeStep} />
    </LoginLayout>
);
}
export default Login;
