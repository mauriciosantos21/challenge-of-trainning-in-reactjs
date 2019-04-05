export const Types = {
  ADD_PURCHASED: 'PURCHASEDs/ADD_PURCHASED',
  REMOVE_PURCHASED: 'PURCHASEDs/REMOVE_PURCHASED',
};

const INITIAL_STATE = {
  data: [],
};

export default function pucharsed(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_PURCHASED:
      return {
        ...state,
        data: [...state.data, action.payload.data],
      };

    case Types.REMOVE_PURCHASED:
      return { data: state.data.filter(item => item.id !== action.payload.data.id) };

    default:
      return state;
  }
}

export const Creators = {
  addPurchased: data => ({
    type: Types.ADD_PURCHASED,
    payload: { data },
  }),

  removePurchased: data => ({
    type: Types.REMOVE_PURCHASED,
    payload: { data },
  }),
};
