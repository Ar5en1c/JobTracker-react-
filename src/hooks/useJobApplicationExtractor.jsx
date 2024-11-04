// hooks/useJobApplicationExtractor.js
import { useCallback } from "react";
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
  handleIcims,
} from "../utils/websiteHandlers";

export const useJobApplicationExtractor = (
  setDataCreationCompleted,
  dataCreationCompleted
) => {
  return useCallback(() => {
    if (dataCreationCompleted) {
      return;
    }

    const jobApplicationLink = window.location.href;
    const dateOfApplication = new Date().toISOString().slice(0, 10);
    const applicationData = { jobApplicationLink, dateOfApplication };

    const currentWebsite = window.location.hostname;
    console.log("Job application data extraction active for", currentWebsite);

    try {
      if (currentWebsite.includes("lever.co")) {
        handleLever(applicationData, setDataCreationCompleted);
      } else if (currentWebsite.includes("greenhouse.io")) {
        handleGreenhouse(
          applicationData,
          setDataCreationCompleted,
          dataCreationCompleted
        );
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
      } else if (currentWebsite.includes("icims.com")) {
        handleIcims(applicationData, setDataCreationCompleted);
      } else {
        console.log(
          "Website handler is not defined for this site:",
          currentWebsite
        );
        handleDefault(
          applicationData,
          setDataCreationCompleted,
          dataCreationCompleted
        );
      }
    } catch (error) {
      throw error;
    }
  }, [setDataCreationCompleted, dataCreationCompleted]);
};
