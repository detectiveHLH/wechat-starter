import { queryAmoebas, queryCulture, queryDepartments } from '../services/score';

export default {
  namespace: 'score',

  state: {
    deparments: [],
    amoebas: [],
    culture: [],
  },

  effects: {
    *fetchDepartments(_, { call, put }) {
      const response = yield call(queryDepartments);
      yield put({
        type: 'saxveDeparments',
        payload: response,
      });
    },
    *fetchAmoebas(_, { call, put }) {
      const response = yield call(queryAmoebas);
      yield put({
        type: 'saveAmoebas',
        payload: response,
      });
    },
    *fetchCulture(_, { call, put }) {
      const response = yield call(queryCulture);
      yield put({
        type: 'saveCulture',
        payload: response,
      });
    },
  },

  reducers: {
    saveDeparments(state, action) {
      return {
        ...state,
        deparments: action.payload.data[0].structure.children,
      };
    },
    saveAmoebas(state, action) {
      return {
        ...state,
        amoebas: action.payload.data,
      };
    },
    saveCulture(state, action) {
      return {
        ...state,
        culture: action.payload.data,
      };
    },
  },
};
