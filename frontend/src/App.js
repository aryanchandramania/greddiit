import SignIn from './SignIn.js'
import SignUp from './SignUp.js'
import Profile from './Profile.js'
import MySubs from './MySubs.js'
import MySubPage from './MySubPage.js'
import AllSubs from './AllSubs.js'
import AllSubPage from './AllSubPage.js'
import { useState } from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import {
    BrowserRouter as Router,
    Routes, Route
  } from "react-router-dom"

const App = () => {
    const [ login, setLogin ] = useState(true);
    const handleClick = () => setLogin(!login);
    
    const SwitchRenders = () => {
        if(login === true) {
            return (
            <div>
                <SignIn/>
                <Grid sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            }}><Button onClick = {handleClick} > Don't have an account? Sign up </Button></Grid>
            </div>)
        }
        return (
        <div>
            <SignUp/>
            <Grid sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            }}><Button onClick = {handleClick}> Already have an account? Sign in </Button>
            </Grid>
            </div>
        )
    }
    
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/all/:name" element={<AllSubPage />} />
                    <Route path="/all" element={<AllSubs />} />
                    <Route path="/g/:name" element={<MySubPage />} />
                    <Route path="/my" element={<MySubs />} />
                    <Route path="/profile" element={<Profile /> } />
                    <Route path="/" element={<SwitchRenders />} />
                </Routes>
            </Router>
        </div> 
  )
}

export default App;