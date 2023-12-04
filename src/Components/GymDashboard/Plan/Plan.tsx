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
import { APIErrorResponse } from "../../../common/types/APIErrorResponse.type";
import {
  LocalStorageKey,
  getLocalStorage,
} from "../../../common/utilities/localStorage";

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

interface gymPlanProps {
  name: string;
  price: number;
  durationInMoths: number;
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
  const [gymplanData, setGymPlanData] = useState<gymPlanProps[]>([]);
  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      durationInMoths: 1,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      price: Yup.number().required("Price is required"),
      durationInMoths: Yup.number().required("Month Plan is required"),
    }),
    onSubmit: async () => {
      console.log(formik.values);
      const userID = getLocalStorage(LocalStorageKey.UserID);
      const token = getLocalStorage(LocalStorageKey.AccessToken);
      console.log("Price Value:", formik.values.price);
      await axios.post(
        `http://localhost:7575/api/v1/gyms/${userID}/plans`,{...formik.values},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      loadGymPlanData();
      formik.handleReset(null);
    },
  });

  const getGymPlanData = async () => {
    try {
      const userID = getLocalStorage(LocalStorageKey.UserID);
      const token = getLocalStorage(LocalStorageKey.AccessToken);
      const response = await axios.get(
        `http://localhost:7575/api/v1/gyms/${userID}/plans`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof APIErrorResponse) {
        console.error(error.message);
      }
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
        <Grid container sx={{ mt: 10 }}>
          <Grid item xs>
            <Typography component="h1" variant="h5" sx={{ ml: 30 }}>
              Add Plan
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="success"
              sx={{ mr: 4 }}
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
              <Field name="name">
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
                    type="number"
                    sx={{ mx: "auto" }}
                    error={meta.touched && meta.error ? true : false}
                    helperText={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
              <Field name="durationInMoths">
                {({ field, meta }: IFieldProps) => (
                  <FormControl variant="standard" fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Duration In Moths
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Select Month Plan"
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={9}>9</MenuItem>
                      <MenuItem value={12}>12</MenuItem>
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
