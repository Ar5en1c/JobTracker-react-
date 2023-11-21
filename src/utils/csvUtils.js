/**
 * Generates CSV content from an array of job applications.
 * @param {Array} jobApplications - The array of job application objects.
 * @returns {string} The CSV content as a string.
 */
export function generateCSVContent(jobApplications) {
  // Define the header for the CSV file
  let csvContent =
    "Position Name,Company Name,Job Application Link,Date of Application\n";

  // Map over the job applications to create CSV rows
  jobApplications.forEach((application) => {
    const { positionName, companyName, jobApplicationLink, dateOfApplication } =
      application;
    // Escape double quotes and wrap each field in double quotes
    const row = [
      `"${positionName.replace(/"/g, '""')}"`,
      `"${companyName.replace(/"/g, '""')}"`,
      `"${jobApplicationLink.replace(/"/g, '""')}"`,
      `"${dateOfApplication.replace(/"/g, '""')}"`,
    ].join(",");
    csvContent += row + "\n";
  });

  return csvContent;
}

/**
 * Triggers the download of a CSV file.
 * @param {string} csvContent - The CSV content as a string.
 * @param {string} filename - The name of the file to be downloaded.
 */
export function downloadCSV(csvContent, filename) {
  // Create a Blob with the CSV content
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  // Create a download URL and initiate the download
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a); // Append the anchor to the body to make it clickable
  a.click();

  // Cleanup: remove the anchor from the body and revoke the object URL
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
