import { useEffect } from "react";
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
} from "../utils/websiteHandlers";

const useJobApplicationExtractor = (onError) => {
  const jobApplicationLink = window.location.href;
  const dateOfApplication = new Date().toLocaleDateString();
  const applicationData = { jobApplicationLink, dateOfApplication };

  useEffect(() => {
    // Function to handle errors
    const handleErrors = (error) => {
      console.log("Error in useJobApplicationExtractor:", error);
      if (typeof onError === "function") {
        onError(error);
      }
    };

    try {
      const currentWebsite = window.location.hostname;
      console.log("useJobApplicationExtractor active for", currentWebsite);

      // Use a switch-case for cleaner code
      switch (true) {
        case currentWebsite.includes("lever.co"):
          handleLever(applicationData);
          break;
        case currentWebsite.includes("greenhouse.io"):
          handleGreenhouse(applicationData);
          break;
        case currentWebsite.includes("myworkdayjobs.com"):
          handleMyWorkday(applicationData);
          break;
        case currentWebsite.includes("ultipro.com"):
          handleUltipro(applicationData);
          break;
        case currentWebsite.includes("jobs.smartrecruiters.com"):
          handleSmartRecruiters(applicationData);
          break;
        case currentWebsite.includes("oraclecloud.com"):
          handleOracleCloud(applicationData);
          break;
        case currentWebsite.includes("jobvite.com"):
          handleJobvite(applicationData);
          break;
        case currentWebsite.includes("ashbyhq.com"):
          handleAshbyhq(applicationData);
          break;
        case currentWebsite.includes("taleo.net"):
          handleTaleo(applicationData);
          break;
        case currentWebsite.includes("eightfold.ai"):
          handleEightfold(applicationData);
          break;
        default:
          console.log("No handler for current website");
          break;
      }
    } catch (error) {
      handleErrors(error);
    }
  }, [onError, applicationData]); // Only re-run if onError or applicationData changes

  // Return a no-op function if you need to provide a callback
  return () => {};
};

export default useJobApplicationExtractor;
