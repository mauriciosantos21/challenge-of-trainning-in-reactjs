import { combineReducers } from 'redux';

import comics from './comics';
import favorites from './favorites';
import promotions from './promotions';
import purchased from './purchased';

export default combineReducers({
  comics,
  favorites,
  promotions,
  purchased,
});
