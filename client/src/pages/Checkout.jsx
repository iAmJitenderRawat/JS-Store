import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { AiTwotoneHome, AiOutlineCreditCard } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../context/slices/cartSlice";

export function Checkout() {
  const Cartproducts = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const toast = useToast();
  const total = Cartproducts.reduce((acc, ele) => {
    return acc + 70 * ele.price;
  }, 0);
  const handlePay = () => {
    setTimeout(() => {
      toast({
        title: "Payment Successful",
        description: "Order Placed",
        position: "top",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      dispatch(reset())
    }, 2000);
  };
  console.log(Cartproducts);
  return (
    <Box>
      <Heading textAlign={"center"}>Checkout</Heading>
      <Box p={5}>
        <Flex justify={"space-between"}>
          <FormControl w={"49%"}>
            <Flex flexDirection={"column"} gap={5}>
              <Flex gap={5}>
                <InputGroup>
                  <InputLeftElement children={<AiOutlineCreditCard />} />
                  <Input placeholder={"Card Number"} />
                </InputGroup>
                <InputGroup>
                  <Input placeholder={"Valid Till"} />
                  <InputRightAddon children={"MM/YY"} />
                </InputGroup>
              </Flex>
              <InputGroup>
                <InputLeftElement children={<AiTwotoneHome />} />
                <Input placeholder={"Street Address"} />
              </InputGroup>
              <Input placeholder={"Apt, unit, suite, etc. (optional)"} />
              <Input placeholder="Country" />
              <Flex gap={5}>
                <Input placeholder="City" w={"60%"} />
                <Input placeholder={"State"} w={"25%"} />
                <Input placeholder={"Zip Code"} w={"15%"} />
              </Flex>
            </Flex>
          </FormControl>
          {/* <Divider orientation="vertical" w={"1%"} variant="solid" h={"full"} color={"red.900"} /> */}
          <Box w={"49%"}>
            <Heading textAlign={"center"}>Order Summary</Heading>
            {Cartproducts
              ? Cartproducts?.map((item) => {
                  return (
                    <Flex key={item.id} p={5} gap={5}>
                      <Image src={item.thumbnail} w={100} />
                      <Box>
                        <Text>{item.title}</Text>
                        <Text>₹ {70 * item.price}</Text>
                      </Box>
                    </Flex>
                  );
                })
              : null}
            <Heading>
              {Cartproducts.length > 0 ? "Total: ₹" + " " + total : null}
            </Heading>
            <Center>
              <Button bg={"green.400"} color={"white"} onClick={handlePay}>
                Pay
              </Button>
            </Center>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
