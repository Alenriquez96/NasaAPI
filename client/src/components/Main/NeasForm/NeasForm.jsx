import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

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
        <input
          {...register("designation")}
          type="text"
          name="designation"
          placeholder="Designation"
        />
        <input
          {...register("discovery_date")}
          type="text"
          name="discovery_date"
          placeholder="Discovery Date"
        />
        <input
          {...register("period_yr")}
          type="text"
          name="period_yr"
          placeholder="Orbit period"
        />
        <input
          {...register("orbit_class")}
          type="text"
          name="orbit_class"
          placeholder="Orbit class"
        />
        <input type="submit" value="Create" />
      </form>
    </div>
  );
};

export default NeasForm;
