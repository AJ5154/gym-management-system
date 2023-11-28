import { Container, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup"


interface LoginProps{
    email:string;
    password:string;
}
const Login = () => {
    const formik = useFormik ({
        initialValues:{
            email:"",
            password:""
        },
        validationSchema:Yup.object().shape({
            email:Yup.string().email("Invalid email").required("Email is required"),
            password:Yup.string().required("Password is required")
        }),
        onSubmit:()=>{
            console.log(formik.values);
            
        }
    })
  return (
    <Container>
        <Typography component="h1" variant="h3">GymBook</Typography>
    </Container>
  )
}

export default Login