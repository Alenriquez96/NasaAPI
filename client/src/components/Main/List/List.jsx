import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const List = () => {
  const { register, handleSubmit } = useForm();


  const newRegistry = async(newLanding) =>{
    const newLandingObj = {
      name: newLanding.name,
      id: newLanding.id,
      mass: newLanding.mass,
      recclass: newLanding.recclass,
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
        <input {...register("name")} type="text" name="name" placeholder="name"/>
        <input {...register("id")} type="number" name="id" placeholder="id"/>
        <input {...register("recclass")} type="text" name="recclass" placeholder="class"/>
        <input {...register("mass")} type="number" name="mass" placeholder="weight"/>
        <input {...register("reclat")} type="number" name="reclat" placeholder="latitude"/>
        <input {...register("reclong")} type="number" name="reclong" placeholder="longitude"/>
        <input type="submit" value="Create" />
      </form>
    </div>

  )
};

export default List;
