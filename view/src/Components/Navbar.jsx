import {
    Flex,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useDisclosure,
    useToast,Stack,HStack
  } from "@chakra-ui/react";
  import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
  import { NavLink, useNavigate } from "react-router-dom";
import { USER_LOGOUT_SUCCESS } from "../Redux/actionTypes";
import SearchBar from "./SearchBar";
import {FcSearch} from 'react-icons/fc'
  export const Navbar = () => {
   
    const toast = useToast();
const {userDetails}=useSelector((store)=>store.reducer)
const dispatch=useDispatch()
const { isOpen, onOpen, onClose } = useDisclosure()
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
        bg={"#6CB0A8"}
        padding={"10px"}
      >
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
          <Text fontSize={"1.3rem"}>Sign Up</Text>
        </NavLink>
        {/* {token && auth ? ( */}
          <Flex>
            <Menu>
              <MenuButton >
                <Text fontSize={"1.3rem"}>{userDetails.name?userDetails.name : "User"}</Text>
              </MenuButton>
              <MenuList padding={"20px"} boxShadow={"xl"}>
                <MenuItem
                  borderRadius={"2px"}
                  _hover={{
                    bg: "#4DB6AC"
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
                  dispatch({type:USER_LOGOUT_SUCCESS})
                    navigate("/");
                  }}
                >
                  Sign out
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        {/* ) : ( */}
          <NavLink
            to={"/login"}
            style={({ isActive }) => {
              return isActive ? activeLinkStyle : defaultLinkStyle;
            }}
            end
          >
            <Text fontSize={"1.3rem"}>Login</Text>
          </NavLink>
    <HStack>
      {/* <FcSearch/> */}
     <Input type="search"  onClick={onOpen} onChange={onOpen} placeholder="write coin name..." />

{
  isOpen && <SearchBar  isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
}


    </HStack>



          </Flex>
    );
  };