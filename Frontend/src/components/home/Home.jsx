import React from "react";
import { Link } from "react-router-dom";
import "./_style.scss";

const Home = () => {
  return (
    <div className="home">
      <main className="main">
        <div className="options">
          <Link to="/signin">
            <div className="signIn">signIn</div>
          </Link>
          <div className="divider"></div>
          <Link to="/login">
            <div className="logIn">logIn</div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
