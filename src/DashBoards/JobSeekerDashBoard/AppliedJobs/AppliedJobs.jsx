import React, {useEffect} from 'react'
// import { useParams} from 'react-router-dom'
import {useState} from 'react'
import { db } from '../../../ConfigFireBase/config'
import {doc,getDoc} from 'firebase/firestore'
const AppliedJobs = () => {
  const loggedinjobSeeker=JSON.parse(localStorage.getItem("loggedInJobSeeker"))

  const [loading,setLoading]=useState(true)
  const [appliedJobs,setAppliedJobs]=useState([]);
  
  useEffect(()=>{
    let fetchAppliedJobs=async()=>{
      try{
          const docRef=doc(db,"job_seekers",loggedinjobSeeker.user.displayName)
           const mainDocRef= await getDoc(docRef)
            
           const jobseekerDocData=mainDocRef.data()
           console.log(jobseekerDocData,"jobseekerDocData")
           setAppliedJobs(jobseekerDocData.appliedJobs)
           setLoading(false)
         }catch(err){
       console.log(err)
      }
    }
    fetchAppliedJobs()

  },[])
  if (loading){
      return <p>getting applied jobs... wait a moment</p>
  }
  return (
    <div>
        Appliedobs
      {appliedJobs.map((appliedJob)=>{
        if (!appliedJob) return null; // <-- SKIP null/undefined jobs

        return (
          <>
          <h2>{appliedJob.jobRole}</h2>
          <p>{appliedJob.company}</p>
          </>
        )
      })
    }
    </div>
  )
}

export default AppliedJobs