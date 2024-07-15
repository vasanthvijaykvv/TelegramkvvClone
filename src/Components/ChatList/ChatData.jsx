import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import { AllDataProvider } from "../../DataProvider/DataProvider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChatData() {
    const navigate = useNavigate()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    console.log(matches,"matches")
  const { themeMode, Id, setID } = AllDataProvider();
  const [chats, setChats] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [lastpage, setLastpage] = useState(0);
  React.useEffect(() => {
    fetchChats(page);
  }, [page]);

  const fetchChats = async (page) => {
    try {
      const response = await axios.get(
        `https://devapi.beyondchats.com/api/get_all_chats?page=${page}`
      );
      console.log(response.data.data);
      setChats((prevChats) => [...prevChats, ...response.data.data.data]);
      setLastpage(response.data.data.last_page);
    } catch (error) {
      console.error("Error fetching chats", error);
    }
  };

  const loadMoreItems = () => {
    console.log(lastpage, page);

    setPage((prevPage) => prevPage + 1);
  };
  ////////////////////////////////////////////////////////////////////////////////////
  function renderRow(props) {
    const { index, style, data } = props;
    const truncateText = (text, maxLength) => {
      if (text.length > maxLength) {
        return `${text.slice(0, maxLength)}...`;
      }
      return text;
    };
    const { id, creator } = data[index];
    function formatDate(date) {
      const today = window.moment().startOf("day");
      const weekStart = window.moment().startOf("week");
      const monthStart = window.moment().startOf("month");

      const momentDate = window.moment(date);

      if (momentDate.isSame(today, "day")) {
        return momentDate.format("hh:mm A");
      } else if (momentDate.isSameOrAfter(weekStart)) {
        return momentDate.format("dddd");
      } else if (
        momentDate.isSameOrAfter(monthStart) ||
        momentDate.isSameOrAfter(
          window.moment().subtract(1, "month").startOf("month")
        )
      ) {
        return momentDate.format("MMM DD");
      } else {
        return momentDate.format("MMM DD");
      }
    }
    const text = "This Message was sended by your friend";
    const navigateto = () =>{
        setID(id)
   if(!matches){
       navigate("seperatechat")
   }
    }
    return (
      <ListItem
        key={index}
        component="div"
        onClick={navigateto}
        sx={{
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "rgba(190, 161, 161, 0.19)",
          },
        }}
      >
        <ListItemAvatar>
          <Avatar src="https://th.bing.com/th/id/OIP.2UrlFqTSJJ5ln0ns_yt1AAHaHa?w=640&h=641&rs=1&pid=ImgDetMain">{creator?.name ? creator?.name[0] : "v"}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={creator?.name}
          secondary={truncateText(text, 22)}
        />
        <Stack alignItems="flex-end">
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {formatDate(creator?.updated_at)}
          </Typography>

          <Box
            sx={{
              backgroundColor: "#4b9cc4",
              color: "#fff",
              borderRadius: "50%",
              width: "1.5rem",
              height: "1.5rem",
              textAlign: "center",
            }}
          >
            <Typography variant="caption">4</Typography>
          </Box>
        </Stack>
      </ListItem>
    );
  }

  return (
    <Box
      sx={{
        width: "20rem",
        height: "auto",
        maxWidth: 320,
        color: themeMode === "light" ? "white" : " black",
      }}
    >
      <FixedSizeList
        height={590}
        width={320}
        itemSize={46}
        itemCount={chats.length}
        overscanCount={5}
        onItemsRendered={({ visibleStopIndex }) => {
          if (visibleStopIndex >= chats.length - 1 && lastpage > page) {
            loadMoreItems();
          }
        }}
        itemData={chats}
      >
        {(props) => renderRow({ ...props, data: chats })}
      </FixedSizeList>
    </Box>
  );
}
