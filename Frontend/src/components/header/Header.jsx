import React from "react";
import "./_header.scss";
import { Link, Router } from "react-router-dom";

const Header = (props) => {
  const handleClick = () => {
    try {
      return props.history.push("/");
    } catch (error) {
      console.error(error);
      alert("Error", error);
    }
  };

  return (
    <header className="header" onClick={handleClick}>
      <nav>
        {/* <Router> */}
        {/* <Link to="/signin">Moto services</Link> */}
        {/* </Router> */}
        Moto services
      </nav>
    </header>
  );
};

export default Header;
