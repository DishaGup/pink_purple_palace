import {
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  useToast,
  Stack,
  HStack,IconButton
} from "@chakra-ui/react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { USER_LOGOUT_SUCCESS } from "../Redux/actionTypes";
import SearchBar from "./SearchBar";
import { FcSearch } from "react-icons/fc";
import {GiHamburgerMenu} from 'react-icons/gi'
export const Navbar = () => {
  const toast = useToast();
  const { userDetails } = useSelector((store) => store.reducer);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const defaultLinkStyle = { color: "black" };
  const activeLinkStyle = {
    color: "#08313A",
    textDecoration: "underline",
    fontWeight: "500",
  };

  return (
    <Flex
      width={"100%"}
      margin={"auto"}
      justifyContent={"space-around"}
      alignItems={"center"}
      bg={"#FBC02D"}
      padding={"10px"}
    >
<Menu display={{base:'block',lg:'none'}} color='black' > 
  <MenuButton
      display={{base:'block',lg:'none'}}
  ><GiHamburgerMenu /></MenuButton>
  <MenuList align='left' ml='5px' pl='14px' fontSize={'18px'}>
  <NavLink 
        to={"/login"}
        style={({ isActive }) => {
          return isActive ? activeLinkStyle : defaultLinkStyle;
        }}
        end
      >
        <Text >Login</Text>
      </NavLink>
      <NavLink 
        to={"/register"}
        style={({ isActive }) => {
          return isActive ? activeLinkStyle : defaultLinkStyle;
        }}
        end
      >
        <Text  >Sign Up</Text>
      </NavLink>

  </MenuList>
</Menu>



      <NavLink
        to={"/"}
        style={({ isActive }) => {
          return isActive ? activeLinkStyle : defaultLinkStyle;
        }}
        end
      >
        <Text fontSize={"1.3rem"}>Home</Text>
      </NavLink>
      <NavLink 
        to={"/register"}
        style={({ isActive }) => {
          return isActive ? activeLinkStyle : defaultLinkStyle;
        }}
        end
      >
        <Text  display={{base:'none',lg:'block'}} fontSize={"1.3rem"}>Sign Up</Text>
      </NavLink>

      <Flex>
        <Menu>
          <MenuButton>
            <Text fontSize={"1.3rem"}>
              Hi,{" "}
              {userDetails && userDetails.length == 1
                ? `${userDetails[0].name}`
                : "User"}
            </Text>
          </MenuButton>
          {userDetails && userDetails.length == 1 && (
          <MenuList padding={"20px"} boxShadow={"xl"}>
          
              <MenuItem
                borderRadius={"2px"}
                _hover={{
                  bg: "#FDD835",
                }}
                onClick={() => {
                  toast({
                    title: "Logged Out Successfully",
                    position: "top",
                    description: "Redirecting to  Home Page....",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                  });
                  dispatch({ type: USER_LOGOUT_SUCCESS });
                  navigate("/login");
                }}
              >
                Sign out
              </MenuItem>
           
          </MenuList>
          )}
        </Menu>
      </Flex>
      {/* ) : ( */}
      <NavLink display={{base:'none',lg:'block'}}
        to={"/login"}
        style={({ isActive }) => {
          return isActive ? activeLinkStyle : defaultLinkStyle;
        }}
        end
      >
        <Text  display={{base:'none',lg:'block'}} fontSize={"1.3rem"}>Login</Text>
      </NavLink>
      <HStack>
        <Input
          type="search"
          _placeholder={{ color: "white" }}
          onClick={onOpen}
          onChange={onOpen}
          placeholder="Search coin..."
        />

        {isOpen && (
          <SearchBar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        )}
      </HStack>
    </Flex>
  );
};
