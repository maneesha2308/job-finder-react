

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getDocs, collection, updateDoc, arrayUnion, doc, getDoc } from 'firebase/firestore'
import { db } from '../../../ConfigFireBase/config'
import { Modal, Form, Button } from 'react-bootstrap'



const DisplayJobs = ({ selectJobRole }) => {
  const [resumeLink, setResumeLink] = useState("")
  const [selectedJob, setSelectedJob] = useState(null)

  const navigate = useNavigate()

  const loggedinjobSeeker = JSON.parse(localStorage.getItem("loggedInJobSeeker"))
  console.log(selectJobRole)
  const [allJobs, setAllJobs] = useState([]);
  const [openModal, setOpenModal] = useState(false)
  const [loadingJobs, setLoadingJobs,] = useState([true])
  const [filDataOnJobRole, setFilDataOnJobRole] = useState([])
  console.log("alljobs", allJobs);
  useEffect(() => {
    const fetchingJobs = async () => {
      try {
        const recCollectionRef = collection(db, "recruiters");

        const allDocs = await getDocs(recCollectionRef);

        let jobsFromDocs = []
        // console.log(allDocs.docs,"allDocs")
        allDocs.docs.map((doc) => {
          let individualDocJobs = doc.data().jobs
          console.log(individualDocJobs, "imndividualDocJobs")
          individualDocJobs.map((singleJob) => {
            jobsFromDocs.push(singleJob)
          })
          console.log(jobsFromDocs, "jobsFromDocs")
          // jobsFromDocs.push(doc.data().jobs)

          // console.log(doc.data().jobs,"doc")
          setAllJobs(jobsFromDocs)
          setFilDataOnJobRole(jobsFromDocs)
          setLoadingJobs(false)
        })
      }
      catch (err) {
        console.log(err);
      }
    };
    fetchingJobs();
  }, [])
  useEffect(() => {
    let roleBasedFilData = allJobs.filter((job) => job.jobRole === selectJobRole)
    setFilDataOnJobRole(roleBasedFilData)
    console.log(roleBasedFilData)
  }, [selectJobRole])

  if (loadingJobs) {
    return <><p>loading jobs....wait a moment</p></>
  }

  const handleSavedJob = async (savedJob) => {
    console.log(savedJob, "saved jobs")
    try {
      let job_seeker_ref_doc = doc(db, "job_seekers", loggedinjobSeeker.user.displayName)
      // console.log(job_seeker_ref_doc,"job_seeker_ref_doc")

      let job_seekerDataDoc = await getDoc(job_seeker_ref_doc)
      console.log(job_seekerDataDoc)

      await updateDoc(job_seeker_ref_doc, {
        savedJobs: arrayUnion(savedJob)
      })
      alert("job saved succesfully")


    } catch (err) {
      console.log(err)
    }
  }

  const handleApplyJob = async (appliedJob) => {

    console.log(appliedJob, "applied jobs")
    try {
      let job_seeker_ref_doc = doc(db, "job_seekers", loggedinjobSeeker.user.displayName)
      // console.log(job_seeker_ref_doc,"job_seeker_ref_doc")

      let job_seekerDataDoc = await getDoc(job_seeker_ref_doc)
      console.log(job_seekerDataDoc)

      await updateDoc(job_seeker_ref_doc, {
        appliedJobs: arrayUnion(appliedJob)
      });
      alert("job applied succesfully")

      //recruiters code

      const allRecDocs = await getDocs(collection(db, "recruiters"))
      // console.log(allRecDocs,"allRecDocs")
      allRecDocs.forEach((singleRecDoc) => {
        let jobs=singleRecDoc.data().jobs;
        // console.log(singleRecDoc.data().jobs,"singleRecDoc")

        const matchedJobIndex = singleRecDoc.data().jobs.find((job) =>
          job.company === appliedJob.company &&
          job.jobRole === appliedJob.jobRole);

          console.log(matchedJobIndex,"matchedJob", singleRecDoc.data().name)
          if(matchedJobIndex !==-1){
              jobs[matchedJobIndex].applications =[]
          }

          const recEmail=loggedinjobSeeker.user.email;
          jobs[matchedJobIndex].applications.push({recEmail,resumeLink})

        // console.log(matchedJob, "matchedJob")
        // console.log(singleRecDoc.data().name, "recName")

        const matchedRecruiter = doc
          (db, "recruiters", singleRecDoc.data().name);
        updateDoc(matchedRecruiter, {
          jobs:jobs
        });

        alert("successfully job applied")
      });

    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div>
      {filDataOnJobRole.length > 0 ? (
        <>
          {filDataOnJobRole.map((job) => {
            return (
              <div style={{ border: "1px solid black", marginBottom: "10px" }}>
                <p>{job.jobRole}</p>
                <span>{job.company}</span>
                <div style={{width:'300px',height:'40px'}}>
                  <button onClick={() => 
                    handleSavedJob(job)} style={{backgroundColor: 'lightseagreen' }}>Save</button>
                  <button onClick={() => {
                    setOpenModal(true)
                    setSelectedJob(job)
                  }} style={{ backgroundColor: 'lightseagreen' }}>Apply</button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        "no jobs found"
      )}

      {openModal &&
        <Modal show={openModal} onHide={() => setOpenModal(false)} >
          <Modal.Header closeButton>
            <Modal.Title>Postjob</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form style={{ maxWidth: '500', margin: 'auto' }} id='form'>

              <Form.Group className='mb-3'>
                <Form.Label>Email:---</Form.Label>
                <Form.Control
                  required
                  type='email'
                  value={loggedinjobSeeker.user.email}
                  readOnly
                  placeholder='email here'
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Resume link:--</Form.Label>
                <Form.Control
                  required
                  type="text"
                  onChange={(e) => setResumeLink(e.target.value)}
                  placeholder='resume link here'
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>

            <Button variant='primary' onClick={() => {
              handleApplyJob(selectedJob)
              setOpenModal(false)
            }}>
              Apply
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </div>
  );
};


export default DisplayJobs