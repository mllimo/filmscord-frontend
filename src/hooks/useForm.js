import { useState } from "react";

const useForm = (fields, toSend, fetchOptions) => {
  const [form, setForm] = useState(fields);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [response, setResponse] = useState({});
  let request = fetchOptions;
  const handleInputChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    request = {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    };

    fetch(toSend, request)
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

  return { form, response, isLoading, isSuccess, handleInputChange, handleSubmit };
};

export default useForm;