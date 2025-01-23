import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { logoutThunk } from '../../../redux/auth/authAsyncThunk';
import ContactFormModal from '../ContactFormModal/ContactFormModal';
import styles from './NavBar.module.css';

export default function NavBar(): JSX.Element {
  const user = useAppSelector((store) => store.auth.user);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="static" elevation={0} className={styles.navbar}>
        <Box className={styles.navbarContainer}>
          <Toolbar disableGutters>

            <Box sx={{ flexGrow: 0.2, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
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
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <NavLink className={styles.mobileLinks} to="/">ГЛАВНАЯ</NavLink>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <NavLink className={styles.mobileLinks} to="/apartments">ВЫБРАТЬ КВАРТИРУ</NavLink>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <NavLink className={styles.mobileLinks} to="/commercy">КОММЕРЧЕСКИЕ ПОМЕЩЕНИЯ</NavLink>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <NavLink className={styles.mobileLinks} to="/contacts">КОНТАКТЫ</NavLink>
                  </Typography>
                </MenuItem>
                {user.status === 'logged' && (
                  <>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <NavLink className={styles.mobileLinks} to="/adminPage">АДМИНИСТРАТОР</NavLink>
                  </Typography>
                </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
              <Typography textAlign="center">
                <NavLink className={styles.mobileLinks} to="/"
                  onClick={() => void dispatch(logoutThunk())}
                >
                  ВЫЙТИ
                </NavLink>
              </Typography>
            </MenuItem>
            </>)}
              </Menu>
            </Box>
            
                <Typography
                  variant="h6"
                  noWrap
                  component={NavLink}
                  to="/"
                  className={styles.navbarLogo}
                >
                  Infinity View
                  <Typography className={styles.navbarUnderLogo}>ДОМА КОМФОРТ КЛАССА</Typography>
                </Typography>

            <Box className={styles.navbarLinkBox}
            >
              <Button className={styles.navbarLink} component={NavLink} to="/">
                Главная
              </Button>
              <Button className={styles.navbarLink} component={NavLink} to="/apartments">
                Выбрать квартиру
              </Button>
              <Button
                className={styles.navbarLink}
                component={NavLink}
                to="/commercy"
              >
                Коммерческие помещения
              </Button>
              <Button className={styles.navbarLink} component={NavLink} to="/contacts">
                Контакты
              </Button>
            </Box>

            <Box className={styles.rightAligned}>
              <Button
                variant="outlined"
                className={styles.buyButton}
                onClick={() => setShowModal((prev) => !prev)}
              >
                КУПИТЬ КВАРТИРУ
              </Button>
              <a 
                href="tel:+79287178883" 
                aria-label="Позвонить нам"
              >
                <PhoneInTalkIcon fontSize="large" className={styles.contactIcon}/>
              </a>
              <a href="https://www.instagram.com/garantstroy_kbr" target="_blank" rel="noopener noreferrer" aria-label="Открыть профиль в Instagram в новой вкладке">
              <InstagramIcon fontSize="large" className={styles.contactIcon} />
            </a>
            </Box>

            {user.status === 'logged' && (
              <Box className={styles.adminLinks}>
                <Button className={styles.navbarLink} component={NavLink} to="/adminPage">
                  Администратор
                </Button>
                <Button
                  className={styles.navbarLink}
                  onClick={() => void dispatch(logoutThunk())}
                  component={NavLink}
                  to="/admin"
                >
                  Выйти
                </Button>
              </Box>
            )}
          </Toolbar>
        </Box>
      </AppBar>
      <ContactFormModal
        show={showModal}
        onHide={() => setShowModal(false)} oneApartment={undefined}      />
    </>
  );
}
