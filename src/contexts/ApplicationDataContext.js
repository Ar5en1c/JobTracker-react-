import React, { createContext, useContext } from "react";

const ApplicationDataContext = createContext();

export const useApplicationData = () => {
  return useContext(ApplicationDataContext);
};

export const ApplicationDataProvider = ({ children }) => {
  const jobApplicationLink = window.location.href;
  const dateOfApplication = new Date();

  const value = {
    jobApplicationLink,
    dateOfApplication,
  };

  return (
    <ApplicationDataContext.Provider value={value}>
      {children}
    </ApplicationDataContext.Provider>
  );
};
