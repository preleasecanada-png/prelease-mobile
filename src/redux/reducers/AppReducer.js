import * as types from '../../actions/types';

const initialState = {
  name: '',
  drawerOpen: false,
  user: null,
  token: null,
  role: null,
  intro: true,
  keyboardVisible: false,
  isLoggedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INIT_APP:
    case types.GO_TO_DETAILS:
      return { ...state, ...action.payload };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.user?.role,
        isLoggedIn: true,
      };
    case types.SET_USER:
      return { ...state, user: action.payload };
    case types.SET_TOKEN:
      return { ...state, token: action.payload };
    case types.LOGOUT:
      return { ...initialState, intro: false };
    default:
      return state;
  }
};

export const orderSelector = (state) => state.app;

export default reducer;
