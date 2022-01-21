import types from "../types/types"

const contentReducer = (state = [], action) => {
  switch (action.type) {
    case types.add:
      return  [...state, action.payload].flat();
    
    case types.remove:
      return state;

    case types.update:
      return state;

    default:
        return state;
  }
}

export default contentReducer;