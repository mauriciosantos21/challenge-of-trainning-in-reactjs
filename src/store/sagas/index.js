import { all, takeLatest } from 'redux-saga/effects';

import { Types as ComicsTypes } from '../ducks/comics';
import { getComics } from './comics';

export default function* rootSaga() {
  yield all([takeLatest(ComicsTypes.GET_REQUEST, getComics)]);
}
