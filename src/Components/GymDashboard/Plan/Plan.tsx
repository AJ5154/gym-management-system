import { Window } from "@mui/icons-material";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Grid,
} from "@mui/material";
import axios from "axios";
import { Field, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import PlanData from "./PlanData";
import Navbar from "../Navbar";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface LoginProps {
  planName: string;
  price: string;
  monthPlan: string;
}

interface NewType {
  value: string;
}

interface IFieldProps {
  field: NewType;
  meta: {
    touched: boolean;
    error: string;
  };
}

const Plan = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [gymplanData, setGymPlanData] = useState([]);
  const formik = useFormik({
    initialValues: {
      planName: "",
      price: "",
      monthPlan: "",
    },
    validationSchema: Yup.object().shape({
      planName: Yup.string().required("Plan Name is required"),
      price: Yup.string().required("Price is required"),
      monthPlan: Yup.string().required("Month Plan is required"),
    }),
    onSubmit: async () => {
      console.log(formik.values);
      if (formik.values.id) {
        await axios.put(``, formik.values);
      } else {
        await axios.post("", formik.values);
      }

      loadGymPlanData();
      formik.handleReset(null);
    },
  });

  const getGymPlanData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7575/api/v1/gyms/plans"
      );
      return response.data;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  };

  const loadGymPlanData = async () => {
    const loadPlanData = await getGymPlanData();
    setGymPlanData(loadPlanData);
  };

  useEffect(() => {
    loadGymPlanData();
  }, []);

  return (
    <>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid item>
          <Grid>
            <Typography component="h1" sx={{ mt: 8, ml: 15 }} variant="h5">
              Add Plan
            </Typography>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              sx={{ mt: 8, ml: 165 }}
              color="success"
              onClick={handleOpen}
            >
              <Window /> Add Plan
            </Button>
          </Grid>
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Plan
            </Typography>
            <FormikProvider value={formik}>
              <Field name="planName">
                {({ field, meta }: IFieldProps) => (
                  <TextField
                    {...field}
                    label="Plan Name"
                    variant="standard"
                    fullWidth
                    sx={{ mx: "auto" }}
                    error={meta.touched && meta.error ? true : false}
                    helperText={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
              <Field name="price">
                {({ field, meta }: IFieldProps) => (
                  <TextField
                    {...field}
                    label="Price"
                    variant="standard"
                    fullWidth
                    sx={{ mx: "auto" }}
                    error={meta.touched && meta.error ? true : false}
                    helperText={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
              <Field name="monthPlan">
                {({ field, meta }: IFieldProps) => (
                  <FormControl variant="standard" fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Prefix
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Select Month Plan"
                    >
                      <MenuItem value={"1 Month"}>1 Month</MenuItem>
                      <MenuItem value={"3 Month"}>3 Month</MenuItem>
                      <MenuItem value={"6 Month"}>6 Month</MenuItem>
                      <MenuItem value={"9 Month"}>9 Month</MenuItem>
                      <MenuItem value={"12 Month"}>12 Month</MenuItem>
                    </Select>
                    {meta.touched && meta.error ? (
                      <FormHelperText>{meta.error}</FormHelperText>
                    ) : (
                      ""
                    )}
                  </FormControl>
                )}
              </Field>
              <Button
                variant="contained"
                sx={{ mt: 4 }}
                fullWidth
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  formik.handleSubmit();
                }}
              >
                Save
              </Button>
            </FormikProvider>
          </Box>
        </Modal>
        <PlanData planDataProps={gymplanData} />
      </Box>
    </>
  );
};

export default Plan;
