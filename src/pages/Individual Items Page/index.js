import React, { useState, useEffect, useLocation } from "react";
import itemsAPI from "../../utils/API/items";
import userAPI from "../../utils/API/users";
import categoriesAPI from "../../utils/API/categories";
import AliceCarousel from "react-alice-carousel";
import { useNavigate } from "react-router-dom";
import "react-alice-carousel/lib/alice-carousel.css";
import "./style.css";

export default function Item({ socket, token }) {
  const [category, setCategory] = useState([]);
  const [seller, setSeller] = useState([]);
  const [item, setItem] = useState({
    Photos: [{}],
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const itemId = window.location.pathname.replace("/items/", "");
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const fetchedItem = await itemsAPI.getItemId(itemId);
        setItem(fetchedItem);
        const fetchedCategory = await categoriesAPI.getCategoriesById(
          fetchedItem.CategoryId
        );
        setCategory(fetchedCategory);
        const fetchedUser = await userAPI.getUserId(fetchedItem.seller_id);
        setSeller(fetchedUser);
      } catch (error) {
        console.log("Error fetching items:", error);
      }
    };

    fetchItem();
  }, []);

  const deleteItem = (event) => {
    event.preventDefault();
    itemsAPI.deleteItemId(item.id);
    navigate("/YourItems");
  };
  //TODO: nav to offer page
  const offerPage = (event) => {
    event.preventDefault();
    navigate(`/offer/${itemId}`);
  };


  return (
    <p>todo: refactor with item component</p>
    // <div className="flex flex-col items-center mt-5 mb-5">
    //   <div className="card mx-auto p-4 max-w-sm border-stone-950 bg-amber-100 rounded-lg shadow-lg text-center">
    //     <form className="px-3 m-2 border-4 border-stone-950 rounded-lg shadow-lg bg-amber-100 text-xl font-medium">
    //       <h1 className="px-3 border-4 border-stone-950 rounded-lg shadow-lg bg-amber-100 text-xl font-medium m-2">
    //         Individual Item
    //       </h1>
    //       <AliceCarousel>
    //         {item.Photos.map((photo, index) => (
    //           <img key={index} src={photo.url} className="sliderimg" />
    //         ))}
    //       </AliceCarousel>
    //       <h2 className="px-3 border-4 border-stone-950 rounded-lg shadow-lg bg-amber-100 text-xl font-medium m-2">
    //         Title: {item.title}
    //       </h2>
    //       <h2 className="px-3 border-4 border-stone-950 rounded-lg shadow-lg bg-amber-100 text-xl font-medium m-2">
    //         Seller: {seller.userName}
    //       </h2>
    //       <h2 className="px-3 border-4 border-stone-950 rounded-lg shadow-lg bg-amber-100 text-xl font-medium m-2">
    //         Condition: {item.condition}
    //       </h2>
    //       <h2 className="px-3 border-4 border-stone-950 rounded-lg shadow-lg bg-amber-100 text-xl font-medium m-2">
    //         Category: {category.name}
    //       </h2>
    //       <h2 className="px-3 border-4 border-stone-950 rounded-lg shadow-lg bg-amber-100 text-xl font-medium m-2">
    //         Minimum Trade: {item.minimum_trade}
    //       </h2>
    //       <h2 className="px-3 border-4 border-stone-950 rounded-lg shadow-lg bg-amber-100 text-xl font-medium m-2">
    //         Description: {item.description}
    //       </h2>

    //       {userId === item.seller_id ? (
    //         <>
    //           <button
    //             className="px-3 border-4 border-stone-950 rounded-lg shadow-lg bg-amber-100 text-xl font-medium m-2"
    //             onClick={() => {
    //               navigate(`editItem`);
    //             }}
    //           >
    //             Edit
    //           </button>
    //           <button
    //             onClick={deleteItem}
    //             className="px-3 border-4 border-stone-950 rounded-lg shadow-lg bg-amber-100 text-xl font-medium m-2"
    //           >
    //             Delete
    //           </button>
    //         </>
    //       ) : (
    //         //offer should nav to offer page
    //         <button
    //           onClick={offerPage}
    //           className="px-3 border-4 border-stone-950 rounded-lg shadow-lg bg-amber-100 text-xl font-medium"
    //         >
    //           Submit Offer
    //         </button>
    //       )}
    //     </form>
    //   </div>
    // </div>
  );
}
