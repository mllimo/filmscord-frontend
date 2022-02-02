import { useState, useRef, useEffect } from "react";
import axios from "axios";

const useFetch = (initUrl, initOptions) => {
  const [url, setUrl] = useState(initUrl);
  const [options, setOptions] = useState(initOptions);
  const isMounted = useRef(true);

  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  const reFetch = (newUrl, newOptions) => {
    setisLoading(true);
    setData(null);
    setErrors(null);
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
    axios.request(url, options)
      .then(res => {
        if (isMounted.current) {
          if (res.status === 200) {
            setData(res.data);
            setisLoading(false);
          } else {
            setErrors(res.data);
            setisLoading(false);
          }
        }
      })
      .catch(err => {
        if (isMounted.current) {
          setErrors(err);
          setisLoading(false);
        }
      });
  }, [url, options]);

  return { data, errors, isLoading, reFetch };
}

export default useFetch;