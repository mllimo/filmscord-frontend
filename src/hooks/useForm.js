import { useState } from "react";

const useForm = (fields, toSend, fetchOptions) => {
  const [form, setForm] = useState(fields);
  const [url, setUrl] = useState(toSend);
  const [options, setOptions] = useState(fetchOptions);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [response, setResponse] = useState({});
  let request = fetchOptions;
  
  const handleInputChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const changeUrl = (url) => {
    setUrl(url);
  };

  const changeOptions = (options) => {
    setOptions(options);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('form', form);
    console.log('url', url);
    console.log('options', options);

    setIsLoading(true);
    request = {
      ...options,
      body: JSON.stringify(form)
    };

    console.log('request', request);
    fetch(url, request)
      .then(async (res) => {
        const body = (await res.json());
        const resObj = {status: res.status, body};
        return resObj;
      })
      .then((res) => {
        setResponse(res);
        setIsLoading(false);
        setIsSuccess(true);
      })
      .catch((err) => {
        setResponse(err);
        setIsLoading(false);
        setIsSuccess(false);
      });
  }

  return { form, response, isLoading, isSuccess, handleInputChange, handleSubmit, changeUrl, changeOptions };
};

export default useForm;