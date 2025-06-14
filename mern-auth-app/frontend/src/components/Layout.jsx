// App layout
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

import MenuBar from "./MenuBar";

const Layout = () => {
  return (
    <Box>
      <MenuBar />
      <Container className="layout">
        <Outlet />
      </Container>
    </Box>
  );
};
export default Layout;
