import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useHistory } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
import {helpers} from "@service"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";


const ResponsiveAppBar = () => {

  let { logout: lo , isLoading: loadingCurrentUserInfo, user:currentUserInfo, isAuthenticated } = useAuth0();
  if(!currentUserInfo) currentUserInfo = {};

    let currentUserIsAdmin;
    if(!loadingCurrentUserInfo && isAuthenticated && currentUserInfo){
      currentUserIsAdmin =  helpers.isAdmin(currentUserInfo)
    }

    // const queryClient = useQueryClient();

  let loc = useLocation();
  let isAdminSection = loc.pathname.match(/admin/);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const adbIconStyle = { display: { xs: 'none', md: 'flex' }, mr: 1 };
  const boxStyle = { flexGrow: 1, display: { xs: 'flex', md: 'none' } };
  const menuStyle = {display: { xs: 'block', md: 'none' }}
  const adbIconStyle2 = { display: { xs: 'flex', md: 'none' }, mr: 1 };
  const typographyStyle = {
    mr: 2,
    display: { xs: 'flex', md: 'none' },
    flexGrow: 1,
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
  };

  const boxStyle2 = { flexGrow: 1, display: { xs: 'none', md: 'flex' } };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Link to="/">
                <AdbIcon sx={adbIconStyle} />
              </Link>

          <Box sx={boxStyle}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <Link to="/">
                <MenuIcon />
              </Link>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={menuStyle}
            >
              {
                currentUserIsAdmin && (
                  <MenuItem key={"Admin"} onClick={handleCloseNavMenu}>
                  <Link to="/admin">
                   <Typography textAlign="center">Admin</Typography>
                  </Link>
                </MenuItem>
                )
              }
          
              {
                isAdminSection && (
                  <MenuItem key={"reports"} onClick={handleCloseNavMenu}>
                  <Link to="/admin/reports">
                    <Typography textAlign="center">Reports</Typography>
                  </Link>
                </MenuItem>
                )}
               { isAdminSection && (

                <MenuItem key={"meals"} onClick={handleCloseNavMenu}>
                  <Link to="/admin/meals">
                    <Typography textAlign="center">Meals</Typography>
                  </Link>
                </MenuItem>
                )
              }
               
              
            </Menu>
          </Box>
          <AdbIcon sx={adbIconStyle2} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={typographyStyle}
          >
            LOGO
          </Typography>
          <Box sx={boxStyle2}>
          {
               isAdminSection && (
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to="/admin">
                  <Typography textAlign="center">Entries</Typography>
                </Link>
             </Button>
              )}
             {
               isAdminSection && (
                <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to="/admin/reports">
                  <Typography textAlign="center">Reports</Typography>
                </Link>
             </Button>
               )
             } 
             
             {
              isAdminSection && (
                <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to="/admin/meals">
                  <Typography textAlign="center">Meals</Typography>
                </Link>

              </Button>
              )
            }
              

              
          </Box>

          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar alt="Remy Sharp" src={currentUserInfo.picture} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {
                isAdminSection ? (
                  <MenuItem>
                    <Link to="/">
                      <Typography textAlign="center">Home</Typography>
                    </Link>
                  </MenuItem>
                ) : (
                  currentUserIsAdmin && (<MenuItem>
                    <Link to="/admin">
                      <Typography textAlign="center">Admin</Typography>
                    </Link>
                  </MenuItem>)
                )
              }
                  <MenuItem onClick={()=>{
                    lo({ returnTo: window.location.origin })

                  }}>
                      <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
