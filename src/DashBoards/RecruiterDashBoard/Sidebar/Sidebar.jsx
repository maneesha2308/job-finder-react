import React from 'react'
import {Link} from 'react-router-dom'
import './Sidebar.css'
import PostJob from '../PostJob/PostJob'
const Sidebar = () => {
  return (
    <div className='sidebar_links'>
      <span ><Link to='post_job' style={{color:'whitesmoke', border:'1px solid white', padding:'10px' ,display:'flex', justifyContent:'space-around' ,textDecoration:'none'}}>PostJob</Link>
      </span>  
      <span>
        <Link to='my_postings' style={{color:'whitesmoke', border:'1px solid white', padding:'10px' ,display:'flex', justifyContent:'space-around' ,textDecoration:'none'}}>MyPostings</Link>
      </span>
    </div>
  )
}

export default Sidebar