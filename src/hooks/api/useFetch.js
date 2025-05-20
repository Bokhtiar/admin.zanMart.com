import { useEffect, useState } from 'react'; 
import { privateRequest } from '../../config/axios.config';

const useFetch = (url='https://jsonplaceholder.typicode.com/users') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    privateRequest.get(url)
         .then(res => setData(res.data))
         .finally(() => setLoading(false));
  }, [url]);

  return { data, loading };
};

export default useFetch;
