import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import Navbar from "./Navbar.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, styled, Box, ListItemIcon } from "@mui/material";
import FormDialog from "./ProfileEdit.js";
import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const useStyles = makeStyles({
  root: {
    // maxWidth: 420,
    margin: "1rem",
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Profile() {
  const navigate = useNavigate();
  const [open1, setOpen1] = useState(false);
  const [scroll1, setScroll1] = useState("paper");
  const [open2, setOpen2] = useState(false);
  const [scroll2, setScroll2] = useState("paper");
  const handleClickOpen1 = (scrollType) => () => {
    setOpen1(true);
    setScroll1(scrollType);
  };

  const handleClickOpen2 = (scrollType) => () => {
    setOpen2(true);
    setScroll2(scrollType);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose2 = () => {
    setOpen2(!open2);
  };
  const token = localStorage.getItem("user-token");
  axios.defaults.headers.common["x-auth-token"] = token;
  // get user data from backend
  const [first, setfirst] = useState("");
  const [last, setlast] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState();
  const [contact, setContact] = useState();
  const [password, setPassword] = useState("");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const Wrapped = async () => {
    if (!token) {
      alert("You are not logged in. Please login to view this page.");
      navigate("/");
    }

    try {
      const res = await axios.get("http://localhost:5000/api/profiles/data");
      console.log("obtained profile data from backend (message by frontend)");
      console.log(res);
      const userData = res.data;
      setfirst(userData.first);
      setlast(userData.last);
      setUsername(userData.username);
      setEmail(userData.email);
      setAge(userData.age);
      setContact(userData.contact);
      setFollowers(userData.followers);
      setFollowing(userData.following);
    } catch (err) {
      console.log("error getting profile data from backend", err);
    }
  };

  useEffect(() => {
    Wrapped();
  }, []);

  const handleRemove = async (item) => {
    console.log("removing user", item);
    try {
      const res = await axios.patch(
        "http://localhost:5000/api/followers/remove",
        {
          email: item,
        }
      );
      console.log("removed user from backend (message by frontend)");
      console.log(res);
      window.location.reload();
    } catch (err) {
      console.log("error removing user from followers", err);
    }
  };

  const handleUnfollow = async (item) => {
    console.log("removing user", item);
    try {
      const res = await axios.patch(
        "http://localhost:5000/api/followers/unfollow",
        {
          email: item,
        }
      );
      console.log("removed user from follwoing (message by frontend)");
      console.log(res);
      window.location.reload();
    } catch (err) {
      console.log("error removing user from follwing", err);
    }
  };

  function RenderRow1() {
    const classes = useStyles();
    return (
      <div>
        {followers.map((item, index) => (
          <Card className={classes.root} key={index}>
            <CardContent
              sx={{ color: "mediumseagreen" }}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    className={classes.title}
                    color="olive"
                    gutterBottom
                  >
                    User e-mail
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Typography variant="h5" component="h2">
                    {item}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button
                    onClick={() => handleRemove(item)}
                    sx={{
                      color: "red",
                      marginLeft: "10px",
                      marginRight: "2px",
                    }}
                  >
                    Remove
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  function RenderRow2() {
    const classes = useStyles();
    return (
      <div>
        {following.map((item, index) => (
          <Card className={classes.root} key={index}>
            <CardContent
              sx={{ color: "mediumseagreen" }}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    className={classes.title}
                    color="olive"
                    gutterBottom
                  >
                    Username
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Typography variant="h5" component="h2">
                    {item}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button
                    onClick={() => handleUnfollow(item)}
                    sx={{
                      color: "red",
                      marginLeft: "10px",
                      marginRight: "2px",
                    }}
                  >
                    Unfollow
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div>
      {true ? (
        <div>
          <Navbar />
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            // style={{ minHeight: '100vh' }}
          >
            <Avatar
              sx={{
                bgcolor: deepOrange[500],
                width: 100,
                height: 100,
                margin: 10,
              }}
            ></Avatar>
          </Grid>
          <Grid container spacing={2} padding={2}>
            <Grid item xs={12} sm={6}>
              {" "}
              <b>First name:</b>
              <Box marginLeft={2}>
                <Typography>{first}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              {" "}
              <b>Last Name:</b>
              <Box marginLeft={2}>
                <Typography>{last}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <b>Username:</b>
              <Box marginLeft={2}>
                <Typography>{username}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <b>Email Address:</b>
              <Box marginLeft={2}>
                <Typography>{email}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <b>Phone Number:</b>
              <Div>
                <Typography>{contact}</Typography>
              </Div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <b>Age:</b>
              <Div>
                <Typography>{age}</Typography>
              </Div>
            </Grid>
            <Grid
              sx={{
                margin: 2,
                display: "flex",
                flexDirection: "column",
                marginLeft: "auto",
              }}
            >
              <FormDialog />
            </Grid>
          </Grid>
          <div style={{ flex: "row", textAlign: "center" }}>
            <List
              sx={{
                width: "100%",
                maxWidth: "false",
                bgcolor: "background.paper",
                display: "inline",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  <ListItemIcon>
                    <Diversity1Icon />
                  </ListItemIcon>
                  Networking
                </ListSubheader>
              }
            >
              <Button
                onClick={handleClickOpen1("paper")}
                sx={{ color: "chocolate" }}
              >
                {followers.length} Followers
              </Button>
              <Button onClick={handleClickOpen2("paper")}>
                Following {following.length}
              </Button>
              <Dialog
                open={open1}
                onClose={handleClose1}
                scroll={scroll1}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
              >
                <DialogTitle id="scroll-dialog-title" sx={{ color: "black" }}>
                  Followers
                </DialogTitle>
                <DialogContent dividers={scroll1 === "paper"}>
                  <DialogContentText
                    id="scroll-dialog-description"
                    // ref={descriptionElementRef}
                    tabIndex={-1}
                    width="fit-content"
                  >
                    {RenderRow1()}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose1}>Close</Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={open2}
                onClose={handleClose1}
                scroll={scroll2}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
              >
                <DialogTitle id="scroll-dialog-title" sx={{ color: "black" }}>
                  Following
                </DialogTitle>
                <DialogContent dividers={scroll1 === "paper"}>
                  <DialogContentText
                    id="scroll-dialog-description"
                    // ref={descriptionElementRef}
                    tabIndex={-1}
                    width="fit-content"
                  >
                    {RenderRow2()}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose2}>Close</Button>
                </DialogActions>
              </Dialog>
            </List>
          </div>
          {/* <Button xs={12} sm={6 }>Edit Profile</Button> */}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
