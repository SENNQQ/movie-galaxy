import {createTheme} from "@mui/material";


const Colors = {
    primary: "#030303",
    primaryLight:"rgba(0,0,0,.75)",
    primaryDark:"#2f2f2f",
    secondary:"#2196f3",


    //////
    // Solid color
    //////
    white:"#fff",
    black:"#000",
}


const darkTheme = createTheme({
    components:{
      MuiSvgIcon:{
          styleOverrides: {
              // Name of the slot
              root: {
                  // Some CSS
                  fontSize: '38px',
              },
          },
      }
    },
    palette: {
        primary:{
            main:Colors.primary,
            light:Colors.primaryLight,
            dark:Colors.primaryDark,
        },
        secondary:{
            main:Colors.secondary,
        }
    },
});

export default darkTheme;