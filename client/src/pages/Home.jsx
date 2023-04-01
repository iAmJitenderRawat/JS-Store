import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import { Grid, GridItem, Image, Box, Heading, Spinner, Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../context/slices/categogiesSlice";
import { STATUSES } from "../context/slices/categogiesSlice";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export function Home() {
  const dispatch = useDispatch();
  const { data: categories, status } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

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

  console.log(categories);
  return (
    <div>
      <Grid
        templateColumns={{
          xl: "repeat(5, 1fr)",
          lg: "repeat(5, 1fr)",
          md: "repeat(4, 1fr)",
          sm: "repeat(3, 1fr)",
        }}
        gap={5}
        p={5}
      >
        {categories?.map((item, i) => {
          return (
            <Link to={`/category/${item}`}>
              <GridItem className="card" key={i}>
                {item}
              </GridItem>
            </Link>
          );
        })}
      </Grid>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image src={"/Images/carousel1.jpg"} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={"/Images/carousel2.jpg"} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={"/Images/carousel3.jpg"} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={"/Images/carousel4.jpg"} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={"/Images/carousel5.jpg"} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={"/Images/carousel6.jpg"} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={"/Images/carousel7.jpg"} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={"/Images/carousel8.jpg"} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={"/Images/carousel9.jpg"} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={"/Images/carousel10.jpg"} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={"/Images/carousel11.jpg"} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={"/Images/carousel12.jpg"} />
        </SwiperSlide>
      </Swiper>
      <Box>
        <Image src="/Images/image1.jpg" />
      </Box>
      <Grid className="grid">
        <GridItem>
          <Image src={"/Images/grid1.jpg"} w={"100%"} />
        </GridItem>
        <GridItem>
          <Image src={"/Images/grid2.jpg"} w={"100%"} />
        </GridItem>
        <GridItem>
          <Image src={"/Images/grid3.jpg"} w={"100%"} />
        </GridItem>
        <GridItem>
          <Image src={"/Images/grid4.jpg"} w={"100%"} />
        </GridItem>
        <GridItem>
          <Image src={"/Images/grid5.jpg"} w={"100%"} />
        </GridItem>
        <GridItem>
          <Image src={"/Images/grid6.jpg"} w={"100%"} />
        </GridItem>
        <GridItem>
          <Image src={"/Images/grid7.jpg"} w={"100%"} />
        </GridItem>
        <GridItem>
          <Image src={"/Images/grid8.jpg"} w={"100%"} />
        </GridItem>
        <GridItem>
          <Image src={"/Images/grid9.jpg"} w={"100%"} />
        </GridItem>
        <GridItem>
          <Image src={"/Images/grid10.jpg"} w={"100%"} />
        </GridItem>
        <GridItem>
          <Image src={"/Images/grid11.jpg"} w={"100%"} />
        </GridItem>
        <GridItem>
          <Image src={"/Images/grid12.jpg"} w={"100%"} />
        </GridItem>
        <GridItem>
          <Image src={"/Images/grid13.jpg"} w={"100%"} />
        </GridItem>
        <GridItem>
          <Image src={"/Images/grid14.jpg"} w={"100%"} />
        </GridItem>
      </Grid>
    </div>
  );
}
