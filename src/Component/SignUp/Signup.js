import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Signup = () => {
  const [errMessage, setErrMessage] = useState("");
  const { manuallySignUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      setErrMessage("Password dosen't matched!");
      return;
    }
    manuallySignUp(
      data.email,
      data.confirmPassword,
      data.name,
      location,
      navigate
    );
    reset();
  };

  return (
    <div className="md:mx-20 mx-4">
      <div className="grid h-screen md:grid-cols-2 grid-cols-1 items-center">
        <div>
          <img src="https://i.ibb.co/7J6fnXy/coder.png" alt="" />
        </div>
        <div className="border p-8">
          <h3 className="mb-8 text-2xl font-semibold uppercase">
            Sign up Account
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                className="block w-full py-2 px-2 border border-black rounded"
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-sm font-semibold text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="mb-4">
              <input
                className="block w-full py-2 px-2 border border-black rounded"
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-sm font-semibold text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="mb-4">
              <input
                placeholder="Enter password"
                className="block w-full py-2 px-2 border border border-black rounded"
                type="password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-sm font-semibold text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="mb-4">
              <input
                placeholder="Enter confirm password"
                className="block w-full py-2 px-2 border border border-black rounded"
                type="password"
                {...register("confirmPassword", { required: true })}
              />

              {errMessage && (
                <span className="text-sm font-semibold text-red-500 block">
                  {errMessage}
                </span>
              )}
            </div>
            <input
              className="border uppercase px-4 py-1 bg-black text-white uppercase font-semibold rounded"
              value="Sign up"
              type="submit"
            />
          </form>
          <h5 className="mt-4 font-semibold">
            If you have an account?{" "}
            <Link to="/signin" className="text-yellow-600">
              Please sign in
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Signup;
