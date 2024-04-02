import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import TrainIcon from "@mui/icons-material/Train";
import { authStore } from "../state/auth";
import { fetchUser } from "../api/axiosInstances";
import { useNavigate } from "react-router-dom";

const pages = [
  {
    label: "Login",
    href: "/login",
  },
  {
    label: "Register",
    href: "/register",
  },
];
const settings = ["Logout"];

function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [user, setUser] = React.useState<any>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navigate = useNavigate();
  const authState: any = authStore();
  const handleLogout = () => {
    authState.setAuth();
    handleCloseUserMenu();
    localStorage.removeItem("token");
    navigate("/");
  };
  React.useEffect(() => {
    const fetch = async () => {
      const data = await fetchUser();
      setUser(data);
      console.log("user", data);
    };
    fetch();
  }, []);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <TrainIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            IRCTC 2.0
          </Typography>
          {/* Other links */}
          {!authState.auth && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  href={page.href}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>
          )}
          <Box sx={{ flexGrow: 1 }} />
          {/* Profile Avatar with options */}
          {authState.auth && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user?.name}
                    src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7f83306c-9659-420d-885e-b827164fedba/d8k5f0w-e9af3bef-e695-424c-9c00-b5ea1d538a70.jpg/v1/fill/w_800,h_800,q_75,strp/avatar_of_harry_potter__by_pollyaug00_d8k5f0w-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODAwIiwicGF0aCI6IlwvZlwvN2Y4MzMwNmMtOTY1OS00MjBkLTg4NWUtYjgyNzE2NGZlZGJhXC9kOGs1ZjB3LWU5YWYzYmVmLWU2OTUtNDI0Yy05YzAwLWI1ZWExZDUzOGE3MC5qcGciLCJ3aWR0aCI6Ijw9ODAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.U6J9TZKL0KYWkkqaVkTlE8bDbpyFoIQ60dYQmtEP7Hg"
                  />
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleLogout}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
