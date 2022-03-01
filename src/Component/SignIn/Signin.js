import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Signin = () => {
  const { manuallySignIn, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    fetch(`https://serene-journey-34919.herokuapp.com/users/${data.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          alert("USer not found please create an account");
          reset();
          return;
        }
      });
    manuallySignIn(data.email, data.password, location, navigate);
    reset();
  };

  return (
    <div className="text-center h-screen flex items-center">
      <div className="border border-black md:w-3/6 mx-auto p-10">
        <h3 className="mb-8 text-2xl font-semibold uppercase">
          Log in Your Account
        </h3>
        <h4 className="text-center font-semibold text-red-500 mb-4">{error}</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="text-left">
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
          <input
            className="border uppercase px-4 py-1 bg-black text-white uppercase font-semibold rounded"
            value="Sign in"
            type="submit"
          />
        </form>
        <h5 className="mt-4 font-semibold">
          Are you new here?{" "}
          <Link to="/signup" className="text-yellow-600">
            Create a new account
          </Link>
        </h5>
      </div>
    </div>
  );
};

export default Signin;
