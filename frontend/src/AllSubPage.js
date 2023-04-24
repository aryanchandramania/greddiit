import axios from "axios";
import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export default function AllSubPage() {
    useEffect(() => {
        Wrapped();
    }
    , []);

    const [sub, setSub] = useState([]);
    
    const {name} = useParams();
    const Wrapped = async () => {
        try {
            const res = await axios.post(`/api/subs/all/:name`, {name: name});
            console.log(res);
            setSub(res.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Grid container spacing={2}>
          <Grid item>
        <img alt="icon" src="https://source.unsplash.com/random/900x300" width={250} height={250}/>

          </Grid>

          <Grid item xs={8} md={6}>
            <Typography variant="h4" component="div" gutterBottom>
              {name}
            </Typography>
            <Typography variant="h6" component="div" gutterBottom>
              {sub.description}
            </Typography>
          </Grid>
          </Grid>
        </div>
    )
}