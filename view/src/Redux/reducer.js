import {
  USER_LOGIN_REQUEST_SUCCESS,
  USER_REGISTER_REQUEST_SUCCESS,
  USER_REQUEST_FAILURE,
  USER_REQUEST_PENDING,
  USER_REQUEST_SUCCESS,
} from "./actionTypes";

const initial = {
  loading: false,
  error: false,
  bookmarkedData: [],
  userDetails: [],
};

export const reducer = (state = initial, { type, payload }) => {
  switch (type) {
    case USER_REQUEST_PENDING:
      return {
        ...state,
        loading: true,
      };
      break;
    case USER_LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        bookmarkedData: payload,
      };
      break;
    case USER_REGISTER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        userDetails: payload,
      };
      break;

    case USER_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
      break;

    default:
      return state;
      break;
  }
};
