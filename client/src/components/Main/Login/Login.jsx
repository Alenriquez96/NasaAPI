import React,{ useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Cookies from 'universal-cookie';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [isLogged, setIsLogged] = useState(false);
  const [isNotLogged, setisNotLogged] = useState(false);
  const cookies = new Cookies();

  const loginUser = async(log)=>{
    const res = await axios.post("http://localhost:3000/api/astronomy/users/login",log)
    const data = res.data;
    console.log(data);
    if (data.message==="Correct credentials") {
      setIsLogged(true);
      setisNotLogged(false)
      cookies.set("access-token",data.message2);
    } else{
      setisNotLogged(true)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(loginUser)}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent className="form">
            <TextField {...register("email")} name="email" type="text" label="email"/>
            <TextField {...register("password")} name="password" type="text" label="Password"/>
            <Button size="small" type="submit" value="Submit">Login</Button>
          </CardContent>
        </Card>
      </form>
      {isLogged===true?
        <div>
          <Alert severity="success">User logged succesfully!</Alert>
          <Link to="/"><Button>Go to home screen</Button></Link>
        </div>
        :""}
      {isNotLogged===true?<Alert severity="error">"Incorrect credentials"</Alert>:""}
    </div>
  )
};

export default Login;
