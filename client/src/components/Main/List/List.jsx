import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import ReactPaginate from 'react-paginate';
import { landingContext } from "../../../context/landingContext";

const List = () => {
  const { register, handleSubmit } = useForm();
  const { AllLandings} = useContext(landingContext)
  console.log(AllLandings);


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


  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
            <div>
              <h3>Item #{item}</h3>
            </div>
          ))}
      </>
    );
  }


  function PaginatedItems({ itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(AllLandings.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(AllLandings.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % AllLandings.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

  return (
    <div>
      <h2>Create your own landing!</h2>
      <form onSubmit={handleSubmit(newRegistry)}>
        {/* Para usar register de react hook form hay que llamar igual al name del input y a lo que le pasas por register */}
        <input {...register("name")} type="text" name="name" placeholder="name"/>
        <input {...register("id")} type="number" name="id" placeholder="id"/>
        <input {...register("recclass")} type="text" name="recclass" placeholder="class"/>
        <input {...register("mass")} type="number" name="mass" placeholder="weight"/>
        <input {...register("reclat")} type="number" name="reclat" placeholder="latitude" step=".000001"/>
        <input {...register("reclong")} type="number" name="reclong" placeholder="longitude" step=".000001"/>
        <input type="submit" value="Create" />
      </form>
      <Items currentItems={currentItems} />
      <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
      />
    </div>
  )
};
}

export default List;
