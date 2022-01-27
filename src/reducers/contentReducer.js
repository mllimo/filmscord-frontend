import types from "../types/types"

const contentReducer = (state = [], action) => {
  switch (action.type) {
    case types.add:
      return [...state, action.payload].flat();

    case types.remove:
      return state;

    case types.update:
      return action.payload;

    // TODO: refac
    case types.sort:
      if (action.payload.by === types.rating) {
        if (action.payload.in === types.asc) {
          return state.sort((a, b) => a.info.rating - b.info.rating);
        } else {
          return state.sort((a, b) => b.info.rating - a.info.rating);
        }
      } else if (action.payload.by === types.runtime) {
        if (action.payload.in === types.asc) {
          return state.sort((a, b) => a.info.runtime - b.info.runtime);
        } else {
          return state.slice().sort((a, b) => b.info.runtime - a.info.runtime);
        }
      }
      break;

    default:
      return state;
  }
}

export default contentReducer;