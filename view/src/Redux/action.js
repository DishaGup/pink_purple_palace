import axios from "axios";
import {
  SEARCH_SINGLE_STOCKS,
  USER_DATA_REQUEST_SUCCESS,
  USER_LOGIN_REQUEST_SUCCESS,
  USER_REQUEST_FAILURE,
  USER_REQUEST_PENDING,
} from "./actionTypes";

export const url = `http://localhost:8080`;

export const fetchAllStocks = (page,limit=20) => (dispatch) => {
  dispatch({ type: USER_REQUEST_PENDING });
  return axios
    .get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=${limit}&page=${page}&sparkline=false&locale=en&precision=6`
    )
    .then((res) => {
      return res;
    })
    .catch((err) => err);
};

export const registerUserRequest = (data) => (dispatch) => {
  dispatch({ type: USER_REQUEST_PENDING });

  return axios
    .post(`${url}/users/register`, data)
    .then((res) => res)
    .catch((err) => err);
};

export const loginUserRequest = (data) => (dispatch) => {
  dispatch({ type: USER_REQUEST_PENDING });

  return axios
    .post(`${url}/users/login`, data)
    .then((res) => {
      dispatch({ type: USER_LOGIN_REQUEST_SUCCESS, payload: res.data });
      return res;
    })
    .catch((err) => {
      dispatch({ type: USER_REQUEST_FAILURE,payload:err });
      return err;
    });
};

export const userAddToBookmarked = (data, token) => (dispatch) => {
  dispatch({ type: USER_REQUEST_PENDING });

  return axios
    .post(`${url}/data/user/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => dispatch(userBookMarkedDataFetch(token)))
    .then((err) => dispatch({ type: USER_REQUEST_FAILURE ,payload:err }));
};

export const userBookMarkedDataFetch = (token) => (dispatch) => {
  dispatch({ type: USER_REQUEST_PENDING });
  axios
    .get(`${url}/data/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) =>
      dispatch({ type: USER_DATA_REQUEST_SUCCESS, payload: res.data })
    )
    .then((err) => dispatch({ type: USER_REQUEST_FAILURE,payload:err }));
};

export const userRemoveFromBookMark=(id,token)=>(dispatch)=>{
   dispatch({ type: USER_REQUEST_PENDING });
   axios
   .delete(`${url}/data/user/delete/${id}`, {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   })
   .then((res) => dispatch(userBookMarkedDataFetch(token)))
   .then((err) => dispatch({ type: USER_REQUEST_FAILURE,payload:err }));
};

export const searchCoinName=(text)=>(dispatch)=>{

   dispatch({ type: USER_REQUEST_PENDING });
  return axios
     .get(`https://api.coingecko.com/api/v3/search?query=${text.toString()}`)
     .then((res) =>{ dispatch({type:SEARCH_SINGLE_STOCKS})
      console.log(res.data)
     return res.data}
     )
     .then((err) =>err);
}


export const getSingleStockDetails=(id)=>async(dispatch)=>{

let allData=await dispatch(fetchAllStocks(1,1500)).then((res)=>res.data).catch((err)=>err)

return allData.filter((el)=>el.id==id)
 
}
