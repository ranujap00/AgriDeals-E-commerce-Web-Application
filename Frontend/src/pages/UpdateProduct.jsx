import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import DeleteIcon from "@mui/icons-material/Delete";
import Footer from "../components/Footer";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports",
  "Toys",
  "Motors",
  "Collectibles",
];

const BASE_URI = process.env.REACT_APP_API_BASE_URL;

const UpdateProductPage = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [formData, setFormData] = useState({
    item_id: "",
    name: "",
    category: "",
    description: "",
    price: "",
    post_date: "",
    expiry_date: "",
    available_count: "",
    status: "active",
  });
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URI}/api/items/${itemId}`
        );
        const product = response.data;
        setFormData({
          item_id: product.item_id,
          name: product.name,
          category: product.category,
          description: product.description,
          price: product.price,
          post_date: product.post_date.split("T")[0],
          expiry_date: product.expiry_date.split("T")[0],
          available_count: product.available_count,
          status: product.status,
        });
        setImages(product.images);
        setPreviewImages(product.images);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [itemId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);

    const newPreviewImages = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviewImages]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setPreviewImages((prevPreviews) => {
      const newPreviews = prevPreviews.filter((_, i) => i !== index);
      prevPreviews[index].preview &&
        URL.revokeObjectURL(prevPreviews[index].preview);
      return newPreviews;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      item_id: formData.item_id,
      name: formData.name,
      category: formData.category,
      description: formData.description,
      price: parseFloat(formData.price), 
      post_date: new Date(formData.post_date).toISOString(),
      expiry_date: new Date(formData.expiry_date).toISOString(), 
      available_count: parseInt(formData.available_count),
      status: formData.status,
      images: [], 
    };
    const imagePromises = images.map(
      (image) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve(event.target.result);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(image);
        })
    );

    try {
      const imageData = await Promise.all(imagePromises);
      productData.images = imageData;

      console.log("Product Data being sent:", productData);

      const response = await axios.put(
        `https://agri-deals-5f3f0e7ec551.herokuapp.com/api/items/${itemId}`,
        productData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Product updated:", response.data);
      navigate("/home");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const cartItems = useSelector((state) => state.cart.items);

  const removeFromCart = (item_id) => {
    dispatch(removeItem(item_id));
  };

  return (
    <>
      <Header cartItems={cartItems} removeFromCart={removeFromCart} />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Update Product
        </Typography>
        <Paper elevation={3} sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Product Images
                </Typography>
                <input
                  accept="image/*"
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button variant="contained" component="span">
                    Upload Images
                  </Button>
                </label>
                <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
                  {previewImages.map((image, index) => (
                    <Box key={index} sx={{ position: "relative" }}>
                      <img
                        key={index}
                        src={image}
                        alt={`Preview ${index + 1}`}
                        style={{ width: 200, height: 200, objectFit: "cover" }}
                      />
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: 5,
                          right: 5,
                          bgcolor: "rgba(255,255,255,0.7)",
                        }}
                        onClick={() => handleRemoveImage(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Item ID"
                  name="item_id"
                  value={formData.item_id}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    label="Category"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  margin="normal"
                  multiline
                  rows={4}
                  required
                />
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Post Date"
                  name="post_date"
                  type="date"
                  value={formData.post_date}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  fullWidth
                  label="Expiry Date"
                  name="expiry_date"
                  type="date"
                  value={formData.expiry_date}
                  onChange={handleInputChange}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  required
                />
                <TextField
                  fullWidth
                  label="Available Count"
                  name="available_count"
                  type="number"
                  value={formData.available_count}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    label="Status"
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
                <Box mt={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Update Product
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default UpdateProductPage;
