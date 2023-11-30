import {
  extractCompanyAndPositionFromTitle,
  extractCompanyNameFromLink,
} from "./utility";
import { useEffect } from "react";

export const handleLever = (applicationData, setDataCreationCompleted) => {
  console.log("Inside handleLever");
  // Extract the title from the document head
  const headElement = document.querySelector("head");
  const titleElement = headElement.querySelector("title");
  const title = titleElement ? titleElement.textContent.trim() : "";

  // Extract company name and position title from the document title
  const [companyName, positionTitle] =
    extractCompanyAndPositionFromTitle(title);

  // Log the extracted company name and position title
  console.log(`Company: ${companyName}, Position: ${positionTitle}`);

  // Check if both companyName and positionTitle are found
  if (companyName && positionTitle) {
    // Update the applicationData object with the new data
    const jobApplicationData = {
      positionName: positionTitle,
      companyName: companyName,
      ...applicationData,
    };

    document.addEventListener("submit", (event) => {
      // Send the updated application data to the background script
      chrome.runtime.sendMessage({
        action: "storeJobApplicationData",
        jobApplicationData,
      });
    });
    console.log("Job application data sent to background script.");
    setDataCreationCompleted(true);
    return true; // Indicate success
  } else {
    console.error("Could not extract job application data from the page.");
    return false; // Indicate failure
  }
};

export const handleGreenhouse = (applicationData, setDataCreationCompleted) => {
  // code for greenhouse.io
  console.log("inside greenhouse");
  const greenhouseElement = document.querySelector("body");
  const greenhousePosTitle =
    greenhouseElement.querySelector("#header .app-title");
  const greenhouseCompanyName = greenhouseElement.querySelector(
    "#header .company-name"
  );

  // Check if the elements were found before extracting text content
  const appTitle = greenhousePosTitle
    ? greenhousePosTitle.textContent.trim()
    : "";
  const company = greenhouseCompanyName
    ? greenhouseCompanyName.textContent.trim()
    : "";
  console.log(appTitle);
  console.log(company);

  if (appTitle && company) {
    const jobApplicationData = {
      positionName: appTitle,
      companyName: company,
      ...applicationData,
    };
    console.log(jobApplicationData);
    setDataCreationCompleted(true);

    const btnSubmit2 = document.getElementById("submit_app");
    // Listen for the submit event on the job application form and trigger data extraction and sending
    document.addEventListener("click", (event) => {
      if (event.target === btnSubmit2) {
        // With this line to send the message to the background script
        chrome.runtime.sendMessage({
          action: "storeJobApplicationData",
          jobApplicationData,
        });
        setDataCreationCompleted(true);
        return true;
      }
    });
  }
};

export const handleMyWorkday = (applicationData, setDataCreationCompleted) => {
  const headElement = document.querySelector("head");
  const titleElement = headElement.querySelector("title");
  const positionTitle = titleElement
    ? titleElement.textContent.trim().split(" : ")[0]
    : "";
  // const positionElement = document.querySelector(".css-1ozbppc h3.css-y2pr05");
  // Extract the company name from the application link
  const companyName = extractCompanyNameFromLink(
    applicationData.jobApplicationLink
  );

  if (companyName && positionTitle) {
    const jobApplicationData = {
      positionName: positionTitle,
      companyName: companyName,
      ...applicationData,
    };

    chrome.runtime.sendMessage({
      action: "storeJobApplicationData",
      jobApplicationData,
    });
    setDataCreationCompleted(true);
    return true;
  }
};

export const handleUltipro = (applicationData, setDataCreationCompleted) => {
  // code for ultipro.com
  const imgElement = document.querySelector(
    '[data-automation="navbar-small-logo"]'
  );
  const companyName = imgElement ? imgElement.getAttribute("alt") : "";
  const positionElement = document.querySelector(
    '[data-automation="opportunity-title"]'
  );
  const positionTitle = positionElement
    ? positionElement.textContent.trim()
    : "";

  if (companyName && positionTitle) {
    const jobApplicationData = {
      positionName: positionTitle,
      companyName: companyName,
      ...applicationData,
    };

    const sbmtBtn = document.querySelector('[data-automation="btn-submit"]');
    document.addEventListener("click", (event) => {
      if (event.target === sbmtBtn) {
        // With this line to send the message to the background script
        chrome.runtime.sendMessage({
          action: "storeJobApplicationData",
          jobApplicationData,
        });
        setDataCreationCompleted(true);
        return true;
      }
    });
  }
};

