import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import "./RecruiterDashboard.css"
import {Outlet} from 'react-router-dom'
const RecruiterDashBoard = () => {
  return (
    <div className='recruiter_dashboard'>
      <div className='sidebar'>
        <Sidebar/>
      </div>
      <div className='main' style={{width:'70%'}}>
        <Outlet/>

      </div>
    </div>
  )
}

export default RecruiterDashBoard