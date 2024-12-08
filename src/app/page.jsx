"use client"
import React, { useState } from 'react';
import { useMediaQuery, ThemeProvider, createTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';

const drawerWidth = 240;

// Create a theme for the MUI components
const theme = createTheme();

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  // Media query for mobile devices
  const isMobileView = useMediaQuery(theme.breakpoints.down('md')); // Use the theme here

  // Menu Handlers
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Drawer Toggle Handler
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Sample data for the table
  const createData = (name, calories, fat, carbs, protein) => {
    return { name, calories, fat, carbs, protein };
  };

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  // Close drawer on mobile view
  React.useEffect(() => {
    if (isMobileView) {
      setIsDrawerOpen(false);
    } else {
      setIsDrawerOpen(true);
    }
  }, [isMobileView]);

  return (
    <ThemeProvider theme={theme}> {/* Wrap with ThemeProvider */}
      <Box sx={{ display: 'flex' }}>
        {/* Drawer */}
        <Drawer
          variant={isMobileView ? "temporary" : "permanent"} // Make it temporary on mobile
          open={isDrawerOpen}
          onClose={toggleDrawer}
          sx={{
            width: isDrawerOpen ? drawerWidth : 72, // Shrink to icon size when closed
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: isDrawerOpen ? drawerWidth : 72,
              transition: 'width 0.3s',
              overflowX: 'hidden',
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar />
          <List>
            {['Inbox', 'Starred', 'Send Email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                {isDrawerOpen && <ListItemText primary={text} />}
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* App Bar */}
        <AppBar
          position="fixed"
          sx={{
            width: isDrawerOpen
              ? `calc(100% - ${drawerWidth}px)`
              : `calc(100% - 72px)`,
            ml: isDrawerOpen ? `${drawerWidth}px` : `72px`,
            transition: 'margin-left 0.3s, width 0.3s',
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <InboxIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: isDrawerOpen
              ? `calc(100% - ${drawerWidth}px)`
              : `calc(100% - 72px)`,
            mt: 8,
            transition: 'margin-left 0.3s',
          }}
        >
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
