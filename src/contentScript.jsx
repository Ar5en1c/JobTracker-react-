// contentScript.jsx
import React, { useState, useCallback, useEffect } from "react";
import useMutationObserver from "./hooks/useMutationObserver";
import { useJobApplicationExtractor } from "./hooks/useJobApplicationExtractor";
import { createRoot } from "react-dom/client";

function ContentScript() {
  const [error, setError] = useState(null);
  const [elementsDetected, setElementsDetected] = useState(false);
  const [dataCreationCompleted, setDataCreationCompleted] = useState(false);

  // Use useCallback to memoize the callback function
  const handleElementDetection = useCallback(() => {
    setElementsDetected(true);
  }, []);

  // Error handling with useCallback to prevent unnecessary re-initializations of the observer
  const handleError = useCallback((error) => {
    setError(error);
  }, []);

  // Pass the memoized functions to the custom hook
  useMutationObserver(
    handleElementDetection,
    handleError,
    dataCreationCompleted
  );

  const extractJobApplicationData = useJobApplicationExtractor(
    setDataCreationCompleted,
    dataCreationCompleted
  );

  useEffect(() => {
    if (elementsDetected && !dataCreationCompleted) {
      try {
        extractJobApplicationData();
      } catch (error) {
        setError(error);
      }
    }
  }, [elementsDetected, dataCreationCompleted]);

  useEffect(() => {
    if (error) {
      console.error("Error in ContentScript:", error);
    }
  }, [error]);

  return null;
}

const virtualElement = document.createElement("div");
const root = createRoot(virtualElement);
root.render(<ContentScript />);
