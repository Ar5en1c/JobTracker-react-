import React, { useState } from "react";
import "./nav.css";
import { FaDownload, FaHandsHelping } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { ImBin2 } from "react-icons/im";
import { AiFillHome } from "react-icons/ai";
import { generateCSVContent, downloadCSV } from "../utils/csvUtils";

const Nav = ({
  jobApplications,
  consent,
  onConsentChange,
  onClearHistory,
  onMdWorkClick,
  onHomeClick,
  activeIcon,
}) => {
  const handleDownloadClick = () => {
    const csvContent = generateCSVContent(jobApplications);
    downloadCSV(csvContent, "job_application_history.csv");
  };

  const toggleConsent = () => {
    onConsentChange(!consent);
  };

  return (
    <nav>
      <a
        className="download"
        onClick={handleDownloadClick}
        title="Download CSV"
      >
        <FaDownload />
      </a>
      <a
        onClick={onMdWorkClick}
        className={`md-work ${activeIcon === "mdWork" ? "active" : ""}`}
        title="Find Jobs"
      >
        <MdWork />
      </a>
      <a
        onClick={onHomeClick}
        className={`home ${activeIcon === "home" ? "active" : ""}`}
        title="Home"
      >
        <AiFillHome />
      </a>
      <a
        className={`user-consent ${consent ? "active" : ""}`}
        onClick={toggleConsent}
        title="Toggle Consent"
      >
        <FaHandsHelping />
      </a>
      <a className="bin" onClick={onClearHistory} title="Clear History">
        <ImBin2 />
      </a>
    </nav>
  );
};

export default Nav;
