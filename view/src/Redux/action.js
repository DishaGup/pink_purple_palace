import axios from "axios";
import {
  SEARCH_SINGLE_STOCKS,
  USER_DATA_REQUEST_SUCCESS,
  USER_LOGIN_REQUEST_SUCCESS,
  USER_REQUEST_FAILURE,
  USER_REQUEST_PENDING,
} from "./actionTypes";

export const url = `http://localhost:8080`; //backened url change it according to the backend server

//The `fetchAllStocks` function is responsible for fetching all stocks from the API. It accepts two parameters: `page` and `limit`, which define the pagination settings for the request.

export const fetchAllStocks =
  (page, limit = 20) =>
  (dispatch) => {
    dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

    // Make a GET request to the API endpoint
    // using live server of coingenko to fetch

    return axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=${limit}&page=${page}&sparkline=false&locale=en&precision=6`
      )
      .then((res) => {
        return res; // Return the response data
      })
      .catch((err) => err); // Handle any errors
  };

//The `registerUserRequest` function is responsible for registering a new user. It takes the user data as input and makes a POST request to the register endpoint of the API.

// Register a new user
export const registerUserRequest = (data) => (dispatch) => {
  dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

  // Make a POST request to the register endpoint
  return axios
    .post(`${url}/users/register`, data)
    .then((res) => res) // Return the response data
    .catch((err) => err); // Handle any errors
};

// Login user
export const loginUserRequest = (data) => (dispatch) => {
  dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

  // Make a POST request to the login endpoint
  return axios
    .post(`${url}/users/login`, data)
    .then((res) => {
      dispatch({ type: USER_LOGIN_REQUEST_SUCCESS, payload: res.data }); // Dispatch a user login request success action
      return res; // Return the response data
    })
    .catch((err) => {
      dispatch({ type: USER_REQUEST_FAILURE, payload: err }); // Dispatch a user request failure action
      return err; // Handle any errors
    });
};

// Add bookmarked data for user
export const userAddToBookmarked = (data, token) => (dispatch) => {
  dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

  // Make a POST request to the add bookmark endpoint
  return axios
    .post(`${url}/data/user/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => dispatch(userBookMarkedDataFetch(token)))
    .catch((err) => dispatch({ type: USER_REQUEST_FAILURE, payload: err }));
};

// Fetch bookmarked data for user
export const userBookMarkedDataFetch = (token) => (dispatch) => {
  dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

  // Make a GET request to fetch bookmarked data
  axios
    .get(`${url}/data/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) =>
      dispatch({ type: USER_DATA_REQUEST_SUCCESS, payload: res.data })
    )
    .catch((err) => dispatch({ type: USER_REQUEST_FAILURE, payload: err }));
};

// Remove bookmark for user
export const userRemoveFromBookMark = (id, token) => (dispatch) => {
  dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

  // Make a DELETE request to remove bookmark
  axios
    .delete(`${url}/data/user/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => dispatch(userBookMarkedDataFetch(token)))
    .catch((err) => dispatch({ type: USER_REQUEST_FAILURE, payload: err }));
};

// Search for a coin by name
export const searchCoinName = (text) => (dispatch) => {
  dispatch({ type: USER_REQUEST_PENDING }); // Dispatch a user request pending action

  // Make a GET request to search for a coin
  return axios
    .get(`https://api.coingecko.com/api/v3/search?query=${text.toString()}`)
    .then((res) => {
      dispatch({ type: SEARCH_SINGLE_STOCKS }); // Dispatch a search single stocks action
      return res.data; // Return the response data
    })
    .catch((err) => err); // Handle any errors
};

// Get details of a single stock
export const getSingleStockDetails = (id) => async (dispatch) => {
  let allData = await dispatch(fetchAllStocks(1, 1500))
    .then((res) => res.data)
    .catch((err) => err);

  return allData.filter((el) => el.id == id);
};
