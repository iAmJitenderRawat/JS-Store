import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../context/slices/cartSlice";
import { getCategories } from "../context/slices/categogiesSlice";
import { Link } from "react-router-dom";
import { EmptyCart } from "./EmptyCart";
import { useState } from "react";

export const Cart = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category);
  const Cartproducts = useSelector((state) => state.cart);

  const [qty, setQty] = useState(1);

  const toast = useToast();

  const handleRemove = (productId) => {
    dispatch(remove(productId));
    toast({
      title: "Item removed",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const incQty = (productId) => {
    const exist = Cartproducts.find((item) => item.id === productId);
    if (exist) {
      setQty((qty) => qty + 1);
    }
  };

  const decQty = (productId) => {
    const exist = Cartproducts.find((item) => item.id === productId);
    if (exist) {
      setQty((qty) => qty - 1);
    }
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  console.log(Cartproducts);
  return (
    <Box>
      <HStack p={2}>
        <Box className="left">
          <Heading mb={"3px"}>Categories</Heading>
          <Divider orientation="horizontal" />
          {categories?.data?.map((item, i) => {
            return (
              <Box key={i} className={"categoryItems"}>
                <Link to={`/category/${item}`}>{item}</Link>
              </Box>
            );
          })}
        </Box>
        {Cartproducts.length > 0 ? (
          <Box className="right">
            <Heading>Cart Items</Heading>
            <Grid templateColumns={"repeat(3,1fr)"} gap={10}>
              {Cartproducts.map((product) => {
                return (
                  <GridItem
                    key={product.id}
                    className={"itemCard"}
                    style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    borderRadius={10}
                    p={5}
                  >
                    <Image
                      className="image"
                      src={product.thumbnail}
                      alt={product.title}
                      w={"200px"}
                      h={"200px"}
                    />
                    <Heading fontSize="md">Title: {product.title}</Heading>
                    <Heading fontSize={"md"}>
                      Price: ₹ {70 * product.price}
                    </Heading>
                    <Flex justify={"space-between"} align={"center"}>
                      <Flex>
                        <Button
                          bg={"blue.400"}
                          onClick={() => decQty(product.id)}
                        >
                          -
                        </Button>
                        <Text p={"5px"}>{qty}</Text>
                        <Button
                          bg={"blue.400"}
                          onClick={() => incQty(product.id)}
                        >
                          +
                        </Button>
                      </Flex>
                      <Button
                        bg={"red.400"}
                        onClick={() => handleRemove(product.id)}
                      >
                        Remove
                      </Button>
                    </Flex>
                  </GridItem>
                );
              })}
            </Grid>
            <Box m={"20px 0"} p={"50px"}>
              <Box className={"itemCard"}>
                <TableContainer p={"30px"} borderRadius={"20px"}>
                  <Table size="sm">
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Qty</Th>
                        <Th isNumeric>Price</Th>
                      </Tr>
                    </Thead>
                    {Cartproducts.map((product) => {
                      return (
                        <Tbody key={product.id}>
                          <Tr>
                            <Td>{product.title}</Td>
                            <Td>
                              {/* <Flex align={"center"}> */}
                              {/* <Button onClick={() => handleQty(1)}>+</Button> */}
                              <Text p={"5px"}>{qty}</Text>
                              {/* <Button onClick={() => handleQty(-1)}>-</Button> */}
                              {/* </Flex> */}
                            </Td>
                            <Td isNumeric>₹ {70 * product.price}</Td>
                          </Tr>
                        </Tbody>
                      );
                    })}
                  </Table>
                </TableContainer>
                <Flex justify={"flex-end"} p={"30px"}>
                  <Heading mr={"30px"}>Grand Total:</Heading>
                  <Heading>
                    ₹{" "}
                    {Cartproducts.reduce((acc, ele) => {
                      return acc + 70 * ele.price;
                    }, 0)}
                  </Heading>
                </Flex>
              </Box>
              <Flex justify={"flex-end"} m={"10px 0"}>
                <Link to={"/checkout"}>
                  <Button bg={"green.400"} color={"white"}>
                    Checkout
                  </Button>
                </Link>
              </Flex>
            </Box>
          </Box>
        ) : (
          <EmptyCart />
        )}
      </HStack>
    </Box>
  );
};
