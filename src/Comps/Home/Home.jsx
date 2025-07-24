
import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import './Home.css'
import { motion } from 'framer-motion'

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      id='home'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        className="hero-content"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <motion.h1 
          initial={{ scale: 0.9 }} 
          animate={{ scale: 1 }} 
          transition={{ delay: 0.5 }}
        >
          Find Your Dream Job
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.8 }}
        >
          Browse thousands of jobs, connect with top companies, and launch your career.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/SignUp")}
          className="explore-btn"
        >
          Explore Jobs
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default Home
