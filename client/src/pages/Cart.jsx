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
import { getCategories } from "../context/slices/categogiesSlice";
import { Link } from "react-router-dom";
import { EmptyCart } from "./EmptyCart";
import { useCart } from "react-use-cart";

export const Cart = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category);
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

  const toast = useToast();

  const handleRemove = (productId) => {
    removeItem(productId);
    toast({
      title: "Item removed",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Box>
      <HStack>
        <Box
          className="left"
          w={{
            xl: "20%",
            lg: "20%",
            md: "30%",
            sm: "40%",
            base: "50%",
          }}
        >
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
        {items.length > 0 ? (
          <Box
          className="right"
          w={{
            xl: "80%",
            lg: "80%",
            md: "70%",
            sm: "60%",
            base: "50%",
          }}
          >
          <Heading textAlign={"center"}>Cart Items</Heading>
            <Grid
              templateColumns={{
                xl: "repeat(4, 1fr)",
                lg: "repeat(3, 1fr)",
                md: "repeat(2, 1fr)",
                sm: "repeat(1, 1fr)",
              }}
              gap={5}
              m={5}
            >
              {items.map((product) => {
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
                    <Flex justify={"space-between"} align={"center"} gap={5}>
                      <Flex>
                        <Button
                          bg={"blue.400"}
                          onClick={() =>
                            updateItemQuantity(product.id, product.quantity - 1)
                          }
                        >
                          -
                        </Button>
                        <Text p={"5px"}>{product.quantity}</Text>
                        <Button
                          bg={"blue.400"}
                          onClick={() =>
                            updateItemQuantity(product.id, product.quantity + 1)
                          }
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
          </Box>
        ) : (
          <EmptyCart />
        )}
      </HStack>
      {items.length > 0 ? (
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
                {items.map((product) => {
                  return (
                    <Tbody key={product.id}>
                      <Tr>
                        <Td>{product.title}</Td>
                        <Td>
                          {/* <Flex align={"center"}> */}
                          {/* <Button onClick={() => handleQty(1)}>+</Button> */}
                          <Text p={"5px"}>{product.quantity}</Text>
                          {/* <Button onClick={() => handleQty(-1)}>-</Button> */}
                          {/* </Flex> */}
                        </Td>
                        <Td isNumeric>
                          ₹ {70 * product.price * product.quantity}
                        </Td>
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
                {cartTotal*70}
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
      ) : null}
    </Box>
  );
};
