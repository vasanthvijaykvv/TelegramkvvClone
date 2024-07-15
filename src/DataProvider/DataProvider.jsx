import React, { createContext, useContext, useEffect, useState } from "react";
const ContextProvider = createContext(null);

export const DataProvider = ({ children }) => {
  const [themeMode, setThemeMode] = React.useState("light");
  const [state, setState] = React.useState({
    left: false,
  });
 const[Id,setID] = useState(null)
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  ////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////
  return (
    <>
      <ContextProvider.Provider
        value={{
          themeMode,Id,setID,
          setThemeMode,state, setState,toggleDrawer
        }}
      >
        {children}
      </ContextProvider.Provider>
    </>
  );
};
export function AllDataProvider() {
  let { themeMode, setThemeMode,state, setState ,toggleDrawer,Id,setID} = useContext(ContextProvider);
  return {
    themeMode,
    setThemeMode,state, setState,toggleDrawer,Id,setID
  };
}
