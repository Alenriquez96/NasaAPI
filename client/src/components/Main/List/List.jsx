import React, { useContext, useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import { landingContext } from "../../../context/landingContext";
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const List = () => {
  const [AllLandings, setAllLandings] = useState([]);
  const [page, setMyPage] = useState(1); // this an example using hooks
  const setPage = (e) => {
    console.log(AllLandings.length / 5);
    setMyPage(AllLandings.length / 5);
  }

  console.log(AllLandings);
  useEffect(
    () => {
      const fetchData = async () =>{
        try {
          const defaultValue = await axios.get("http://localhost:3000/api/astronomy/landings");
          const defData = await defaultValue.data;
          const dataSliced = defData.slice(0,50);
          setAllLandings(dataSliced);
        }catch(error){
          console.log(error);
        }
    }
    fetchData();
  },[])


  if (AllLandings) {

  return (
    <div>
      <Stack spacing={2}>
        {/* <Pagination page={page} setPage={setPage} total={AllLandings.length} count={10} variant="outlined" color="primary"/> */}
        <Pagination page={page} onChange={setPage} total={100} count={10}/>
      </Stack>

    </div>
  )
}
}

export default List;
