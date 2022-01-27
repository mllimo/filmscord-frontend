import { useState, useRef, useEffect } from "react";

const useFetch = (initUrl, initOptions) => {
  const [data, setData] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [url, setUrl] = useState(initUrl);
  const [options, setOptions] = useState(initOptions);
  const isMounted = useRef(true);

  const reFetch = (newUrl, newOptions) => {
    setisLoading(true);
    setIsSuccess(false);
    setData(null);
    setUrl(newUrl);
    setOptions(newOptions);
    isMounted.current = true;
  }

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    console.log("Fetching", url, options, isMounted.current);
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
  }, [url, options]);

  return [ data, isLoading, isSuccess, reFetch ];
}

export default useFetch;