export const handleSmartRecruiters = (
  applicationData,
  setDataCreationCompleted
) => {
  // code for jobs.smartrecruiters.com
  const positionElement = document.querySelector(
    '[data-test="topbar-job-title"]'
  );
  const companyElement = document.querySelector('[data-test="topbar-logo"]');
  const companyName = companyElement ? companyElement.getAttribute("alt") : "";
  const positionTitle = positionElement
    ? positionElement.textContent.trim()
    : "";

  if (companyName && positionTitle) {
    const jobApplicationData = {
      positionName: positionTitle,
      companyName: companyName,
      ...applicationData,
    };

    const sbmtBtn = document.querySelector('[data-test="footer-submit"]');
    document.addEventListener("click", (event) => {
      if (event.target === sbmtBtn) {
        // With this line to send the message to the background script
        chrome.runtime.sendMessage({
          action: "storeJobApplicationData",
          jobApplicationData,
        });
        setDataCreationCompleted(true);
        return true;
      }
    });
  }
};

export const handleOracleCloud = (
  applicationData,
  setDataCreationCompleted
) => {
  // code for oraclecloud.com
  // Query selector for the title element
  const titleElement = document.querySelector(
    ".app-header__current-page-title"
  );

  // Extract position title
  const positionTitle = titleElement.innerText.trim();

  // Extract company name
  const companyName = extractCompanyNameFromLink(
    applicationData.jobApplicationLink
  );

  if (companyName && positionTitle) {
    const jobApplicationData = {
      positionName: positionTitle,
      companyName: companyName,
      ...applicationData,
    };
    const btnSubmit4 = document.querySelector(
      'button[type="button"][data-bind*="submit"]'
    );

    document.addEventListener("click", (event) => {
      if (event.target === btnSubmit4) {
        // With this line to send the message to the background script
        chrome.runtime.sendMessage({
          action: "storeJobApplicationData",
          jobApplicationData,
        });
        setDataCreationCompleted(true);
        return true;
      }
    });
  }
};

export const handleJobvite = (applicationData, setDataCreationCompleted) => {
  // code for jobvite.com
  const header = document.querySelector(".jv-page-header");

  let companyName;

  const logo = header.querySelector(".jv-logo a");

  if (logo.querySelector("img")) {
    // Image logo
    companyName = logo.querySelector("img").alt;
  } else {
    // Text logo
    companyName = logo.textContent.trim();
  }
  console.log(companyName);

  const positionTitle = document
    .querySelector("div.jv-header")
    ?.textContent.trim();

  console.log(positionTitle);

  if (companyName && positionTitle) {
    const jobApplicationData = {
      positionName: positionTitle,
      companyName: companyName,
      ...applicationData,
    };

    const btnSubmit5 = document.querySelector(
      'button.jv-button-primary[type="submit"]'
    );
    console.log(jobApplicationData);
    document.addEventListener("click", (event) => {
      if (event.target === btnSubmit5) {
        // With this line to send the message to the background script
        chrome.runtime.sendMessage({
          action: "storeJobApplicationData",
          jobApplicationData,
        });
        setDataCreationCompleted(true);
        return true;
      }
    });
  }
};

export const handleAshbyhq = (applicationData, setDataCreationCompleted) => {
  // code for ashbyhq.com
  let companyName = "";
  const companyImageElement = document.querySelector(
    '[class*="_navLogoWordmarkImage_"]'
  );
  const companyTextElement = document.querySelector('[class*="_navLogoText_"]');

  if (companyImageElement) {
    companyName = companyImageElement.getAttribute("alt") || "";
  } else if (companyTextElement) {
    companyName = companyTextElement.textContent.trim();
  }
  const positionElement = document.querySelector(
    "h1.ashby-job-posting-heading"
  );
  const positionTitle = positionElement
    ? positionElement.textContent.trim()
    : "";
  console.log(companyName);
  console.log(positionTitle);

  if (companyName && positionTitle) {
    const jobApplicationData = {
      positionName: positionTitle,
      companyName: companyName,
      ...applicationData,
    };
    console.log(jobApplicationData);

    const btnSubmit6 = document.querySelector(
      "button.ashby-application-form-submit-button"
    );
    document.addEventListener("click", (event) => {
      if (event.target === btnSubmit6) {
        // With this line to send the message to the background script
        chrome.runtime.sendMessage({
          action: "storeJobApplicationData",
          jobApplicationData,
        });
        setDataCreationCompleted(true);
        return true;
      }
    });
  }
};

