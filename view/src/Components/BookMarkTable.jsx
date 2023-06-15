import React, { useEffect, useState } from "react";
import { BiStar } from "react-icons/bi";
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
  Text,
  Box,
  Image,
  useDisclosure,
  Button,
  Select,
  Input,
} from "@chakra-ui/react";
import {
  userBookMarkedDataFetch,
  userRemoveFromBookMark,
} from "../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import CoinComponent from "./CoinComponent";
const BookMarkTable = () => {
  const dispatch = useDispatch();
  const { bookmarkedData, token } = useSelector((store) => store.reducer);
  const [show, setShow] = useState(false);
  const [visibleRows, setVisibleRows] = useState([0, 1, 2, 3, 4]);

  useEffect(() => {
    if (!token) {
      return;
    }

    dispatch(userBookMarkedDataFetch(token));
  }, []);
  const handleRemoveBookmark = (id) => {
    dispatch(userRemoveFromBookMark(id, token));
  };

  const handleToggleRow = (rowIndex) => {
    if (visibleRows.includes(rowIndex)) {
      setVisibleRows(visibleRows.filter((row) => row !== rowIndex));
    } else {
      setVisibleRows([...visibleRows, rowIndex]);
    }
  };

  if (!token) {
    return (
      <Text
        mt="20px"
        fontSize="23px"
        fontWeight={"500"}
        textDecoration={"underline"}
        lineHeight={"1.2cm"}
      >
        {" "}
        Please Login To your account To see WatchList
      </Text>
    );
  }

  return (
    <>
      <Text
        mt="30px"
        fontSize="23px"
        textDecoration={"underline"}
        lineHeight={"1.2cm"}
        align="left"
      >
        WatchList Live Data
      </Text>
      <TableContainer w="95%" m="auto" mt="50px">
        <Table variant="simple" bg="black">
          <TableCaption>WatchList Data</TableCaption>
          <Thead bg="#FDD835">
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
          <Tbody color="white">
            {bookmarkedData && bookmarkedData.length > 0 ? (
              bookmarkedData?.map((el, index) => (
                <Tr key={index}>
                  <Td>
                    {" "}
                    <BiStar
                      cursor={"pointer"}
                      onClick={() => handleRemoveBookmark(el._id)}
                      color="yellow"
                    />{" "}
                  </Td>
                  <Td>
                    {" "}
                    <Button
                      bg="0 0"
                      bgColor={"transparent"}
                      _hover={{ bg: "none" }}
                      cursor={"pointer"}
                      outline="none"
                      color={visibleRows.includes(index) ? "yellow" : "none"}
                      onClick={() => handleToggleRow(index)}
                    >
                      {visibleRows.includes(index) ? (
                        <AiFillEye />
                      ) : (
                        <AiFillEyeInvisible />
                      )}
                    </Button>
                  </Td>
                  <Td>
                    {" "}
                    <CoinComponent {...el} />{" "}
                  </Td>
                  {visibleRows.includes(index) && (
                    <>
                      <Td>₹{el.current_price.toLocaleString()}</Td>
                      <Td
                        color={
                          el.price_change_percentage_24h.toFixed(2) > 0
                            ? "green"
                            : "red"
                        }
                      >
                        {el.price_change_percentage_24h.toFixed(2)}%
                      </Td>
                      <Td>₹{el.price_change_24h.toLocaleString()}</Td>
                      <Td>₹{el.market_cap.toLocaleString()}</Td>
                    </>
                  )}
                </Tr>
              ))
            ) : (
              <Tr>
                {" "}
                <Heading fontSize={"18px"}>No WatchList Data</Heading>{" "}
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BookMarkTable;
