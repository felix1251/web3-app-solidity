import React, { useEffect, useState } from "react";
import {
    Stepper,
    Step,
    StepLabel,
} from "@material-ui/core";
import { Formik} from "formik";

import Download from "./Forms/DownloadForm";
import Signup from "./Forms/SignupForm";
import Network from "./Forms/NetworkForm";
import useStyles from "./styles";
const steps = ["MetaMask", "Network", "Signup"];

function renderStepContent(step) {
    switch (step) {
        case 0:
            return <Download />;
        case 1:
            return <Network />;
        case 2:
            return <Signup />;
        default:
            return <div>Not Found</div>;
    }
}

export default function StepperForm(props) {
    const {activeStep} = props
    const classes = useStyles();
    return (
        <React.Fragment>
            <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <React.Fragment>
                <Formik>
                    {renderStepContent(activeStep)}
                </Formik>
            </React.Fragment>
        </React.Fragment>
    );
}
