// Footer.jsx

import React from "react";
import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import { GitHub, LinkedIn, Twitter } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: 'grey',
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="body1" align="center">
          E-Commerce © {new Date().getFullYear()}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <IconButton
              component={Link}
              href="https://github.com/"
              target="_blank"
              rel="noopener"
              color="inherit"
              aria-label="GitHub"
            >
              <GitHub />
            </IconButton>
            <IconButton
              component={Link}
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener"
              color="inherit"
              aria-label="LinkedIn"
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              component={Link}
              href="https://twitter.com/"
              target="_blank"
              rel="noopener"
              color="inherit"
              aria-label="Twitter"
            >
              <Twitter />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
