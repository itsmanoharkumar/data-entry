import Link from "@/components/atoms/Link";
import Logo from "@/components/atoms/Logo";
import ThemeToggleSwitch from "@/components/atoms/ThemeToggleSwitch";
import SideNavList from "@/components/molecules/SideNavList";
import { NAV_ROUTES, SETTING_LIST } from "@/helpers/constants";
import { selectAuthState } from "@/store/authSlice";
import { SearchOutlined } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack, SwipeableDrawer } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import * as React from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

function ResponsiveAppBar() {
  const router = useRouter();
  const authState = useSelector(selectAuthState);
  const navigate = useRouter();

  const [, , removeCookie] = useCookies(["authToken"]);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [state, setState] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState(open);
    };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setState(true);
    // setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    // setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting: string) => {
    if (setting === "Logout") {
      removeCookie("authToken");
      navigate.replace("/");
    }
    setAnchorElUser(null);
  };

  const onNavClickHandler = (href: string) => {
    router.push(href);
    setState(false);
  };

  let hideLoginButton = false;
  if (router.pathname === "/login") {
    hideLoginButton = true;
  }
  return (
    <>
      <AppBar position="fixed" color="inherit">
        <Container maxWidth={"xl"}>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {NAV_ROUTES.map((page) => (
                  <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 0, mr: 4 }}>
              <Logo />
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {NAV_ROUTES.map((page) => {
                const href = page.href;
                const isActive = router.pathname === href;
                return (
                  <Button
                    key={page.title}
                    color={isActive ? "primary" : "inherit"}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: "block" }}
                  >
                    <Link
                      href={page.href}
                      className={`no-underline text-inherit`}
                    >
                      {page.title}
                    </Link>
                  </Button>
                );
              })}
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              &nbsp;
            </Box>
            <Box
              sx={{ flexGrow: 0, mr: 2, display: { xs: "none", sm: "flex" } }}
            >
              <IconButton aria-label="search" size="large">
                <SearchOutlined fontSize="inherit" />
              </IconButton>
            </Box>
            <Box
              sx={{ flexGrow: 0, mr: 2, display: { xs: "none", sm: "flex" } }}
            >
              <Tooltip title={"Change Theme"}>
                <span>
                  <ThemeToggleSwitch />
                </span>
              </Tooltip>
            </Box>

            {authState && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {SETTING_LIST.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleCloseUserMenu(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
            {!authState && !hideLoginButton && (
              <Box sx={{ flexGrow: 0 }} justifySelf={"end"}>
                <Link href={"/login"}>
                  <Button variant="outlined" sx={{ mr: 1 }}>
                    Login
                  </Button>
                </Link>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <SwipeableDrawer
        anchor={"left"}
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        className={"overflow-hidden"}
      >
        <Stack
          sx={{
            width: 250,
          }}
        >
          <SideNavList routeList={NAV_ROUTES} onNavClick={onNavClickHandler} />
        </Stack>
      </SwipeableDrawer>
    </>
  );
}

export default ResponsiveAppBar;
