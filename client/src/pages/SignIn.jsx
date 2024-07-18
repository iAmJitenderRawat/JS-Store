import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

export function SignIn() {
  const arrUsers = JSON.parse(localStorage.getItem("usersLS")) || [];
  const { isAuth, setAuth } = useContext(AuthContext);
  const navigate=useNavigate();
  const toast = useToast();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleClick = () => {
    if (arrUsers.length > 0) {
      arrUsers.forEach((element) => {
        if (
          element.email === userData.email &&
          element.password === userData.password
        ) {
          toast({
            title: "Login Successfull",
            position: "top",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
          localStorage.setItem("isAuth", JSON.stringify(true));
          navigate("/cart");
          window.location.reload();
        }
        else {
          toast({
            title: "Login Failed",
            description: "Wrong email or password.",
            position: "top",
            status: "error",
            duration: 1000,
            isClosable: true,
          });
        }
      });
    } else {
      toast({
        title: "No user exit",
        description: "Please signup first.",
        position: "top",
        status: "info",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" onChange={handleChange} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" onChange={handleChange} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                onClick={handleClick}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
              Sign In
              </Button>
              <Stack pt={6}>
                <Text align={"center"}>
                  Don't have an account.{" "}
                  <Link to={"/signUp"}>
                    <Text as={"span"} color={"blue.400"}>
                      Create one.
                    </Text>
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
