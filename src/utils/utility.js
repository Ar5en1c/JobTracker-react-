export const extractCompanyAndPositionFromTitle = (title) => {
  // Check if the title is in the new format "<title>Company Name | Position Title</title>"
  const match = title.match(/<title>(.*?) \| (.*?)<\/title>/);

  if (match) {
    const companyName = match[1];
    const positionTitle = match[0];
    return [companyName.trim(), positionTitle.trim()];
  }

  // Assuming the title format is still "Company Name - Position Title"
  const titleParts = title.split(" - ");
  let companyName = "";
  let positionTitle = "";

  if (titleParts.length >= 2) {
    companyName = titleParts[0];
    positionTitle = titleParts[1];
  } else if (titleParts.length === 1) {
    companyName = titleParts[0];
  }

  return [companyName.trim(), positionTitle.trim()];
};

export const extractCompanyNameFromLink = (link) => {
  // Remove the protocol part from the link
  const linkWithoutProtocol = link.replace(/^https?:\/\//, "");

  // Extract the first part of the company name before any dot
  const formattedCompanyName = linkWithoutProtocol.split(".")[0];

  // console.log("OracleCloud Company Name from the link" + formattedCompanyName);
  return formattedCompanyName;
};
