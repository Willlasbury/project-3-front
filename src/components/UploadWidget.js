import { isFocusable } from "@testing-library/user-event/dist/utils";
import React from "react";
import { useEffect, useRef, useState } from "react";
import itemsAPI from "../utils/API/items";

import CategoryOptions from "./CategoryOptions";

const UploadWidget = ({ categoryOptions, token }) => {
  let imageArr = [];
  const [title, setTitle] = useState("");
  const [minimum_trade, setMinimum_trade] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
    if (name === "description") {
      return setDescription(value);
    }
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
        console.log("imageArr:", imageArr);
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

    itemsAPI.createItems(
      title,
      category,
      minimum_trade,
      description,
      imageArr,
      condition,
      token
    );
    setTitle("");
    setMinimum_trade("");
    setCategory("");
    setCondition("");
    setDescription("");
  };
  const fieldRequired = (e) => {
    if (!e.target.value) {
      setErrorMessage(`${e.target.name} field is required`);
    } else {
      setErrorMessage("");
    }
  };

  return (
    <>
      {errorMessage}
      <div className="m-2 flex flex-col items-center">
        <div className="card px-3 py-4 bg-amber-100 border-4 border-stone-950 rounded-lg shadow-lg">
          <div className="flex flex-col space-y-4">
            <input
              onBlur={fieldRequired}
              type="text"
              id="default-input"
              className="input-field px-3 border-4 border-stone-950 rounded-lg shadow-lg bg-amber-100 text-xl font-medium"
              value={title}
              name="title"
              onChange={handleInputChange}
              placeholder="Item"
            />
            <input
              onBlur={fieldRequired}
              type="number"
              id="default-input"
              className="input-field px-3 border-4 border-stone-950 rounded-lg shadow-lg bg-amber-100 text-xl font-medium"
              value={minimum_trade}
              name="minimum_trade"
              onChange={handleInputChange}
              placeholder="Minimum trade value"
            />
            <select
              className="input-field px-3 border-4 border-stone-950 rounded-lg shadow-lg bg-amber-100 text-xl font-medium"
              name="category"
              onChange={handleInputChange}
            >
              {/* <option value="" disabled selected>
              Select a category
            </option>{" "} */}

              {categoryOptions &&
                categoryOptions.map((value) => {
                  return (
                    <CategoryOptions
                      key={value.id}
                      value={value.id}
                      category={value.name}
                    />
                  );
                })}
            </select>
            <select
              defaultValue="Select a Condition"
              className="px-3 border-4 border-stone-950 rounded-lg shadow-lg bg-amber-100 text-xl font-medium"
              name="condition"
              onChange={handleInputChange}
            >
              {/* <option value="" disabled selected>
            Select a Condition
          </option>*/}
              <option value="Like New">Like New</option>
              <option value="Slightly Used">Slightly Used</option>
              <option value="Used">Used</option>
              <option value="Decent">Decent</option>
              <option value="Rough">Rough</option>
            </select>
            <input
              onBlur={fieldRequired}
              type="text"
              id="default-input"
              className="input-field px-3 border-4 border-stone-950 rounded-lg shadow-lg bg-amber-100 text-xl font-medium"
              value={description}
              name="description"
              onChange={handleInputChange}
              placeholder="description"
            />
            <button
              className="px-3 border-4 border-stone-950 rounded-lg shadow-lg bg-amber-100 hover:font-bold hover:bg-amber-500 hover:text-stone-900 text-xl font-medium"
              onClick={(e) => {
                e.preventDefault();
                widgetRef.current.open();
                console.log(widgetRef);
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
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadWidget;
