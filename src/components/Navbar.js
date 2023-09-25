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
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PodcastsRoundedIcon from "@mui/icons-material/PodcastsRounded";
import HeadphonesRoundedIcon from "@mui/icons-material/HeadphonesRounded";
import "../styles/navbar.css";
import { useState } from "react";

const pages = [
  { a: <HomeRoundedIcon fontSize="medium" />, b: "HOME" },
  { a: <PodcastsRoundedIcon fontSize="medium" />, b: "PODCASTS" },
  { a: <HeadphonesRoundedIcon fontSize="medium" />, b: "LIBRARY" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar id="navbar" position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            className="md:w-40 md:mr-10 md:block hidden mt-[10px]"
            src="https://d5fx445wy2wpk.cloudfront.net/static/logo.svg"
            alt="Amazon Prime Music"
          />

          <img
            className="w-16 md:hidden"
            src="https://d5fx445wy2wpk.cloudfront.net/static/logo_stacked.svg"
            alt="Amazon Prime Music"
          />

          <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
            {pages.map(({ a, b }) => (
              <Button
                className="items-center"
                key={a}
                sx={{
                  ":hover": { color: "rgb(168,237,240)" },
                  color: "white",
                  display: "flex",
                }}
              >
                {a}
                <Typography
                  sx={{
                    marginTop: "4px",
                    marginLeft: "10px",
                    marginRight: "20px",
                  }}
                  className="md:block hidden"
                  textAlign="center"
                >
                  {b}
                </Typography>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
