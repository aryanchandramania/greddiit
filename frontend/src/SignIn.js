import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import jwt_decode from "jwt-decode";
// import { GoogleLogin} from "@react-oauth/google";

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user-token") !== null) {
      navigate("/profile");
    }
  }, []);
  const HandleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("Received");
    const email = data.get("email");
    const password = data.get("password");

    axios.defaults.baseURL = "http://localhost:5000";

    try {
      const response = await axios.post(
        "/api/users/login",
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("logging in is working");
      localStorage.setItem("user-token", response.data.token);
      console.log(response);
      axios.defaults.headers.common["x-auth-token"] = response.data.token;
      navigate("/profile");
    } catch (error) {
      console.log("hi");
      console.log(error.message);
      console.log("error connecting to server");
      if (error.response.status === 400) alert("Invalid Credentials");
      else alert("Server Error");
    }
  };

  const [abtnDisabled, setAbtnDisabled] = useState(0);
  const handleAchange = (text) => {
    let x;
    if (text.target.value.length > 0) x = 1;
    else x = 0;
    // console.log(text.target.value, abtnDisabled, x);
    return setAbtnDisabled(x);
  };
  const [bbtnDisabled, setBbtnDisabled] = useState(0);
  const handleBchange = (text) => {
    let x;
    if (text.target.value.length > 0) x = 1;
    else x = 0;
    // console.log(text.target.value, bbtnDisabled, x);
    return setBbtnDisabled(x);
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

//   handleGoogleSuccess = async (res) => {
//     const result = jwt_decode(res?.credential);
//     const token = res?.credential;
//     try {
//         localStorage.setItem("user-token", );
//         console.log(response);
//         axios.defaults.headers.common["x-auth-token"] = response.data.token;
//         navigate("/profile");
//     }
//     catch (error) {
//     }
//   }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={HandleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(text) => handleAchange(text)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                onChange={(text) => handleBchange(text)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                disabled={(abtnDisabled & bbtnDisabled) === 0}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
                {/* <GoogleLogin
                render={(props) => (
                    <Button
                        onClick={props.onClick}
                        disabled={props.disabled}
                    >Sign In with Google</Button>
                )}
                // onSuccess = {handleGoogleSuccess}
                // onError = {handleGoogleError}
                ></GoogleLogin> */}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
