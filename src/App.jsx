import { useState } from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import './App.css'
import Telegram from './Components/Telegram';
import { DataProvider } from './DataProvider/DataProvider';

function App() {

  return (
    <>
    <DataProvider>
    <CssBaseline />
    <Telegram/>
    </DataProvider>
    </>
  )
}

export default App