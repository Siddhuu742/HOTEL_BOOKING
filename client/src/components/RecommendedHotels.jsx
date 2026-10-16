import React, { useState, useEffect } from "react";
import Hotelcard from "./Hotelcard";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";

const RecommendedHotels = () => {
  const { rooms=[], searchedCities =[]} = useAppContext();
  const [recommended, setRecommended] = useState([]);

  const filteredHotels = () => {
    const filteredHotels = rooms.filter(
      (room) => room.hotel && searchedCities.includes(room.hotel.city)
    );
    setRecommended(rooms);
  };
  

  useEffect(() => {
    filteredHotels();
  }, [rooms, searchedCities]);

  return (
    <div
      className="flex flex-col items-center px-6 md:px-16 
    lg:px-24 bg-slate-50 py-20"
    >
      <Title
        Title="Recommended Hotels"
        subTitle="Discover our handpicked selection of exceptional properties around the world, offering unique luxury and unforgettable memories and experiences."
      />

      <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
        {recommended.slice(0, 4).map((room, index) => (
          <Hotelcard key={room._id} room={room} index={index} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedHotels;
