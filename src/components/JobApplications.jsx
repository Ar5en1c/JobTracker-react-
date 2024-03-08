import React, { useState, useEffect } from "react";
import JobApplicationCard from "./JobApplicationCard";
import "./application.css";
import useJobApplications from "../hooks/useJobApplications";
import { FaSearch } from "react-icons/fa";

const JobApplications = ({ apiEndpoint }) => {
  const [localApplications, setLocalApplications] = useState([]);
  const [sort, setSort] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch local job applications
  useEffect(() => {
    chrome.storage.local.get(["jobApplications"], (result) => {
      setLocalApplications(result.jobApplications || []);
    });
  }, []);

  // Use the custom hook to fetch job applications
  const { jobApplications, nextToken, loading, error, fetchJobApplications } =
    useJobApplications(apiEndpoint);

  // Filter and sort the job applications before rendering
  const displayedJobApplications = jobApplications
    .filter(
      (application) =>
        !localApplications.some(
          (localApp) =>
            localApp.jobApplicationLink === application.jobApplicationLink
        )
    )
    .filter(
      (application) =>
        !searchTerm ||
        (application.positionName &&
          application.positionName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      const dateA = new Date(a.dateOfApplication || 0);
      const dateB = new Date(b.dateOfApplication || 0);
      return sort === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="job-applications-container">
      <div className="filters">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            className="search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by job title"
          />
        </div>
        <div className="select-container">
          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>
      {displayedJobApplications.map((application, index) => (
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
