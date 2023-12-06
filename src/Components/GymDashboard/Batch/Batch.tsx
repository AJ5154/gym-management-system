import { Book } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Field, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
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

interface GymBatchProps {
  name: string;
  batchLimit: number;
  startTime: string;
  endTime: string;
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

const convertTimeToHourMinuteFormat = (timeString: string) => {
  const [hour, minute] = timeString.split(":").map(Number);
  return {
    hour,
    minute,
  };
};

const Batch = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const GymId = getLocalStorage(LocalStorageKey.GymId);
  const [gymBatchData, setGymBatchData] = useState<{ data: GymBatchProps[] }>({
    data: [],
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      batchLimit: 1,
      startTime: "",
      endTime: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Batch Name is required"),
      batchLimit: Yup.number()
        .required("Batch Limit is required")
        .min(1, "Batch Limit must be at least 1")
        .integer("Batch Limit must be an integer number"),
      startTime: Yup.string().required("Batch Open Time is required"),
      endTime: Yup.string().required("Batch Close Time is required"),
    }),

    onSubmit: async () => {
      console.log(formik.values);
      const convertedStartTime = convertTimeToHourMinuteFormat(
        formik.values.startTime
      );
      const convertedEndTime = convertTimeToHourMinuteFormat(
        formik.values.endTime
      );
      const token = getLocalStorage(LocalStorageKey.AccessToken);
      const { id, startTime, endTime, ...restFormikValues } = formik.values;
      try {
        if (id) {
          await axios.put(
            `http://localhost:7575/api/v1/gyms/${GymId}/batches/${id}`,
            {
              ...restFormikValues,
              startTime: convertedStartTime,
              endTime: convertedEndTime,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          await axios.post(
            `http://localhost:7575/api/v1/gyms/${GymId}/batches`,
            {
              ...formik.values,
              startTime: convertedStartTime,
              endTime: convertedEndTime,
            },
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

      loadGymBatchData();
      formik.handleReset(null);
    },
  });

  const batches = Array.isArray(gymBatchData.data) ? gymBatchData.data : [];

  const getGymBatchData = async () => {
    try {
      const token = getLocalStorage(LocalStorageKey.AccessToken);
      const response = await axios.get(
        `http://localhost:7575/api/v1/gyms/${GymId}/batches`,
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

  const loadGymBatchData = async () => {
    const loadBatchData = await getGymBatchData();
    setGymBatchData(loadBatchData);
  };

  useEffect(() => {
    loadGymBatchData();
  }, []);

  const editGymBatchData = (data: GymBatchProps) => {
    handleOpen();
    formik.setValues(data);
  };

  const deleteGymBatchData = async (planId: string) => {
    try {
      const token = getLocalStorage(LocalStorageKey.AccessToken);
      await axios.delete(
        `http://localhost:7575/api/v1/gyms/${GymId}/batches/${planId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedBatch = gymBatchData.data.filter(
        (plan) => plan.id !== planId
      );
      setGymBatchData({ ...getGymBatchData, data: updatedBatch });

      handleClose();
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid container sx={{ mt: 10 }}>
          <Grid item xs>
            <Typography component="h1" variant="h5" sx={{ ml: 30 }}>
              Add Batch
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="success"
              sx={{ mr: 4 }}
              onClick={handleOpen}
            >
              <Book /> Add Batch
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
              Add Batch
            </Typography>
            <FormikProvider value={formik}>
              <Field name="name">
                {({ field, meta }: IFieldProps) => (
                  <TextField
                    {...field}
                    label="Batch Name"
                    variant="standard"
                    fullWidth
                    sx={{ mx: "auto" }}
                    error={meta.touched && meta.error ? true : false}
                    helperText={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
              <Field name="batchLimit">
                {({ field, meta }: IFieldProps) => (
                  <TextField
                    {...field}
                    label="Batch Limit"
                    variant="standard"
                    type="number"
                    fullWidth
                    sx={{ mx: "auto" }}
                    error={meta.touched && meta.error ? true : false}
                    helperText={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
              <Field name="startTime">
                {({ field, meta }: IFieldProps) => (
                  <TextField
                    {...field}
                    label="Batch Open Time"
                    variant="standard"
                    fullWidth
                    type="text"
                    inputMode="numeric"
                    sx={{ mx: "auto" }}
                    error={meta.touched && meta.error ? true : false}
                    helperText={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
              <Field name="endTime">
                {({ field, meta }: IFieldProps) => (
                  <TextField
                    {...field}
                    label="Batch Close Time"
                    variant="standard"
                    fullWidth
                    type="text"
                    inputMode="numeric"
                    sx={{ mx: "auto" }}
                    error={meta.touched && meta.error ? true : false}
                    helperText={meta.touched && meta.error ? meta.error : ""}
                  />
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
          {batches.length > 0 ? (
            batches.map((batch, idx) => (
              <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 350, ml: 2, mt: 2, mb: 2, height: 205 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Batch Name: {batch.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Batch Limit: {batch.batchLimit}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Start Time: {batch.startTime}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      End Time: {batch.endTime}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => deleteGymBatchData(batch.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      size="small"
                      onClick={() => editGymBatchData(batch)}
                    >
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

export default Batch;
