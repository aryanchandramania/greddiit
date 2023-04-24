import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Container,
  CssBaseline,
  Avatar,
  Box,
  Grid,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useEffect} from 'react';

export default function FormDialog() {
  const navigate = useNavigate();
  const theme = createTheme();
  const [open, setOpen] = React.useState(false);
  const [first, setfirst] = useState("");
  const [last, setlast] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [x, setX] = useState(true);

  useEffect (() => {
    axios.get('http://localhost:5000/api/profiles/data') 
    .then((res) => {
        console.log("obtained profile data from backend (message by frontend)")
        console.log(res);
        // const {first, last, username, email, age, phone, password} = JSON.parse(res.data);
        const userData = res.data;
        setfirst(userData.first);  
        setlast(userData.last);
        setUsername(userData.username);
        setEmail(userData.email);
        setAge(userData.age);
        setContact(userData.contact);
    })
    .catch((err) => {
        console.log("error getting profile data from backend", err);
    })
}, []);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // connect to backend and modify data using axios
    await axios
      .patch("/api/profiles/edit", {
        first,
        last,
        username,
        email,
        age,
        contact,
        password,
      })
      .then((response) => {
        console.log(
          "submitted new details to backend successfully",
          response.data
        );
        alert("Details updated successfully!")
        navigate("/")
      })
      .catch((error) => {
        alert("Error adding new details to server :(");
        console.error(error);
        handleClose()
      });
  };

  return (
    <div>
      <Fab color="secondary" aria-label="edit" onClick={handleClickOpen}>
        <EditIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>EDIT PROFILE</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your new details below and click submit. Note that your email cannot be changed. Don't forget to enter your password.
          </DialogContentText>
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
                        disabled
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
                        error={
                          !/^.{6,30}$/.test(password) && password.length > 0
                        }
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
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
