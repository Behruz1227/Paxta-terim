import { useState } from 'react';
import axios from './api/token'; // Ensure axios is configured correctly with base URL and headers

const usePost = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const post = async (url: string, postData: any) => {
    setIsLoading(true);
    // console.clear();
    setError(null);
    setData(null);

    try {
      const response = await axios.post(url, postData);
      console.log('Response:', response);
      if (response.data && response.data.success) {
        setData(response.data);
      } else {
        throw new Error('Unsuccessful request: ' + (response.data?.message || 'Unknown error'));
      }

      return response.data;
    } catch (err: any) {
      console.error('Error:', err);
      setError(err);
      throw new Error(
        err.response?.data?.message || err.response?.data?.error || 'Unknown error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, post };
};

export default usePost;
