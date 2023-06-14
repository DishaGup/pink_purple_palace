import React, { useEffect,useState } from 'react'
import {BiStar} from 'react-icons/bi'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    HStack,
    VStack,
    Heading,
    Text,Box,Image, useDisclosure,Button, Select, Input
  } from '@chakra-ui/react'
import { userBookMarkedDataFetch, userRemoveFromBookMark } from '../Redux/action'
import { useDispatch,useSelector } from 'react-redux'
import CoinComponent from './CoinComponent'
const BookMarkTable = () => {
const dispatch=useDispatch()
const {bookmarkedData,token}=useSelector((store)=>store.reducer)
const [show,setShow] =useState(false)
useEffect(()=>{
dispatch(userBookMarkedDataFetch(token))
},[])
const handleRemoveBookmark=(id)=>{

dispatch(userRemoveFromBookMark(id,token))

}
      return (
       <>
        <TableContainer w='80%' m='auto'>
      <Table variant='simple' bg='black'>
        <TableCaption>WatchList Data</TableCaption>
        <Thead bg= '#FDD835'>
          <Tr>
            <Th></Th>
            <Th></Th>
            <Th>Coin</Th>
            <Th>Price</Th>
            <Th >24th Change</Th>
            <Th >Market Cap</Th>
          </Tr>
        </Thead>
        <Tbody color='white' > 
    
    {
      bookmarkedData && bookmarkedData.length>0 ?( bookmarkedData?.map((el,index)=>
       
       <Tr key={index}>
     
      <Td > <BiStar onClick={()=>handleRemoveBookmark(el._id)} color='yellow' /> </Td>
      
      <Td> <Button onClick={() => setShow((prev) => !prev)}>
                  {show ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </Button></Td>
      
       <Td> <CoinComponent {...el} /> </Td>
 
       <Td>{el.current_price}</Td>
       <Td >{el.price_change_24h}</Td>
       <Td>{el.market_cap}</Td>
     </Tr>  
       
       )) :( <Heading>No BookMarked Data</Heading> )    
    }
        </Tbody>
     
      </Table>
    </TableContainer>
       
         </>
        
    
  )
}

export default BookMarkTable