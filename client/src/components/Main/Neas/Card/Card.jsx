import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const CardNeas = (props) => {
  const neas = props.data;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {neas.orbit_class}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Discovery date: {neas.discovery_date}
        </Typography>
        <Typography>Orbital period: {neas.period_yr}</Typography>
      </CardContent>
      <CardContent>
       <Button size="small" onClick={props.remove}>Delete</Button>
      </CardContent>
    </Card>
  );
};

export default CardNeas;
