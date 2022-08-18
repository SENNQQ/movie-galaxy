import React from 'react';
import {AppBar, Box} from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonalVideoOutlinedIcon from '@mui/icons-material/PersonalVideoOutlined';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';

// const styleHeader = makeStyles({
//     container:{
//         textAlign:"center"
//     }
// })


export const MuiNavbar = () => {

    return (
        <>
                <AppBar elevation={0} position="sticky" color="primary">
                    <Box sx={{
                        textAlign:"center"
                    }}
                    >
                        <HomeOutlinedIcon fontSize="large"/>
                    </Box>
                    <Box >
                        <SearchOutlinedIcon fontSize="large"/>
                    </Box>
                    <Box>
                        <PersonalVideoOutlinedIcon fontSize="large"/>
                    </Box>
                    <Box>
                        <MovieCreationOutlinedIcon fontSize="large"/>
                    </Box>
                </AppBar>
        </>
    );
};
