import {
  Button,
  Container,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Field, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  APIErrorResponse,
  ErrorCodesForToaster,
} from "../../common/types/APIErrorResponse.type";
import {
  LocalStorageKey,
  setLocalStorage,
} from "../../common/utilities/localStorage";
import { LoginApiResponse } from "./login.type";

interface LoginProps {
  email: string;
  password: string;
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
const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async () => {
      console.log(formik.values);

      const loginResponse = (await postLoginData(
        formik.values
      )) as LoginApiResponse;
      const jwtToken = loginResponse.data.entity.token.accessToken;
      setLocalStorage(LocalStorageKey.AccessToken, jwtToken);
      formik.handleReset(null);
      navigate("/GymName");
    },
  });

  const [errorToastOpen, setErrorToastOpen] = useState(false);

  const handleSnackbarClose = () => {
    setErrorToastOpen(false);
  };
  const postLoginData = async (
    data: LoginProps
  ): Promise<LoginApiResponse | void> => {
    try {
      const response = await axios.post(
        "http://localhost:7575/api/v1/auth/login",
        data
      );
      const apiData = response.data as LoginApiResponse;
      return apiData;
    } catch (error: unknown) {
      if (error instanceof APIErrorResponse) {
        if (ErrorCodesForToaster.includes(error.statusCode)) {
          // TODO show error toast
          setErrorToastOpen(true);
        } else {
          console.error(error.message);
        }
      }
    }
  };
  return (
    <Container component="form" maxWidth="sm">
      <Typography component="h1" variant="h3" align="center">
        GymBook
      </Typography>
      <Paper
        elevation={12}
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Typography component="h1" variant="h4">
          Sign in to your account
        </Typography>
        <FormikProvider value={formik}>
          <Field name="email">
            {({ field, meta }: IFieldProps) => (
              <TextField
                {...field}
                label="Email Address"
                variant="standard"
                fullWidth
                autoFocus
                sx={{ mx: "auto" }}
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
                type="password"
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
            Signup
          </Button>
          <Typography component="p" variant="h6">
            Create a new account?{" "}
            <Link to="/signup">
              Sign up
            </Link>
          </Typography>
          <Snackbar
            open={errorToastOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message="An error occurred. Please try again."
          />
        </FormikProvider>
      </Paper>
    </Container>
  );
};

export default Login;
