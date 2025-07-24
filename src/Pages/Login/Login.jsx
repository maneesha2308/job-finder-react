import React from 'react'
import './Login.css'
import {Form} from 'react-bootstrap'
import {useState} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import {signInWithEmailAndPassword} from 'firebase/auth'
import { authentication } from '../../ConfigFireBase/config'
const Login = () => {
  const navigate=useNavigate()
  const [loginDetails, setLoginDetails]=useState({email:"",password:"",role:""})
  const handleLoginSubmit=async(e)=>{
    e.preventDefault()
    const {email,password,role}=loginDetails;
           try{
            const loggedinUser= await signInWithEmailAndPassword(authentication,email,password)
             alert("login successfull")
             navigate(`/${role}DashBoard`)
             if (role==="recruiter"){
             localStorage.setItem("loggedInRecruiter", JSON.stringify(loggedinUser))

             }
             else{
             localStorage.setItem("loggedInJobSeeker",JSON.stringify(loggedinUser))
             }
           }

           catch(err){
            console.log("login failed")
           }
  }
  return (
    <div className='login'>
      <Form style={{maxWidth:'500px', margin:'auto'}} id='form' onSubmit={handleLoginSubmit}>
            
                
            <Form.Group className='mb-3'>
                <Form.Label>Email:--</Form.Label>
                <Form.Control 
                type='email' 
                placeholder='email here' 
                onChange={(e)=>setLoginDetails({...loginDetails,email:e.target.value})}/>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Password:--</Form.Label>
                <Form.Control 
                type='password' 
                placeholder='password here' 
                onChange={(e)=>setLoginDetails({...loginDetails,password:e.target.value})}/>
            </Form.Group>
            <Form.Select 
              aria-label="Default select example" className='mb-3' 
              onChange={(e)=>setLoginDetails({...loginDetails,role:e.target.value})}>
               <option>Choose your Role</option>
               <option value="recruiter">Recruiter</option>
               <option value="job_seeker">JobSeeker</option>
            </Form.Select>
            <button type='submit' style={{borderRadius: '6px 15px'}} >Login</button>
            <Link to='/signup'><button style={{borderRadius: '6px 15px'}}>Go to signUpForm</button></Link>
        </Form>
    </div>
  )
}

export default Login 