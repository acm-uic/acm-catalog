import { useState, useEffect } from "react";

/**
 * Custom Hook: useFetch
 * Fetches data from an API endpoint with loading and error states
 *
 * Usage:
 * const { data, loading, error, refetch } = useFetch(() => catalogAPI.getAllItems());
 *
 * @param {Function} fetchFunction - Function that returns a Promise
 * @param {Array} dependencies - Dependencies array (like useEffect)
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
};

/**
 * Custom Hook: useApi
 * For making API calls that are triggered by user actions (not on mount)
 *
 * Usage:
 * const { execute, loading, error, data } = useApi(catalogAPI.createItem);
 *
 * const handleSubmit = async () => {
 *   await execute({ name: 'New Item', description: '...' });
 * };
 *
 * @param {Function} apiFunction - Function that makes the API call
 * @returns {Object} - { execute, loading, error, data }
 */
export const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error, data };
};
