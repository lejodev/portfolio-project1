import React from "react";
import "./_login.scss";
import { useForm } from "react-hook-form";
import { Route } from "react-router-dom";
import MotoServices from "../moto-services/MotoServices";

const Login = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const BODY = {
      userName: data.username,
      password: data.password,
    };
    // Tha async await way
    try {
      const request = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(BODY),
      });

      //   const resp = request

      if (request.status === 200) {
        const token = await request.json();
        console.log(token.token);
        console.log(request);
        localStorage.setItem("token", token.token);
        return props.history.push("/services");
      } else {
        alert("User doesn't exists");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="login">
      <h1>LogIn</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            {...register("username", { required: true })}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            {...register("password", { required: true })}
          />
        </div>
        <input type="submit" value="LogIn" />
      </form>
    </div>
  );
};

export default Login;
