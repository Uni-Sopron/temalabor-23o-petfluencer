import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';


const Login = () => {
    let initialValues = {
        email: '',
        password: '',
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
            .required("Required")
            .min("6", "Must be at least 6 characters long")
            .matches(/^[a-zA-Z]+$/, "Password can only contain letters"),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formik.values;
        if (formik.isValid === true) {
            alert("Login Successfull");
        } else {
            alert("Login Failed");
        }
        console.log("formik", formik);
    }

    const formik = useFormik({ initialValues, validationSchema, handleSubmit });




    return (
        <div className="grid  grid-cols-1 h-screen justify-items-center items-center">
            <Card className="w-96">
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Sign In
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <Input
                                name='email'
                                type='email'
                                label="Email"
                                size="1g"
                                {...formik.getFieldProps("email")}
                            />
                        </div>
                        <div>
                            {formik.touched.email && formik.errors.email && (
                                <Typography variant="small" color="red">
                                    {formik.errors.email}
                                </Typography>
                            )}
                        </div>
                        <div className="mt -4 mb-2">
                            <Input
                                name='password'
                                type='password'
                                label="Password"
                                size="1g"
                                {...formik.getFieldProps("password")}
                            />
                        </div>
                        <div>
                            {formik.touched.password && formik.errors.password && (
                                <Typography variant="small" color="red">
                                    {formik.errors.password}
                                </Typography>
                            )}
                        </div>
                        <Button variant="gradient" fullWidth className='mb-4' type='submit '>
                            Sign In
                        </Button>
                    </form>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button variant="gradient" fullWidth className='mb-4'>
                        Sign In with Google
                    </Button>
                    <Link to="/reset ">
                        <p className="ml-1 font-bold font-roboto text-sm  text-blue-500 text-center">
                            Reset Password
                        </p>
                    </Link>
                    <div className="mt-6 flex items-center font-roboto text-base justify-center">
                        Don't have any account?
                        <Link to="/register">
                            <p className="ml-1 font-bold font-roboto text-sm  text-blue-500 text-center">
                                Register Now
                            </p>
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div >
    )
}

export default Login