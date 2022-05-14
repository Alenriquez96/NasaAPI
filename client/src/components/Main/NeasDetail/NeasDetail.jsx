import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const NeasDetail = () => {
  const { id } = useParams();
  const [neasById, setNeasById] = useState("")
  console.log(neasById);

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const value = await axios.get(`http://localhost:3000/api/astronomy/neas/${id}`);
        const data = await value.data;
        setNeasById(data);
      }catch(error){
        console.log(error);
      }
  }
  fetchData();
  }, [id])
  

  return (
    <Card sx={{ maxWidth: 800 }}>
      <CardContent>
          <Typography>{neasById.designation}</Typography>
          <Typography gutterBottom variant="h5" component="div">
            {neasById.orbit_class}
          </Typography>
          <iframe className="giphy" src="https://giphy.com/embed/VGKtRn5nLfaxr0mI9j" width="281" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
          <Typography variant="body2" color="text.secondary">
          Discovery date: {neasById.discovery_date}
          </Typography>
          <Typography>Orbital period: {neasById.period_yr}</Typography>
        </CardContent>
    </Card>
  )
};

export default NeasDetail;
