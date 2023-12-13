import { useEffect } from "react";

const useMutationObserver = (callback, setError, dataCreationCompleted) => {
  useEffect(() => {
    // If dataCreationCompleted is true, no need to set up the observer

    // Ensure callback is a function before proceeding
    if (typeof callback !== "function") {
      console.error(
        "The callback provided to useMutationObserver is not a function."
      );
      return;
    }

    const observer = new MutationObserver((mutationsList) => {
      if (dataCreationCompleted) {
        observer.disconnect();
      }
      if (!dataCreationCompleted) {
        for (let mutation of mutationsList) {
          if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            // Check if the specific element exists before calling the callback
            // Check if the review job application page element is added
            const reviewPageElement = document.querySelector(
              '[data-automation-id="reviewJobApplicationPage"]'
            );
            const reviewPageElementUltiPro = document.querySelector(
              '[data-automation="navbar-small-logo"]'
            );
            const btnSubmit1 = document.getElementById("btn-submit");
            const btnSubmit2 = document.getElementById("submit_app");
            const btnSubmit3 = document.querySelector(
              '[data-test="footer-submit"]'
            );
            const btnSubmit4 = document.querySelector(
              'button[type="button"][data-bind*="submit"]'
            );
            const btnSubmit5 = document.querySelector(
              'button.jv-button-primary[type="submit"]'
            );
            const btnSubmit6 = document.querySelector(
              "button.ashby-application-form-submit-button"
            );
            const btnSubmit7 = document.querySelector(
              '[id="et-ef-content-ftf-submitCmdBottom"][type="button"]'
            );
            const btnSubmit8 = document.querySelector(
              '[class="btn-sm btn-primary pointer position-apply-button"][data-test-id="position-apply-button"]'
            );
            // Access the form using its ID
            const form1 = document.getElementById("grnhse_app");

            const form2 = document.getElementById("icims_content_iframe");
            // Select the iframe by its ID
            var iframe =
              document.getElementById("grnhse_iframe") ||
              document.getElementById("icims_content_iframe");

            if (iframe) {
              // Wait for the iframe to load
              iframe.onload = function () {
                // Access the content document of the iframe
                var iframeDocument =
                  iframe.contentDocument || iframe.contentWindow.document;

                // Now you can target the form element inside the iframe
                var form1 =
                  iframeDocument.getElementById("application_form") ||
                  iframeDocument.querySelector(
                    "iCIMS_MainWrapper iCIMS_FormsPage"
                  );

                // Add your logic to handle the form
                if (form1) {
                  console.log("inside iframe observer");
                  callback();
                  observer.disconnect();
                }
                // ...
              };
            }

            const btnSubmit9 = document.querySelector(
              '[class="btn primary-button btn-submit"][type="submit"]'
            );

            if (
              reviewPageElement ||
              reviewPageElementUltiPro ||
              btnSubmit1 ||
              btnSubmit2 ||
              btnSubmit3 ||
              btnSubmit4 ||
              btnSubmit5 ||
              btnSubmit6 ||
              btnSubmit7 ||
              btnSubmit8 ||
              form1 ||
              btnSubmit9 ||
              form2
            ) {
              callback();
              console.log("application div detected");
              observer.disconnect();
              break;
            }
          }
        }
      }
    });

    try {
      if (!dataCreationCompleted) {
        console.log("Mutation Started");
        observer.observe(document, { childList: true, subtree: true });
      }
    } catch (error) {
      if (typeof setError === "function") {
        setError(error);
      }
    }

    // Clean up the observer on component unmount
    return () => observer.disconnect();
  }, [callback, setError, dataCreationCompleted]);
};

export default useMutationObserver;
