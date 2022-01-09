import React from "react";

import {
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  Cascader,
  InputNumber,
  Mentions,
} from "antd";

import "./form-input.style.scss";

export default function FormInput({
  label,
  id,
  handleChange,
  getlatlng,
  handleCity,
  handleArea,
  handleClick,
  ...otherProps
}) {
  const [error, setError] = React.useState("success");

  const check = (e) => {
    if (e.target.value === "") {
      console.log(e.target.parentNode);
      setError("error");
    } else {
      // Check if city is a string
      if (e.target.name === "city") {
        var re = /^[a-zA-Z]+$/;
        if (!re.test(e.target.value)) {
          setError("Num_err");
        } else {
          setError("success");
        }
      }
      // Check if pincode is a number
      else if (e.target.name === "pincode") {
        var re = /^[0-9]+$/;
        if (!re.test(e.target.value)) {
          setError("Char_err");
        } else {
          setError("success");
        }
      } else {
        setError("success");
      }
    }
  };

  function getError() {
    if (error === "error") {
      return "Enter a value";
    }
    if (error === "Num_err") {
      return "Enter valid city name";
    }
    if (error === "Char_err") {
      return "Enter valid pincode";
    }
  }

  return (
    <div className="group">
      <Form.Item validateStatus={error} help={getError()}>
        <Input
          className="form-input"
          onBlur={(getlatlng, check)}
          onChange={handleChange}
          {...otherProps}
        />
        {label ? (
          <label
            className={`${
              otherProps.value.length ? "shrink" : ""
            } form-input-label`}
          >
            {" "}
            {label}{" "}
          </label>
        ) : null}
      </Form.Item>
    </div>
  );
}
