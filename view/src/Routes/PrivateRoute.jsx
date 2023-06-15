import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {

    const {token,bookmarkedData}=useSelector((store)=>store.reducer)
   
    if(!token){
    return <Navigate to='login' replace='true' />
    }

return children
  
}

export default PrivateRoute