import React from "react";
import useFetch from "../../hooks/useFetch";

const Home = () => {
  // const {loading, result} = useFetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}`)
  const {loading, result} = useFetch(`https://api.nasa.gov/planetary/apod?api_key=nDIbCiboUueGLK5yfznO8tviTyfZmXt3iBSoM2eN`)

  const apod = result;
  return (
    <div>
      <h1>Welcome to the Nasa App!</h1>
      <img src={apod.url} alt="APOD" />
      <p>Today's astronomy picture of the day (Apod) is titled :</p>
      <h4>{apod.title}</h4>
      <p>It was taken in {apod.date}</p>
      <p>{apod.explanation}</p>
    </div>
  )
};

export default Home;
