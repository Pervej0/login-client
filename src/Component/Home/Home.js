import React from "react";
import Header from "../Shared/Header/Header";

const Home = () => {
  return (
    <>
      <Header />
      <div className="home">
        <h1 className="md:text-5xl text-3xl  text-white ">Welcome to home</h1>
      </div>
    </>
  );
};

export default Home;
