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
    request = { ...fetchOptions, body: JSON.stringify(form) };
    console.log(request);
    fetch(toSend, request)
      .then((res) => res.json())
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