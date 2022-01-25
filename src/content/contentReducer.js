import types from "../types/types"

const contentReducer = (state = [], action) => {
  switch (action.type) {
    case types.add:
      return [...state, action.payload].flat();

    case types.remove:
      return state;

    case types.update:
      return state;

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
          console.log('a', state.sort((a, b) => a.info.runtime - b.info.runtime));
          return state.sort((a, b) => a.info.runtime - b.info.runtime);
        } else {
          console.log('b', state.slice().sort((a, b) => b.info.runtime - a.info.runtime));
          return state.slice().sort((a, b) => b.info.runtime - a.info.runtime);
        }
      }
      console.log('c');
      break;

    default:
      return state;
  }
}

export default contentReducer;