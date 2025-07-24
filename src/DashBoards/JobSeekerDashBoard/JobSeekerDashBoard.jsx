import {useState} from 'react'
import DisplayJobs from './DisplayJobs/DisplayJobs'
import FilterOptions from './FilterOptions/FilterOptions'
import './job_seekerDashBoard.css'
import {useParams} from 'react-router-dom'
import SavedJobs from './SavedJobs/SavedJobs'
import AppliedJobs from './AppliedJobs/AppliedJobs'

const JobSeekerDashBoard = () => {
     const params=useParams()
      console.log(params,"params")
      
      function renderComp(){
      // let CompName;
      if(params.savedJobs=== "savedJobs"){
        return <SavedJobs/>;
      }
      else if(params.savedJobs==="appliedJobs"){
          return <AppliedJobs/>;
      }else{
          return <DisplayJobs setSelectJobRole={setSelectJobRole}/>;
      }
      // return CompName;
      }

  console.log(params,"params in JobDashboard")

   const [selectJobRole,setSelectJobRole]=useState("")
  return (
    <div className='job_seekerDashBoard'>
        <div className='jobFilters'>
          <FilterOptions setSelectJobRole={setSelectJobRole}/>
        </div>
        <div className='displayJobs'>
          {renderComp()}
        </div>
    </div>
  )
}

export default JobSeekerDashBoard