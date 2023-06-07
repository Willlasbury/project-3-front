import React from "react";
import { useEffect, useState } from "react";

import socketConnect from "./utils/socket/connection";
import userAPI from "./utils/API/users";
import backgroundImage from "./utils/images/background.jpg";
import Home from "./pages/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Category from "./pages/Category";
import FreeItem from "./pages/FreeItem";
import LookingFor from "./pages/LookingFor";
import PostItem from "./pages/PostItem";
import Item from "./pages/ItemProp";
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
import "./index.css";

// const socket = socketConnect();

export default function App() {
  // create socket connection at root level and pass it to all pages
  // you will call functions from utils/socket in pages to use the socket prop
  const [userId, setUserId] = useState(-1);
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [messages, setMessages] = useState();
  const [socket, setSocket] = useState();
  const [offers, setOffers] = useState(0);

  useEffect(() => {
    try {
      if (token) {
        userAPI.verifyToken(token).then((data) => {
          if (data.msg === "bad token") {
            localStorage.removeItem("token");
            setToken(null);
          } else {
            setUserId(data.id);
            setUserName(data.userName);
            userAPI.getMessages(token).then((data) => {
              setMessages(data.length);
            });
            userAPI.getOffers(token).then((data) => {
              setOffers(data.msg ? 0:data.length)
            })
          }
        });
      }
    } catch (err) {
      console.log("oh noes");
      console.log(err);
      logout();
    }
  }, [userId]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserName(null);
    setUserId(0);
    setOffers(0);
  };

  useEffect(() => {
    const socket = socketConnect(token);
    setSocket(socket);
  }, []);

  return (
    <section
      className="flex flex-col min-h-screen mb-12 bg-cover bg-center h-full"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
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
        <Routes>
          <Route path="/" element={<Home token={token} />} />
          <Route
            path="/login"
            element={
              <Login
                socket={socket}
                setUserId={setUserId}
                setUserName={setUserName}
                setToken={setToken}
                userId={userId}
                userName={userName}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup
                setUserId={setUserId}
                setUserName={setUserName}
                setToken={setToken}
                userId={userId}
                userName={userName}
              />
            }
          />
          <Route
            path="/yourItems"
            element={<YourItems userId={userId} token={token} />}
          />
          <Route path="/category" element={<Category token={token}/>} />
          <Route path="/freeitem" element={<FreeItem token={token}/>} />
          <Route path="/lookingfor" element={<LookingFor token={token}/>} />
          <Route path="/postitem" element={<PostItem token={token}/>} />
          <Route path="/browse" element={<Browse token={token}/>} />
          <Route
            path="/items/:id"
            element={<Items socket={socket} token={token} userId={userId} />}
          />
          <Route
            path="/chat"
            element={<Chat socket={socket} token={token} />}
          />
          <Route path="/offer" element={<Offer token={token}/>} />
          <Route path="/search" element={<Search token={token}/>} />
          <Route path="/items" element={<Items token={token}/>} />
          <Route path="/flip" element={<Flip token={token}/>} />
          <Route path="/*" element={<NotFound token={token}/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </section>
  );
}
