import React from 'react'
import './Signup.css'
import {useState} from 'react'
import {Form} from 'react-bootstrap'
import { authentication,db} from '../../ConfigFireBase/config'
import {createUserWithEmailAndPassword,updateProfile} from "firebase/auth"
import {setDoc,doc} from "firebase/firestore"
import { useNavigate } from 'react-router-dom'
//doc:--to make a doc
//setDoc:--to create a room for that doc in database
const Signup = () => {
    const navigate=useNavigate()
    const [signUpDetails,setSignUpDetails]=useState({
        name:"",
        email:"",
        password:"",
        role:"",
    });
    const handleSignUpSubmit=async(e)=>{
        e.preventDefault()
        try{
         const accountCreated= await 
         createUserWithEmailAndPassword(authentication,signUpDetails.email,signUpDetails.password);
         console.log(accountCreated,"account created obj")

         await updateProfile(accountCreated.user,{
            displayName:signUpDetails.name
         })
        
         
        await setDoc(doc(db,`${signUpDetails.role}s`,signUpDetails.name),{
            name:signUpDetails.name,
            email:signUpDetails.email,
            role:signUpDetails.role,
            id:Date.now()

        })

        alert("account created successfully and redirecting to login")
        navigate("/login")
        //setDoc:--it will creatd a doc in database:--it takes 2 values or 2 arguments(arg)
        // 1st arg is all about reference of the doc ,we can use doc() as a first value
        // 2.value :-- fields to be git in that doc(1st arg)

        //doc:--it is used to create a reference of the doc:--which collection which doc should be give,
        // we can pass 3 values
        //1st value:-- db
        //2nd value:-- collection (reciters)
        //3rd value:--docname(manisha)

         }catch (err) {
            console.log(err);
        }
     };
    return (
    <div style={{marginTop:'3rem'}} className='signUpForm'>
        <Form style={{maxWidth:'500px', margin:'auto'}} id='form' onSubmit={handleSignUpSubmit}>
            <Form.Group className='mb-3'>
                <Form.Label>Name:--</Form.Label>
                <Form.Control type='text' placeholder='name here' 
                onChange={(e)=>setSignUpDetails({...signUpDetails,name:e.target.value})}/>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Email:--</Form.Label>
                <Form.Control type='email' placeholder='email here' 
                onChange={(e)=>setSignUpDetails({...signUpDetails,email:e.target.value})}/>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Password:--</Form.Label>
                <Form.Control type='password' placeholder='password here' 
                onChange={(e)=>setSignUpDetails({...signUpDetails,password:e.target.value})}/>
            </Form.Group>
            <Form.Select aria-label="Default select example" className='mb-3' 
            onChange={(e)=>setSignUpDetails({...signUpDetails,role:e.target.value})}>
               <option>Choose your Role</option>
               <option value="recruiter">Recruiter</option>
               <option value="job_seeker">JobSeeker</option>
            </Form.Select>
            <button type='Submit' style={{borderRadius: '6px 15px'}}>SignUp</button>
        </Form>
    </div>
  )
}

export default Signup