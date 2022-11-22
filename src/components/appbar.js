import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

function ResponsiveAppBar(props) {
    const { setCurSize, maxSize } = props;

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            BOOKMARKS
          </Typography>
          <IconButton size="large" color="inherit" onClick={()=>{setCurSize((curSize)=>{return (curSize === 0) ? 0 : curSize - 1 })}}>
                <ZoomOutIcon />
            </IconButton>
            <IconButton size="large" color="inherit" onClick={()=>{setCurSize((curSize)=>{return (curSize === maxSize) ? maxSize : curSize + 1 })}}>
                <ZoomInIcon />
            </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
    </Box>
  );
}
export default ResponsiveAppBar;