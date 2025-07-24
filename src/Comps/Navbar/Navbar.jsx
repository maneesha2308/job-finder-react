import React from 'react'
import './Navbar.css'
import {Link,useNavigate} from 'react-router-dom'
import {Navbar , Container,Nav} from 'react-bootstrap'
import {signOut,getAuth} from 'firebase/auth'
const NavbarComp = () => {
  const navigate=useNavigate()
  const loggedinUser=JSON.parse(localStorage.getItem("loggedInRecruiter"))||JSON.parse(localStorage.getItem("loggedInJobSeeker"))

  const handleLogout=async()=>{
    const auth=getAuth();
            try{
                await signOut(auth);
                localStorage.removeItem("loggedInRecruiter")
                alert("loggedout done")
                navigate("/login")
            }
            catch(err){
              console.log(err);
            }
  }

  return (
    <div className='navbar'>
      <Navbar expand="lg" className="bg-body-tertiary" >
      <Container fluid style={{
  background: 'linear-gradient(to right,lightseagreen, #2ecc71)'

       }}>
        <Navbar.Brand href="#" style={{width:'100%',fontFamily:'Times new roman',
          fontWeight:'600',color:'white'}}>
          <h1>JOB-FINDER</h1> </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" >
          <Nav
            className="me-auto" 
          >
            {loggedinUser ? 
            <div 
             className="ms-auto d-flex gap-3 align-items-center"
             style={{fontFamily:'Times new roman'}}>
    
            <button onClick={()=>navigate("/")} style={{border:'1px solid white' ,borderRadius:'6px 15px',padding:'5px' ,color:'lightseagreen'}}>Home</button>
            <button onClick={()=>navigate("/SignUp")} style={{border:'1px solid white' ,borderRadius:'6px 15px',padding:'5px' ,color:'lightseagreen'}}>SignUp</button>
            <button onClick={()=>navigate("/Login")} style={{border:'1px solid white',borderRadius:'6px 15px',padding:'5px' ,color:'lightseagreen'}}>Login</button>

            <button onClick={()=>navigate("/job_seekerDashBoard/savedJobs")} style={{border:'1px solid white' ,borderRadius:'6px 15px',padding:'5px' ,color:'lightseagreen'}}>Savedjobs</button>  
            <button onClick={()=>navigate("/job_seekerDashBoard/appliedJobs")} style={{border:'1px solid white' ,borderRadius:'6px 15px',padding:'5px' ,color:'lightseagreen'}}>Appliedjobs</button> 
            <button onClick={handleLogout} style={{border:'1px solid white' ,borderRadius:'6px 15px',padding:'5px' ,color:'lightseagreen'}}>Logout</button>

            </div>:
            <div >
            <Link to="/signup">SignUp</Link>
            <Link to="/login">Login</Link>
            <Link to="/">Home</Link>
            </div>
            }
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default NavbarComp
