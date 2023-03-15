import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

function MyStepper({ activeStep }) {
  const steps = ["Step 1", "Step 2"];
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default MyStepper;
