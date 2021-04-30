import React from "react";
import "./_signin.scss";
import { useForm } from "react-hook-form";

const Signin = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    if (data.password === data.repeatPassword) {
      const BODY = {
        userName: data.username,
        password: data.password,
      };
      fetch("http://localhost:3000/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(BODY),
      })
        .then((resp) => resp.json())
        .then(userID => console.log("USER", userID))// Tokenize this id
        .catch((err) => {
          console.log("ERR", err);
        });
    } else {
      alert("Passwrods doesn't match");
    }
  };

  return (
    <div className="signin">
      <h1>SignIn</h1>
      <form className="form" action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label htmlFor="username">UserName</label>
          <input
            type="text"
            name="username"
            id="username"
            {...register("username", { required: true })}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            {...register("password", { required: true })}
          />
        </div>
        <div className="form-control">
          <label htmlFor="repeat-password">Repeat password</label>
          <input
            type="password"
            name="repeat-password"
            id="repeat-password"
            {...register("repeatPassword", { required: true })}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signin;
