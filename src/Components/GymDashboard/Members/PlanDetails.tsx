import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
} from "@mui/material";
import { Field, FormikProvider, useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
interface PlanDetailProps {
  selectPlan: string;
  joiningDate: string;
  paidAmount: string;
  comments: string;
  discountType: string;
  discount: string;
  admissionFees: string;
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
const PlanDetails = () => {
  const formik = useFormik({
    initialValues: {
      selectPlan: "",
      joiningDate: "",
      paidAmount: "",
      comments: "",
      discountType: "",
      discount: "",
      admissionFees: "",
    },
    validationSchema: Yup.object().shape({
      selectPlan: Yup.string().required("Select Plan is required"),
      joiningDate: Yup.string().required("joining Date is required"),
      paidAmount: Yup.string().required("Paid Amount is required"),
      comments: Yup.string().required("Comments is required"),
      discountType: Yup.string().required("Discount Type Type is required"),
      discount: Yup.string().required("Discount is required"),
      admissionFees: Yup.string().required("Admission Fees is required"),
    }),
    onSubmit: () => {
      console.log(formik.values);
    },
  });

  return (
    <div>
      <FormikProvider value={formik}>
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
        <Field name="joiningDate">
          {({ field, meta }: IFieldProps) => (
            <TextField
              {...field}
              label="Joining Date"
              variant="standard"
              fullWidth
              sx={{ mx: "auto" }}
              error={meta.touched && meta.error ? true : false}
              helperText={meta.touched && meta.error ? meta.error : ""}
            />
          )}
        </Field>
        <Field name="paidAmount">
          {({ field, meta }: IFieldProps) => (
            <TextField
              {...field}
              label="Paid Amount"
              variant="standard"
              fullWidth
              sx={{ mx: "auto" }}
              error={meta.touched && meta.error ? true : false}
              helperText={meta.touched && meta.error ? meta.error : ""}
            />
          )}
        </Field>
        <Field name="comments">
          {({ field, meta }: IFieldProps) => (
            <TextField
              {...field}
              label="Comments"
              variant="standard"
              fullWidth
              sx={{ mx: "auto" }}
              error={meta.touched && meta.error ? true : false}
              helperText={meta.touched && meta.error ? meta.error : ""}
            />
          )}
        </Field>
        <Field name="discountType">
          {({ field, meta }: IFieldProps) => (
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-label">
                Duration In Moths
              </InputLabel>
              <Select
                {...field}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Discount Type"
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
        <Field name="discount">
          {({ field, meta }: IFieldProps) => (
            <TextField
              {...field}
              label="Discount"
              variant="standard"
              fullWidth
              sx={{ mx: "auto" }}
              error={meta.touched && meta.error ? true : false}
              helperText={meta.touched && meta.error ? meta.error : ""}
            />
          )}
        </Field>
        <Field name="admissionFees">
          {({ field, meta }: IFieldProps) => (
            <TextField
              {...field}
              label="Admission Fees"
              variant="standard"
              fullWidth
              sx={{ mx: "auto" }}
              error={meta.touched && meta.error ? true : false}
              helperText={meta.touched && meta.error ? meta.error : ""}
            />
          )}
        </Field>
      </FormikProvider>
    </div>
  );
};

export default PlanDetails;
