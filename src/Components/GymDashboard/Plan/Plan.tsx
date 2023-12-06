import { Window } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Field, FormikProvider, useFormik } from "formik";
import React, { ReactNode, useEffect, useState } from "react";
import * as Yup from "yup";
import { APIErrorResponse } from "../../../common/types/APIErrorResponse.type";
import {
  LocalStorageKey,
  getLocalStorage,
} from "../../../common/utilities/localStorage";
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

interface gymPlanProps {
  durationInMoths: ReactNode;
  name: string;
  price: number;
  durationInMonths: number;
  id: string;
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
  const [gymplanData, setGymPlanData] = useState<{ data: gymPlanProps[] }>({
    data: [],
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const GymId = getLocalStorage(LocalStorageKey.GymId);
  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      durationInMoths: 1,
      id: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      price: Yup.number().required("Price is required"),
      durationInMoths: Yup.number().required("Month Plan is required"),
    }),
    onSubmit: async () => {
      console.log(formik.values.id);
      const token = getLocalStorage(LocalStorageKey.AccessToken);
      const { id, createdAt, updatedAt, deleted, gymId, ...restFormikValues } =
        formik.values;

      try {
        if (id) {
          await axios.put(
            `http://localhost:7575/api/v1/gyms/${GymId}/plans/${id}`,
            { ...restFormikValues },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          await axios.post(
            `http://localhost:7575/api/v1/gyms/${GymId}/plans`,
            { ...restFormikValues },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
        loadGymPlanData();
        formik.handleReset(null);
      } catch (error) {
        console.error("Error submitting plan:", error);
      }
    },
  });

  const editGymPlanData = (data: gymPlanProps) => {
    handleOpen();
    formik.setValues(data);
  };

  const deleteGymPlanData = async (planId: string) => {
    try {
      const token = getLocalStorage(LocalStorageKey.AccessToken);
      await axios.delete(
        `http://localhost:7575/api/v1/gyms/${GymId}/plans/${planId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedPlans = gymplanData.data.filter(
        (plan: { id: string }) => plan.id !== planId
      );
      setGymPlanData({ ...gymplanData, data: updatedPlans });

      handleClose();
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  const getGymPlanData = async () => {
    try {
      const token = getLocalStorage(LocalStorageKey.AccessToken);
      const response = await axios.get(
        `http://localhost:7575/api/v1/gyms/${GymId}/plans`,
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

  const plans = Array.isArray(gymplanData.data) ? gymplanData.data : [];
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
                  handleClose();
                }}
              >
                Save
              </Button>
            </FormikProvider>
          </Box>
        </Modal>
      </Box>
      <Box sx={{ ml: 30, mr: 10 }}>
        <Grid container>
          {plans.length > 0 ? (
            plans.map((plan, idx) => (
              <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 350, ml: 2, mt: 2, mb: 2, height: 190 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      Plan Name: {plan.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: {plan.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Plan Duration: {plan.durationInMoths}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => deleteGymPlanData(plan.id)}
                    >
                      Delete
                    </Button>
                    <Button size="small" onClick={() => editGymPlanData(plan)}>
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                No plans available.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Plan;
