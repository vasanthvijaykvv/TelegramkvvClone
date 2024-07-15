import Stack from "@mui/material/Stack";
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AllDataProvider } from "../../DataProvider/DataProvider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Chat from "./Chat";
import { Container, IconButton, useTheme } from "@mui/material";
import axios from "axios";
import useMediaQuery from '@mui/material/useMediaQuery';
const Seperatechat = () => {
    const { themeMode,Id } = AllDataProvider();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const [chatdata, setChatdata] = useState([]);
    const chatContainerRef = useRef(null);
    useEffect(() => {
   if(Id){
    (async () => {
      try {
        const response = await axios.get(
          `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${Id}`
        );
        console.log(response.data.data);
        setChatdata(response.data.data);
      } catch (error) {
        console.error("Error fetching chats", error);
      }
    })();
   }
    }, [Id]);
  
    useEffect(()=>{
      if(matches){
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  
      }
    },[chatdata])
  return (
    <>
   <IconButton size="large" onClick={() => window.history.back()}>
   <ArrowBackIcon fontSize="large" color="primary"/>
   </IconButton>
   
     <Box sx={{backgroundImage:`url(https://web.telegram.org/a/chat-bg-pattern-dark.ad38368a9e8140d0ac7d.png)`,width:"100%",height:"580px",display:"flex",alignItems:"flex-end",overflow:"auto"}} ref={chatContainerRef}>
     <Box>
    
</Box> <Container
        maxWidth="md"
        sx={{ display: "flex", justifyContent: "flex-end",height:"100%",padding:'1rem' }}
      >

        <Stack spacing={2}  >

          {chatdata.map((e, i) => {
            return (
           <Chat {...e} key={i}/>
            );
          })}
        </Stack>
      </Container>
     </Box>
    </>
  )
}

export default Seperatechat