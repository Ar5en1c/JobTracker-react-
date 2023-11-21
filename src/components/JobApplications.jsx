import React, { useState, useEffect } from "react";
import JobApplicationCard from "./JobApplicationCard";
import "./application.css";

const JobApplications = ({ apiEndpoint }) => {
  const [jobApplications, setJobApplications] = useState([]);
  const [localApplications, setLocalApplications] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch local job applications
  useEffect(() => {
    chrome.storage.local.get(["jobApplications"], (result) => {
      setLocalApplications(result.jobApplications || []);
    });
  }, []);

  const fetchJobApplications = async (token) => {
    setLoading(true);
    setError(null);

    try {
      const url = new URL(apiEndpoint);
      if (token) {
        url.searchParams.append("startKey", token);
      }

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setJobApplications((prev) => [...prev, ...data.jobApplications]);
        setNextToken(data.nextToken);
      } else {
        throw new Error(data.message || "Error fetching job applications");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobApplications(null); // Initial fetch without token
  }, []);

  // Function to check if a job application is new
  const isNewApplication = (application) => {
    return !localApplications.some(
      (localApp) =>
        localApp.jobApplicationLink === application.jobApplicationLink &&
        localApp.dateOfApplication === application.dateOfApplication
    );
  };

  return (
    <div className="job-applications-container">
      {jobApplications.filter(isNewApplication).map((application, index) => (
        <JobApplicationCard key={index} application={application} />
      ))}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {nextToken && !loading && (
        <button
          className="showmore"
          onClick={() => fetchJobApplications(nextToken)}
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default JobApplications;
