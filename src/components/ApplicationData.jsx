import React from "react";
import "../popup.css"; // Assume you have CSS styles defined here

const ApplicationData = ({ jobApplications }) => {
  return (
    <div className="job-data">
      {jobApplications.length > 0 ? (
        jobApplications.map((application, index) => (
          <div className="job-entry" key={index}>
            <a
              className="job-link"
              href={application.jobApplicationLink}
              target="_blank"
            >
              {application.positionName} - {application.companyName}
            </a>
            <div>Applied on: {application.dateOfApplication}</div>
          </div>
        ))
      ) : (
        <p>No data to show. Start applying for jobs!</p>
      )}
    </div>
  );
};

export default ApplicationData;
