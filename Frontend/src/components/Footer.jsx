import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Footer() {
  return (
    <Container component="footer" style={{ padding: '1rem 0', backgroundColor: '#333', color: '#fff', textAlign: 'center' }}>
      <Typography variant="body2">
        &copy; 2024 E-Commerce. All rights reserved.
      </Typography>
    </Container>
  );
}

export default Footer;
