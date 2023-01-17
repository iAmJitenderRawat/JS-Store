import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
  Heading,
  useToast,
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { DrawerLeft } from "./DrawerLeft";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
// import { setAuth } from "../context/slices/authSlice";

export function Navbar() {
  const userData = JSON.parse(localStorage.getItem("userDataLS")) || {};
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("blue.500", "gray.100");
  const color = useColorModeValue("white", "black");
  const Cartproducts = useSelector((state) => state.cart);
  // const dispatch = useDispatch();
  // const { isAuth } = useSelector((state) => state.auth);
  const { isAuth, setAuth } = useContext(AuthContext);
  const toast=useToast();
  console.log(isAuth);

  const handleClick = () => {
    setAuth(false)
    toast({
      title: "LogOut Successfull",
      position: "top",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  return (
    <>
      <Box className="navbar" bg={bg} color={color} p={3}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex align="center" justify={"space-between"}>
            <DrawerLeft />
            <Link to={"/"}>
              <Image src="/Images/JS-Store.gif" w={"50px"} m={"0 10px"} />
            </Link>
            <Link to={"/"}>
              <Heading m={"0 5px"}>JS Store</Heading>
            </Link>
          </Flex>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            bg={bg}
            color={color}
          >
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode} bg={"white"} color={"black"}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Link to={"/cart"}>
                <Flex alignItems={"center"}>
                  <AiOutlineShoppingCart size={"36px"} />
                  <Box className="cartItem">{Cartproducts.length}</Box>
                </Flex>
              </Link>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Box>
                    {(isAuth === true && userData.imageUrl) ? (
                      <Image
                        src={userData.imageUrl}
                        w={"40px"}
                        borderRadius={"50%"}
                      />
                    ) : (
                      <FaUserCircle size={"30px"} color={color} />
                    )}
                  </Box>
                </MenuButton>
                {isAuth ? (
                  <MenuList alignItems={"center"} bg={color} color={bg}>
                    <br />
                    <Center>
                      <Image src={userData.imageUrl} borderRadius={"50%"} />
                    </Center>
                    <br />
                    <Center>
                      {isAuth ? (
                        <Text>
                          {userData.firstName} {userData.lastName}
                        </Text>
                      ) : (
                        <Text>Username</Text>
                      )}
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem
                      _hover={{ background: bg, color: color }}
                      bg={color}
                      color={bg}
                    >
                      Account Settings
                    </MenuItem>
                    <MenuItem
                      _hover={{ background: bg, color: color }}
                      bg={color}
                      color={bg}
                    >
                      <Button onClick={handleClick}>Logout</Button>
                    </MenuItem>
                  </MenuList>
                ) : (
                  <MenuList alignItems={"center"} bg={color} color={bg}>
                    <Link to={"/signUp"}>
                      <MenuItem
                        _hover={{ background: bg, color: color }}
                        bg={color}
                        color={bg}
                      >
                        Sign Up
                      </MenuItem>
                    </Link>
                    <Link to={"/signIn"}>
                      <MenuItem
                        _hover={{ background: bg, color: color }}
                        bg={color}
                        color={bg}
                      >
                        Sign In
                      </MenuItem>
                    </Link>
                  </MenuList>
                )}
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
