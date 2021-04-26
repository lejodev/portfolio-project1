import React, { useState, useEffect } from "react";
import "./_moto-services.scss";
import Service from "./serviceRow/Service";

const MotoServices = () => {
  const [available, setAvailable] = useState();
  let availableServices;
  useEffect(async () => {
    const request = await fetch(
      "http://localhost:3000/motorcyclist/available",
      {
        method: "GET",
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const resp  = await request.json()
    setAvailable(resp.length != 0);
    // console.log(resp.length);
    // availableServices = resp.length != 0;
  }, []);

  const doRows = () => {
    let rows = [];
    for (let i = 8; i <= 16; i++) {
      rows.push(
        `${
          i < 12
            ? i === 9
              ? `0${i}:00 ${i + 1}:00 AM`
              : i < 10
              ? `0${i}:00 0${i + 1}:00 AM`
              : `${i}:00 ${i + 1}:00 AM`
            : i === 12
            ? `${i}:00 0${i - 11}:00 PM`
            : `0${i - 12}:00 0${i - 11}:00 PM`
        }`
      );
    }
    console.log(rows);
    return rows;
  };
  return (
    <div className="moto-services">
      <div className="servicesContainer">
        {doRows().map((hour) => (
          <Service key={hour} availability={available} hour={hour} selectedBy={""} />
        ))}
      </div>
    </div>
  );
};

export default MotoServices;
