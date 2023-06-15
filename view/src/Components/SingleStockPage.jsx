import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleStockDetails } from "../Redux/action";
import {
  Box,
  VStack,
  Tag,
  Image,
  Badge,
  Heading,
  Text,
  SkeletonCircle,
  SkeletonText,
  HStack,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react";
import CoinComponent from "./CoinComponent";

const SingleStockPage = () => {
  const [stocks, setStock] = useState([]);
  const { id } = useParams();
  const { singleStock } = useSelector((store) => store.reducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleStockDetails(id))
      .then((res) => setStock(res))
      .then((err) => err);

    if (stocks.length <= 0) {
      setStock(singleStock);
    }
  }, []);

  return (
    <div>
      <Box textAlign={"left"} w="70%" m="auto">
        {stocks && stocks.length >= 1 ? (
          stocks.map((el, index) => (
            <>
              <VStack
                position="relative"
                align={"left"}
                my="50px"
                boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
                p={"20px"}
              >
                <Box
                  position="absolute"
                  top={"10"}
                  right={"30"}
                  p={1}
                  w="320px"
                  h="3.2cm"
                  fontSize="sm"
                  fontWeight="bold"
                  _before={{
                    content: "''",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundImage: `url("https://www.coingecko.com/coins/${el?.market_cap_rank}/sparkline.svg")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.8,
                    zIndex: -1,
                  }}
                />

                <HStack spacing={4}>
                  <Badge
                    p={2}
                    borderRadius={"10px"}
                    variant="solid"
                    colorScheme="yellow"
                  >
                    {" "}
                    Rank # {el?.market_cap_rank}
                  </Badge>
                </HStack>
                <Box w="800px" objectFit={"cover"}>
                  <Box alignItems={"center"}>
                    <HStack maxH={"2.5cm"} overflow={"hidden"}>
                      <Box w="70px">
                        <Image w="60%" src={el?.image} objectFit={"cover"} />
                      </Box>
                      <Text fontWeight={"700"} fontSize={"19px"}>
                        {el?.name}
                      </Text>
                      <Text
                        fontWeight={"500"}
                        fontSize={"15px"}
                        textTransform={"uppercase"}
                      >
                        {el?.symbol}
                      </Text>
                    </HStack>
                  </Box>
                </Box>

                <HStack>
                  {" "}
                  <Text>
                    ₹{el?.current_price.toLocaleString()} {"  "}{" "}
                    <Text
                      as="span"
                      color={
                        el.price_change_percentage_24h.toFixed(2) > 0
                          ? "green"
                          : "red"
                      }
                    >
                      {el.price_change_percentage_24h.toFixed(3)}%{" "}
                    </Text>
                  </Text>
                </HStack>

                <Box>
                  <Heading
                    fontSize={"24px"}
                    _firstLetter={{ color: "#FF8F00" }}
                    lineHeight={"1.2cm"}
                    fontWeight={"700"}
                    textDecoration={"underline"}
                  >
                    {el?.symbol.toUpperCase()} Price Statistics
                  </Heading>
                  <SimpleGrid
                    margin={"auto"}
                    gridTemplateColumns={"repeat(2,1fr)"}
                    alignItems={"center"}
                    gap="2px"
                  >
                    <Text>{el?.name} Price</Text>{" "}
                    <Heading fontSize={"22px"} lineHeight={"1.2cm"}>
                      ₹{el?.current_price.toLocaleString()}
                    </Heading>
                    <Text>24h Low / 24h High</Text>{" "}
                    <Heading fontSize={"22px"} lineHeight={"1.2cm"}>
                      ₹{el?.low_24h.toLocaleString()} / ₹
                      {el?.high_24h.toLocaleString()}{" "}
                    </Heading>
                    <Text>Trading Volume</Text>{" "}
                    <Heading fontSize={"22px"} lineHeight={"1.2cm"}>
                      ₹{el?.total_volume.toLocaleString()}
                    </Heading>
                    <Text>Market Cap Rank</Text>{" "}
                    <Heading fontSize={"22px"} lineHeight={"1.2cm"}>
                      {el?.market_cap_rank}
                    </Heading>
                    <Text>Market Cap</Text>{" "}
                    <Heading fontSize={"22px"} lineHeight={"1.2cm"}>
                      ₹{el?.market_cap.toLocaleString()}
                    </Heading>
                    <Text>Fully Diluted Valuation</Text>{" "}
                    <Heading fontSize={"22px"} lineHeight={"1.2cm"}>
                      ₹{el?.fully_diluted_valuation.toLocaleString()}
                    </Heading>
                    <Text>All Time High</Text>{" "}
                    <Heading fontSize={"22px"} lineHeight={"1.2cm"}>
                      ₹{el?.ath.toLocaleString()}{" "}
                      <Text as={"span"} fontSize={"15px"}>
                        ({el?.ath_date})
                      </Text>{" "}
                    </Heading>
                    <Text>Last Updated</Text>{" "}
                    <Heading fontSize={"22px"} lineHeight={"1.2cm"}>
                      {el?.last_updated}
                    </Heading>
                  </SimpleGrid>
                </Box>
              </VStack>
            </>
          ))
        ) : (
          <>
            <Box
              padding="6"
              boxShadow="lg"
              bg="white"
              mt="80px"
              w="80%"
              m="auto"
            >
              <SkeletonCircle size="10" />
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="4"
              />
            </Box>
          </>
        )}
      </Box>
    </div>
  );
};

export default SingleStockPage;
