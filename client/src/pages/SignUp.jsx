import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { SignUpSchema } from "../schema/SignUpSchema";

export function SignUp() {
  const arrUsers = JSON.parse(localStorage.getItem("usersLS")) || [];
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState(arrUsers);
  const [button, setButton] = useState(false);
  const toast = useToast();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      validationSchema: SignUpSchema,
      onSubmit: (values) => {
        // alert(JSON.stringify(values, null, 2));
        if (users.length === 0) {
          setUsers([...users, values]);
          setButton(!button);
          toast({
            title: "Sign Up Successfull",
            position: "top",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
        } else {
          users.forEach((ele) => {
            if (ele.email === values.email) {
              toast({
                title: "User already exist.",
                position: "top",
                status: "info",
                duration: 1000,
                isClosable: true,
              });
            } else {
              setUsers([...users, values]);
              setButton(!button);
              toast({
                title: "Sign Up Successfull",
                position: "top",
                status: "success",
                duration: 1000,
                isClosable: true,
              });
            }
          });
        }
      },
    });
  localStorage.setItem("usersLS", JSON.stringify(users));

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.firstName && touched.firstName ? (
                      <Text color={"red.400"} fontSize={"sm"}>
                        {errors.firstName}
                      </Text>
                    ) : null}
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.lastName && touched.lastName ? (
                      <Text color={"red.400"} fontSize={"sm"}>
                        {errors.lastName}
                      </Text>
                    ) : null}
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <Text color={"red.400"} fontSize={"sm"}>
                    {errors.email}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && touched.password ? (
                  <Text color={"red.400"} fontSize={"sm"}>
                    {errors.password}
                  </Text>
                ) : null}
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  isDisabled={button}
                  type="submit"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
            </form>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link to={"/signIn"}>
                  <Text as={"span"} color={"blue.400"}>
                    Login
                  </Text>
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
