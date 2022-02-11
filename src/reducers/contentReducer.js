import types from "../types/types"

const contentReducer = (state = [], action) => {
  switch (action.type) {
    case types.add:
      return [...state, action.payload].flat();

    case types.remove:
      return state;

    case types.update:
      return action.payload;

    case types.updateContent:
      return state.map(item => {
        if (item.info.title.id === action.payload.id) {
          item.rate = action.payload.rate;
          item.comment = action.payload.comment;
          item.data_watched = action.payload.data_watched;
        }
        return item;
      });

    case types.sort:
      if (action.payload.by === types.rating) {
        if (action.payload.in === types.asc) {
          return state.sort((a, b) => a.rate - b.rate);
        } else {
          return state.sort((a, b) => b.rate - a.rate);
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