import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

function MyStepper({ activeStep }) {
  const steps = ["Etape 1", "Etape 2", "Etape 3"];
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
