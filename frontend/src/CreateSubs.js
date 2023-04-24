// frontend form for taking in input and
// creating a sub in backend

import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function CreateSub() {
  const [open, setOpen] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (event) => {
    if (event.target.value.length > 0) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  axios.defaults.headers.common["x-auth-token"] =
    localStorage.getItem("user-token");
  axios.defaults.baseURL = "http://localhost:5000";
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios
        .post(
          "/api/subs/create",
          {
            name: document.getElementById("name").value,
            description: document.getElementById("description").value,
            tags: document.getElementById("tags").value.split(","),
            banned: document.getElementById("banned").value.split(","),
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          console.log(res);
        });
    } catch (err) {
      console.log(err);
    }
    setOpen(false);
    // reload page
    window.location.reload();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create a new Subgreddiit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new Subgreddiit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out the following details and your subgreddiit will be created!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Subgreddit name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleNameChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="tags"
            label="Comma separated list of tags (without spaces)"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="banned"
            label="Comma separated list of banned keywords (without spaces)"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={formValid===false}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
