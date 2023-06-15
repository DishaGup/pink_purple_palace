import { Box, HStack, Text, Image } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const CoinComponent = ({ image, name, symbol, id }) => {
  return (
    <Box alignItems={"center"}>
      <Link to={`/single/stock/${id}`} target="_blank">
        <HStack maxH={"1.2cm"} overflow={"hidden"}>
          <Box w="45px">
            <Image w="60%" src={image} objectFit={"cover"} />
          </Box>
          <Text fontWeight={"600"} fontSize={"16px"}>
            {name}
          </Text>
          <Text
            fontWeight={"400"}
            fontSize={"14px"}
            textTransform={"uppercase"}
          >
            {symbol}
          </Text>
        </HStack>
      </Link>
    </Box>
  );
};

export default CoinComponent;
