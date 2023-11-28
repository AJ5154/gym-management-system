import { Container, Paper, TextField } from "@mui/material";
import { Field, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

enum PerfixEnum {
  MR = "MR",
  MRS = "MRS",
  MISS = "MISS",
}

enum GenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
  UNSPECIFIED = "UNSPECIFIED",
}

interface SignupProps {
  prefix: PerfixEnum.MR | PerfixEnum.MRS | PerfixEnum.MISS;
  firstName: string;
  lastName: string;
  email: string; // Should follow email format validation
  phone: string; // Should follow phone number format validation
  gender:
    | GenderEnum.MALE
    | GenderEnum.FEMALE
    | GenderEnum.OTHER
    | GenderEnum.UNSPECIFIED;
  password: string;
  dateOfBirth: string; // Assuming the dateOfBirth is in ISO 8601 format
  middleName?: string; // Optional field
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

const Signup = (props: SignupProps) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      dateOfBirth: "",
      middleName: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("First Name is required"),
      middleName: Yup.string().required("Middle Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Invalid Email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      password: Yup.string().required("Password is required"),
      dateOfBirth: Yup.string().required("Date of Birth is required"),
    }),
    onSubmit: () => {
      console.log(formik.values);
    },
  });
  return (
    <Container component="form" maxWidth={"sm"}>
      <Paper elevation={3} sx={{ m: 5 }}>
        <FormikProvider value={formik}>
          <Field name="firstName">
            {({ field, meta }: IFieldProps) => (
              <TextField
                {...field}
                label="First Name"
                variant="standard"
                fullWidth
                error={!meta.touched && !meta.error }
                helperText={!meta.touched && !meta.error }
              />
            )}
          </Field>
          <Field name="middleName">
            {({ field, meta }: IFieldProps) => (
              <TextField
                {...field}
                label="Middle Name"
                variant="standard"
                fullWidth
                error={meta.touched && meta.error ? true : false}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
          <Field name="lastName">
            {({ field, meta }: IFieldProps) => (
              <TextField
                {...field}
                label="Last Name"
                variant="standard"
                fullWidth
                error={meta.touched && meta.error ? true : false}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
          <Field name="email">
            {({ field, meta }: IFieldProps) => (
              <TextField
                {...field}
                label="Email"
                variant="standard"
                fullWidth
                error={meta.touched && meta.error ? true : false}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
          <Field name="phone">
            {({ field, meta }: IFieldProps) => (
              <TextField
                {...field}
                label="Phone No."
                variant="standard"
                fullWidth
                error={meta.touched && meta.error ? true : false}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
          <Field name="password">
            {({ field, meta }: IFieldProps) => (
              <TextField
                {...field}
                label="Password"
                variant="standard"
                fullWidth
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
                error={meta.touched && meta.error ? true : false}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </FormikProvider>
      </Paper>
    </Container>
  );
};

export default Signup;
