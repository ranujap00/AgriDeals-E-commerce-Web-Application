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
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/admin/header";
import DeleteIcon from "@mui/icons-material/Delete";
import Footer from "../components/Footer";
import { getItem, updateItem } from "../api";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports",
  "Toys",
  "Motors",
  "Collectibles",
];

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (!itemId) {
      return;
    }
    const fetchProductData = async () => {
      try {
        const response = await getItem(itemId);
        const product = response;
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

    const newImagePromises = files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) =>
            resolve({ file, base64: event.target.result });
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        })
    );

    Promise.all(newImagePromises)
      .then((newImages) => {
        const uniqueImages = newImages.filter(
          (newImage) =>
            !images.some(
              (existingImage) => existingImage.name === newImage.file.name
            ) &&
            !previewImages.some(
              (existingImage) => existingImage === newImage.base64
            )
        );

        setImages((prevImages) => [
          ...prevImages,
          ...uniqueImages.map((img) => img.file),
        ]);
        setPreviewImages((prevPreviews) => [
          ...prevPreviews,
          ...uniqueImages.map((img) => img.base64),
        ]);
      })
      .catch((error) => {
        console.error("Error converting images to Base64:", error);
      });
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
      item_id: formData.item_id,
      name: formData.name,
      category: formData.category,
      description: formData.description,
      price: parseFloat(formData.price),
      post_date: new Date(formData.post_date).toISOString(),
      expiry_date: new Date(formData.expiry_date).toISOString(),
      available_count: parseInt(formData.available_count),
      status: formData.status,
      images: [...previewImages],
    };

    const newImagePromises = images
      .filter((image) => image instanceof File)
      .map(
        (image) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(image);
          })
      );

    try {
      const newImageData = await Promise.all(newImagePromises);

      const allImages = [...productData.images, ...newImageData];
      productData.images = Array.from(new Set(allImages));

      console.log("Product Data being sent:", productData);

      const response = await updateItem(itemId, productData);

      console.log("Product updated:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
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
                    disabled={isSubmitting}
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
