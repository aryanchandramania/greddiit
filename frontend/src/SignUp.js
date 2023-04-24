import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user-token") !== null) {
      navigate("/profile");
    }
  }, []);
  const [first, setfirst] = useState("");
  const [last, setlast] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formValid, setFormValid] = useState(false);

  const handlefirstChange = (event) => {
    setfirst(event.target.value);
  };

  const handlelastChange = (event) => {
    setlast(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleContactChange = (event) => {
    setContact(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validateForm = () => {
    if (
      !first ||
      !last ||
      !username ||
      !email ||
      !age ||
      !contact ||
      !password
    ) {
      return false;
    }
    if (!validateEmail(email)) {
      return false;
    }
    if (!validateNumber(age) || !validateNumber(contact)) {
      return false;
    }
    if (!validatePassword(password)) {
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateNumber = (number) => {
    const numberRegex = /^[0-9]+$/;
    return numberRegex.test(number);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^.{6,30}$/;
    return passwordRegex.test(password);
  };

  const handleFormUpdate = () => {
    setFormValid(validateForm());
  };

  axios.defaults.baseURL = "http://localhost:3000";
  axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("user");
  axios.defaults.headers["contentType"] = "application/json";
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.defaults.baseURL = "http://localhost:5000";

    try {
      const response = await axios.post(
        "/api/users/register",
        {
          first: data.get("first"),
          last: data.get("last"),
          username: data.get("username"),
          email: data.get("email"),
          age: data.get("age"),
          contact: data.get("phone"),
          password: data.get("password"),
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("signing up is working");
      localStorage.setItem("user-token", response.data.token);
      console.log(response);
      axios.defaults.headers.common["x-auth-token"] = response.data.token;
      navigate("/profile");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            onKeyUp={handleFormUpdate}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first"
                  fullWidth
                  id="first"
                  label="First Name"
                  value={first}
                  onChange={handlefirstChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="last"
                  label="Last Name"
                  name="last"
                  value={last}
                  autoComplete="family-name"
                  onChange={handlelastChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  autoComplete="email"
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={!/^.{6,30}$/.test(password) && password.length > 0}
                  helperText={
                    !/^.{6,30}$/.test(password) && password.length > 0
                      ? "Password must be between 6 and 30 characters"
                      : ""
                  }
                  value={password}
                  autoComplete="new-password"
                  onChange={handlePasswordChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  value={username}
                  id="username"
                  label="Username"
                  autoFocus
                  onChange={handleUsernameChange}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  autoComplete="phno"
                  name="phone"
                  fullWidth
                  value={contact}
                  id="phone"
                  error={!/^[0-9]+$/.test(contact) && contact.length > 0}
                  helperText={
                    !/^[0-9]+$/.test(contact) && contact.length > 0
                      ? "Phone Number must be a number"
                      : ""
                  }
                  label="Phone Number"
                  autoFocus
                  onChange={handleContactChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="age"
                  name="age"
                  error={!/^[0-9]+$/.test(age) && age.length > 0}
                  helperText={
                    !/^[0-9]+$/.test(age) && age.length > 0
                      ? "Age must be a number"
                      : ""
                  }
                  fullWidth
                  value={age}
                  id="age"
                  label="Age"
                  autoFocus
                  onChange={handleAgeChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!formValid}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
