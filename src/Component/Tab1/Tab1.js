import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import Header from "../Shared/Header/Header";

const Tab1 = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    fetch("https://serene-journey-34919.herokuapp.com/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.acknowledged) {
          alert("User successfully added");
        }
      });

    reset();
  };
  return (
    <div>
      <Header />
      <div className="md:mx-20 mx-4 h-screen flex items-center">
        <div className="md:w-4/6 w-full mx-auto border p-8">
          <h3 className="mb-8 text-2xl font-semibold uppercase">
            User inforamation
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                className="block w-full py-2 px-2 border border-black rounded"
                type="text"
                placeholder="Enter your name"
                {...register("displayName", { required: true })}
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
                type="number"
                id="name"
                {...register("phone", { required: true, maxLength: 10 })}
              />
              {errors.name && errors.name.type === "required" && (
                <span className="text-sm font-semibold text-red-500">
                  This is required
                </span>
              )}
              {errors.name && errors.name.type === "maxLength" && (
                <span className="text-sm font-semibold text-red-500">
                  Length must be in 10
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
                placeholder="Enter address"
                className="block w-full py-2 px-2 border border border-black rounded"
                type="text"
                {...register("address", { required: true })}
              />
              {errors.address && (
                <span className="text-sm font-semibold text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <input
              className="border uppercase px-4 py-1 bg-black text-white uppercase font-semibold rounded"
              value="Submit"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tab1;
