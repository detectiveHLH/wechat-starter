import { getSignature } from '../services/wechat';

export default {
  namespace: 'wechat',

  state: {
    userInfo: null,
    isFetch: false,
  },

  effects: {
    *fetchSignature({ payload }, { call, put }) {
      const response = yield call(getSignature, payload);
      yield put({
        type: 'getSignature',
        payload: response.data,
      });
    },
  },

  reducers: {
    getSignature(state, action) {
      return {
        ...state,
        userInfo: action.payload,
        isFetch: true,
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
    clear() {
      return {
        isFetch: false,
      };
    },
  },
};
