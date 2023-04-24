import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import MySubTabBar from "./MySubTabBar";
import Navbar from "./Navbar";

export default function MySubPage() {
    const { name } = useParams();
  return (
    <div>
      <Navbar />
      <div align="center" style={{backgroundColor:"coral", padding:"1rem", marginTop:"0.5rem", color:"turquoise"}}><h1>{name}</h1></div>
      <Grid marginTop="1rem">
        <MySubTabBar /> 
      </Grid>
    </div>
  );
}
