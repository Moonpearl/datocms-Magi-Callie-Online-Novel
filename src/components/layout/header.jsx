import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { AppBar, IconButton, Toolbar, Typography, Hidden, Drawer } from '@material-ui/core';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import { MdMenu } from 'react-icons/md';

import NavDrawer from './nav-drawer';

const drawerWidth = 240;

const useStyles = makeStyles( theme =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  }),
);  

const Header = () => {
  const { site } = useStaticQuery(graphql`
    query HeaderQuery {
      site: datoCmsSite {
        name
      }
    }
  `);

  const styles = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <header>
      <AppBar position="fixed" className={styles.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={styles.menuButton}
          >
            <MdMenu />
          </IconButton>
          <Typography variant="h6" noWrap>
            {site.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={styles.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            // container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: styles.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <NavDrawer />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: styles.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <NavDrawer />
          </Drawer>
        </Hidden>
      </nav>
    </header>
  );
}

export default Header;

