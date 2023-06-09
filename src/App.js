import React from "react";
import { useEffect, useState } from "react";

import socketConnect from "./utils/socket/connection";
import userAPI from "./utils/API/users";
import offerAPI from "./utils/API/offer";
import categoriesAPI from "./utils/API/categories";
import backgroundImage from "./utils/images/background.jpg";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Category from "./pages/Category";
import FreeItem from "./pages/FreeItem";
import LookingFor from "./pages/LookingFor";
import PostItem from "./pages/PostItem";
import Browse from "./pages/Browse";
import Items from "./pages/Individual Items Page";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";
import Search from "./pages/Search";
import Flip from "./pages/Flip";
import YourItems from "./pages/YourItems";
import Offer from "./pages/Offer";
import Notification from "./pages/Notifications";
import EditItem from "./pages/edit item";
import "./index.css";

// const socket = socketConnect();

export default function App() {
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [messages, setMessages] = useState();
  const [socket, setSocket] = useState();
  const [offers, setOffers] = useState([]);
  const [yourOffers, setYourOffers] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState();

  useEffect(() => {
    try {
      if (token) {
        userAPI.verifyToken(token).then((data) => {
          if (data.msg === "bad token") {
            localStorage.removeItem("token");
            setToken(null);
          } else {
            setUserName(data.userName);
            // userAPI.getMessages(token).then((data) => {
            //   setMessages(data);
            // });
            // offerAPI.getRecievedOffers(token).then((data) => {
            //   // setOffers(data.msg ? [] : data);
            // });
            // offerAPI.getSentOffers(token).then((data) => {
            //   setYourOffers(data);
            // });
            // categoriesAPI
            //   .getCategories()
            //   .then((data) => setCategoryOptions(data));

            // const socket = socketConnect(token);
            // setSocket(socket);
            // console.log("socket:", socket)
            // if (socket) {
            //   socket.emit("add_user", token);
            // }
          }
        });
      }
    } catch (err) {
      console.log("oh noes");
      console.log(err);
      logout();
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserName(null);
    setOffers([]);
  };

  useEffect(() => {
    const socket = socketConnect(token);
    setSocket(socket);
  }, []);

  return (
    <BrowserRouter>
      <NavBar
        userName={userName}
        logout={logout}
        messages={messages}
        socket={socket}
        token={token}
        setOffers={setOffers}
        offers={offers}
      />
      <main
        className="p-2 h-full overflow-auto overscroll-auto"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundAttachment: "fixed",
        }}
      >
        <Routes>
          <Route path="/" element={<Browse token={token} />} />
          <Route
            path="/login"
            element={
              <Login
                socket={socket}
                setUserName={setUserName}
                setToken={setToken}
                userName={userName}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup
                setUserName={setUserName}
                setToken={setToken}
                userName={userName}
              />
            }
          />
          <Route path="/yourItems" element={<YourItems token={token} />} />
          <Route
            path="/items/:id/editItem"
            element={<EditItem token={token} />}
          />
          <Route path="/category" element={<Category token={token} />} />
          <Route path="/freeitem" element={<FreeItem token={token} />} />
          <Route path="/lookingfor" element={<LookingFor token={token} />} />
          <Route
            path="/postitem"
            element={
              <PostItem token={token} categoryOptions={categoryOptions} />
            }
          />
          <Route path="/browse/:id" element={<Browse token={token} />} />
          <Route
            path="/items/:id"
            element={<Items socket={socket} token={token} />}
          />
          <Route
            path="/chat"
            element={<Chat socket={socket} token={token} />}
          />
          <Route
            path="/offer/:id"
            element={<Offer token={token} socket={socket} />}
          />
          <Route path="/search" element={<Search token={token} />} />
          <Route path="/items" element={<Items token={token} />} />
          <Route path="/flip" element={<Flip token={token} />} />
          <Route
            path="/notifications"
            element={
              <Notification
                socket={socket}
                token={token}
                offers={offers}
                yourOffers={yourOffers}
                messages={messages}
              />
            }
          />
          <Route path="/*" element={<NotFound token={token} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
