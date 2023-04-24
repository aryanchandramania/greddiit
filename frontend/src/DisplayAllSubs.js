import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import { Grid, Typography, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";

export default function DisplaySubs() {
  useEffect(() => {
    Wrapped();
  }, []);

  const [joined, setJoined] = useState([]);
  const [others, setOthers] = useState([]);
  const [joinedResults, setJoinedResults] = useState([]);
  const [othersResults, setOthersResults] = useState([]);

  const navigate = useNavigate();
  axios.defaults.headers.common["x-auth-token"] =
    localStorage.getItem("user-token");
  axios.defaults.baseURL = "http://localhost:5000";

  const Wrapped = async () => {
    try {
      const res = await axios.get("/api/subs/all/joined-subs");
      setJoined(res.data);
      setJoinedResults(res.data);
      const res2 = await axios.get("api/subs/all/other-subs");
      setOthers(res2.data);
      setOthersResults(res2.data);
    } catch (error) {
      console.log(error);
    }
  };

  const SendJoinRequest = async (name) => {
    try {
      const res = await axios.post("/api/subs/all/join-req-add", {
        name: name,
      });
      console.log(res);
      if (res.data.msg === "Request already sent") {
        alert("Request already sent");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HandleOpen = (sub) => {
    // e.preventDefault();
    console.log("sub", sub);
    navigate(`/all/${sub.name}`);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (!searchQuery) {
      setJoinedResults(joined);
      setOthersResults(others);
    }
    const fuse1 = new Fuse(joined, {
      keys: ["name"],
    });
    const fuse2 = new Fuse(others, {
      keys: ["name"],
    });

    const results1 = fuse1.search(searchQuery);
    const results2 = fuse2.search(searchQuery);

    const matches = [];
    const unfollowedmatches = [];

    if (results1.length) {
      results1.forEach(({ item }) => {
        matches.push(item);
      });
      setJoinedResults(matches);
    } else {
      setJoinedResults([]);
    }

    if (results2.length) {
      results2.forEach(({ item }) => {
        unfollowedmatches.push(item);
      });
      setOthersResults(unfollowedmatches);
    } else {
      setOthersResults([]);
    }
  };

  return (
    <div>
      <br />
      <Grid>
        <TextField onChange={(e)=>setSearchQuery(e.target.value)} id="outlined-basic" label="Outlined" variant="outlined" />
        <Button onClick={() => handleSearch()}>Search</Button>
      </Grid>
      <br />
      <Grid>
        <center>
          <Typography variant="h2" style={{ color: "darkmagenta" }}>
            Joined Subs
          </Typography>
        </center>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          style={{
            display: "flex",
            flexDirection: "row",
            flex: "row",
            backgroundColor: "antiquewhite",
            marginBottom: "1rem",
            marginTop: "1rem",
          }}
        >
          {joinedResults.map((sub, index) => {
            return (
              <Grid item xs={12} sm={6} md={4}>
                <Card key={uuidv4()}>
                  <CardMedia
                    component="img"
                    image={`https://source.unsplash.com/random/800x400/?peaceful,calm,cool,film,animals/${sub.name}`}
                    title="subgreddiit image"
                    alt="subgreddiit image"
                  />
                  <CardContent>
                    <h2>{sub.name}</h2>
                    <Typography>{sub.description}</Typography>
                    <Typography>
                      <b>No of members: </b>
                      {sub.sub_count}
                    </Typography>
                    <Typography>
                      <b>Tags: </b>
                      {sub.tags.join(", ")}
                    </Typography>
                    <Typography>
                      <b>Banned keywords: </b>
                      {sub.banned.join(",  ")}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => HandleOpen(sub)}
                      style={{ color: "deepblue" }}
                    >
                      Open
                    </Button>
                  </CardActions>
                </Card>
                <br />
              </Grid>
            );
          })}
        </Grid>
        <center>
          <Typography variant="h2" style={{ color: "blue" }}>
            Explore other subs
          </Typography>
        </center>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          style={{
            display: "flex",
            flexDirection: "row",
            flex: "row",
            backgroundColor: "antiquewhite",
            marginTop: "1rem",
          }}
        >
          {othersResults.map((sub, index) => {
            return (
              <Grid item xs={12} sm={6} md={4}>
                <Card key={uuidv4()}>
                  <CardMedia
                    component="img"
                    image={`https://source.unsplash.com/random/800x400/?peaceful,calm,cool,film,animals/${sub.name}`}
                    title="subgreddiit image"
                    alt="subgreddiit image"
                  />
                  <CardContent>
                    <h2>{sub.name}</h2>
                    <Typography>{sub.description}</Typography>
                    <Typography>
                      <b>No of members: </b>
                      {sub.sub_count}
                    </Typography>
                    <Typography>
                      <b>Tags: </b>
                      {sub.tags.join(", ")}
                    </Typography>
                    <Typography>
                      <b>Banned keywords: </b>
                      {sub.banned.join(",  ")}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button onClick={() => SendJoinRequest(sub.name)}>
                      Send Join Request
                    </Button>
                  </CardActions>
                </Card>
                <br />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}
