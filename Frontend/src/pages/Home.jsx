import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

const products = [
  { id: 1, name: 'Product 1', price: 29.99, image: '/src/assets/product1.jpg' },
  { id: 2, name: 'Product 2', price: 49.99, image: '/src/assets/product2.jpg' },
  { id: 3, name: 'Product 3', price: 19.99, image: '/src/assets/product3.jpg' },
];

function Home() {
  return (
    <>
      <Header />
      <Container style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem 0' }}>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
