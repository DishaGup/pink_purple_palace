import React, { useEffect, useState } from 'react'
import {BiStar} from 'react-icons/bi'
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
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { fetchAllStocks } from '../Redux/action'
import { useDispatch } from 'react-redux';

const Homepage = () => {
const [stocksData,setStocksData]=useState([])
const dispatch=useDispatch()


useEffect(()=>{
dispatch(fetchAllStocks(1)).then((res)=>setStocksData(res.data))
},[])



  return (
   <>
    <TableContainer w='80%' m='auto'>
  <Table variant='simple' bg='black'>
    <TableCaption>Crypto Currency Data</TableCaption>
    <Thead bg= '#FDD835'>
      <Tr>
        <Th></Th>
        <Th>Coin</Th>
        <Th>Price</Th>
        <Th >24th Change</Th>
        <Th >Market Cap</Th>
      </Tr>
    </Thead>
    <Tbody color='white' > 

{
   stocksData?.map((el,index)=>
   
   <Tr key={index}>
   <Td> <BiStar color='yellow' /> </Td>
   <Td>{el.current_price}</Td>
   <Td >{el.price_change_24h}</Td>
   <Td>{el.market_cap}</Td>
 </Tr>  
   
   )    
}
    </Tbody>
 
  </Table>
</TableContainer>
   
     </>
    




  )
}

export default Homepage