import React, { useEffect, useState } from 'react'
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
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { fetchAllStocks, userAddToBookmarked } from '../Redux/action'
import { useDispatch, useSelector } from 'react-redux';
import BookMarkTable from '../Components/BookMarkTable';
import CoinComponent from '../Components/CoinComponent';

const Homepage = () => {
const [stocksData,setStocksData]=useState([])
const dispatch=useDispatch()
const {token,bookmarkedData}=useSelector((store)=>store.reducer)
const [visibleRows, setVisibleRows] = useState([]);
  

//console.log(token,"token")
useEffect(()=>{
dispatch(fetchAllStocks(1)).then((res)=>setStocksData(res.data))
},[])

const handleAddToBookMark=(data)=>{
  dispatch(userAddToBookmarked(data,token))

}

const handleToggleRow = (rowIndex) => {
  if (visibleRows.includes(rowIndex)) {
    setVisibleRows(visibleRows.filter((row) => row !== rowIndex));
  } else {
    setVisibleRows([...visibleRows, rowIndex]);
  }
};
  return (
   <>

 {/* <BookMarkTable /> */}

    <TableContainer w='95%' m='auto'>
  <Table variant='simple' >
    <TableCaption>Crypto Currency Data</TableCaption>
    <Thead >
      <Tr>
        <Th>#</Th>
        <Th></Th>
        <Th>Coin</Th>

        {visibleRows.length > 0 && (
                <>
                  <Th>Price</Th>
                  <Th> 1h</Th>
                  <Th>24th Change</Th>
                  <Th>Market Cap</Th>
                </>
              )}
   
      </Tr>
    </Thead>
    <Tbody > 

{
   stocksData?.map((el,index)=>
   
   <Tr key={index}  >
   <Td > <HStack>  <BiStar onClick={()=>handleAddToBookMark(el)}  /> <Text as="span" >{el.market_cap_rank}</Text> </HStack> </Td>
   <Td> <Button  onClick={() => handleToggleRow(index)}>
   {visibleRows.includes(index) ? (
                      <AiFillEye />
                    ) : (
                      <AiFillEyeInvisible />
                    )}
                  </Button></Td>
                  <Td> <CoinComponent {...el} /> </Td>
                  {visibleRows.includes(index) && (
                  <>
                    <Td>₹{el.current_price.toLocaleString()}</Td>
                    <Td color={el.price_change_percentage_24h.toFixed(2)>0?"green":"red"} >{el.price_change_percentage_24h.toFixed(2)}%</Td>
                    <Td>₹{el.price_change_24h.toLocaleString()}</Td>
                    <Td>₹{el.market_cap.toLocaleString()}</Td>
                  </>
                )}


 
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