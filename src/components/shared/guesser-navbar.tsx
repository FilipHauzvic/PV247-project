'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TheatersIcon from '@mui/icons-material/Theaters';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/src/lib/auth-client';

const pages = [['Quizzes', '/'], ['Create Quiz', '/create']];

const GuesserNavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const router = useRouter();
   const session = authClient.useSession();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <TheatersIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          
			<Link href="/" color="inherit" underline="none" component={NextLink}>
				<Typography
					variant="h6"
					noWrap
					sx={{
					mr: 2,
					display: { xs: 'none', md: 'flex' },
					fontFamily: 'monospace',
					fontWeight: 700,
					letterSpacing: '.3rem',
					color: 'inherit',
					textDecoration: 'none',
					}}
				>
					EMOJI GUESSER
				</Typography>
			</Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
              {pages.map((page) => (
                <MenuItem key={page[0]} onClick={handleCloseNavMenu}>
                  <Link color="black" underline="none" href={page[1]} component={NextLink}><Typography sx={{ textAlign: 'center' }}>{page[0]}</Typography></Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <TheatersIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
			<Link href="/" color="inherit" underline="none" component={NextLink}>
				<Typography
					variant="h5"
					noWrap
					sx={{
					mr: 2,
					display: { xs: 'flex', md: 'none' },
					flexGrow: 1,
					fontFamily: 'monospace',
					fontWeight: 700,
					letterSpacing: '.3rem',
					color: 'inherit',
					textDecoration: 'none',
					}}
				>
		  			EMOJI GUESSER
				</Typography>
			</Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page[0]}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link color="white" underline="none" href={page[1]} component={NextLink}>{page[0]}</Link>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display: "flex", flexDirection: "row" }} >
			{true && <Link href="/profile" color="inherit" underline="none" component={NextLink}>
				<Typography
					variant="h6"
					noWrap
					sx={{
					mr: 2,
					display: { xs: "none", sm: "none", md: "flex" },
					flexGrow: 1,
					fontFamily: 'monospace',
					fontWeight: 300,
					letterSpacing: '.1rem',
					color: 'inherit',
					textDecoration: 'none',
					}}
				>
		  			{session.data?.user.name}
				</Typography>
				</Link>}
              <IconButton onClick={() => router.push("/profile")} sx={{ p: 0 }}>
                <AccountCircleIcon sx={{ display: { xs: 'flex' }, fontSize: 'inherit', color: 'white' }} />
              </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default GuesserNavBar;
