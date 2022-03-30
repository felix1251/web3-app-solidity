import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LoginLayout from '../components/LoginLayout/Layout';
import Stepper from '../components/LoginStepperPage/Stepper'
// import CheckoutPage from './components/CheckoutPage';

function Login() {
    const history = useHistory()
    const [activeStep, setActiveStep] = useState(0)
    const isDownloaded = useSelector(state => state.initialize.isDownloaded)
    const network = useSelector(state => state.initialize.networkData)
    const user = useSelector(state => state.user.currUser)
    
    useEffect(() => {
      const step = () => {
        if(!isDownloaded){
            setActiveStep(0)
        }else if(!network){
            setActiveStep(1)
        }else if(!user){
            setActiveStep(2)
        }else(
            history.push("/")
        )
      }
      step()
    }, [isDownloaded, network, user, history])

    return (
        <LoginLayout>
            <Stepper activeStep={activeStep}/>
        </LoginLayout>
    );
}
export default Login;
