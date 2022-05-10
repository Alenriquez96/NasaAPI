import React,{ useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';  
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import { landingContext } from "../../../context/landingContext";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';




const Landings = () => {
  const { getAllLandings } = useContext(landingContext);
  const [defaultLandings, setDefaultLandings] = useState(null);
  const [landings, setLandings] = useState(null);
  const [select, setSelect] = useState(null);
  const [option, setOption] =useState(null);

  console.log(defaultLandings);
  const asteroidIcon = new L.Icon({
    iconUrl: require('../../../assets/icon3.png'),
    iconAnchor: null,
    popupAnchor: [0, -10],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(40, 40)
  });

  useEffect(
    () => {
      const fetchData = async () =>{
        try {
          const defaultValue = await axios.get("http://localhost:3000/api/astronomy/landings");
          const defData = await defaultValue.data;
          const dataSliced = defData.slice(0,300);
          setDefaultLandings(dataSliced);
          getAllLandings(dataSliced)
          

        }catch(error){
          console.log(error);
        }
    }
    fetchData();
  },[])

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
  
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    const select = e.target.by.value;
    const option = e.target.option.value;
    const capitalizedOption = option.charAt(0).toUpperCase() + option.slice(1);
    console.log(select, option);
    setOption(capitalizedOption);
    setSelect(select);

    e.target.option.value="";

  }
  

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `create`; 
    navigate(path);
  }


    
  if (landings) {
  return (
    <div className="divLanding">
      <form onSubmit={handleSubmit} className="formLanding">
      <Select name="by">
            <MenuItem value="mass">Weight</MenuItem>
            <MenuItem value="class">Class</MenuItem>
        </Select>
        <TextField id="outlined-basic" label={select} variant="outlined" name="option"/>
        <Button variant="outlined" type="submit">Submit</Button>
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
      <div className="divRouteChange">
        <h4>Or create your own landing!</h4>
        <Button onClick={routeChange} variant="outlined" type="submit">Create</Button>
      </div>
    </div>
  );
}
else if (defaultLandings) {
  return (
    <div className="divLanding">
      <form onSubmit={handleSubmit} className="formLanding">
        <Select name="by">
            <MenuItem value="mass">Weight</MenuItem>
            <MenuItem value="class">Class</MenuItem>
        </Select>
        <TextField id="outlined-basic" label={select} variant="outlined" name="option"/>
        <Button variant="outlined" type="submit">Submit</Button>
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
      <div className="divRouteChange">
        <h4>Or create your own landing!</h4>
        <Button onClick={routeChange} variant="outlined" type="submit">Create</Button>
      </div>
    </div>
  );
}
else{
  return (
      <form onSubmit={handleSubmit} className="formLanding">
        <Select name="by">
            <MenuItem value="mass">Weight</MenuItem>
            <MenuItem value="class">Class</MenuItem>
        </Select>
        <TextField id="outlined-basic" label={select} variant="outlined" name="option"/>
        <Button variant="outlined" type="submit">Submit</Button>
      </form>
  )
}
}

export default Landings;
