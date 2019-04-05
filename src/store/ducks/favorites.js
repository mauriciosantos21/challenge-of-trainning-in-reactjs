export const Types = {
  ADD_FAVORITE: 'favorites/ADD_FAVORITE',
  REMOVE_FAVORITE: 'favorites/REMOVE_FAVORITE',
};

const INITIAL_STATE = {
  data: [],
};

export default function favorites(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_FAVORITE:
      return {
        ...state,
        data: [...state.data, action.payload.data],
      };

    case Types.REMOVE_FAVORITE:
      return { data: state.data.filter(item => item.id !== action.payload.data.id) };

    default:
      return state;
  }
}

export const Creators = {
  addFavorite: data => ({
    type: Types.ADD_FAVORITE,
    payload: { data },
  }),

  removeFavorite: data => ({
    type: Types.REMOVE_FAVORITE,
    payload: { data },
  }),
};
