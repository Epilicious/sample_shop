import React, { Component, ReactElement } from "react";
import Slider, { LazyLoadTypes } from "react-slick";
import { useProductApi } from "../shared/ProductsApi";
import Product from "../types/Product";
import "./LazyLoad.css";

interface Settings {
  dots: boolean;
  lazyLoad: LazyLoadTypes;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  initialSlide: number;
}
function LazyLoad(): ReactElement {
  const [products] = useProductApi<Product[]>("get", "products");
  const settings: Settings = {
    dots: true,
    lazyLoad: "ondemand",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
  };

  if (!products) return <p>Loading Img...</p>;
  return (
    <Slider {...settings}>
      {products.map((product) => (
        <div key={product.id} className="img-container">
          <img
            className="images"
            src={product.image}
            alt={product.title}
            key={product.id}
          />
        </div>
      ))}
    </Slider>
  );
}

export default LazyLoad;
