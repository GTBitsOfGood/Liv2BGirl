import React from "react";

const HomePage = () => {
  return (
    <>
      <h2>Welcome to Next.js!</h2>
      <h3>{`Env: ${process.env.TESTENV}`}</h3>
    </>
  );
};

export default HomePage;
