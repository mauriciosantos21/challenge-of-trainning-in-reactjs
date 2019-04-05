export const Types = {
  ADD_PROMOTION: 'PROMOTIONs/ADD_PROMOTION',
  REMOVE_PROMOTION: 'PROMOTIONs/REMOVE_PROMOTION',
};

const INITIAL_STATE = {
  data: [],
};

export default function promotions(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_PROMOTION:
      return {
        ...state,
        data: [...state.data, action.payload.data],
      };

    case Types.REMOVE_PROMOTION:
      return { data: state.data.filter(item => item.id !== action.payload.data.id) };

    default:
      return state;
  }
}

export const Creators = {
  addPromotion: data => ({
    type: Types.ADD_PROMOTION,
    payload: { data },
  }),

  removePromotion: data => ({
    type: Types.REMOVE_PROMOTION,
    payload: { data },
  }),
};
