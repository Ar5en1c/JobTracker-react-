import React from "react";
import "../popup.css";

const ConsentForm = ({ onConsentChange }) => {
  return (
    <div className="consent-backdrop">
      <div className="consent-container">
        <p className="consent-text">
          We need your consent to collect job application data to our AWS
          service for helping our community by using that data to present new
          jobs for everyone to apply.
        </p>
        <button
          className="consent-button"
          onClick={() => onConsentChange(true)}
        >
          Give Consent
        </button>
        <button className="deny-button" onClick={() => onConsentChange(false)}>
          Deny
        </button>
      </div>
    </div>
  );
};

export default ConsentForm;
