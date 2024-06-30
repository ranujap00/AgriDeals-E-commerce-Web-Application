import React from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import '../styles/Home.css';

const products = [
  { id: 1, name: 'Product 1', price: 29.99, image: '/src/assets/product1.jpg' },
  { id: 2, name: 'Product 2', price: 49.99, image: '/src/assets/product2.jpg' },
  { id: 3, name: 'Product 3', price: 19.99, image: '/src/assets/product3.jpg' },
];

const Home = () => {
  return (
    <div className="home">
      <Header />
      <main className="container">
        <h1>Welcome to Our E-Commerce Store</h1>
        <div className="products">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
