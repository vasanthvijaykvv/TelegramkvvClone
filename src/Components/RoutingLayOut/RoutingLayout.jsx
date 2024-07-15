
import React from 'react'
import { Outlet } from 'react-router-dom'
import AppBarComp from '../AppBar/AppBar'


const RoutingLayout = () => {
 
    
  
  return (
    <>
    <AppBarComp/>  
    <Outlet/>
    </>
  )
}

export default RoutingLayout