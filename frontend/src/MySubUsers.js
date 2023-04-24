import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent } from "@mui/material";
import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export default function MySubUsers() {
  const Wrapped = async () => {
    try {
      const res = await axios.post(`/api/subs/:name`, { name: name });
      setMem(res.data.members);
      setBanned(res.data.banned_members);  
    //   console.log("res", res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Wrapped();
  }, []);

  const [mem, setMem] = useState([]);
  const [banned, setBanned] = useState([]);
  const { name } = useParams();
  axios.defaults.headers.common["x-auth-token"] =
    localStorage.getItem("user-token");
  axios.defaults.baseURL = "http://localhost:5000";

  return (
    <div>
      <Grid container direction="row" style={{display:"flex", flexDirection:"row", marginTop:"5rem"}}>
        <Grid item xs={6}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ display: "flex", flexDirection: "column"}}
      >
      <Typography variant="h2">Users</Typography>
        {mem.map((mem) => {
          return (
            <Grid item xs={12} sm={6} md={4}>
              <Card key={uuidv4()}>
                <CardContent>
                  {mem}
                </CardContent>
              </Card>
              <br />
            </Grid>
          );
        })}
      </Grid>
      </Grid>
      <Grid item xs={6}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ display: "flex", flexDirection: "column"}}
      >
        <Typography variant="h2">Banned Users</Typography>
        {banned.map((mem) => {
          return (
            <Grid item xs={12} sm={6} md={4}>
              <Card key={uuidv4()}>
                <CardContent>
                  {mem}
                </CardContent>
              </Card>
              <br />
            </Grid>
          );
        })}
      </Grid>
      </Grid>
      </Grid>
    </div>
  );
}
