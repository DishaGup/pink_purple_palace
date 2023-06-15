import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSingleStockDetails } from '../Redux/action'
import { Box, VStack , Tag,Image,
   Badge,Heading,Text,Spinner,Skeleton, SkeletonCircle, SkeletonText ,
    HStack,SimpleGrid} from '@chakra-ui/react'
import CoinComponent from './CoinComponent'

const SingleStockPage = () => {
const [stocks,setStock] =useState({})
const {id}=useParams()
const {singleStock}=useSelector((store)=>store.reducer)
console.log(singleStock,'..10')
const dispatch=useDispatch()

useEffect(()=>{
dispatch(getSingleStockDetails(id)).then((res)=>setStock(res)).then((err)=>console.log(err))

if(stocks.length<=0) {
    setStock(singleStock)
}


},[])

console.log(stocks)
  return (
    <div>
 <Box textAlign={'left'} w='80%' m='auto' >

{
    stocks.length==1 ?  (
stocks.map((el,index)=> <>
<VStack align={'left'} mt='80px' >
<HStack spacing={4}>
   
      <Badge  variant='solid' colorScheme='black' > Rank #  {el?.market_cap_rank}</Badge >
      
   
  
</HStack>
<Box w='800px' objectFit={'cover'} >
<Box alignItems={'center'}  >
    <HStack maxH={'1.2cm'} overflow={'hidden'} >
     <Box w='45px'><Image w='60%'  src={el?.image} objectFit={'cover'} /></Box>
     <Text fontWeight={'600'} fontSize={'16px'}  >{el?.name}</Text>
   <Text fontWeight={'400'} fontSize={'14px'} textTransform={'uppercase'} >{el?.symbol}</Text>
    </HStack>
    </Box> 
</Box>

<HStack>₹{el?.current_price.toLocaleString()} {"  "} {el.price_change_percentage_24h.toFixed(2)}%   </HStack>

<Box>

 <Heading>{el?.symbol} Price Statistics</Heading>
<SimpleGrid
                margin={"auto"}
                gridTemplateColumns={"repeat(2,1fr)"}
                alignItems={"center"}
              >


     <Text>{el?.name} Price</Text>  <Heading>₹{el?.current_price.toLocaleString()}</Heading>     
     <Text>24h Low / 24h High</Text>  <Heading>₹{el?.low_24h.toLocaleString()} / ₹{el?.high_24h.toLocaleString()}  </Heading>     
     <Text>Trading Volume</Text>  <Heading>₹{el?.total_volume.toLocaleString()}</Heading>   
     <Text>Market Cap Rank</Text>  <Heading>{el?.market_cap_rank}</Heading>   
     <Text>Market Cap</Text>  <Heading>₹{el?.market_cap.toLocaleString()}</Heading>   
     <Text>Fully Diluted Valuation</Text>  <Heading>₹{el?.fully_diluted_valuation.toLocaleString()}</Heading>  
     <Text>All Time High</Text>  <Heading>₹{el?.ath.toLocaleString()} <Text>{el?.ath_date}</Text>  </Heading>   
     <Text>Last Updated</Text>  <Heading></Heading>   
              </SimpleGrid>







</Box>


</VStack>



</>  )


    ) :(<>
    

<Box padding='6' boxShadow='lg' bg='white' mt='80px' w='80%' m='auto'  >
  <SkeletonCircle size='10' />
  <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='4' />
</Box>
    
    
    </>)
}



 </Box>
    </div>
  )
}

export default SingleStockPage