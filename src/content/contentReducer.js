import types from "../types/types"

const contentReducer = (state = [], action) => {
  switch (action.type) {
    case types.add:
      return [...state, action.payload].flat();

    case types.remove:
      return state;

    case types.update:
      return state;

    case types.sort:
      console.log('by', action.payload.by);
        if (action.payload.by === types.rating) {
          console.log('ntyhtyj');
          return state.slice().sort((a, b) => a.info.rating - b.info.rating);
        } else if (action.payload.by === types.runtime) {
          console.log('asdasd');
          return state.slice().sort((a, b) => a.info.runtime - b.info.runtime);
        }
      break;

    default:
      return state;
  }
}

export default contentReducer;