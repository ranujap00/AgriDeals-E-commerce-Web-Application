import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Spa } from "@mui/icons-material";

const mainCategories = [
  {
    name: "Agriculture Products and Services",
    subcategories: [
      "Agriculture Produce",
      "Value Added Products",
      "Agriculture Tools and Equipment",
      "Fertilizer",
      "Pesticides",
    ],
  },
  {
    name: "Other Products and Services",
    subcategories: [
      "Arts and Crafts",
      "Clothing",
      "Electronic Appliances",
      "Home Decor",
      "Educational Services",
    ],
  },
];

const SideNavigation = ({ onCategorySelect, onPriceChange }) => {
  const [openCategories, setOpenCategories] = useState({
    agriculture: true,
    other: true,
  });
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleCategoryClick = (category) => {
    setOpenCategories((prevOpenCategories) => ({
      ...prevOpenCategories,
      [category]: !prevOpenCategories[category],
    }));
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    onPriceChange(newValue);
  };

  return (
    <Box
      sx={{
        flexShrink: 0,
        p: 2,
        mt: 10,
        maxWidth: 280,
      }}
    >
      <Typography variant="h6">Product Categories</Typography>
      <List>
        <ListItem
          sx={{ cursor: "pointer" }}
          onClick={() => onCategorySelect("all")}
        >
          <Spa color="primary" sx={{mr: 2}}/>
          <ListItemText primary="All Products" />
        </ListItem>
        {mainCategories.map((mainCategory, index) => {
          const isAgriculture =
            mainCategory.name === "Agriculture Products and Services";
          const categoryKey = isAgriculture ? "agriculture" : "other";

          return (
            <React.Fragment key={index}>
              <ListItem onClick={() => handleCategoryClick(categoryKey)}>
                <ListItemText
                  sx={{ cursor: "pointer" }}
                  primary={<Typography>{mainCategory.name}</Typography>}
                />
                {openCategories[categoryKey] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse
                in={openCategories[categoryKey]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {mainCategory.subcategories.map((subcategory, subIndex) => (
                    <ListItem
                      key={subIndex}
                      sx={{ pl: 4, cursor: "pointer" }}
                      onClick={() => onCategorySelect(subcategory)}
                    >
                      <ListItemText primary={subcategory} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
};

export default SideNavigation;
