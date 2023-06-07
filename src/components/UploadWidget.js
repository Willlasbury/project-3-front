import React from "react";
import { useEffect, useRef, useState } from "react";
import itemsAPI from "../utils/API/items";

const UploadWidget = () => {
  let imageArr = [];
  const [title, setTitle] = useState("");
  const [minimum_trade, setMinimum_trade] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  let uploadedImage = "";
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      return setTitle(value);
    }
    if (name === "minimum_trade") {
      return setMinimum_trade(value);
    }

    if (name === "category") {
      return setCategory(value);
    }

    if (name === "condition") {
      return setCondition(value);
    }

    // return name === "title" ? setTitle(value) : setMinimum_trade(value);
  };

  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  // useEffect(() => {
  cloudinaryRef.current = window.cloudinary;
  // console.log("cloudinaryRef:", cloudinaryRef);
  widgetRef.current = cloudinaryRef.current.createUploadWidget(
    {
      cloudName: "dlnloe77d",
      uploadPreset: "zoosknbg",
    },
    function (error, result) {
      if (result.event === "success") {
        console.log("result secure url?:", result.info.secure_url);
        imageArr.push(result.info.secure_url);
        console.log("result:", result);
        // uploadedImage = result.info.secure_url;
        //TODO: add post route here
      }
      // return uploadedImage;
      // return imageArr;
    }
  );
  // }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("title:", title);
    console.log("minimum_trade:", minimum_trade);
    // console.log("uploadedImage:", uploadedImage);
    console.log("imageArr:", imageArr);
    console.log("category:", category);
    console.log("condition:", condition);

    itemsAPI.createItems(
      title,
      category,
      minimum_trade,
      // uploadedImage,
      imageArr,
      condition,
      false,
      localStorage.getItem("token")
    );
    setTitle("");
    setMinimum_trade("");
    setCategory("");
    setCondition("");
  };

  return (
    <div className="flex flex-col items-center">
      <form className="form">
        <input
          type="text"
          className="px-3 border-4 border-stone-950 rounded-lg shadow-lg bg-amber-100 text-xl font-medium"
          value={title}
          name="title"
          onChange={handleInputChange}
          placeholder="Item"
        />
        <input
          type="number"
          className="px-3 border-4 border-stone-950 rounded-lg shadow-lg bg-amber-100 text-xl font-medium"
          value={minimum_trade}
          name="minimum_trade"
          onChange={handleInputChange}
          placeholder="Minimum trade value"
        />
        <select
          defaultValue='select a category'
          className="px-3 border-4 border-stone-950 rounded-lg shadow-lg bg-amber-100 text-xl font-medium"
          name="category"
          onChange={handleInputChange}
        >
          {/* <option value="" disabled selected>
            Select a category
          </option> */}
          <option value="sporting goods">Sporting Goods</option>
          <option value="home furnishings">Home Furnishings</option>
          <option value="auto">Auto</option>
          <option value="electronics">Electronics</option>
          <option value="pet gear">Pet Gear</option>
          <option value="free">Free</option>
        </select>
        <select
          defaultValue = 'Select a Condition'
          className="px-3 border-4 border-stone-950 rounded-lg shadow-lg bg-amber-100 text-xl font-medium"
          name="condition"
          onChange={handleInputChange}
        >
          {/* <option value="" disabled selected>
            Select a Condition
          </option> */}
          <option value="Like New">Like New</option>
          <option value="Slightly Used">Slightly Used</option>
          <option value="Used">Used</option>
          <option value="Decent">Decent</option>
          <option value="Rough">Rough</option>
        </select>
        <button
          className="px-3 border-4 border-stone-950 rounded-lg shadow-lg bg-amber-100 hover:font-bold hover:bg-amber-500 hover:text-stone-900 text-xl font-medium"
          onClick={(e) => {
            e.preventDefault();
            widgetRef.current.open();
          }}
        >
          Upload
        </button>
        <button
          className="px-3 border-4 border-stone-950 rounded-lg shadow-lg bg-amber-100 hover:font-bold hover:bg-amber-500 hover:text-stone-900 text-xl font-medium"
          onClick={handleFormSubmit}
        >
          Create Posting
        </button>
      </form>
    </div>
  );
};

export default UploadWidget;
