import {
  AccountCircle,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Logout as LogoutIcon,
  Mail as MailIcon,
  Menu as MenuIcon,
  MoreVert as MoreIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useThemeMode } from "../theme/ThemeContext";
import AppLogo from "./AppLogo";
import SearchBar from "./SearchBar";

function MenuBar() {
  // State for desktop profile menu anchor element (null means closed)
  const [anchorElement, setAnchorElement] = useState(null);

  // State for mobile menu anchor element
  const [mobileAnchorElement, setMobileAnchorElement] = useState(null);

  // Get authentication state and functions from AuthContext
  const { isAuthenticated, logout, user } = useAuth();
  console.log(user);

  // React Router hook to navigate programmatically
  const navigate = useNavigate();

  // Get current them mode and toggle function from ThemeContext
  const { mode, toggleMode } = useThemeMode();

  const isMenuOpen = Boolean(anchorElement);
  const isMobileMenuOpen = Boolean(mobileAnchorElement);

  // Open desktop profile menu, set anchor to clicked element
  const handleProfileMenuOpen = (e) => setAnchorElement(e.currentTarget);

  // Open mobile menu, set anchor to clicked element
  const handleMobileMenuOpen = (e) => setMobileAnchorElement(e.currentTarget);

  // Close both desktop and mobile menus by clearing anchors
  const handleMenuClose = () => {
    setAnchorElement(null);
    setMobileAnchorElement(null);
  };

  // Logout user, close menus, and navigate to login page
  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/login");
  };

  // ID for desktop profile menu (for accessibility)
  const menuId = "primary-search-account-menu";

  // Desktop profile menu JSX
  const renderDesktopMenu = (
    <Menu
      anchorEl={anchorElement}
      id={menuId}
      open={isMenuOpen}
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      {/* Show user info if logged in */}
      {user && (
        <MenuItem disabled>
          Signed in as {user?.name || "User"}
        </MenuItem>
      )}

      {/* Profile menu item navigate to dashboard */}
      <MenuItem>
        Profile
      </MenuItem>

      {/* Logout menu item only if authenticated */}
      {isAuthenticated && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
    </Menu>
  );

  // ID for mobile menu (for accessibility)
  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileAnchorElement}
      id={mobileMenuId}
      open={isMobileMenuOpen}
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}>
      {/* Messages menu item with badge */}
      <MenuItem>
        <Tooltip title="Messages">
          <IconButton
            size="large"
            color="inherit">
            <Badge
              badgeContent={4}
              color="error">
              <MailIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <p>Messages</p>
      </MenuItem>

      {/* Notifications menu item with badge */}
      <MenuItem>
        <Tooltip title="Notifications">
          <IconButton
            size="large"
            color="inherit">
            <Badge
              badgeContent={20}
              color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <p>Notifications</p>
      </MenuItem>

      {/* Profile menu item navigates to dashboard */}
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/dashboard");
        }}>
        <IconButton
          size="large"
          color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>

      {/* Dark/Light mode toggle in mobile menu */}
      <MenuItem
        onClick={() => {
          toggleMode();
          handleMenuClose();
        }}>
        <IconButton
          size="large"
          color="inherit">
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <p>{mode === "dark" ? "Light Mode" : "Dark Mode"}</p>
      </MenuItem>

      {isAuthenticated &&
        <MenuItem onClick={handleLogout}>
          <IconButton
            size="large"
            color="inherit">
            <LogoutIcon />
          </IconButton>
          <p>Logout</p>
        </MenuItem>}
    </Menu>
  );

  return (
    // Container box with flex-grow to fill horizontal space
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        color="secondary"
        elevation={1}>
        <Toolbar>
          {/* Hamburger menu icon button (currently no handler, add if needed) */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 1 }}
            onClick={() => {
              // Optional: add menu open logic here
            }}>
            <MenuIcon />
          </IconButton>

          {/* Logo image - clickable, navigates to homepage */}
          <AppLogo
            sx={{
              height: 40,
              width: 40,
              mr: 1,
              display: { xs: "none", sm: "block" }, // Hide on very small screens
              cursor: "pointer",
            }}
          />

          {/* Site name - clickable, navigates to homepage */}
          <Typography
            variant="h6"
            noWrap
            sx={{
              display: { xs: "none", sm: "block" },
              cursor: "pointer",
            }}
            onClick={() => navigate("/")} // Navigate home on click
          >
            Startup
          </Typography>

          {/* Search bar component (custom) */}
          <SearchBar />

          {/* Flexible spacer to push right-side icons to the right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop right-side icons & controls */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" }, // Show on medium+ screens only
              alignItems: "center",
            }}>
            {/* Light/Dark mode toggle button */}
            <Tooltip title="Toggle light/dark mode">
              <IconButton
                size="large"
                color="inherit"
                onClick={toggleMode}
                aria-label="toggle theme mode">
                {mode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </Tooltip>

            {/* Messages icon with badge */}
            <Tooltip title="Messages">
              <IconButton
                size="large"
                color="inherit">
                <Badge
                  badgeContent={4}
                  color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Notifications icon with badge */}
            <Tooltip title="Notifications">
              <IconButton
                size="large"
                color="inherit">
                <Badge
                  badgeContent={17}
                  color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Profile icon button to open menu */}
            <IconButton
              size="large"
              edge="end"
              onClick={handleProfileMenuOpen}
              color="inherit"
              aria-controls={menuId}
              aria-haspopup="true">
              <AccountCircle />
            </IconButton>
          </Box>

          {/* Mobile menu icon button - visible only on xs to md screens */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Render menus */}
      {renderMobileMenu}
      {renderDesktopMenu}
    </Box>
  );
}

export default MenuBar;

