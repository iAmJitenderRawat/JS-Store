import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { AiTwotoneHome, AiOutlineCreditCard } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";

export function Checkout() {
  const toast = useToast();
  const navigate=useNavigate();
  const {
    isEmpty,
    cartTotal,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    emptyCart,
    metadata,
  } = useCart();

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
      emptyCart()
    }, 2000);
    setTimeout(()=>{
      navigate("/");
    },3000)
  };

  return (
    <Box>
      <Heading textAlign={"center"}>Checkout</Heading>
      <Box p={5}>
        <Flex justify={"space-between"}>
          <FormControl w={"49%"}>
            <Heading textAlign={"center"}>Card & User Details</Heading>
            <Flex flexDirection={"column"} gap={5} p={5}>
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
            <Link to={"/cart"}>
              <Button bg={"red.400"} color={"white"} m={5}>
                ← Back
              </Button>
            </Link>
          </FormControl>
          {/* <Divider orientation="vertical" w={"1%"} variant="solid" h={"full"} color={"red.900"} /> */}
          <Box w={"49%"}>
            <Heading textAlign={"center"}>Order Summary</Heading>
            {items
              ? items?.map((item) => {
                  return (
                    <Box>
                      <Flex key={item.id} p={5} gap={5}>
                        <Image src={item.thumbnail} w={100} />
                        <Box>
                          <Text>{item.title}</Text>
                          <Text>
                            {item.quantity}
                            {" * ₹ "}
                            {70 * item.price} {"= ₹ "}{" "}
                            {70 * item.price * item.quantity}
                          </Text>
                        </Box>
                      </Flex>
                      <Divider orientation="horizontal" />
                    </Box>
                  );
                })
              : null}
            <Heading>
              {items.length > 0
                ? "Total: ₹" + " " + (70 * cartTotal)?.toFixed(2)
                : null}
            </Heading>
            <Center p={5}>
              <Button
                bg={"green.400"}
                w={"full"}
                color={"white"}
                onClick={handlePay}
              >
                Pay
              </Button>
            </Center>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
