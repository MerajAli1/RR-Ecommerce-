import Autocomplete from "@mui/joy/Autocomplete";
import { Card, CardContent, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../Api/api";
import { useLocation } from "react-router-dom";

const UpdateProduct = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);

  const location = useLocation();
  const id = location?.state?.id;
  console.log(id);
  const deleteProduct = async (e) => {
    e.preventDefault();
   try {
    const response = await axios.delete(`${BASE_URL}/deleteProduct/${id}`);
    console.log(response.data);
   } catch (error) {
    console.log("error", error);
   }
  };
  const productUpdate = async (e) => {
    e.preventDefault();
    if (category == "" || title == "" || price == "" || description == "") {
      alert("Fill all the fields");
    } else {
      let updatedData = {
        category,
        title,
        price,
        description,
        image,
      };
      console.log(updatedData);
      try {
        const response = await axios.put(`${BASE_URL}/updateProduct/${id}`, {
          category,
          title,
          price,
          description,
        });
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
      alert("Updated Successfully");
    }
  };
  return (
    <div>
      <h1 className="d-flex justify-content-center fw-bold">Update Form</h1>
      <Card
        style={{
          maxWidth: 450,
          maxHeight: 470,
          margin: "0 auto",
          padding: "10px 5px",
          border: "1px solid black",
        }}
      >
        <CardContent>
          <form>
            <Grid container spacing={1}>
              <Grid xs={12} item>
                <Autocomplete
                  className="py-3"
                  placeholder="Category"
                  options={[
                    "fruits",
                    "vegetables",
                    "poultry",
                    "beef",
                    "pork",
                    "fish",
                    "milk",
                    "cheese",
                    "yougert",
                    "eggs",
                    "bread",
                    "pastries",
                    "rice",
                    "pasta",
                    "flour",
                    "cannedvegetables",
                    "soups",
                    "salt",
                    "pepper",
                    "herbs",
                  ]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      variant="outlined"
                    />
                  )}
                  onChange={(event, value) => setCategory(value)}
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  required
                  label="UpdatedTitle"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="productTitle"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  required
                  label="UpdatedDescription"
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rows={4}
                  placeholder="productDescription"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  required
                  type="number"
                  label="UpdatedPrice"
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="productPrice"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid
                xs={12}
                marginTop={1}
                item
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button className="btn btn-dark px-5" onClick={productUpdate}>
                  Upload
                </button>
                <button className="btn btn-danger px-5" onClick={deleteProduct}>
                  Delete
                </button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateProduct;
