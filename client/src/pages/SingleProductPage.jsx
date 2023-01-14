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
  ButtonGroup,
  Button,
  Grid,
  GridItem,
  VStack,
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

export function SingleProductPage() {
  const categories = useSelector((state) => state.category);
  const { data: product, status } = useSelector((state) => state.SingleProduct);
  const dispatch = useDispatch();

  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSingleProducts(id));
  }, [dispatch, id]);

  // console.log(categories)

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
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
                <Link to={`/category/${item}`}>{item}</Link>
              </Box>
            );
          })}
        </Box>
        <Box className="right">
          <Card w={"80%"} m={"auto"}>
            <CardBody>
              <HStack align={"center"}>
                <VStack>
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    borderRadius="lg"
                    w={"250px"}
                    m={"auto"}
                    h={"250px"}
                  />
                  <HStack>
                    <Flex gap={2}>
                      {product?.images?.map((item) => {
                        return (
                          <Image
                            src={item}
                            w={"100px"}
                            h={"100px"}
                            borderRadius={5}
                          />
                        );
                      })}
                    </Flex>
                  </HStack>
                </VStack>
                <Stack p={10}>
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
                      Price: ₹ {80 * product.price}
                    </Text>
                    <Text color="blue.600" fontSize="xl">
                      Rating: {product.rating}
                    </Text>
                  </Flex>
                </Stack>
              </HStack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="blue">
                  Buy now
                </Button>
                <Button variant="ghost" colorScheme="blue">
                  Add to cart
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </Box>
      </HStack>
    </Box>
  );
}
