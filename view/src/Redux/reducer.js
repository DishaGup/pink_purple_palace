import {
  USER_DATA_REQUEST_SUCCESS,
  USER_LOGIN_REQUEST_SUCCESS,
 
  USER_LOGOUT_SUCCESS,
 
  USER_REQUEST_FAILURE,
  USER_REQUEST_PENDING,
  USER_REQUEST_SUCCESS,
} from "./actionTypes";

const initial = {
  loading: false,
  error: false,
  bookmarkedData: [],
  userDetails: [],
  token:"",
  singleData:[]
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
        userDetails:payload.userD,
        token:payload.token
      };
      break;
    case USER_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        bookmarkedData: payload.users,
      };
      break;
      case USER_LOGOUT_SUCCESS:
        return {
          ...state,
          loading: false,
           userDetails:[],
           token:""
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
