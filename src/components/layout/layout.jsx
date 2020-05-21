import React, { useMemo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, createStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import '../../styles/reset.css';
import '../../styles/fonts.css';

import Header from './header';
import { BackgroundImage } from '../common';
import { createTheme } from '../../styles';
import { useRecoilState, RecoilRoot } from 'recoil';
import { darkModeState } from '../../utils/states';
import Footer from './footer';

const useStyles = makeStyles( theme =>
  createStyles({
    root: {
      display: 'flex',
      position: 'relative',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    main: {
      flexGrow: 1,
      padding: theme.spacing(3),
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  }),
);

const LayoutContent = ({ backgroundImage, children }) => {
  const styles = useStyles();

  const [darkMode, setDarkMode] = useRecoilState(darkModeState); 
  const theme = useMemo(
    () =>
      createMuiTheme(createTheme(darkMode)),
    [darkMode],
  );
  
  return (
    <div className={styles.root}>
      <CssBaseline />
      <BackgroundImage backgroundImage={backgroundImage} />
      <ThemeProvider theme={theme}>
        <Header />
        <main className={styles.main}>
          <div className={styles.toolbar} />
          {children}
          <Footer />
        </main>
      </ThemeProvider>
    </div>
  );
} 

const Layout = props => 
  <RecoilRoot>
    <LayoutContent {...props} />
  </RecoilRoot>
;

export default Layout;
