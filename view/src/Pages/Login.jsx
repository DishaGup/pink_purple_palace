
//import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Flex,
  HStack,
  Text,
  Center,
  useToast,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
const initial = {
  email: "",
  pass: "",
};

export const Login = () => {
  const [showpass1, setShowpass1] = useState(false);
  const [formData, setFormData] = useState(initial);
  let [loading, setLoading] = useState(false);
  const location = useLocation();
  // console.log(location.state)
  const navigate = useNavigate();
  //const { login } = useContext(AuthContext);
  // console.log(isAdminAuth);
  const toast = useToast();
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    setLoading(true);
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/login`,
        formData
      );
      // console.log(response.data.token);
      if (response.data.token && response.data.user) {
        setLoading(false);
      //  login(response.data.token, response.data.user);
        setFormData(initial);
        toast({
          title: "Login Successfull",
          description: `Welcome ${response.data.user} 🤖`,
          position: "top",
          status: "success",
          variant: "top-accent",
          duration: 2000,
          isClosable: true,
        });
        navigate("/notes");
      } else {
        setLoading(false);
        toast({
          title: "Invalid Credentials",
          position: "top",
          status: "error",
          variant: "top-accent",
          duration: 2000,
          isClosable: true,
        });
      }
      //   navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast({
        title: "Server Error",
        position: "top-right",
        status: "error",
        variant: "top-accent",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <Box height={"100vh"} padding={"20px"} backgroundColor={"#F3E5F5"}>
      <Box
        margin={"80px auto"}
        backgroundColor={"white"}
        width={{ sm: "90vw", md: "80vw", lg: "40vw" }}
        borderRadius={"5px"}
        boxShadow={"md"}
        padding={"20px"}
      >
        <Center>
          <Text as={"h2"} fontWeight={"500"} fontSize={"1.5rem"}>
            Login
          </Text>
        </Center>

        <form onSubmit={handleSubmit}>
          <Flex
            flexDirection={"column"}
            gap={"20px"}
            padding={{ sm: "50px", md: "50px", lg: "40px" }}
          >
            <FormControl isRequired>
              <SimpleGrid
                margin={"auto"}
                gridTemplateColumns={"repeat(2,1fr)"}
                alignItems={"center"}
              >
                <FormLabel>
                  <Text as={"span"}>Email</Text>
                </FormLabel>
                <Input
                  border={"1px dotted gray"}
                  type={"text"}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={"Email"}
                ></Input>
              </SimpleGrid>
            </FormControl>

            <FormControl isRequired>
              <SimpleGrid
                gridTemplateColumns={"repeat(2,1fr)"}
                alignItems={"center"}
              >
                <FormLabel>
                  <Text as={"span"}>Password</Text>
                </FormLabel>
                <HStack>
                  <Input
                    name="pass"
                    border={"1px dotted gray"}
                    placeholder="Password"
                    value={formData.pass}
                    onChange={handleChange}
                    type={showpass1 ? "text" : "password"}
                  ></Input>
                  <Button onClick={() => setShowpass1((prev) => !prev)}>
                  {/* //  {showpass1 ? <ViewOffIcon /> : <ViewIcon />} */}
                  </Button>
                </HStack>
              </SimpleGrid>
            </FormControl>

            <FormControl>
              <Stack
                width={"50%"}
                margin={"auto"}
                spacing={10}
                mt={"30px"}
                pt={2}
              >
                {loading ? (
                  <Button
                    type={"submit"}
                    variant="outline"
                    border={"1px solid #F06292"}
                    isLoading
                    loadingText="Logging In"
                    size="lg"
                    bg={"#F06292"}
                    color={"white"}
                    borderRadius="5px"
                    _hover={{
                      bg: "#F06292",
                      color: "white",
                    }}
                  >
                    Login
                  </Button>
                ) : (
                  <Button
                    type={"submit"}
                    variant="outline"
                    size="lg"
                    border={"1px solid #F06292"}
                    color={"#F06292"}
                    borderRadius="5px"
                    _hover={{
                      bg: "#F06292",
                      color: "white",
                    }}
                  >
                    Login
                  </Button>
                )}
              </Stack>
            </FormControl>
            <Box>
              <Text>
                Don't have an account?{" "}
                <Link style={{ textDecoration: "underline" }} to={"/register"}>
                  Register{" "}
                </Link>
              </Text>
            </Box>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};