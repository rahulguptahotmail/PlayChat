import React, { useEffect, useState } from "react";
import axios from "axios";
import HomeVideo from "../utils/homeUtils/HomeVideo";

const Home = () => {
  const [items, setItems] = useState([]);
  
  const [refresh, setRefresh] = useState();


  const stateHandler = () => {
    if (refresh === 1) setRefresh(0);
    else setRefresh(1);
  };

 
  useEffect(() => {
    const fetchVideos = async () => {

      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/video/videos`)
      setItems(res.data.videos);
    };

    fetchVideos();
  }, [refresh]);

  return (
    <div
      id="homeVideos"
      className="d-flex flex-wrap ms-md-4 ps-md-5 pt-2 text-center border"
    >
      <div id="loader" className=" w-100 d-none">
        <div className="loader m-auto"></div>
      </div>
      {items.map((item, index) => (
        
        <HomeVideo index={index} video={item}/>
      ))}
    </div>
  );
};

export default Home;