export const handleTaleo = (applicationData, setDataCreationCompleted) => {
  // code for taleo.net
  // Wait for page to load
  // setTimeout(() => {
  console.log("TALEO HANDLE");
  const companyElement = document.querySelector("a.logo.icon-logo-icon");
  const companyName = companyElement
    ? companyElement.querySelector("span.visually-hidden").textContent.trim()
    : "";
  const positionElement = document.querySelector(
    '[title="View this job description"]'
  );
  const positionTitle = positionElement
    ? positionElement.textContent.trim()
    : "";

  console.log(companyName);
  console.log(positionTitle);

  if (companyName && positionTitle) {
    const jobApplicationData = {
      positionName: positionTitle,
      companyName: companyName,
      ...applicationData,
    };
    console.log(jobApplicationData);

    const btnSubmit7 = document.querySelector(
      '[id="et-ef-content-ftf-submitCmdBottom"][type="button"]'
    );
    document.addEventListener("click", (event) => {
      if (event.target === btnSubmit7) {
        // With this line to send the message to the background script
        chrome.runtime.sendMessage({
          action: "storeJobApplicationData",
          jobApplicationData,
        });
        setDataCreationCompleted(true);
        return true;
      }
    });
  }
  // }, 1000);
};

export const handleEightfold = (applicationData, setDataCreationCompleted) => {
  // code for eightfold.ai
  // Wait for page to load
  setTimeout(() => {
    const companyName = extractCompanyNameFromLink(
      applicationData.jobApplicationLink
    );
    const positionElement = document.querySelector("p.apply-position-title");
    const positionTitle = positionElement
      ? positionElement.textContent.trim()
      : "";
    console.log(companyName);
    console.log(positionTitle);

    if (companyName && positionTitle) {
      const jobApplicationData = {
        positionName: positionTitle,
        companyName: companyName,
        ...applicationData,
      };
      console.log(jobApplicationData);

      const btnSubmit8 = document.querySelector(
        '[class="btn-sm btn-primary pointer position-apply-button"][data-test-id="position-apply-button"]'
      );
      document.addEventListener("click", (event) => {
        if (event.target === btnSubmit8) {
          // With this line to send the message to the background script
          chrome.runtime.sendMessage({
            action: "storeJobApplicationData",
            jobApplicationData,
          });
          setDataCreationCompleted(true);
          return true;
        }
      });
    }
  }, 1000);
};

export const handleIcims = (applicationData, setDataCreationCompleted) => {
  // code for eightfold.ai
  // Wait for page to load
  setTimeout(() => {
    const companyName = extractCompanyNameFromLink(
      applicationData.jobApplicationLink
    );
    const positionElement = document.querySelector("h1.iCIMS_Header");
    const positionTitle = positionElement
      ? positionElement.textContent.trim()
      : document.querySelector("title").textContent.trim();
    console.log(companyName);
    console.log(positionTitle);

    if (companyName && positionTitle) {
      setDataCreationCompleted(true);
      const jobApplicationData = {
        positionName: positionTitle,
        companyName: companyName,
        ...applicationData,
      };
      console.log(jobApplicationData);

      console.log("ready to save");
      // With this line to send the message to the background script
      chrome.runtime.sendMessage({
        action: "storeJobApplicationData",
        jobApplicationData,
      });
      setDataCreationCompleted(true);
      return true;
    }
  }, 1000);
};

export const handleDefault = (applicationData, setDataCreationCompleted) => {
  setTimeout(() => {
    console.log("inside default handler");
    const positionTitle = document.querySelector(
      '[class="job-title"][role="heading"]'
    )
      ? document
          .querySelector('[class="job-title"][role="heading"]')
          .textContent.trim()
      : "Engineer";

    const companyName = window.location.hostname;
    if (companyName && positionTitle) {
      const jobApplicationData = {
        positionName: positionTitle,
        companyName: companyName,
        ...applicationData,
      };
      console.log(jobApplicationData);

      // With this line to send the message to the background script
      chrome.runtime.sendMessage({
        action: "storeJobApplicationData",
        jobApplicationData,
      });
      setDataCreationCompleted(true);
      return true;
    }
  }, 2000);
};
