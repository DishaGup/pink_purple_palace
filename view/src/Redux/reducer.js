import {
  SEARCH_SINGLE_STOCKS,
  USER_DATA_REQUEST_SUCCESS,
  USER_LOGIN_REQUEST_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_REQUEST_FAILURE,
  USER_REQUEST_PENDING,
  USER_REQUEST_SUCCESS,
} from "./actionTypes";

const initial = {
  loading: false,
  error: "",
  bookmarkedData: [],
  userDetails: [],
  token: "",
  singleStock: [],
};

export const reducer = (state = initial, { type, payload }) => {
  switch (type) {
    case USER_REQUEST_PENDING:
      // Set loading to true when a user request is pending
      return {
        ...state,
        loading: true,
      };

    case USER_LOGIN_REQUEST_SUCCESS:
      // Update user details and token on successful user login request
      return {
        ...state,
        loading: false,
        userDetails: payload.userD,
        token: payload.token,
      };

    case USER_DATA_REQUEST_SUCCESS:
      // Update bookmarked data on successful user data request
      return {
        ...state,
        loading: false,
        bookmarkedData: payload.users,
      };

    case USER_LOGOUT_SUCCESS:
      // Reset user details and token on successful user logout
      return {
        ...state,
        loading: false,
        userDetails: [],
        token: "",
      };

    case SEARCH_SINGLE_STOCKS:
      // Update single stock data on searching a single stock
      return {
        ...state,
        loading: false,
        singleStock: payload,
      };

    case USER_REQUEST_FAILURE:
      // Update error message on user request failure
      return {
        ...state,
        loading: false,
        error: payload?.response?.data?.message,
      };

    default:
      return state;
  }
};
