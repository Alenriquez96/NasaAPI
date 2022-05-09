import React,{ useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';  
import "./Landings.css";
import L from "leaflet"


const Landings = () => {
  const [defaultLandings, setDefaultLandings] = useState(null)
  const [landings, setLandings] = useState(null);
  const [select, setSelect] = useState(null);
  const [option, setOption] =useState(null);

  const asteroidIcon = new L.Icon({
    iconUrl: require('../../../assets/icon3.png'),
    iconAnchor: null,
    popupAnchor: [0, -10],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(40, 40)
  });

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const res = await axios.get(`http://localhost:3000/api/astronomy/landings/${select}/${option}`)
        const data =  await res.data;

      

        setLandings(data)
  
      } catch (error) {
        console.log(error);
      }
    } 
    fetchData();
  }, [select,option])

  useEffect(
    () => {
      const fetchData = async () =>{
        try {
          const defaultValue = await axios.get("http://localhost:3000/api/astronomy/landings");
          const defData = await defaultValue.data;
          const dataSliced = defData.slice(0,99);
          setDefaultLandings(dataSliced);

        }catch(error){
          console.log(error);
        }
    }
    fetchData();
  },[])
  
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    const select = e.target.by.value;
    const option = e.target.option.value;
    const capitalizedOption = option.charAt(0).toUpperCase() + option.slice(1);
    setOption(capitalizedOption);
    setSelect(select);
  }
  


    
  if (landings) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select name="by">
          <option value="mass">Weight</option>
          <option value="class">Class</option>
        </select>
        <input type="text" name="option" />
        <input type="submit" />
      </form>
      <MapContainer center={[31.505, -0.09]} zoom={0} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {landings.map((data, i) =>
          data.geolocation ? (
            <Marker
              key={i}
              position={[data.geolocation.latitude, data.geolocation.longitude]}
              icon={asteroidIcon}
            >
               <Popup>Asteroid details:
                <ul>
                  <li>Name: {data.name}</li>
                  <li>ID: {data.id}</li>
                  <li>Class: {data.recclass}</li>
                  <li>Mass(weight): {data.mass}</li>
                  <li>State: {data.fall}</li>
                  <li>Year: {data.year}</li>
                  <li>Latitude: {data.reclat}</li>
                  <li>Longitude: {data.reclong}</li>
                </ul>
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
}
else if (defaultLandings) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select name="by">
          <option value="mass">Weight</option>
          <option value="class">Class</option>
        </select>
        <input type="text" name="option" />
        <input type="submit" />
      </form>
      <MapContainer center={[31.505, -0.09]} zoom={3} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {defaultLandings.map((data, i) =>
          data.geolocation ? (
            <Marker
              key={i}
              position={[data.geolocation.latitude, data.geolocation.longitude]}
              icon={asteroidIcon}
            >
              <Popup>Asteroid details:
                <ul>
                  <li>Name: {data.name}</li>
                  <li>ID: {data.id}</li>
                  <li>Class: {data.recclass}</li>
                  <li>Mass(weight): {data.mass}</li>
                  <li>State: {data.fall}</li>
                  <li>Year: {data.year}</li>
                  <li>Latitude: {data.reclat}</li>
                  <li>Longitude: {data.reclong}</li>
                </ul>
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
}else{
  return (
      <form onSubmit={handleSubmit}>
        <select name="by">
          <option value="mass">Weight</option>
          <option value="class">Class</option>
        </select>
        <input type="text" name="option" />
        <input type="submit" />
      </form>
  )
}
}

export default Landings;
