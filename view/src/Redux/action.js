import axios from "axios"
import { USER_REQUEST_PENDING } from "./actionTypes"

export const fetchAllStocks=(page)=>(dispatch)=>{
dispatch({type:USER_REQUEST_PENDING})
return axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=${page}`).then((res)=>{
   return (res)
})
.catch((err)=>err)
}