import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import { Grid, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export default function DisplaySubs() {
  useEffect(() => {
    Wrapped();
  }, []);

  const [subs, setSubs] = useState([]);
  axios.defaults.headers.common["x-auth-token"] =
    localStorage.getItem("user-token");
  axios.defaults.baseURL = "http://localhost:5000";

  const Wrapped = async () => {
    try {
      const res = await axios.get("/api/subs/mysubs");
      setSubs(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();

  const HandleOpen = (sub) => {
    // e.preventDefault();
    console.log("sub", sub);    
    navigate(`/g/${sub.name}`);
  };

  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ display: "flex", flexDirection: "row", flex: "row" }}
      >
        {subs.map((sub, index) => {
          return (
            <Grid item xs={12} sm={6} md={4}>
              <Card key={uuidv4()}>
                <CardMedia
                  component="img"
                  image={
                    `https://source.unsplash.com/random/800x400/?peaceful,calm,cool,film,animals/${sub.name}`
                  }
                  title="subgreddiit image"
                  alt="subgreddiit image"
                />
                <CardContent>
                  <h2>{sub.name}</h2>
                  <Typography>{sub.description}</Typography>
                  <Typography><b>No of members: </b>{sub.sub_count}</Typography>
                  <Typography><b>Tags: </b>{sub.tags.join(", ")}</Typography>
                  <Typography><b>Banned keywords: </b>{sub.banned.join(",  ")}</Typography>
                  <Typography><b>No of posts: </b></Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={()=>HandleOpen(sub)} style={{color:"deepblue"}}>Open</Button>
                </CardActions>
              </Card>
              <br />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
