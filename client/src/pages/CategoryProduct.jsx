import {
  Box,
  Divider,
  Text,
  Heading,
  HStack,
  VStack,
  Image,
  Flex,
  Grid,
  GridItem,
  Card,
  CardBody,
  Stack,
  CardFooter,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../context/slices/categogiesSlice";
import { Link, useParams } from "react-router-dom";
import {
  getCategoriesProducts,
  STATUSES,
} from "../context/slices/productsSlice";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useCart } from "react-use-cart";

export function CategoryProduct() {
  const { addItem } = useCart();
  const categories = useSelector((state) => state.category);
  const { data: products, status } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const toast = useToast();

  let { pages } = useParams();
  console.log(pages);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategoriesProducts(pages));
  }, [dispatch, pages]);

  const handleAdd = (product) => {
    addItem(product);
    toast({
      title: "Added to cart",
      position: "bottom-left",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  // console.log(categories)
  console.log(products);

  if (status === STATUSES.LOADING) {
    return (
      <Flex justifyContent={"center"} m={"300px 0"}>
        <Heading textAlign={"center"}>
          <Spinner />
          Loading....
        </Heading>
      </Flex>
    );
  }

  if (status === STATUSES.ERROR) {
    return (
      <Box>
        <Heading>ERROR 404</Heading>
        <Heading>Something went wrong!</Heading>
      </Box>
    );
  }
  return (
    <Box m={"20px 0"}>
      <Flex
        className="center"
        direction={{
          xl: "row",
          lg: "row",
          md: "row",
          sm: "column",
          base: "column",
        }}
      >
        <Breadcrumb
          spacing="8px"
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">{pages}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading>
          Category:{" "}
          <Text as={"span"} fontWeight={400}>
            {pages}
          </Text>
        </Heading>
        <Heading>
          {products.length}
          <Text as={"span"} fontWeight={400}>
            {" "}
            products
          </Text>
        </Heading>
      </Flex>
      <HStack>
        <Box
          className="left"
          w={{
            xl: "20%",
            lg: "20%",
            md: "30%",
            sm: "40%",
            base: "40%",
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
        <Box
          className="right"
          w={{
            xl: "80%",
            lg: "80%",
            md: "70%",
            sm: "60%",
            base: "60%",
          }}
        >
          <VStack p={5}>
            <Grid
              templateColumns={{
                xl: "repeat(3, 1fr)",
                lg: "repeat(3, 1fr)",
                md: "repeat(2, 1fr)",
                sm: "repeat(1, 1fr)",
              }}
              gap={"20px"}
            >
              {products.map((item) => {
                return (
                  <GridItem key={item.id}>
                    <Card maxW="sm" className="itemCard">
                      <CardBody>
                        <Link to={`/products/${item.id}`}>
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            borderRadius="lg"
                            className={"image"}
                          />
                        </Link>
                        <Stack mt="6" spacing="3">
                          <Heading fontSize={"md"}>Brand: {item.brand}</Heading>
                          <Text>
                            <Heading fontSize={"md"} display={"inline-block"}>
                              Title:
                            </Heading>{" "}
                            {item.title.slice(0, 25)}...
                          </Text>
                          <Text>
                            <Heading fontSize={"md"} display={"inline-block"}>
                              Description:
                            </Heading>{" "}
                            {item.description.slice(0, 45)}...
                          </Text>
                          <Flex justify={"space-between"}>
                            <Text color="blue.600" fontSize="xl">
                              Price: ₹ {70 * item.price}
                            </Text>
                            <Text color="blue.600" fontSize="xl">
                              Rating: {item.rating}
                            </Text>
                          </Flex>
                        </Stack>
                      </CardBody>
                      <Divider />
                      <CardFooter display={"flex"} justify="space-between">
                        <Button
                          variant="solid"
                          colorScheme="blue"
                          onClick={() => handleAdd(item)}
                        >
                          Add to cart
                        </Button>
                        <Box fontSize="xl">
                          {item.stock > 0 ? (
                            <Text>In Stock</Text>
                          ) : (
                            <Text>Out of Stock</Text>
                          )}
                        </Box>
                      </CardFooter>
                    </Card>
                  </GridItem>
                );
              })}
            </Grid>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
}
