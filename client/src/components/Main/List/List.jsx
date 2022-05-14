import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import CardLanding from "./Card";
import usePagination from "../../hooks/usePagination";
import Button from '@mui/material/Button';




const List = () => {
  const [AllLandings, setAllLandings] = useState([]);
  const [page, setPage] = useState(1); 
  const PER_PAGE = 10;

  const count = Math.ceil(AllLandings.length / PER_PAGE);
  const _DATA = usePagination(AllLandings, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };


  useEffect(
    () => {
      const fetchData = async () =>{
        try {
          const defaultValue = await axios.get("http://localhost:3000/api/astronomy/landings");
          const defData = await defaultValue.data;
          const dataSliced = defData.slice(0,99);
          setAllLandings(dataSliced);
        }catch(error){
          console.log(error);
        }
    }
    fetchData();
  },[]);



  const removeLanding = (i) =>{
    const remainingLandings = AllLandings.filter((landing,j)=>i!==j)
    setAllLandings(remainingLandings);
  }

  function handleSort() {
    const sortedData = [...AllLandings].sort((a,b)=>{
      return a.first > b.first ? 1: -1
    })
    setAllLandings(sortedData)
  }

  if (AllLandings) {
  return (
    <div>
      <Button onClick={handleSort} variant="outlined">Sort</Button>
      <Pagination
          count={count}
          size="large"
          color="primary"
          page={page}
          variant="outlined"
          onChange={handleChange}
          className="muiPag"
        />
      <section>
        {_DATA.currentData().map((landings,i) =><CardLanding key={i} data={landings} remove={()=>removeLanding(i)}/>)}
    </section>
    </div>
  )
}
}

export default List;
