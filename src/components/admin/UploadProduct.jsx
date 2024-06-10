import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import Autocomplete from "@mui/joy/Autocomplete";
import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Api/api";

const UploadProduct = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [productId, setProductId] = useState("");
  const [image, setImage] = useState(null);
  const productUpload = async (event) => {
    event.preventDefault();
    if (
      category == "" ||
      title == "" ||
      price == "" ||
      description == "" ||
      image == ""
    ) {
      alert("Fill all the fields");
    } else {
      let productData = {
        category,
        title,
        price,
        product_id: productId,
        description,
        image,
      };
      console.log("FRONTEND LOG: ", productData);
      const response = await axios.post(`${BASE_URL}/Products`, productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      alert("productUpload");
    }
  };

  return (
    <div>
      <h1 className="d-flex justify-content-center mb-3 fw-bold">
        Upload Product
      </h1>
      <Card
        style={{
          maxWidth: 450,
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
                  label="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="productTitle"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  required
                  label="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rows={4}
                  placeholder="productDescription"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={6} item>
                <TextField
                  required
                  label="Price"
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="productPrice"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={6} item>
                <TextField
                  required
                  label="product_Id"
                  onChange={(e) => setProductId(e.target.value)}
                  placeholder="id"
                  type="number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  required
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid
                xs={12}
                item
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button className="btn btn-dark px-5" onClick={productUpload}>
                  Upload
                </button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadProduct;
