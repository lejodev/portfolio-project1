import React, { useState, useEffect } from "react";
import "./_service.scss";

const Service = (props) => {
  const [taken, setTaken] = useState(false);

  const handleClick = async (id) => {
    if (props.availability) {
      const availableServiceRequest = await fetch(
        "http://localhost:3000/motorcyclist/select",
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const serviceId = await availableServiceRequest.json();
      const BODY = {
        userId: await localStorage.getItem("token"),
      };
      console.log(BODY);
      const selectAvailableService = await fetch(
        `http://localhost:3000/motorcyclist/${serviceId.id}`,
        {
          method: "PUT",
          //   mode: 'no-cors',
          headers: {
            "Content-type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(BODY),
        }
      );
      const result = await selectAvailableService.json();
      console.log(result);
    } else {
      alert("No available services");
    }
  };

  return (
    <div className="service" onClick={handleClick}>
      <h1>{props.hour}</h1>
    </div>
  );
};

export default Service;
