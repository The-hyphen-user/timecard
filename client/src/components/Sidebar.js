import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Button from "@mui/material/Button";
import EventNoteIcon from '@mui/icons-material/EventNote';//timecard
import FoundationIcon from '@mui/icons-material/Foundation';//jobsite

/*
unused imports for now

import PersonAddIcon from '@mui/icons-material/PersonAdd';//create activation
import AppBar from '@mui/material/AppBar';
import ListItemButton from '@mui/material/ListItemButton';
import WorkIcon from "@mui/icons-material/Work";
import InfoIcon from "@mui/icons-material/Info";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Grid, Menu, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
 */

const Sidebar = () => {
  const user = useSelector((state) => state.user.user.user);
  // const isAdmin = useSelector((state) => state.user.user.isAdmin);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  }

  const openDrawer = () => {
    setDrawerOpen(true);
  }

  const closeDrawer = () => {
    setDrawerOpen(false);
  }

  return (
    <div>
              <Drawer anchor="left" variant="permanent"
              sx={{ width: '240px', border: '1px solid #000', height: 'auto'}}>
                <List>
                  <ListItem sx={{ display: 'flex', flexGrow: 1, alignItems: 'left' }}>
                    {drawerOpen ?
                      <Button
                      sx={{ flex: 1, textAlign: 'left' }}
                        variant="contained"
                        onClick={toggleDrawer}>
                        <MenuIcon sx={{ p: 1 }} />
                        <ListItemText primary="menu" />
                      </Button>
                      :
                      <Button
                        variant="contained"
                        onClick={toggleDrawer}>
                        <MenuIcon />
                      </Button>
                    }
                  </ListItem>
                  <ListItem component={Link} to="/Timecard"
                  sx={{ display: 'flex', flexGrow: 1, alignItems: 'left' }}>
                    {drawerOpen ?
                      <Button variant="contained" 
                      sx={{ flex: 1, textAlign: 'left' }}>
                        <EventNoteIcon sx={{ p: 1 }} />
                        <ListItemText primary="time cards" />
                      </Button>
                      :
                      <Button variant="contained">
                        <EventNoteIcon />
                      </Button>
                    }
                  </ListItem>
                  <ListItem component={Link} to="/jobsite" 
                  sx={{ display: 'flex', flexGrow: 1, alignItems: 'left' }}>
                    {drawerOpen ?
                      <Button variant="contained"
                      sx={{ flex: 1, textAlign: 'left' }}>
                        <FoundationIcon sx={{ p: 1 }} />
                        <ListItemText primary="jobsites" />
                      </Button>
                      :
                      <Button variant="contained">
                        <FoundationIcon />
                      </Button>
                    }
                  </ListItem>
                  <ListItem component={Link} to="/dashboard"
                  sx={{ display: 'flex', flexGrow: 1, alignItems: 'left' }}>
                    {drawerOpen ?
                      <Button variant="contained">
                        <DashboardIcon sx={{ p: 1 }} />
                        <ListItemText primary="dashboard" />
                      </Button>
                      :
                      <Button variant="contained">
                        <DashboardIcon />
                      </Button>
                    }
                  </ListItem>
                </List>
              </Drawer>
            
    </div>
  );
};

export default Sidebar;
