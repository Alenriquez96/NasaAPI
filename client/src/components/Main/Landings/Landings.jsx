import React from "react";
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';  
import "./Landings.css";


const Landings = () => {

  const fetchData = async () =>{
    try {
      const res = await axios.get("/api/astronomy/landings")
      const data =  await res.data
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  } 
  fetchData();



  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default Landings;
