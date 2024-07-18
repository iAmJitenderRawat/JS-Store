import {
  Box,
  Divider,
  Heading,
  HStack,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Stack,
  Card,
  CardBody,
  Image,
  Text,
  CardFooter,
  Button,
  Center,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../context/slices/categogiesSlice";
import { Link, useParams } from "react-router-dom";
import {
  getSingleProducts,
  STATUSES,
} from "../context/slices/singleProductSlice";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Rating } from "../components/Rating";
import { useCart } from "react-use-cart";

export function SingleProductPage() {
  const categories = useSelector((state) => state.category);
  const { data: product, status } = useSelector((state) => state.SingleProduct);
  const dispatch = useDispatch();
  const toast = useToast();
const { addItem } = useCart();
  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSingleProducts(id));
  }, [dispatch, id]);

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
      <div>
        <h1>ERROR 404</h1>
        <h2>Something went wrong!</h2>
      </div>
    );
  }
  return (
    <Box>
      <Flex className="center">
        <Breadcrumb
          spacing="8px"
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href={`/category/${product.category}`}>
              {product.category}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">{product.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading>
          Category:{" "}
          <span style={{ fontWeight: "400" }}>{product.category}</span>
        </Heading>
      </Flex>
      <HStack>
        <Box className="left">
          <Heading mb={"3px"}>Categories</Heading>
          <Divider orientation="horizontal" />
          {categories?.data?.map((item, i) => {
            return (
              <Box key={i} className={"categoryItems"}>
                <Link to={`/category/${item.slug}`}>{item.name}</Link>
              </Box>
            );
          })}
        </Box>
        <Box className="right">
          <Card w={"80%"} m={"auto"}>
            <CardBody>
              <Flex justify={"space-between"} p={"10px"} gap={5}>
                <Box>
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    borderRadius="lg"
                    w={"250px"}
                    h={"250px"}
                  />
                </Box>
                <Stack>
                  <Heading size="md">Brand: {product.brand}</Heading>
                  <Text>
                    <Heading as={"h6"} fontSize={"md"} display={"inline-block"}>
                      Title:
                    </Heading>{" "}
                    {product.title}
                  </Text>
                  <Text>
                    <Heading as={"h6"} fontSize={"md"} display={"inline-block"}>
                      Description:
                    </Heading>{" "}
                    {product.description}
                  </Text>
                  <Flex justify={"space-between"}>
                    <Text color="blue.600" fontSize="xl">
                      Price: ₹ {70 * product.price}
                    </Text>
                    <Flex gap={2}>
                      <Text color="blue.600" fontSize="xl">
                        Rating:
                      </Text>
                      <Rating rating={product.rating} />
                    </Flex>
                  </Flex>
                  <Center>
                    <Text fontSize="xl">
                      {product.stock > 0 ? (
                        <Text>In Stock</Text>
                      ) : (
                        <Text>Out of Stock</Text>
                      )}
                    </Text>
                  </Center>
                </Stack>
              </Flex>
              <Box p={"10px"}>
                <Flex gap={2}>
                  {product?.images?.map((item) => {
                    return (
                      <Image
                        className="zoom"
                        src={item}
                        w={"100px"}
                        h={"100px"}
                        borderRadius={5}
                      />
                    );
                  })}
                </Flex>
              </Box>
            </CardBody>
            <Divider />
            <CardFooter>
              <Button
                onClick={() => handleAdd(product)}
                variant="solid"
                colorScheme="blue"
              >
                Add to cart
              </Button>
            </CardFooter>
          </Card>
        </Box>
      </HStack>
    </Box>
  );
}
