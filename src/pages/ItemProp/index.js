import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
// import { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

export default function Items({ id, picture, title, category, condition }) {
  console.log("title", title);
  const itemId = id;
  console.log("id:", id);
  return (
    <div className="flex flex-col items-center m-3 px-3 border-4 border-stone-950 rounded-lg shadow-lg bg-amber-100 text-xl font-medium">
    
      <AliceCarousel className="justify-center">
        {picture.map((photo, index) => (
          <img key={index} src={photo.url} className="sliderimg" />
        ))}
      </AliceCarousel>
      <h3 className="item-title text-black">{title}</h3>
      <p className="item-category text-black"> Category: {category}</p>
      <p className="text-black">Condition: {condition}</p>
      <Link to={`/item/${id}`} className="item-link px-3 m-2 border-4 border-stone-950 rounded-lg shadow-lg bg-amber-100 hover:font-bold hover:bg-cyan-500 text-xl font-medium">
        View Item
      </Link>
    </div>
  );
}
