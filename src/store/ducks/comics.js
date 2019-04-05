/**
 * Types
 */

export const Types = {
  GET_REQUEST: 'comics/GET_REQUEST',
  GET_SUCCESS: 'comics/GET_SUCCESS',
  GET_FAILURE: 'comics/GET_FAILURE',
  ADD_COMIC: 'comics/ADD_COMIC',
};

/**
 * Reducers
 */

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return { ...state, loading: true };
    case Types.GET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload.data,
      };
    case Types.GET_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    case Types.ADD_COMIC:
      return {
        ...state,
        data: [...state.data, action.payload.data],
      };
    default:
      return state;
  }
}

/**
 * Actions Creators
 */

export const Creators = {
  getComicsRequest: () => ({
    type: Types.GET_REQUEST,
    payload: {},
  }),

  getComicsSuccess: data => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),

  getComicsFailure: error => ({
    type: Types.GET_FAILURE,
    payload: { error },
  }),
  addComic: data => ({
    type: Types.ADD_COMIC,
    payload: { data },
  }),
};
