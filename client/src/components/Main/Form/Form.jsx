import React from "react";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';


const Form = () => {
  const { register, handleSubmit } = useForm();


  const newRegistry = async(newLanding) =>{
    const newLandingObj = {
      name: newLanding.name,
      id: newLanding.id,
      mass: newLanding.mass,
      recclass: newLanding.recclass,
      year: newLanding.year,
      reclat: newLanding.reclat,
      reclong: newLanding.reclong,
      geolocation: {
        latitude: newLanding.reclat,
        longitude: newLanding.reclong
      }
    }

    console.log(newLandingObj);

    const res = await axios.post("http://localhost:3000/api/astronomy/landings/create",newLandingObj);
    const data = res.data;
    console.log(data);
    
  }
  
  return (
    <div>
      <h2>Create your own landing!</h2>
      <form onSubmit={handleSubmit(newRegistry)}>
        {/* Para usar register de react hook form hay que llamar igual al name del input y a lo que le pasas por register */}
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <TextField {...register("name")}  label="Name" variant="outlined" name="name"/>
            <TextField {...register("id")}  label="ID" variant="outlined" name="id"/>
            <TextField {...register("recclass")}  label="Class" variant="outlined"  name="recclass"/>
            <TextField {...register("year")} variant="outlined" type="date"  name="year"/>
            <TextField {...register("mass")}  label="Weight" variant="outlined" name="mass"/>
            <TextField {...register("reclat")}  label="Latitude" variant="outlined" name="reclat"/>
            <TextField {...register("reclong")}  label="Longitude" variant="outlined" name="reclong"/>
            <Button size="small" type="submit">Submit</Button>
          </CardContent>
        </Card>
      </form>
    </div>
  )
};

export default Form;
