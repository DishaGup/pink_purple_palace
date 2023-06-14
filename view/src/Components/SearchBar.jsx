import {
    Box,
    Button,
    Flex,
    Input,
    InputGroup,
    InputLeftAddon,
    Text,
    Link,
    useBoolean,  Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from "@chakra-ui/react";

  import React, { useEffect, useState } from "react";
  import { FaSearchLocation } from "react-icons/fa";
  import { useDispatch, useSelector } from "react-redux";
import useThrottle from "../CustomHook/useThrottle";
import { searchCoinName } from "../Redux/action";
  function SearchBar({onOpen,isOpen,onClose}) {
    const [searchText, setsearchText] = useState("");
    const [search, setSearch] = useState([]);
    const [showDropdown, setShowDropdown] = useBoolean(false);
    const throttledText = useThrottle(searchText, 1000);
    const dispatch = useDispatch();
    const {token}=useSelector((store)=>store.reducer)
    useEffect(() => {
      
      dispatch(searchCoinName(throttledText,token))
        .then((res) => {
        
        console.log(res)
        })
        .catch((err) => console.log(err));
    }, [throttledText]);
    
    // useEffect(() => {
    //   if (throttledText === "") {
    //     setSearch([]);
    //   } else {
      
    //     if (Products && Products.length > 0) {
    //       let newSuggestions = Products.filter((item) => {
    //         return item.title
    //           .split(" ")
    //           .join("")
    //           .trim()
    //           .toLowerCase()
    //           .indexOf(throttledText) !== -1
    //           ? true
    //           : false;
    //       });
    //       setSearch(newSuggestions);
    //       setShowDropdown.on();
    //     }
    //   }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [throttledText]);
    // // console.log(search);
    const [add, setP] = useState("");
  
    return (
      <Box fontFamily={"Clear-Sans"} shadow={"sm"} bg="#fff">
   <Drawer 
        isOpen={isOpen}
        placement='right' isFullHeight={false}
        height="500px"
        onClose={onClose}
       
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
        

          <DrawerBody mt="50px">
  
 <Flex justify={"space-around"} minH={"40px"} py="10px" align={"center"}>
          <Flex
            gap={0.1}
            width={{ base: "100%", md: "90%" }}
            flexDir={{ base: "column", md: "row" }}
            align={"center"}
            position="relative"
          >
            <Input
            variant="filled"
            placeholder="Search coin name."
            size="sm"
            w={"100%"}
            type="search"
            onChange={(e) => setsearchText(e.target.value)}
          />
            {searchText.length > 0 && search.length > 0 && (
              <Box
              position="absolute"
              zIndex="100"
              bgColor="white"
              overflow="scroll"
             
              maxH="400px"
              m="auto"
              px={3}
              top="calc(100% + 8px)" 
              left={0} 
              right={0} 
              border="2px solid gray"
              scrollBehavior="smooth"
               
              >
                {/* {search.map((item, i) => {
                  return (
                    <Link
                      href={`/products/:category/single/${item._id}`}
                      target="_blank"
                      key={i + 1}
                      borderBottom={'1px solid gray'}
                    >
                      <Text
                        fontSize="14px"
                        p="8px"
                        cursor="pointer"
                        onClick={setShowDropdown.off}
                      >
                        {item.title}
                      </Text>
                    </Link>
                  );
                })} */}
              </Box>
            )}
          </Flex>
        </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
 

       
      </Box>
    );
  }
  
  export default SearchBar;