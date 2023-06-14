import {
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useDisclosure,
    useToast,
  } from "@chakra-ui/react";
  import { useContext } from "react";
  import { NavLink, useNavigate } from "react-router-dom";
//   import { AuthContext } from "../context/AuthContext";
  
  export const Navbar = () => {
    const { isOpen } = useDisclosure();
    const toast = useToast();
    const navigate = useNavigate();
    const defaultLinkStyle = { color: "black" };
    const activeLinkStyle = {
      color: "#08313A",
      textDecoration: "underline",
      fontWeight: "500",
    };
  // const { logout, name, token, auth } = useContext(AuthContext);
    //   console.log(name);
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
              <MenuButton isOpen={isOpen}>
                <Text fontSize={"1.3rem"}>{"name"}</Text>
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
                  //  logout();
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
        {/* )} */}
  
        <NavLink
          to={"/notes"}
          style={({ isActive }) => {
            return isActive ? activeLinkStyle : defaultLinkStyle;
          }}
          end
        >
          <Text fontSize={"1.3rem"}>Notes</Text>
        </NavLink>
      </Flex>
    );
  };