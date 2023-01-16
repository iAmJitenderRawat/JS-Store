import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useContext } from "react";
import { useRef } from "react";
import { AuthContext } from "./AuthContext";
import { FaUserCircle } from "react-icons/fa";
// import { useEffect } from "react";

export function DrawerLeft() {
  const arrUsers = JSON.parse(localStorage.getItem("usersLS")) || [];
  const userData = JSON.parse(localStorage.getItem("userDataLS")) || {};
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState("");
  const btnRef = useRef(null);
  const { isAuth } = useContext(AuthContext);

  const handleImage = () => {
    // localStorage.setItem("imageLS",JSON.stringify(image));
    arrUsers.forEach((element) => {
      if (element.email === userData.email) {
        element.imageUrl = image;
        userData.imageUrl = image;
      }
    });
    localStorage.setItem("usersLS", JSON.stringify(arrUsers));
  };

  // useEffect(()=>{
  //   handleImage()
  // },[image])

  return (
    <>
      <Button
        _hover={{ bg: "black", color: "white" }}
        bg={"white"}
        color={"black"}
        as={IconButton}
        ref={btnRef}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          {isAuth ? (
            <DrawerHeader>Account Details</DrawerHeader>
          ) : (
            <DrawerHeader>
              Please Sign Up or Sign In to explore more features
            </DrawerHeader>
          )}

          {isAuth ? (
            <DrawerBody>
              <Center flexDirection={"column"}>
                {image ? (
                  <Image
                    src={image}
                    borderRadius={"50%"}
                    alt={userData.firstName}
                  />
                ) : null}
                <Text>
                  Name: {userData.firstName} {userData.lastName}
                </Text>
                <Text>Email: {userData.email}</Text>
                <InputGroup m={"10px 0"}>
                  <InputLeftAddon children={<FaUserCircle />} />
                  <Input
                    placeholder="Profile image url"
                    name="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </InputGroup>
              </Center>
            </DrawerBody>
          ) : null}

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleImage}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
