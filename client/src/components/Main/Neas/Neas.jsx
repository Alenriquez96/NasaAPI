import React, {useState, useEffect} from "react";
import Card from "./Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

const Neas = () => {
  const [neas, setNeas] = useState(null)

  console.log(neas);
  useEffect(() => {
    const fetchData = async() =>{
    try{
      const res = await axios.get("http://localhost:3000/api/astronomy/neas");
      const data = await res.data;
      setNeas(data);
    }
    catch(error){
      console.log(error);
    }
  }
    fetchData();
  }, []);
      

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `create`; 
    navigate(path);
  }
  
  if(neas){
  return (
    <div>
      <h3>What is a NEA?</h3>
      <p>A near-Earth asteroid (NEA) is any small Solar System body whose orbit brings it into proximity with Earth. By convention, a Solar System body is a NEA if its closest approach to the Sun (perihelion) is less than 1.3 astronomical units (AU).</p>
      <p>Here you can see all NEAS registered...</p>
      <div id="neas">
        {neas.map((nea, i)=><Card key={i} data={nea} 
        // remove={()=>removeNea(i)}
        />)
        }
      </div>
      <div className="routeChangeNea">
        <h4>Or create your own NEA!</h4>
        <Button onClick={routeChange} variant="outlined" type="submit">Create</Button>
      </div>
    </div>

  )
}
}

export default Neas;
