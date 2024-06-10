import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../Api/api";
import axios from "axios";
import { Typography } from "@mui/material";

const Notification = () => {
  const [notification, setNotification] = useState([]);

  const getNotification = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getContact`);
      setNotification(response.data);
      // console.log(response.data);
      console.log("RES", notification.data);
    } catch (error) {
      console.log(error, "ERROR");
    }
  };
  useEffect(() => {
    getNotification();
  }, []);
  return (
    <>
      <div className="container">
        <Typography className="text-center" variant="h5">
          NOTIFICATIONS
        </Typography>
        {notification?.data?.map((e, i) => {
          return (
            <div key={i} className="row">
              <div className="col-md-12 text-center border shadow mt-4 p-3">
                <p>
                  <b>NAME:</b> {e.fullName}
                </p>
                <p>
                  <b>Email:</b> {e.email}
                </p>
                <p>
                  <b>Message:</b> {e.message}
                </p>
                <p>
                  <b>Phone Number:</b> {e.phoneNumber}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Notification;
