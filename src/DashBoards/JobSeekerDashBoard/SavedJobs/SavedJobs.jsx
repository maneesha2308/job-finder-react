import React, {useEffect} from 'react'
// import { useParams} from 'react-router-dom'
import {useState} from 'react'
import { db } from '../../../ConfigFireBase/config'
import {doc,getDoc} from 'firebase/firestore'
const SavedJobs = () => {
  const loggedinjobSeeker=JSON.parse(localStorage.getItem("loggedInJobSeeker"))

  const [loading,setLoading]=useState(true)
  const [savedJobs,setSavedJobs]=useState([]);
  useEffect(()=>{
    let fetchSavedJobs=async()=>{
      try{
          const docRef=doc(db,"job_seekers",loggedinjobSeeker.user.displayName)
           const mainDocRef= await getDoc(docRef)
            
           const jobseekerDocData=mainDocRef.data()
           console.log(jobseekerDocData,"jobseekerDocData")
           setSavedJobs(jobseekerDocData.savedJobs)
           setLoading(false)
         }catch(err){
       console.log(err)
      }
    }
    fetchSavedJobs()

  },[])
  if (loading){
      return <p>getting saved jobs... wait a moment</p>
  }
  return (
    <div>
      savedjobs
      {savedJobs.map((savedJob)=>{
        return (
          <>
          <h2>{savedJob.jobRole}</h2>
          <p>{savedJob.company}</p>
          </>
        )
      }
      )}
    </div>
  )
}

export default SavedJobs