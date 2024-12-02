import React from "react";
import { useEffect, useState } from "react";
import { getListMovies } from "../../api/api";
import Header from "../../component/Header/Header";

export default function Home() {
  const [arrMovie, setArrMovie] = useState([]);
  useEffect(() => {
    getListMovies().then((res) => {
      setArrMovie([...res.data]);
    });
  }, []);

  return (
    <>
      <Header />
      <Header />
      <SlickReact />
      <ListMovie arrMovie={arrMovie} />
      <MenuCinema />
      <Footer />
    </>
  );
}
