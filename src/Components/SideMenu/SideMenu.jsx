import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MailIcon from "@mui/icons-material/Mail";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { Stack, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { AllDataProvider } from "../../DataProvider/DataProvider";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
export default function SideMenu() {
  const { themeMode, setThemeMode,state, setState,toggleDrawer } = AllDataProvider();

 

  const arr2 = [
    { name: "New Group", icon: <GroupOutlinedIcon /> },
    { name: "Contacts", icon: <PermIdentityOutlinedIcon /> },
    { name: "Calls", icon: <PhoneOutlinedIcon /> },
    { name: "People Nearby", icon: <EmojiPeopleOutlinedIcon /> },
    { name: "Saved Messages", icon: <BookmarkBorderOutlinedIcon /> },
    { name: "Settings", icon: <SettingsSuggestOutlinedIcon /> },
  ];
  /////////////////////////////////////////////////////////////////////////////////
  const [isDarkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  console.log(themeMode);

  ////////////////////////////////////////////////////////////////////////////////

  const list = (anchor) => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      //   onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box
        sx={{
          backgroundColor: themeMode === "light" ? "#3F3737" : "primary.main",
          padding: "8px 16px",
        }}
      >
        <Stack spacing={1}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ width: 50, height: 50,color:"white" }}>V</Avatar>
            <DarkModeSwitch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              size={20}
              sunColor="white"
            />
          </Box>
          <Box  sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <Stack><Typography variant="button" sx={{color:"white"}}>Vasanth Vijay</Typography>
              <Typography variant="caption" sx={{color:themeMode === "light" ?"#757575":"white"}}>+91 9043935319</Typography>
              </Stack>
              <KeyboardArrowDownIcon sx={{color:"white"}}/>
          </Box>
        </Stack>
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="subtitle2">My Profile</Typography>}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {arr2.map((e, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>{e.icon}</ListItemIcon>
              <ListItemText
                primary={<Typography variant="subtitle2">{e.name}</Typography>}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Invite Friends", "Telegram Features"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <PersonAddOutlinedIcon />
                ) : (
                  <HelpOutlineOutlinedIcon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="subtitle2">{text}</Typography>}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer
          anchor="left"
          open={state.left}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {list("left")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
