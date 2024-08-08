import React from 'react';
import { Box } from '@mui/material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const CustomPrevArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ ...style, display: "block", left: -30, zIndex: 1, color: "grey" }}
    onClick={onClick}
  >
    <i className="fas fa-chevron-left"></i>
  </div>
);

const CustomNextArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ ...style, display: "block", right: -30, zIndex: 1, color: "grey" }}
    onClick={onClick}
  >
    <i className="fas fa-chevron-right"></i>
  </div>
);

const ProductImageCarousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    autoplay: true, 
    autoplaySpeed: 3000, 
  };

  return (
    <>
      {images.length > 1 ? (
        <Slider {...settings}>
          {images.map((image, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                height: 400,
                overflow: "hidden",
                borderRadius: 8,
              }}
            >
              <img
                src={image}
                alt={`Product image ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Slider>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: 400,
            overflow: "hidden",
            borderRadius: 8,
          }}
        >
          <img
            src={images[0]}
            alt="Product image"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      )}
    </>
  );
};

export default ProductImageCarousel;