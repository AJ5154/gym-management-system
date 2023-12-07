import { FormControl, InputLabel, Select, MenuItem, FormHelperText, TextField } from "@mui/material";
import { Field, FormikProvider, useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

interface PersonalDetailsProps {
  gender: string;
  email: string;
  dateOfBirth: string;
  address: string;
  notes: string;
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
const PersonalDetails = () => {
  const formik = useFormik({
    initialValues: {
      gender: "",
      email: "",
      dateOfBirth: "",
      address: "",
      notes: "",
    },
    validationSchema: Yup.object().shape({
      gender: Yup.string().required("Gender is required"),
      email: Yup.string().required("Email is required"),
      dateOfBirth: Yup.string().required("Date Of Birth is required"),
      address: Yup.string().required("Address is required"),
      notes: Yup.string().required("Notes Type Type is required"),
    }),
    onSubmit: () => {
      console.log(formik.values);
    },
  });
  return <div>
    <FormikProvider value={formik}>
    <Field name="gender">
          {({ field, meta }: IFieldProps) => (
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-label">
                Duration In Moths
              </InputLabel>
              <Select
                {...field}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Gender"
              >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
              </Select>
              {meta.touched && meta.error ? (
                <FormHelperText>{meta.error}</FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
          )}
        </Field>
        <Field name="email">
          {({ field, meta }: IFieldProps) => (
            <TextField
              {...field}
              label="Email"
              variant="standard"
              fullWidth
              sx={{ mx: "auto" }}
              error={meta.touched && meta.error ? true : false}
              helperText={meta.touched && meta.error ? meta.error : ""}
            />
          )}
        </Field>
        <Field name="dateOfBirth">
          {({ field, meta }: IFieldProps) => (
            <TextField
              {...field}
              label="Date Of Birth"
              variant="standard"
              fullWidth
              type="date"
              sx={{ mx: "auto" }}
              error={meta.touched && meta.error ? true : false}
              helperText={meta.touched && meta.error ? meta.error : ""}
            />
          )}
        </Field>
        <Field name="address">
          {({ field, meta }: IFieldProps) => (
            <TextField
              {...field}
              label="Address"
              variant="standard"
              fullWidth
              sx={{ mx: "auto" }}
              error={meta.touched && meta.error ? true : false}
              helperText={meta.touched && meta.error ? meta.error : ""}
            />
          )}
        </Field>
        <Field name="notes">
          {({ field, meta }: IFieldProps) => (
            <TextField
              {...field}
              label="Notes"
              variant="standard"
              fullWidth
              sx={{ mx: "auto" }}
              error={meta.touched && meta.error ? true : false}
              helperText={meta.touched && meta.error ? meta.error : ""}
            />
          )}
        </Field>
       
    </FormikProvider>
  </div>;
};

export default PersonalDetails;
