import { useState } from "react";

const useOptions = (initialState = {}) => {
  const [options, setOptions] = useState(initialState);

  const changeOptions = (option) => {
    if (option.target.name === "isAdd") {
      setOptions({ ...options, isAdd: !options.isAdd });
    } else {
      setOptions({...options, [option.target.name]: option.target.value});
      console.log('use', {...options, [option.target.name]: option.target.value});
    }
  };

  return {
    options,
    changeOptions,
  };
}

export default useOptions;