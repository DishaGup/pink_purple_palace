import { Box, HStack,Text,Image } from '@chakra-ui/react'
import React from 'react'

const CoinComponent = ({image,name,symbol}) => {
  return (
    <Box alignItems={'center'}  >
    <HStack maxH={'1.2cm'} overflow={'hidden'} >
     <Box w='45px'><Image w='60%'  src={image} objectFit={'cover'} /></Box>
     <Text fontWeight={'600'} fontSize={'16px'}  >{name}</Text>
   <Text fontWeight={'400'} fontSize={'14px'} textTransform={'uppercase'} >{symbol}</Text>
    </HStack>
    </Box>
  )
}

export default CoinComponent