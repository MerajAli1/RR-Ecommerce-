import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../Api/api";
import axios from "axios";

const OrderedPlaced = () => {
  const [allOrder, setAllOrder] = useState([]);

  const [delivered, setDelivered] = useState(false);
  const getOrders = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getOrder`);
      setAllOrder(response.data);
      // console.log("RES", allOrder.data.length);
    } catch (error) {
      console.log(error, "ERROR");
    }
  };
  // console.log(delivered);
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <div>
        <h2 className="fw-bolder mb-4 mt-3">
          Total No. Of Orders: {allOrder?.data?.length}{" "}
        </h2>
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>S.No</th>
              <th>OrderName</th>
              <th>ClientName</th>
              <th>Address</th>
              <th>ClientNumber</th>
              <th>Email</th>
              <th className="ps-5">Action</th>
            </tr>
          </thead>
          {allOrder?.data?.map((e, i) => (
            <tbody key={i}>
              {delivered === false ? (
                <tr>
                  <td>{i + 1}</td>
                  <td>T-Shirt</td>
                  <td>{e.firstName + " " + e.lastName}</td>
                  <td>{e.address}</td>
                  <td>{e.phoneNumber}</td>
                  <td>{e.email}</td>
                  <td>
                    <button
                      onClick={() => setDelivered(true)}
                      className="btn btn-white text-danger bg-white"
                    >
                      Delivered
                    </button>
                    <button className="btn btn-white text-danger bg-white ms-2">
                      Rejected  
                    </button>
                  </td>
                </tr>
              ) : "no result"}
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
};

export default OrderedPlaced;
