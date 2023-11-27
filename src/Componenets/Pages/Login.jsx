import React, { useState, useContext, useEffect } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PacmanLoader from "react-spinners/PacmanLoader";
import { AuthContext } from '../AppContext/AppContext';
import { auth, onAuthStateChanged } from '../Firebase/firebase';


const Login = () => {

    const { signInWithGoogle, loginWithEmailAndPassword } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        setLoading(true);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/");
                setLoading(false);
            } else {
                setLoading(false);
            }
        });
    }, [navigate]);




    let initialValues = {
        email: '',
        password: '',
    };




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
            loginWithEmailAndPassword(email, password);
            setLoading(true);
        } else {
            setLoading(false);
            alert("Invalid email or password");
        }
        console.log("formik", formik);
    }

    const formik = useFormik({ initialValues, validationSchema, handleSubmit });




    return (
        <>
            {loading ? (
                <div className="grid grid-cols-1 justify-items-center items-center h-screen">
                    <PacmanLoader color="#5A5A5A" size={12} speedMultiplier={0.7} />
                </div>
            ) : (
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
                                        size="lg"
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
                                        size="lg"
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
                            <Button variant="gradient" fullWidth className='mb-4' onClick={signInWithGoogle}>
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
            )}
        </>
    )
}

export default Login