import { Button, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { Field, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  LocalStorageKey,
  getLocalStorage,
} from "../../common/utilities/localStorage";

interface GymNameProps {
  name: string;
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

const GymName = () => {
  const [gymNameData, setGymNameData] = useState<GymNameProps[]>([]);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: async () => {
      console.log(formik.values);
      const token = getLocalStorage(LocalStorageKey.AccessToken);
      const response=await axios.post(
        "http://localhost:7575/api/v1/gyms",
        { ...formik.values },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response Data:", response.data);

        const gymId = response.data.data.id;
        localStorage.setItem('GymId',gymId)

      loadGymData();
      formik.handleReset(null);
      navigate("/Dashboard");
    },
  });

  const getGymData = async () => {
    try {
      const token = getLocalStorage(LocalStorageKey.AccessToken);
      const response = await axios.get("http://localhost:7575/api/v1/gyms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("");
      return [];
    }
  };

  const loadGymData = async () => {
    const loadData = await getGymData();
    setGymNameData(loadData);
  };

  useEffect(() => {
    loadGymData();
  }, []);

  useEffect(() => {
    const checkExistingGym = async () => {
      const gymData = await getGymData();
        if (gymData && gymData.data && gymData.data.length > 0) {
        const gymId = gymData.data[0].id; 
        localStorage.setItem('GymId', gymId);
        navigate("/Dashboard");
      }
    };
  
    checkExistingGym();
  }, [navigate]);

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
          Add Gym Name
        </Typography>
        <FormikProvider value={formik}>
          <Field name="name">
            {({ field, meta }: IFieldProps) => (
              <TextField
                {...field}
                label="Gym Name"
                variant="standard"
                fullWidth
                autoFocus
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
            Submit
          </Button>
        </FormikProvider>
      </Paper>
    </Container>
  );
};

export default GymName;
