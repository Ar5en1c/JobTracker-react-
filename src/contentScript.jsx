import React, { useState, useCallback, useEffect } from "react";
import useMutationObserver from "./hooks/useMutationObserver";
import { createRoot } from "react-dom/client";
import {
  handleLever,
  handleGreenhouse,
  handleMyWorkday,
  handleUltipro,
  handleSmartRecruiters,
  handleOracleCloud,
  handleJobvite,
  handleAshbyhq,
  handleTaleo,
  handleEightfold,
  handleDefault,
} from "./utils/websiteHandlers";

function ContentScript() {
  const [error, setError] = useState(null);
  const [elementsDetected, setElementsDetected] = useState(false);
  const [dataCreationCompleted, setDataCreationCompleted] = useState(false);

  // Use useCallback to memoize the callback function
  const handleElementDetection = useCallback(() => {
    setElementsDetected(true);
  }, []);

  // Error handling with useCallback to prevent unnecessary re-initializations of the observer
  const handleError = useCallback((error) => {
    setError(error);
  }, []);

  // Pass the memoized functions to the custom hook
  useMutationObserver(handleElementDetection, handleError);

  const extractJobApplicationData = useCallback(() => {
    // ... rest of the extractJobApplicationData function

    const jobApplicationLink = window.location.href;
    const dateOfApplication = new Date().toISOString().slice(0, 10);
    const applicationData = { jobApplicationLink, dateOfApplication };

    const currentWebsite = window.location.hostname;
    console.log("Job application data extraction active for", currentWebsite);

    try {
      if (currentWebsite.includes("lever.co")) {
        handleLever(applicationData, setDataCreationCompleted);
      } else if (currentWebsite.includes("greenhouse.io")) {
        handleGreenhouse(applicationData, setDataCreationCompleted);
      } else if (currentWebsite.includes("myworkdayjobs.com")) {
        handleMyWorkday(applicationData, setDataCreationCompleted);
      } else if (currentWebsite.includes("ultipro.com")) {
        handleUltipro(applicationData, setDataCreationCompleted);
      } else if (currentWebsite.includes("jobs.smartrecruiters.com")) {
        handleSmartRecruiters(applicationData, setDataCreationCompleted);
      } else if (currentWebsite.includes("oraclecloud.com")) {
        handleOracleCloud(applicationData, setDataCreationCompleted);
      } else if (currentWebsite.includes("jobvite.com")) {
        handleJobvite(applicationData, setDataCreationCompleted);
      } else if (currentWebsite.includes("ashbyhq.com")) {
        handleAshbyhq(applicationData, setDataCreationCompleted);
      } else if (currentWebsite.includes("taleo.net")) {
        handleTaleo(applicationData, setDataCreationCompleted);
      } else if (currentWebsite.includes("eightfold.ai")) {
        handleEightfold(applicationData, setDataCreationCompleted);
      } else {
        console.log(
          "Website handler is not defined for this site:",
          currentWebsite
        );
        handleDefault(applicationData, setDataCreationCompleted);
      }
    } catch (error) {
      setError(error);
    }
    // Ensure that all the dependencies are specified in the array
  }, [setDataCreationCompleted]);

  useEffect(() => {
    if (elementsDetected && !dataCreationCompleted) {
      extractJobApplicationData();
    }
  }, [elementsDetected, dataCreationCompleted]);

  useEffect(() => {
    if (error) {
      console.error("Error in ContentScript:", error);
    }
  }, [error]);

  return null;
}

const virtualElement = document.createElement("div");
const root = createRoot(virtualElement);
root.render(<ContentScript />);
