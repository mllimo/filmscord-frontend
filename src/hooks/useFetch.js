import { useState, useRef, useEffect } from "react";

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    fetch(url, options)
      .then(async (res) => {
        const body = (await res.json());
        const resObj = { status: res.status, body };
        return resObj;
      })
      .then(res => {
        if (isMounted.current) {
          setData(res.body);
          setisLoading(false);
          setIsSuccess(true);
        }
      })
      .catch(err => {
        if (isMounted.current) {
          setIsSuccess(false);
          setisLoading(false);
          setData(err);
        }
      });
  }, [url])

  return { data, isLoading, isSuccess };
}

export default useFetch;