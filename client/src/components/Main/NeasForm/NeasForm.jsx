import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const NeasForm = () => {
  const { register, handleSubmit } = useForm();

  const newRegistry = async (newNea) => {
    const newNeaObj = {
      designation: newNea.designation,
      discovery_date: newNea.discovery_date,
      period_yr: newNea.period_yr,
      orbit_class: newNea.orbit_class
    };

    console.log(newNeaObj);

    const res = await axios.post(
      "http://localhost:3000/api/astronomy/neas/create",
      newNeaObj
    );
    const data = res.data;
    console.log(data);
  };

  
  return (
    <div>
      <h2>Create your own NEA!</h2>
      <form onSubmit={handleSubmit(newRegistry)}>
        {/* Para usar register de react hook form hay que llamar igual al name del input y a lo que le pasas por register */}
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <TextField {...register("designation")}  label="Desgination" variant="outlined" name="designation"/>
            <TextField {...register("discovery_date")}  
            // label="Discovery Date" 
            type="date" variant="outlined" name="discovery_date"/>
            <TextField {...register("period_yr")}  label="Orbit period" variant="outlined"  name="period_yr"/>
            <TextField {...register("orbit_class")}  label="Orbit class" variant="outlined" name="orbit_class"/>
            <Button size="small" type="submit">Submit</Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default NeasForm;
