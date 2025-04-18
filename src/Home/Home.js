// src/pages/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Dragon Tiger",
      description: "Click to play the exciting Dragon Tiger game!",
      image: "./assets/DragonTiger.png",
      path: "/dragon",
    },
    {
      title: "Teen Patti",
      description: "Experience the thrill of Teen Patti!",
      image: "./assets/DragonTiger.png",
      path: "/teenpatti",
    },
    {
      title: "Rummy",
      description: "Play classic Indian Rummy online!",
      image: "./assets/DragonTiger.png",
      path: "/rummy",
    },
    {
      title: "Andar Bahar",
      description: "Simple and fun Andar Bahar card game!",
      image: "./assets/DragonTiger.png",
      path: "/andarbahar",
    },
    {
      title: "Poker",
      description: "Challenge your poker skills now!",
      image: "./assets/DragonTiger.png",
      path: "/poker",
    },
    {
      title: "Ludo",
      description: "Play Ludo with your friends online!",
      image: "./assets/DragonTiger.png",
      path: "/ludo",
    },
  ];

  return (
    <div className="px-4 py-10 flex justify-center items-center">
      <div className="flex flex-wrap gap-6 max-w-6xl w-full">

        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className=" w-40 h-40 relative bg-gradient-to-br from-gray-800 to-black rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform cursor-pointer aspect-w-1 aspect-h-1"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-40 h-40 object-cover transition-opacity duration-300 opacity-100 hover:opacity-30"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 p-4 rounded-xl">
              <h2 className="text-xl font-semibold text-white">{card.title}</h2>
              <p className="text-white text-sm mt-1">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
