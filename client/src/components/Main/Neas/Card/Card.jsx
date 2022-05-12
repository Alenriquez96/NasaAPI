import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useForm } from "react-hook-form";
import nea1 from "../../../../assets/nea1.png";
import nea2 from "../../../../assets/nea2.png";
import nea3 from "../../../../assets/nea3.png";


const CardNeas = (props) => {
  const neas = props.data;
  const { register, handleSubmit } = useForm();


  
  const images = [nea1,nea2,nea3];
  const shuffledImages = images.sort((a, b) => 0.5 - Math.random());

  const removeNea = async () =>{
    console.log(neas.designation.replaceAll(" ", "-"));
    try {
      const res = await axios.delete(`http://localhost:3000/api/astronomy/neas/delete/${neas.designation}`);
      const data = await res.data;
      console.log(data);
      console.log(neas.designation); 
      props.remove();     
    } catch (error) {
      console.log(error);
    }   
  }

  

  const updateNea = async(newNea)=>{
    try {
      const newNeaObj = {
        designation: newNea.designation,
        discovery_date: newNea.discovery_date,
        period_yr: newNea.period_yr,
        orbit_class: newNea.orbit_class
      };
      console.log(newNeaObj);
      const res = await axios.put(`http://localhost:3000/api/astronomy/neas/edit/${neas.designation}`, newNeaObj);
      const data = await res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography>{neas.designation}</Typography>
        <Typography gutterBottom variant="h5" component="div">
          {neas.orbit_class}
        </Typography>
        <img src={shuffledImages[0]} alt="neas icon"/>
        <Typography variant="body2" color="text.secondary">
        Discovery date: {neas.discovery_date}
        </Typography>
        <Typography>Orbital period: {neas.period_yr}</Typography>
      </CardContent>
      <CardContent>
       <Button size="small" onClick={removeNea}>Delete</Button>
       <Popup trigger={<Button size="small">Update</Button>} position="top left">
        {close => (
          <div >
            <form onSubmit={handleSubmit(updateNea)}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <TextField {...register("designation")}  label="Desgination" variant="outlined" name="designation"/>
                  <TextField {...register("discovery_date")}  
                  // label="Discovery Date" 
                  type="date" variant="outlined" name="discovery_date"/>
                  <TextField {...register("period_yr")}  label="Orbit period" variant="outlined"  name="period_yr"/>
                  <TextField {...register("orbit_class")}  label="Orbit class" variant="outlined" name="orbit_class"/>
                  <Button size="small" type="submit">Update</Button>
                </CardContent>
              </Card>
            </form>
            <a className="close" onClick={close}>
              &times;
            </a>
          </div>
        )}
        </Popup>
      </CardContent>
    </Card>
  );
};

export default CardNeas;
