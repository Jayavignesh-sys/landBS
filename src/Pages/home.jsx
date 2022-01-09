// Importing libraries

import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="homepage">
      <h1> Hello World, Welcome to Nameless Form </h1>
      <Link to="/form" className="form">
        <h3> Submit Form </h3>
      </Link>
      <Link to="/home" className="ho">
        <h3> HomePage </h3>
      </Link>
    </div>
  );
};

export default HomePage;
