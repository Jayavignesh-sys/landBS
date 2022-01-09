import React from "react";
import { Link } from "react-router-dom";

import FormInput from "./form-input.component";
import CustomButton from "./custom-button.component";

import { signInWithGoogle } from "./fire/fire";

import "./signin.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ email: "", password: "" });
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h1> Hello World </h1>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label="email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="password"
            required
          />
          <div className="buttons">
            <CustomButton type="submit"> Sign in </CustomButton>
            <CustomButton isGoogleSignIn onClick={signInWithGoogle}>
              {" "}
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const SigninAndSignup = () => (
  <div className="signin">
    <Link to="/" className="home">
      <h3> HomePage </h3>
    </Link>{" "}
    <SignIn />
  </div>
);

export default SigninAndSignup;
