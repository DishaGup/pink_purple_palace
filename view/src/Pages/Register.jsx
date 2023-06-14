import { useState } from "react";
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import {FcCheckmark,FcCancel} from 'react-icons/fc'
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
  FormHelperText,
  FormErrorMessage,
  useToast,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const initialState = {
  name: "",
  age: "",
  password: "",
  email: "",
  confirmpassword: "",
};
export const Register = () => {
  // console.log(process.env.REACT_APP_BACKEND_URL)
  const [formData, setData] = useState(initialState);
  const [showpass1, setShowpass1] = useState(false);
  const [showpass2, setShowpass2] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const handleChange = (e) => {
    let { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    if (formData.password !== formData.confirmpassword) {
  return alert("chekc pass")
    }
    console.log(formData)
    //   let obj = {
    //     name: formData.name,
    //     email: formData.email,
    //     username :formData.username,
    //     password: formData.password,
    //   };

    //   setLoading(true);
    //   try {
    //     await axios.post(
    //       `${process.env.REACT_APP_BACKEND_URL}/user/register`,
    //       obj
    //     );
    //     // console.log(response);
    //     setLoading(false);
    //     toast({
    //       title: "Account Created",
    //       position: "top",
    //       description: "We've created Account for you.",
    //       status: "success",
    //       variant: "top-accent",
    //       duration: 3000,
    //       isClosable: true,
    //     });
    //     setData(initialState);
    //     navigate("/login");
    //   } catch (error) {
    //     console.log(error);
    //     setLoading(false);
    //     toast({
    //       title: "Error in Creating Your Account",
    //       position: "top",
    //       status: "error",
    //       variant: "top-accent",
    //       duration: 3000,
    //       isClosable: true,
    //     });
    //   }
    //   setError(false);
    // } else {
    //   setError(true);
    
  };






  return (
    <Box backgroundColor={"#F3E5F5"} padding={"20px"}>
      <Box
        border={"1px solid white"}
        margin={"auto"}
        mt={{ sm: "5%", md: "5%", lg: "3%" }}
        width={{ sm: "90vw", md: "80vw", lg: "45vw" }}
        borderRadius={"5px"}
        boxShadow={"md"}
        backgroundColor={"white"}
      >
        <Center mt={"20px"}>
          <Text as={"h2"} fontWeight={"500"} fontSize={"1.5rem"}>
            Create New Account
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
                  <Text as={"span"}>Name</Text>
                </FormLabel>
                <Input
                  border={"1px dotted gray"}
                  name="name"
                  type={"text"}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={"Enter Your Name"} />
                
              </SimpleGrid>
            </FormControl>


            <FormControl isRequired>
              <SimpleGrid
                gridTemplateColumns={"repeat(2,1fr)"}
                alignItems={"center"}
              >
                <FormLabel>
                  <Text as={"span"}>Email</Text>{" "}
                
                </FormLabel>
                
                <Input
                  placeholder="Email"
                  name="email"
                  border={"1px dotted gray"}
                  type={"email"}
                  value={formData.email}
                  onChange={handleChange} />
                       
              </SimpleGrid>
              <FormHelperText align='left'>We'll never share your email.</FormHelperText>
            </FormControl>


            <FormControl isRequired>
              <SimpleGrid
                gridTemplateColumns={"repeat(2,1fr)"}
                alignItems={"center"}
              >
                <FormLabel>
                  <Text as={"span"}>UserName</Text>
                </FormLabel>
                <Input
                  type={"text"}
                  name="username"
                  border={"1px dotted gray"}
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Write user name" />
              
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
                    border={"1px dotted gray"}
                    placeholder="Type Strong Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type={showpass1 ? "text" : "password"}
                  ></Input>
                  <Button onClick={() => setShowpass1((prev) => !prev)}>
                    {showpass1 ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </Button>
                </HStack>
              </SimpleGrid>
            </FormControl>
            <FormControl isRequired isInvalid={error}>
              <SimpleGrid
                gridTemplateColumns={"repeat(2,1fr)"}
                alignItems={"center"}
              >
                <FormLabel>
                  <Text as={"span"}>Confirm Password</Text>
                </FormLabel>
                <HStack>
                  <Input
                    border={"1px dotted gray"}
                    name="confirmpassword"
                    placeholder="Confirm Password"
                    value={formData.confirmpassword}
                    onChange={handleChange}
                    type={showpass2 ? "text" : "password"} />
                  
                  <Button >
                   { formData.password==formData.confirmpassword ?  <FcCheckmark boxSize={'14px'}  /> : <FcCancel boxSize={'14px'}  /> }
                  </Button>
                </HStack>
              </SimpleGrid>
              {!error ? (
                <FormHelperText>
                  Please make sure password matches..
                </FormHelperText>
              ) : (
                <FormErrorMessage>*Password is not matching</FormErrorMessage>
              )}
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
                    loadingText="Registering..."
                    size="lg"
                    bg={"#F06292"}
                    color={"white"}
                    borderRadius="5px"
                    _hover={{
                      bg: "#F06292",
                      color: "white",
                    }}
                  >
                    Register
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
                    Register
                  </Button>
                )}
              </Stack>
            </FormControl>
            <Box>
              <Text>
                Already have an account?{" "}
                {/* <Link style={{ textDecoration: "underline" }} to={"/login"}>
                  Login{" "}
                </Link> */}
              </Text>
            </Box>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};