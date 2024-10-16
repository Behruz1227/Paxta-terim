import axios from './api/token';
import { useState } from 'react';

const usePut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const put = async (url: string, id: string | number | null, updateData: {}) => {
    setIsLoading(true);
    setError(null);
    setData(null);
    try {
      const api = id ? `${url}${id}` : url;
      const { data } = await axios.put(api, updateData);
      if (data.success) {
        setData(data);
      }
    } catch (err: any) {
      setError(err);

      throw new Error(
        err.response.data.message
          ? err.response.data.message
          : err.response.data.error,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, put };
};

export default usePut;
