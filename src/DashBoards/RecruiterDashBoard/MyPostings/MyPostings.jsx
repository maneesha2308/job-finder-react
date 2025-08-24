import React from 'react'
import "./MyPostings.css"
import { db } from '../../../ConfigFireBase/config'
import { doc,getDoc, updateDoc } from 'firebase/firestore'
import {useEffect,useState} from 'react'
import { Modal,Button} from 'react-bootstrap'
const MyPostings = () => {
  const [jobs,setJobs]=useState([])
  const [openModal,setOpenModal]=useState(false)
  const [loading,setLoading]=useState(true)
    const loggedinUser=JSON.parse(localStorage.getItem("loggedInRecruiter"));
    const loggedInUserName=loggedinUser.user.displayName
   const [selectedJob,setSelectedJob]=useState(null)
   console.log(selectedJob,"sjob")

    useEffect(()=>{
      const fetchingData=async()=>{
      const docRef= doc(db,"recruiters" ,loggedinUser.user.displayName)
      const getDocRef=await getDoc(docRef)
      console.log(getDocRef)

      if (getDocRef.exists()){
        const data=getDocRef.data()
        console.log(data,"data")
        setJobs(data.jobs||[])
        setLoading(false)
      }
    }
      fetchingData()
    },[])

    if(loading){
      return <p>loading...</p>
    }
    const handleDeleteJob=async(choosedJobIndex)=>{
        let jobsAfterDeletFilteration=jobs.filter((job,index)=>index!==choosedJobIndex)
        console.log(jobsAfterDeletFilteration)

        const docRef=doc(db,"recruiters", loggedInUserName)
        await updateDoc(docRef,{
          jobs:jobsAfterDeletFilteration
        })
        alert("job deleted successfully")

        setJobs(jobsAfterDeletFilteration)

    }
    
   const handleApplications=(job)=>{
    setSelectedJob(job)
    setOpenModal(true)
   }

  return (
    <div className='mypostings' style={{padding:'10px',display:'grid',gridTemplateColumns:'auto auto auto',gap:'10px'}}>
      {jobs.length>0?<>
      {jobs.map((job,jobIndex)=>{
        return(
          <div className='box'style={{border:'1px solid black',padding:'8px',marginBottom:'8px'}}>
            <h1>{job.jobRole}</h1>
            <p>{job.company}</p>
            <div style={{gap:'10px'}}>
              <span style={{border:'1px solid black',padding:'5px',borderRadius:'5px'}}>Edit</span>
              <span onClick={()=>handleDeleteJob(jobIndex)} style={{border:'1px solid black',padding:'5px',borderRadius:'5px'}}>Delete</span>
              <span onClick={()=>handleApplications(job)} style={{border:'1px solid black',padding:'5px',borderRadius:'5px'}}>Applications</span>
              
            </div>
          </div>
        )
      })}
      </>:"no jobs posted yet"}




       {openModal &&
        <Modal show={openModal} onHide={() => setOpenModal(false)} >
          <Modal.Header closeButton>
            <Modal.Title>AllApplications</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <table>
              <thead>
              <tr>
                <th>s.no</th>
                <th>email</th>
                <th>ResumeLink</th>
              </tr>
              </thead>
              <tbody>
                    {selectedJob?.applications?.map((application,index)=>{
                      const resume=application.resumeLink
                      return(
                        <tr>
                          <td>{index+1}</td>
                          <td>{application.email}</td>
                          <a href={`${resume}`} target='_blank'></a>
                        </tr>
                      )
                    })}
              </tbody>
            </table>
          </Modal.Body>

          <Modal.Footer>

            <Button variant='primary' onClick={() => {
              setOpenModal(false)
            }}>
              close
            </Button>
          </Modal.Footer>
        </Modal>
      }
        

    </div>
  )
}

export default MyPostings
