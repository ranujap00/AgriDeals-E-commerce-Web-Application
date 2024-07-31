// SideNavigation.jsx
import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Collapse, Slider, Typography } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const categories = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports",
  "Toys",
  "Motors",
  "Collectibles",
];

const SideNavigation = ({ onCategorySelect, onPriceChange }) => {
  const [open, setOpen] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    onPriceChange(newValue);
  };

  return (
    <Box sx={{ width: 250, flexShrink: 0, borderRight: 1, borderColor: 'divider' }}>
      <List>
        <ListItem button onClick={handleClick}>
          <ListItemText primary="Categories" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {categories.map((category, index) => (
              <ListItem button key={index} sx={{ pl: 4 }} onClick={() => onCategorySelect(category)}>
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <ListItem>
          <Box sx={{ width: '100%' }}>
            <Typography gutterBottom>Price Range</Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
            />
            <Typography variant="caption">
              ${priceRange[0]} - ${priceRange[1]}
            </Typography>
          </Box>
        </ListItem>
      </List>
    </Box>
  );
};

export default SideNavigation;