import React from "react";
import "./_header.scss";
import { Link, Router } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
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
