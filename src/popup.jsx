import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Nav from "./components/Nav"; // Import your Nav component
import "./components/nav.css";
import "./popup.css";
import ApplicationData from "./components/ApplicationData";
import ConsentForm from "./components/consentForm";
import JobApplications from "./components/JobApplications";

// Popup component
function Popup() {
  const [jobApplications, setJobApplications] = useState([]);
  const [userConsent, setUserConsent] = useState(true); // null indicates unknown consent status
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showJobApplications, setShowJobApplications] = useState(false);
  const [activeIcon, setActiveIcon] = useState("home");

  useEffect(() => {
    // Check for user consent on mount
    chrome.storage.local.get(["jobApplications", "userConsent"], (result) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }
      setJobApplications(result.jobApplications || []);
      setUserConsent(result.userConsent); // Could be undefined if not set, which is falsy
    });
  }, []);

  const handleConsent = (consent) => {
    setUserConsent(consent);
    chrome.storage.local.set({ userConsent: consent });
  };

  console.log(userConsent);

  const clearJobApplications = () => {
    setJobApplications([]); // Clear job applications from state
    chrome.storage.local.set({ jobApplications: [] }); // Clear job applications from storage
    setShowConfirmModal(false);
  };

  const toggleModal = () => {
    setShowConfirmModal(!showConfirmModal);
  };

  const toggleJobApplicationsView = () => {
    setShowJobApplications(true);
    setActiveIcon("mdWork");
  };

  const showApplicationDataView = () => {
    setShowJobApplications(false);
    setActiveIcon("home");
  };

  return (
    <div className="container">
      {/* Consent check */}
      {userConsent === null && <ConsentForm onConsentChange={handleConsent} />}
      <div className="logo-div">
        <a
          href="https://chromewebstore.google.com/detail/job-application-tracker/mggpimiojdmbijnlfeibpokbjnbcblnl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="logo" src="/assets/logo.png" alt="Logo" />
        </a>
      </div>
      {/* Toggle between ApplicationData and JobApplications */}
      {showJobApplications ? (
        <JobApplications apiEndpoint="https://fghsr2acle.execute-api.us-east-2.amazonaws.com/fetchJobApplications" />
      ) : (
        <ApplicationData jobApplications={jobApplications} />
      )}

      <Nav
        jobApplications={jobApplications}
        consent={userConsent}
        onConsentChange={handleConsent}
        onClearHistory={toggleModal}
        onMdWorkClick={toggleJobApplicationsView} // Passing the toggle function to Nav
        onHomeClick={showApplicationDataView}
        activeIcon={activeIcon}
      />

      {showConfirmModal && (
        <>
          <div
            className="modal-backdrop"
            onClick={() => setShowConfirmModal(false)}
          ></div>
          <div className="confirm-modal">
            <p>Are you sure you want to clear your job application history?</p>
            <button className="btn1" onClick={clearJobApplications}>
              Yes, Clear
            </button>
            <button onClick={() => setShowConfirmModal(false)}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
}

// Find the element where you want to mount your React app
const canvas = document.getElementById("react-target");

// Create a root
const root = createRoot(canvas);

// Initial render: Render the Popup component to the root
root.render(<Popup />);
