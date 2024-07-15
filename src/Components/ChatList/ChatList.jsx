import Stack from "@mui/material/Stack";
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AllDataProvider } from "../../DataProvider/DataProvider";
import ChatData from "./ChatData";
import Chat from "./Chat";
import { Container, useTheme } from "@mui/material";
import axios from "axios";
import useMediaQuery from '@mui/material/useMediaQuery';
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box >{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
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
const ChatList = () => {
  const { themeMode,Id } = AllDataProvider();
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  ////////////////////////////////////////////////////////
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
    <Stack direction="row">
    <Box
        sx={{
          maxWidth: "20rem",
          bgcolor: themeMode === "light" ? "#3F3737" : "white",
          typography: "body1",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          indicatorColor="primary"
          scrollButtons={false}
          sx={{
            "& .MuiTabs-indicator": {
              borderRadius: "1rem",
            },
          }}
        >
          <Tab
            sx={{ textTransform: "capitalize" }}
            label={
              <span>
                All
                <span
                  style={{
                    backgroundColor: "#4b9cc4",
                    color: "#fff",
                    borderRadius: "50%",
                    padding: "2px 8px",
                    marginLeft: "5px",
                  }}
                >
                  1
                </span>
              </span>
            }
            {...a11yProps(0)}
          />
          <Tab
            sx={{ textTransform: "capitalize" }}
            label="Regular"
            {...a11yProps(1)}
          />
          <Tab
            sx={{ textTransform: "capitalize" }}
            label="Unread"
            {...a11yProps(2)}
          />
          <Tab
            sx={{ textTransform: "capitalize" }}
            label="Channels"
            {...a11yProps()}
          />
          <Tab
            sx={{ textTransform: "capitalize" }}
            label="Media"
            {...a11yProps()}
          />
          <Tab
            sx={{ textTransform: "capitalize" }}
            label="Downloads"
            {...a11yProps(2)}
          />
        </Tabs>

        <CustomTabPanel value={value} index={0}>
          <ChatData />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}></CustomTabPanel>
      </Box>
     <Box sx={{backgroundImage:`url(https://web.telegram.org/a/chat-bg-pattern-dark.ad38368a9e8140d0ac7d.png)`,width:"100vw",height:"580px",display:"flex",alignItems:"flex-end",overflow:"auto"}} ref={chatContainerRef}>
      <>
     {matches&&Id&& <Container
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
      </Container>}
    </>
      </Box>
    </Stack>
      
    </>
  );
};

export default ChatList;
