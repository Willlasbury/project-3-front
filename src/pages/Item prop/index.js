import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
// import { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

export default function Items({ id, picture, title, category, condition }) {
  console.log("title", title);
  return (
    <>
      <h1>Items page</h1>
      <AliceCarousel>
        {picture.map((photo, index) => (
          <img key={index} src={photo.url} className="sliderimg" />
        ))}
      </AliceCarousel>
      <h3 className="item-title text-black">{title}</h3>
      <p className="item-category text-black"> Category: {category}</p>
      <p className="text-black">Condition: {condition}</p>
      <Link to={`/item`} className="item-link text-black" id={id}>
        View Item
      </Link>
    </>
  );
}
