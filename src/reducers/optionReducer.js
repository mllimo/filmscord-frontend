
const optionReducer = (state = {}, action) => {
  console.log('action', action);
  switch (action.name) {
    case "isAdd":
      return { ...state, isAdd: !state.isAdd };
    case "isAddContent":
      return { ...state, isAddContent: action.payload };
    case "isUpdateContent":
      return { ...state, isUpdateContent: action.payload };
    case "addContent":
      return { ...state, addContent: action.payload };
    case "updateContent":
      return { ...state, updateContent: action.payload };
    case "sortBy":
      return { ...state, sortBy: action.payload };
    case "orderBy":
      return { ...state, orderBy: action.payload };
    case "search":
      return { ...state, search: action.payload };
    default:
      return state;

  }
};

export default optionReducer;