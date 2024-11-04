import { useState, useEffect } from "react";

const useJobApplications = (apiEndpoint) => {
  const [jobApplications, setJobApplications] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobApplications = async (token) => {
    setLoading(true);
    setError(null);

    try {
      const url = new URL(apiEndpoint);
      if (token) {
        url.searchParams.append("startKey", token);
      }

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setJobApplications((prev) => [...prev, ...data.jobApplications]);
        setNextToken(data.nextToken);
      } else {
        throw new Error(data.message || "Error fetching job applications");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobApplications(null); // Initial fetch without token
  }, []);

  return { jobApplications, nextToken, loading, error, fetchJobApplications };
};

export default useJobApplications;
