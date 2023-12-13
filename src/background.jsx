chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "storeJobApplicationData") {
    const jobApplicationData = message.jobApplicationData;
    chrome.storage.local.get("jobApplications", (result) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        const jobApplications = result.jobApplications || [];
        const existingJobIndex = jobApplications.findIndex(
          (job) =>
            job.jobApplicationLink === jobApplicationData.jobApplicationLink
        );
        if (existingJobIndex !== -1) {
          // Remove the existing job entry
          jobApplications.splice(existingJobIndex, 1);
        }

        // Add the latest job entry at the beginning of the array
        jobApplications.unshift(jobApplicationData);
        showNotification("Job application data stored successfully");

        chrome.storage.local.set({ jobApplications }, () => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
          } else {
            console.log("Job application data stored successfully");
          }
        });
      }
    });
  }
  // Return true to indicate the response will be sent asynchronously
  return true;
});

// Function to show a notification
function showNotification(message) {
  // Change the extension icon to a custom notification icon
  chrome.action.setIcon({ path: "../assets/notif.png" });

  // Set the icon back to the original after a few seconds (adjust the time as needed)
  setTimeout(() => {
    chrome.action.setIcon({
      path: {
        16: "./assets/icon16.png",
        48: "./assets/icon48.png",
        128: "./assets/icon128.png",
        256: "./assets/icon256.png",
      },
    });
  }, 5000); // Display the custom icon for 3 seconds (you can change the time as needed)
}

// Function to handle data retrieval and sending to AWS
function sendDataToAWS(jobApplicationsToSend) {
  // Format the new data as JSON
  const payload = JSON.stringify(jobApplicationsToSend);

  // Send the new data to the AWS Lambda function
  fetch(
    "https://0f5ulrmrvc.execute-api.us-east-2.amazonaws.com/prod/JobApplications",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Data sent successfully:", data);
      if (data.message === "Job applications stored successfully") {
        // Update the last sent timestamp to the timestamp of the most recent job application sent
        const lastApplicationDate =
          jobApplicationsToSend[jobApplicationsToSend.length - 1]
            .dateOfApplication;
        const lastSentTimestamp = new Date(lastApplicationDate).getTime();
        chrome.storage.local.set({ lastSentTimestamp }, () => {
          console.log("Last sent timestamp updated to: ", lastSentTimestamp);
        });
      }
    })
    .catch((error) => console.error("Error sending data:", error));
}

// Function to initiate the data send with a random delay
function initiateDataSend() {
  chrome.storage.local.get(
    ["jobApplications", "lastSentTimestamp"],
    (result) => {
      const { jobApplications, lastSentTimestamp } = result;
      const deduplicatedAndNewApplications = [];
      const applicationKeys = new Set(); // Set to track unique application keys

      jobApplications.forEach((application) => {
        const applicationTime = new Date(
          application.dateOfApplication
        ).getTime();
        const applicationKey = `${application.jobApplicationLink}_${application.dateOfApplication}`;
        const isNew = !lastSentTimestamp || applicationTime > lastSentTimestamp;

        // Deduplicate and filter only new job applications
        if (isNew && !applicationKeys.has(applicationKey)) {
          applicationKeys.add(applicationKey);
          deduplicatedAndNewApplications.push(application);
        }
      });

      if (deduplicatedAndNewApplications.length > 0) {
        // Send the deduplicated and new data to AWS
        // Inside initiateDataSend function before sending data
        chrome.storage.local.get("userConsent", (result) => {
          if (result.userConsent) {
            sendDataToAWS(deduplicatedAndNewApplications);
          } else {
            console.log("User consent not given for sending data to AWS.");
          }
        });
      }
    }
  );
}

// Create the alarm when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("dataSendAlarm", {
    periodInMinutes: 4 * 60,
  });
});

// Also create the alarm when the browser starts up
chrome.runtime.onStartup.addListener(() => {
  chrome.alarms.create("dataSendAlarm", {
    periodInMinutes: 4 * 60,
  });
});

// Add an event listener for the alarm
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "dataSendAlarm") {
    initiateDataSend();
  }
});
