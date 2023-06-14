
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
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
import { useDispatch } from "react-redux";
import { loginUserRequest } from "../Redux/action";


const initial = {
  email: "",
  password: "",
};

export const Login = () => {
  const [showpass1, setShowpass1] = useState(false);
  const [formData, setFormData] = useState(initial);
  let [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch=useDispatch()
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
dispatch(loginUserRequest(formData)).then((res)=>{
  toast({
    title: "Login Successfull",
    description: `Welcome ${res.data.message} `,
    position: "top",
    status: "success",
    variant: "top-accent",
    duration: 2000,
    isClosable: true,
  });
 navigate("/")
}).catch((err)=>{
  console.log(err)
  toast({
    title: "Server Error",
    position: "top-right",
    status: "error",
    variant: "top-accent",
    duration: 2000,
    isClosable: true,
  });
})
  setFormData(initial)


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
                  type={"email"}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={"Enter Your Email"}
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
                    name="password"
                    border={"1px dotted gray"}
                    placeholder="Type Password"
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

            <FormControl>
              <Stack
                width={"50%"}
                margin={"auto"}
                spacing={10}
                mt={"30px"}
                pt={2}
              >
              
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