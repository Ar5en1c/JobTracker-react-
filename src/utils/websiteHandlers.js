import {
  extractCompanyAndPositionFromTitle,
  extractCompanyNameFromLink,
} from "./utility";
import { useEffect } from "react";

export const handleLever = (applicationData, setDataCreationCompleted) => {
  console.log("Inside handleLever");
  const headElement = document.querySelector("head");
  const titleElement = headElement.querySelector("title");
  const title = titleElement ? titleElement.textContent.trim() : "";

  const [companyName, positionTitle] =
    extractCompanyAndPositionFromTitle(title);
  console.log(`Company: ${companyName}, Position: ${positionTitle}`);

  if (companyName && positionTitle) {
    const jobApplicationData = {
      positionName: positionTitle,
      companyName: companyName,
      ...applicationData,
    };

    const handleSubmit = (event) => {
      chrome.runtime.sendMessage({
        action: "storeJobApplicationData",
        jobApplicationData,
      });
      console.log("Job application data sent to background script.");
      document.removeEventListener("submit", handleSubmit);
    };

    document.addEventListener("submit", handleSubmit);
    setDataCreationCompleted(true);
    return true;
  } else {
    console.error("Could not extract job application data from the page.");
    return false;
  }
};

export const handleGreenhouse = (
  applicationData,
  setDataCreationCompleted,
  dataCreationCompleted
) => {
  console.log("inside greenhouse");
  if (!dataCreationCompleted) {
    const greenhouseElement = document.querySelector("body");
    const greenhousePosTitle =
      greenhouseElement.querySelector("#header .app-title");
    const greenhouseCompanyName = greenhouseElement.querySelector(
      "#header .company-name"
    );

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
      setDataCreationCompleted(true);
      console.log(jobApplicationData);

      const btnSubmit2 = document.getElementById("submit_app");
      const handleClick = (event) => {
        if (event.target === btnSubmit2) {
          chrome.runtime.sendMessage({
            action: "storeJobApplicationData",
            jobApplicationData,
          });
          document.removeEventListener("click", handleClick);
          return true;
        }
      };
      document.addEventListener("click", handleClick);
    } else {
      console.error("Could not extract job application data from the page.");
    }
  }
};

export const handleMyWorkday = (applicationData, setDataCreationCompleted) => {
  const headElement = document.querySelector("head");
  const titleElement = headElement.querySelector("title");
  const positionTitle = titleElement
    ? titleElement.textContent.trim().split(" : ")[0]
    : "";
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
  } else {
    console.error("Could not extract job application data from the page.");
  }
};

export const handleUltipro = (applicationData, setDataCreationCompleted) => {
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
    setDataCreationCompleted(true);

    const sbmtBtn = document.querySelector('[data-automation="btn-submit"]');
    const handleClick = (event) => {
      if (event.target === sbmtBtn) {
        chrome.runtime.sendMessage({
          action: "storeJobApplicationData",
          jobApplicationData,
        });
        document.removeEventListener("click", handleClick);
        return true;
      }
    };
    document.addEventListener("click", handleClick);
  } else {
    console.error("Could not extract job application data from the page.");
  }
};

export const handleSmartRecruiters = (
  applicationData,
  setDataCreationCompleted
) => {
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
    const handleClick = (event) => {
      if (event.target === sbmtBtn) {
        chrome.runtime.sendMessage({
          action: "storeJobApplicationData",
          jobApplicationData,
        });
        setDataCreationCompleted(true);
        document.removeEventListener("click", handleClick);
      }
    };

    document.addEventListener("click", handleClick);
    setDataCreationCompleted(true);
  } else {
    console.error("Could not extract job application data from the page.");
  }
};

export const handleOracleCloud = (
  applicationData,
  setDataCreationCompleted
) => {
  const titleElement = document.querySelector(
    ".app-header__current-page-title"
  );
  const positionTitle = titleElement ? titleElement.innerText.trim() : "";
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
    const handleClick = (event) => {
      if (event.target === btnSubmit4) {
        chrome.runtime.sendMessage({
          action: "storeJobApplicationData",
          jobApplicationData,
        });
        document.removeEventListener("click", handleClick);
        return true;
      }
    };
    document.addEventListener("click", handleClick);
    setDataCreationCompleted(true);
  } else {
    console.error("Could not extract job application data from the page.");
  }
};

