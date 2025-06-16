// App layout
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

import MenuBar from "./MenuBar";

const Layout = () => {
  return (
    <Box>
      <MenuBar />
      <Container className="layout" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
};
export default Layout;
