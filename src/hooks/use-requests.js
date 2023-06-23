import { json } from "body-parser";
import { useCallback, useEffect, useState } from "react";

const useRequests = (applyData)=>{

  const [error, setError] = useState(null);
  const [loading,setIsLoading] = useState(false);

  const sendRequests = useCallback(async (requestConfig) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestConfig.url,
        {
        method: requestConfig.method ? requestConfig.method: 'GET',
        body: requestConfig.body ? JSON.stringify(requestConfig.body):{},
        headers: requestConfig.headers ? requestConfig.headers:null
        });

      if (!response.ok) {
        throw new Error('Request failed!');
      }
      const data = await response.json();

      applyData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);

  },[applyData]);

  return{
    error:error,
    sendRequests:sendRequests,
    loading:loading
  };

}
export default useRequests;