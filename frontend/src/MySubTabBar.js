import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Tabs, Tab, Box, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import MySubUsers from "./MySubUsers";
import { Card, CardContent, CardActions } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const MySubRequests = (sub) => {
  const [reqs, setReqs] = useState([]);
  <Typography variant="h2">Join Requests</Typography>;
  {
    setReqs(sub.requests);
    reqs.map((req) => {
      return (
        <div>
          <Typography>{req}</Typography>
        </div>
      );
    });
  }
  console.log(reqs, "i", sub);
};

export default function MySubTabBar() {
  const [sub, setSub] = useState([]);
  const Wrapped = async () => {
    try {
      const res = await axios.post(`/api/subs/:name`, { name: name });
      setSub(res.data);
      console.log("sub",sub);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Wrapped();
  }, []);

  axios.defaults.headers.common["x-auth-token"] =
    localStorage.getItem("user-token");
  axios.defaults.baseURL = "http://localhost:5000";
  const [value, setValue] = React.useState(0);
  const { name } = useParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAccept = async (email) => {
    // send backend patch request
    try {
        const res = await axios.patch("api/subs/:name/add-member", {name, email});
        console.log(res);
        window.location.reload();
    }
    catch(error){
        console.log(error);
    }
  }

  const handleReject = async (email) => {
    // send backend patch request
    try {
        const res = await axios.patch("api/subs/:name/reject-request", {name, email});
        console.log(res);
        window.location.reload();
    }
    catch(error){
        console.log(error);
    }
  }

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          wrapped="true"
        >
          <Tab label="Sub" {...a11yProps(0)} />
          <Tab label="Users" {...a11yProps(1)} />
          <Tab label="Requests" {...a11yProps(2)} />
          <Tab label="Statistics" {...a11yProps(3)} />
          <Tab label="Reports" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Typography variant="h2">Welcome to the {name} sub!</Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MySubUsers />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant="h2">Join Requests</Typography>
        {sub?.requests?.map((req) => {
            console.log(sub, "subs")
          return (
            <Card>
              <CardContent>
                <Typography>{req}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={()=>handleAccept(req)}>Accept</Button>
                <Button onClick={()=>handleReject(req)}>Reject</Button>
              </CardActions>
            </Card>
          );
        })}
      </TabPanel>
    </div>
  );
}
