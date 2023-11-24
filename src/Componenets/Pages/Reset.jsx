import React, { useState } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import * as Yup from 'yup';
import { useFormik } from 'formik';

const Reset = () => {
  const [email, setEmail] = useState("");

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Your reset password logic here
      console.log("Reset password logic", values);
    },
  });

  return (
    <div className="grid grid-cols-1 justify-items-center items-center h-screen">
      <div className="w-96">
        <Typography variant="h6" color="blue-gray" className="pb-4">
          Enter the email address associated with your account and we'll send
          you a link to reset your password
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Input
            name="email"
            type="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <Typography variant="small" color="red">
              {formik.errors.email}
            </Typography>
          )}
          <Button variant="gradient" fullWidth className="mt-4" type="submit">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Reset;
