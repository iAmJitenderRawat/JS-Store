import { Box, Divider, Heading, Link } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export const Sidebar = () => {

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => setData(res.data))
      .catch((err) => console.log("error:", err));
  });
  return (
    <Box>
      <Heading p={2}>Categories</Heading>
      <Divider orientation="horizontal" border={"2px"} />
      <Box>
        {data &&
          data.map((item, i) => {
            return (
              <Box key={i} className={"categoryItems"}>
                <Link to={`/category/${item}`} fontSize={"lg"}>
                  {item}
                </Link>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};
