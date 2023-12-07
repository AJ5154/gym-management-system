import { People } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  LocalStorageKey,
  getLocalStorage,
} from "../../../common/utilities/localStorage";
import Navbar from "../Navbar";
import BasicDetails from "./BasicDetails";
import PersonalDetails from "./PersonalDetails";
import PlanDetails from "./PlanDetails";
import { Link, useNavigate } from "react-router-dom";

const getStepContent = (step: number) => {
  switch (step) {
    case 0:
      return <BasicDetails />;
    case 1:
      return <PlanDetails />;
    case 2:
      return <PersonalDetails />;
    default:
      throw new Error("Unknown step");
  }
};

const steps = ["Basic Detail", "Plan Detail", "Personal Details"];
const AddMembers = () => {
  const [activeStep, setActiveStep] = useState(0);
  const GymId = getLocalStorage(LocalStorageKey.GymId);
  const navigate = useNavigate();

  const nextPageHandler = () => {
    setActiveStep(activeStep + 1);
  };
  const previousPageHandler = () => {
    setActiveStep(activeStep - 1);
  };
  const closeStepper = () => {
    navigate("/members");
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Container component="main" maxWidth="md">
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h4">Add Member</Typography>
            </Grid>
            <Grid item>
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" to="/members">
                  Members
                </Link>
                <Typography color="textPrimary">Add Members</Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
                <Button
                  variant="contained"
                  onClick={closeStepper}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Close
                </Button>
                <Button
                  variant="text"
                  onClick={handleReset}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Reset
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={previousPageHandler} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={nextPageHandler}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default AddMembers;
