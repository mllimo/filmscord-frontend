import { useState } from "react";

const useOptions = (initialState = {}) => {
  const [options, setOptions] = useState(initialState);

  const changeOptions = (option) => {
    if (option.target.name === "search") {
      setOptions({
        ...options,
        [option.target.name]: option.target.value,
      });
    } else {
      setOptions(...options, [option.target.name] = option.target.value);
    }
  };

  return {
    options,
    changeOptions,
  };
}

export default useOptions;