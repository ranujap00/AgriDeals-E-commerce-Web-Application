// Footer.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import { GitHub, LinkedIn, Twitter } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        backgroundColor: "secondary.main",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: {
            xs: "100%",
            xl: "80vw",
          }
        }}
      >
        <Stack direction="row" justifyContent="space-between" my={4}>
          <Box>
            <Typography
              variant="h4"
              component="div"
              color="primary"
              sx={{ cursor: "pointer", fontWeight: "bold", mb: 4 }}
              onClick={() => navigate("/")}
            >
              Agri Deals
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Box>
                <Typography sx={{ fontWeight: "500" }}>Email</Typography>
                <Typography>hello@agrideals.com</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontWeight: "500" }}>Contact</Typography>
                <Typography>+94 71 234 5678</Typography>
              </Box>
            </Stack>
          </Box>
          <Box>
            <Typography
              align="right"
              variant="h5"
              sx={{ fontWeight: 500, mb: 1, maxWidth: 320 }}
            >
              Your Trusted Marketplace for Agricultural Needs!
            </Typography>
          </Box>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Typography variant="body1" align="center">
            E-Commerce © {new Date().getFullYear()}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
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
        </Stack>
      </Container>
    </Box>
  );
}
