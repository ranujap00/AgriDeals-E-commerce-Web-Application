import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Slider,
  Typography,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

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
    <Box sx={{ width: 250, flexShrink: 0, borderRight: 1, borderColor: "divider", padding: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Product Categories
      </Typography>
      <List>
        {mainCategories.map((mainCategory, index) => {
          const isAgriculture = mainCategory.name === "Agriculture Products and Services";
          const categoryKey = isAgriculture ? "agriculture" : "other";

          return (
            <React.Fragment key={index}>
              <ListItem button onClick={() => handleCategoryClick(categoryKey)}>
                <ListItemText 
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {mainCategory.name}
                    </Typography>
                  } 
                />
                {openCategories[categoryKey] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openCategories[categoryKey]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {mainCategory.subcategories.map((subcategory, subIndex) => (
                    <ListItem
                      button
                      key={subIndex}
                      sx={{ pl: 4 }}
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
