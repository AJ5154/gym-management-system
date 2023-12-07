import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Field, FormikProvider, useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
interface BasicDetailProps {
  name: string;
  countryCode: string;
  phone: string;
  trainingType: string;
  membershipId: number;
  selectBatch: string;
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
const BasicDetails = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      countryCode: "",
      phone: "",
      trainingType: "",
      membershipId: 1,
      selectBatch: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      countryCode: Yup.string().required("Country Code is required"),
      phone: Yup.string().required("Phone is required"),
      trainingType: Yup.string().required("Training Type is required"),
      membershipId: Yup.string().required("Membership Id Type is required"),
      selectBatch: Yup.string().required("Select Batch Id Type is required"),
    }),
    onSubmit: () => {
      console.log(formik.values);
    },
  });
  return (
    <div>
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
        <Field name="countryCode">
          {({ field, meta }: IFieldProps) => (
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-label">
                Duration In Moths
              </InputLabel>
              <Select
                {...field}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Country Code"
              >
                <MenuItem value={"Afghanistan (+93)"}>
                  Afghanistan (+93)
                </MenuItem>
                <MenuItem value={"Australia (+61)"}>Australia (+61)</MenuItem>
                <MenuItem value={"Bangladesh (+880)"}>
                  Bangladesh (+880)
                </MenuItem>
                <MenuItem value={"Brazil (+55)"}>Brazil (+55)</MenuItem>
                <MenuItem value={"Canada (+1)"}>Canada (+1)</MenuItem>
                <MenuItem value={"China (+86)"}>China (+86)</MenuItem>
                <MenuItem value={"Germany (+49)"}>Germany (+49)</MenuItem>
                <MenuItem value={"Iceland (+354)"}>Iceland (+354)</MenuItem>
                <MenuItem value={"India (+91)"}>India (+91)</MenuItem>
                <MenuItem value={"Malaysia (+60)"}>Malaysia (+60)</MenuItem>
                <MenuItem value={"Singapore (+65)"}>Singapore (+65)</MenuItem>
                <MenuItem value={"Switzerland (+41)"}>
                  Switzerland (+41)
                </MenuItem>
              </Select>
              {meta.touched && meta.error ? (
                <FormHelperText>{meta.error}</FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
          )}
        </Field>
        <Field name="phone">
          {({ field, meta }: IFieldProps) => (
            <TextField
              {...field}
              label="Phone"
              variant="standard"
              fullWidth
              type="number"
              sx={{ mx: "auto" }}
              error={meta.touched && meta.error ? true : false}
              helperText={meta.touched && meta.error ? meta.error : ""}
            />
          )}
        </Field>
        <Field name="trainingType">
          {({ field, meta }: IFieldProps) => (
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-label">
                Duration In Moths
              </InputLabel>
              <Select
                {...field}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Training Type"
              >
                <MenuItem value={"General Training"}>General Training</MenuItem>
                <MenuItem value={"Personal Training"}>
                  Personal Training
                </MenuItem>
              </Select>
              {meta.touched && meta.error ? (
                <FormHelperText>{meta.error}</FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
          )}
        </Field>
        <Field name="membershipId">
          {({ field, meta }: IFieldProps) => (
            <TextField
              {...field}
              label="Membership Id"
              variant="standard"
              fullWidth
              type="number"
              sx={{ mx: "auto" }}
              error={meta.touched && meta.error ? true : false}
              helperText={meta.touched && meta.error ? meta.error : ""}
            />
          )}
        </Field>
        <Field name="selectBatch">
          {({ field, meta }: IFieldProps) => (
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-label">
                Duration In Moths
              </InputLabel>
              <Select
                {...field}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select Batch"
              >
                <MenuItem value={"morning"}>Morning</MenuItem>
                <MenuItem value={"afternoon"}>Afternoon</MenuItem>
                <MenuItem value={"evening"}>Evening</MenuItem>
              </Select>
              {meta.touched && meta.error ? (
                <FormHelperText>{meta.error}</FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
          )}
        </Field>
      </FormikProvider>
    </div>
  );
};

export default BasicDetails;