export const handleJobvite = (applicationData, setDataCreationCompleted) => {
  const header = document.querySelector(".jv-page-header");
  let companyName;
  const logo = header.querySelector(".jv-logo a");

  if (logo.querySelector("img")) {
    companyName = logo.querySelector("img").alt;
  } else {
    companyName = logo.textContent.trim();
  }

  const positionTitle = document
    .querySelector("div.jv-header")
    ?.textContent.trim();

  if (companyName && positionTitle) {
    const jobApplicationData = {
      positionName: positionTitle,
      companyName: companyName,
      ...applicationData,
    };

    const btnSubmit5 = document.querySelector(
      'button.jv-button-primary[type="submit"]'
    );
    const handleClick = (event) => {
      if (event.target === btnSubmit5) {
        chrome.runtime.sendMessage({
          action: "storeJobApplicationData",
          jobApplicationData,
        });
        document.removeEventListener("click", handleClick);
        return true;
      }
    };
    document.addEventListener("click", handleClick);
    setDataCreationCompleted(true);
  } else {
    console.error("Could not extract job application data from the page.");
  }
};

export const handleAshbyhq = (applicationData, setDataCreationCompleted) => {
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

  if (companyName && positionTitle) {
    const jobApplicationData = {
      positionName: positionTitle,
      companyName: companyName,
      ...applicationData,
    };

    const btnSubmit6 = document.querySelector(
      "button.ashby-application-form-submit-button"
    );
    const handleClick = (event) => {
      if (event.target === btnSubmit6) {
        chrome.runtime.sendMessage({
          action: "storeJobApplicationData",
          jobApplicationData,
        });
        document.removeEventListener("click", handleClick);
        return true;
      }
    };
    document.addEventListener("click", handleClick);
    setDataCreationCompleted(true);
  } else {
    console.error("Could not extract job application data from the page.");
  }
};

export const handleTaleo = (applicationData, setDataCreationCompleted) => {
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

  if (companyName && positionTitle) {
    const jobApplicationData = {
      positionName: positionTitle,
      companyName: companyName,
      ...applicationData,
    };

    const btnSubmit7 = document.querySelector(
      '[id="et-ef-content-ftf-submitCmdBottom"][type="button"]'
    );
    const handleClick = (event) => {
      if (event.target === btnSubmit7) {
        chrome.runtime.sendMessage({
          action: "storeJobApplicationData",
          jobApplicationData,
        });
        document.removeEventListener("click", handleClick);
        return true;
      }
    };
    document.addEventListener("click", handleClick);
    setDataCreationCompleted(true);
  } else {
    console.error("Could not extract job application data from the page.");
  }
};

export const handleEightfold = (applicationData, setDataCreationCompleted) => {
  const companyName = extractCompanyNameFromLink(
    applicationData.jobApplicationLink
  );
  const positionElement = document.querySelector("p.apply-position-title");
  const positionTitle = positionElement
    ? positionElement.textContent.trim()
    : "";

  if (companyName && positionTitle) {
    const jobApplicationData = {
      positionName: positionTitle,
      companyName: companyName,
      ...applicationData,
    };

    const btnSubmit8 = document.querySelector(
      '[class="btn-sm btn-primary pointer position-apply-button"][data-test-id="position-apply-button"]'
    );
    const handleClick = (event) => {
      if (event.target === btnSubmit8) {
        chrome.runtime.sendMessage({
          action: "storeJobApplicationData",
          jobApplicationData,
        });
        document.removeEventListener("click", handleClick);
        return true;
      }
    };
    document.addEventListener("click", handleClick);
    setDataCreationCompleted(true);
  } else {
    console.error("Could not extract job application data from the page.");
  }
};

export const handleIcims = (applicationData, setDataCreationCompleted) => {
  const companyName = extractCompanyNameFromLink(
    applicationData.jobApplicationLink
  );
  const positionElement = document.querySelector("h1.iCIMS_Header");
  const positionTitle = positionElement
    ? positionElement.textContent.trim()
    : document.querySelector("title").textContent.trim();

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
  } else {
    console.error("Could not extract job application data from the page.");
  }
};

export const handleDefault = (
  applicationData,
  setDataCreationCompleted,
  dataCreationCompleted
) => {
  if (!dataCreationCompleted) {
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

      const btnSubmit2 = document.getElementById("submit_app");
      const handleClick = (event) => {
        if (event.target === btnSubmit2) {
          chrome.runtime.sendMessage({
            action: "storeJobApplicationData",
            jobApplicationData,
          });
          setDataCreationCompleted(true);
          document.removeEventListener("click", handleClick);
          return true;
        }
      };
      document.addEventListener("click", handleClick);
    } else {
      console.error("Could not extract job application data from the page.");
    }
  }
};
