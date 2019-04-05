import { call, put, select } from 'redux-saga/effects';
import md5 from 'js-md5';
import api from '../../services/api';

import { Creators as ComicsActions } from '../ducks/comics';

const PUBLIC_KEY = '08dfdcf2163c662416050d56a646713d';
const PRIVATE_KEY = 'b49247591ae576700f2465d323ea8459ac4168e9';
const timestamp = Number(new Date());
const hash = md5.create();
hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY);

export function* getComics() {
  const state = yield select();
  try {
    const { data } = yield call(
      api.get,
      `comics?ts=${timestamp}&limit=10&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`,
    );

    const comics = data.data.results;

    const mapResult = (comic) => {
      const comicData = {
        id: comic.id,
        title: comic.title,
        description: comic.description,
      };
      return comicData;
    };

    const list = Object.assign([], state.comics.data, comics);

    const result = list.map(mapResult);

    yield put(ComicsActions.getComicsSuccess(result));
  } catch (err) {
    yield put(ComicsActions.getComicsFailure('Erro ao buscar quadrinhos'));
  }
}
