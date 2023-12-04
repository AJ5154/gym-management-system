import { Book } from "@mui/icons-material";
import {
    Box,
    Button,
    Grid,
    Modal,
    TextField,
    Typography
} from "@mui/material";
import axios from "axios";
import { Field, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Navbar from "../Navbar";
import BatchData from "./BatchData";
import { APIErrorResponse } from "../../../common/types/APIErrorResponse.type";

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
  batchName: string;
  batchLimit: string;
  batchOpenTime: string;
  batchCloseTime: string;
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

const Batch = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [gymBatchData, setGymBatchData] = useState<GymBatchProps[]>([]);
  const formik = useFormik({
    initialValues: {
      batchName: "",
      batchLimit: "",
      batchOpenTime: "",
      batchCloseTime: "",
    },
    validationSchema: Yup.object().shape({
      batchName: Yup.string().required("Batch Name is required"),
      batchLimit: Yup.string().required("Batch Limit is required"),
      batchOpenTime: Yup.string().required("Batch Open Time is required"),
      batchCloseTime: Yup.string().required("Batch Close Time is required"),
    }),
    onSubmit: async () => {
      console.log(formik.values);
      //   if (formik.values.id) {
      //     await axios.put(``, formik.values);
      //   } else {
      //     await axios.post("", formik.values);
      //   }

      loadGymBatchData();
      formik.handleReset(null);
    },
  });

  const getGymBatchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7575/api/v1/gyms/batch"
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
  },[]);

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
            <Field name="batchName">
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
                  fullWidth
                  sx={{ mx: "auto" }}
                  error={meta.touched && meta.error ? true : false}
                  helperText={meta.touched && meta.error ? meta.error : ""}
                />
              )}
            </Field>
            <Field name="batchOpenTime">
              {({ field, meta }: IFieldProps) => (
                <TextField
                  {...field}
                  label="Batch Open Time"
                  variant="standard"
                  fullWidth
                  type="time"
                  sx={{ mx: "auto" }}
                  error={meta.touched && meta.error ? true : false}
                  helperText={meta.touched && meta.error ? meta.error : ""}
                />
              )}
            </Field>
            <Field name="batchCloseTime">
              {({ field, meta }: IFieldProps) => (
                <TextField
                  {...field}
                  label="Batch Close Time"
                  variant="standard"
                  fullWidth
                  type="time"
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
              }}
            >
              Save
            </Button>
          </FormikProvider>
        </Box>
      </Modal>
      <BatchData batchDataProps={gymBatchData} />
      </Box>
    </>
  );
};

export default Batch;
