import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RoutingLayout from "./RoutingLayOut/RoutingLayout";
import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider } from "@mui/material";
import { AllDataProvider } from "../DataProvider/DataProvider";
import ChatList from "./ChatList/ChatList";
import Seperatechat from "./ChatList/Seperatechat";
const Telegram = () => {
    const { themeMode,
        setThemeMode,} = AllDataProvider()
        const lightTheme = createTheme({
            palette: {
              mode: 'light',
              primary: {
                main: '#4b9cc4',
                contrastText: '#fff',
              },
            },
          });
          
          const darkTheme = createTheme({
            palette: {
              mode: 'dark', 
                
            },
            components:{
                MuiButton: {
                    styleOverrides: {
                      root: {
                        color:"white"
                      },
                    },
                  },              
            }
          });
          const theme = themeMode === 'light' ? darkTheme :  lightTheme;
  return (
    <>
     <ThemeProvider theme={theme}>
      <Router>
        <Routes>
        <Route path="/" element={<RoutingLayout/>}>
        <Route index element={<ChatList/>}/>
        <Route path="chatlist" element={<ChatList/>}/>
        <Route path="seperatechat" element={<Seperatechat/>}/>
        

        </Route>
              


        </Routes>
      </Router>
      </ThemeProvider>
    </>
  );
};

export default Telegram;
