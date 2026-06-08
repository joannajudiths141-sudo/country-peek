import { useState, useEffect } from "react";

function useCountry(code) {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCountry() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${code}`
        );

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();

        setCountry(data[0]);
      } catch {
        setError("Failed to load country.");
      } finally {
        setLoading(false);
      }
    }

    if (code) {
      fetchCountry();
    }
  }, [code]);

  return { country, loading, error };
}

export default useCountry;