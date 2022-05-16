import React,{ useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';



const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const [isRegistered, setIsRegistered] = useState(false);
  const [samePass, setSamePass] = useState(true);

  const createUser = async(create) =>{
    if (create.password === create.pass2) {
      setSamePass(true);
      const res = await axios.post("http://localhost:3000/api/astronomy/users/create", create)
      const data = res.data;
      if (data === "User created succesfully") {
        setIsRegistered(true);
      }     
    } else{
      setSamePass(false);
      setIsRegistered(false);
    }
  }

  return (
    <div className="idvLogin">
      <form onSubmit={handleSubmit(createUser)}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent className="form">
            <TextField {...register("name")} name="name" type="text" label="User Name"/>
            <TextField {...register("email")} name="email" type="text" label="email"/>
            <TextField {...register("password")} name="password" type="text" label="Password"/>
            <TextField {...register("pass2")} name="pass2" type="text" label="Repeat Password" />
            <Button size="small" type="submit" value="Submit">Register</Button>
          </CardContent>
        </Card>
      </form>
      <h3>Already registered? Go to login screen...</h3>
      <Button variant="outlined"><Link to="/login">Log In</Link></Button>
      <Button><a href="http://localhost:3000/api/astronomy/auth/google"><img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Login with google"/>Login with Google</a></Button>
      {isRegistered===true?
        <div>
          <Alert severity="success">User registered succesfully!</Alert>
          <Link to="/login"><Button>Go to login screen</Button></Link>
        </div>
        :""}
        {samePass===false? <Alert severity="error">Passwords dont match</Alert>:""}
    </div>
  )
};

export default SignUp;
