import React, { useState } from "react";
import "./DisplayJobs.css";

const DisplayJobs = () => {
  const jobsData = [
    { id: 1, title: "Frontend Developer", company: "Infosys", location: "Hyderabad", type: "Remote" },
    { id: 2, title: "Backend Developer", company: "TCS", location: "Bengaluru", type: "Onsite" },
    { id: 3, title: "Full Stack Engineer", company: "Accenture", location: "Hyderabad", type: "Hybrid" },
    { id: 4, title: "Data Analyst", company: "Deloitte", location: "Pune", type: "Remote" },
    { id: 5, title: "UI/UX Designer", company: "Wipro", location: "Chennai", type: "Onsite" },
    { id: 6, title: "Cloud Engineer", company: "Amazon AWS", location: "Hyderabad", type: "Hybrid" },
    { id: 7, title: "Machine Learning Engineer", company: "Google", location: "Bengaluru", type: "Remote" },
    { id: 8, title: "Cybersecurity Analyst", company: "Capgemini", location: "Noida", type: "Onsite" },
    { id: 9, title: "DevOps Engineer", company: "Microsoft", location: "Hyderabad", type: "Hybrid" },
    { id: 10, title: "Database Administrator", company: "Oracle", location: "Mumbai", type: "Onsite" },
    { id: 11, title: "Software Engineer", company: "Tech Mahindra", location: "Pune", type: "Remote" },
    { id: 12, title: "AI Research Intern", company: "Adobe", location: "Bengaluru", type: "Hybrid" },
    { id: 13, title: "Business Analyst", company: "Cognizant", location: "Hyderabad", type: "Onsite" },
    { id: 14, title: "System Administrator", company: "HCL", location: "Chennai", type: "Onsite" },
    { id: 15, title: "QA Tester", company: "Mindtree", location: "Bengaluru", type: "Remote" },
    { id: 16, title: "Network Engineer", company: "Cisco", location: "Gurgaon", type: "Hybrid" },
    { id: 17, title: "Product Manager", company: "Flipkart", location: "Bengaluru", type: "Onsite" },
    { id: 18, title: "Data Scientist", company: "IBM", location: "Hyderabad", type: "Remote" },
    { id: 19, title: "Mobile App Developer", company: "Paytm", location: "Noida", type: "Onsite" },
    { id: 20, title: "Blockchain Developer", company: "Polygon", location: "Mumbai", type: "Hybrid" },
    { id: 21, title: "Game Developer", company: "Ubisoft", location: "Pune", type: "Onsite" },
    { id: 22, title: "AR/VR Engineer", company: "Meta", location: "Bengaluru", type: "Remote" },
    { id: 23, title: "Technical Support Engineer", company: "Zoho", location: "Chennai", type: "Onsite" },
    { id: 24, title: "Site Reliability Engineer", company: "Netflix", location: "Hyderabad", type: "Hybrid" },
  ];

  // Search + filter states
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  // Filter jobs first
  const filteredJobs = jobsData.filter((job) => {
    return (
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      (location ? job.location === location : true) &&
      (jobType ? job.type === jobType : true)
    );
  });

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="container mt-3">
      <h2 className="text-center mb-4 fw-bold">Available Jobs</h2>

      <div className="row">
        {/* Filters Section */}
        <div className="col-md-3 mb-4">
          <div className="filter-card p-3 shadow-sm rounded">
            <h5 className="fw-semibold mb-3">Filter Jobs</h5>

            <input
              type="text"
              placeholder="Search by Title"
              className="form-control mb-3"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // reset to page 1
              }}
            />

            <select
              className="form-select mb-3"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Locations</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Pune">Pune</option>
              <option value="Chennai">Chennai</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Noida">Noida</option>
              <option value="Gurgaon">Gurgaon</option>
            </select>

            <select
              className="form-select mb-3"
              value={jobType}
              onChange={(e) => {
                setJobType(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Types</option>
              <option value="Remote">Remote</option>
              <option value="Onsite">Onsite</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        {/* Jobs Section */}
        <div className="col-md-9">
          {currentJobs.length > 0 ? (
            <div className="row">
              {currentJobs.map((job) => (
                <div key={job.id} className="col-md-4 mb-4">
                  <div className="card job-card shadow-sm h-100 p-3">
                    <div>
                      <h5 className="fw-bold">{job.title}</h5>
                      <p className="mb-1"><strong>🏢 {job.company}</strong></p>
                      <p className="mb-1 text-muted">📍 {job.location}</p>
                      <span className="badge-job">{job.type}</span>
                    </div>
                    <div className="mt-3 text-end">
                      <button className="btn btn-sm btn-apply">Apply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No jobs found</p>
          )}


        {/* Pagination Controls */}
        {totalPages > 1 && (
          <nav>
            <ul className="pagination justify-content-center">
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
    </div >
  );
};

export default DisplayJobs;
