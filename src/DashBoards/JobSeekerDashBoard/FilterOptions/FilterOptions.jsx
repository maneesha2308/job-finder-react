import React from 'react'
import './FilterOptions.css'


const FilterOptions = ({setSelectJobRole}) => {
  const handleJobRole=(role)=>{
    setSelectJobRole(role)

  }
  return (
    <div className='fil_options'>
        <span onClick={()=>handleJobRole("frontend")}>FrontendJobs</span>
        <span onClick={()=>handleJobRole("backend")}>BackendJobs</span>
        <span onClick={()=>handleJobRole("fullstack")}>FullstackJobs</span>
    </div>
  )
}

export default FilterOptions