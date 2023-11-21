import React from "react";
import "./application.css";

const JobApplicationCard = ({ application }) => {
  return (
    <div className="job-application-card">
      <h4>{application.positionName}</h4>
      <h5>{application.companyName}</h5>
      <p className="active_date">
        Active as of: {application.dateOfApplication}
      </p>
      <a
        href={application.jobApplicationLink}
        target="_blank"
        rel="noopener noreferrer"
        className="apply-button"
      >
        Apply
      </a>
    </div>
  );
};

export default JobApplicationCard;
