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
import { useNavigate } from "react-router-dom";
import Header from "../components/admin/header";
import Footer from "../components/Footer";
import DeleteIcon from "@mui/icons-material/Delete";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports",
  "Toys",
  "Motors",
  "Collectibles",
];

const BASE_URI = process.env.REACT_APP_BASE_URL;

const AddProductPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    address: "",
    name: "",
    category: "",
    description: "",
    price: "",
    expiry_period: "",
    available_count: "",
    status: "active",
  });
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
    }));
  }, []);

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
      URL.revokeObjectURL(prevPreviews[index]);
      return newPreviews;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      user: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        contactNumber: formData.contactNumber,
        address: formData.address,
      },
      product: {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        price: parseFloat(formData.price),
        expiry_period: formData.expiry_period,
        available_count: parseInt(formData.available_count),
        images: [],
      },
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
      productData.product.images = imageData;

      console.log("Product Data being sent:", productData);

      const response = await axios.post(`${BASE_URI}/api/items/`, productData, {
        headers: {
          "Content-Type": "application/json",
        },
        maxContentLength: 50 * 1024 * 1024,
        maxBodyLength: 50 * 1024 * 1024,
      });

      console.log("Product added:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add New Product
        </Typography>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <form onSubmit={handleSubmit}>
            {currentStep === 0 && (
              <Box maxWidth="sm">
                <Typography variant="h6" gutterBottom>Enter seller information</Typography>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Contact Number"
                  name="contactNumber"
                  type="tel"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  margin="normal"
                  multiline
                  rows={2}
                  required
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 3,
                    width: "100%",
                  }}
                >
                  <Button variant="contained" onClick={nextStep}>
                    Next
                  </Button>
                </Box>
              </Box>
            )}

            {currentStep === 1 && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" gutterBottom>
                    Product Details
                  </Typography>
                  <TextField
                    fullWidth
                    label="Product Name"
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
                    label="Expiry Period"
                    name="expiry_period"
                    type="number"
                    value={formData.expiry_period}
                    onChange={handleInputChange}
                    margin="normal"
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
                </Grid>
                <Grid item xs={12} md={4}>
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
                  <Box
                    sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 2 }}
                  >
                    {previewImages.map((image, index) => (
                      <Box
                        key={index}
                        sx={{ width: "calc(50% - 16px)", position: "relative" }}
                      >
                        <img
                          src={image}
                          alt={`Preview ${index + 1}`}
                          style={{
                            width: "100%",
                            height: 150,
                            objectFit: "cover",
                          }}
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
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 3,
                    }}
                  >
                    <Button variant="contained" onClick={prevStep}>
                      Back
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            )}
          </form>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default AddProductPage;
