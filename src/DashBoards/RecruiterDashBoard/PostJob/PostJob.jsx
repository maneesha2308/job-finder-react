import React, { useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import { db } from '../../../ConfigFireBase/config'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'

const Postjob = () => {
  const loggedinUser = JSON.parse(localStorage.getItem("loggedInRecruiter"))
  const [jobDetails, setJobDetails] = useState({
    jobRole: "",
    company: "",
    jd: "",
    location: "",
    type: "",
    salary: "",
    posted: new Date().toLocaleDateString() // auto add today's date
  })

  const [openModal, SetOpenModal] = useState(false)

  const handleClick = () => {
    SetOpenModal(true)
  }
  const handleClose = () => {
    SetOpenModal(false)
  }

  const handleJobPosting = async () => {
    try {
      const recruiterDocRef = await doc(db, "recruiters", loggedinUser.user.displayName)
      await updateDoc(recruiterDocRef, {
        jobs: arrayUnion(jobDetails),
      })
      alert("Job posted successfully ✅")
      handleClose()
    } catch (error) {
      console.error("Error posting job:", error)
      alert("Something went wrong ❌")
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6rem' }}>
      <Button variant="outline-primary" onClick={handleClick}>Post a Job</Button>

      <Modal show={openModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Post a New Job</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form style={{ maxWidth: '500px', margin: 'auto' }} id='form' >

            {/* Job Role */}
            <Form.Group className='mb-3'>
              <Form.Label>Job Role</Form.Label>
              <Form.Select
                aria-label="Select Job Role"
                onChange={(e) => setJobDetails({ ...jobDetails, jobRole: e.target.value })}
                required
              >
                <option value="">Select a role</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Fullstack Developer">Fullstack Developer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Cloud Engineer">Cloud Engineer</option>
              </Form.Select>
            </Form.Group>

            {/* Company */}
            <Form.Group className='mb-3'>
              <Form.Label>Company</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Company name'
                onChange={(e) => setJobDetails({ ...jobDetails, company: e.target.value })}
              />
            </Form.Group>

            {/* Location */}
            <Form.Group className='mb-3'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='e.g. Hyderabad, Bengaluru'
                onChange={(e) => setJobDetails({ ...jobDetails, location: e.target.value })}
              />
            </Form.Group>

            {/* Job Type */}
            <Form.Group className='mb-3'>
              <Form.Label>Job Type</Form.Label>
              <Form.Select
                onChange={(e) => setJobDetails({ ...jobDetails, type: e.target.value })}
                required
              >
                <option value="">Select type</option>
                <option value="Remote">Remote</option>
                <option value="Onsite">Onsite</option>
                <option value="Hybrid">Hybrid</option>
              </Form.Select>
            </Form.Group>

            {/* Salary */}
            <Form.Group className='mb-3'>
              <Form.Label>Salary Range</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='e.g. ₹6 – 10 LPA'
                onChange={(e) => setJobDetails({ ...jobDetails, salary: e.target.value })}
              />
            </Form.Group>

            {/* Job Description */}
            <Form.Group className='mb-3'>
              <Form.Label>Job Description</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                placeholder='Enter job responsibilities and requirements'
                onChange={(e) => setJobDetails({ ...jobDetails, jd: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleJobPosting}>Post Job</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Postjob
