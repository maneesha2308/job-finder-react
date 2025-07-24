import React from 'react'
import {Form} from 'react-bootstrap'
import {useState} from 'react'
import {Button,Modal} from 'react-bootstrap'
import { db } from '../../../ConfigFireBase/config'
import {doc,updateDoc,arrayUnion} from 'firebase/firestore'
const Postjob = () => {
    const loggedinUser=JSON.parse(localStorage.getItem("loggedInRecruiter"))
    const [jobDetails,setJobDetails]=useState({jobRole:"", company:"", jd:""})
    const [openModal,SetOpenModal]=useState(true)

    const handleClick=()=>{
        SetOpenModal(true)
    }
    const handleClose=()=>{
        SetOpenModal(false)
    }
    const handleJobPosting=async()=>{
      const recruiterDocRef= await doc(db,"recruiters",loggedinUser.user.displayName);
      updateDoc(recruiterDocRef,{
      jobs:arrayUnion(jobDetails),
      });
        alert("job posted");
        handleClose();
      };

  return (
    <div style={{display:'flex', justifyContent:'center', alignContent:'center', marginTop:'6rem'}}>
    
    <Button variant="outline-primary" onClick={handleClick}>Primary</Button>

    <Modal show={openModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Postjob</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form style={{maxWidth:'500px', margin:'auto'}} id='form' >
            <Form.Group className='mb-3'>
                <Form.Label>JobRole</Form.Label>
            <Form.Select aria-label="Default select example" 
            onChange={(e)=>setJobDetails({...jobDetails,jobRole:e.target.value})} required>
             <option>Open this select menu</option>
              <option value="frontend">Frontend Developer</option>
              <option value="backend">Backend Developer</option>
             <option value="fullstack">Fullstack Developer</option>
            </Form.Select>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>company:--</Form.Label>
                <Form.Control 
                required
                type='text' 
                placeholder='company here' 
                onChange={(e)=>setJobDetails({...jobDetails,company:e.target.value})}/>
            </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>jobdesription:--</Form.Label>
                <Form.Control 
                required
                as="textarea"
                onChange={(e)=>setJobDetails({...jobDetails,jd:e.target.value})}/>
            </Form.Group>
            </Form>
        </Modal.Body>

        <Modal.Footer>
          
          <Button variant="primary"onClick={handleJobPosting} >
            Post
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default Postjob