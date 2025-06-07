import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/logo-v2.png";

const AppLogo = ({ sx = {} }) => {
  const navigate = useNavigate();

  return (
    <Box
      component='img'
      src={logo}
      alt="App Logo"
      onClick={() => navigate("/")}
      sx={{
        width: 100,
        height: 100,
        cursor: "pointer",
        ...sx
      }}
    />
  );
};

export default AppLogo;