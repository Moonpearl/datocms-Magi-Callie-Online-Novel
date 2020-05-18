export default (darkMode) => ({
  palette: {
    type: darkMode ? 'dark' : 'light',
    primary: {
      light: '#044862',
      main: '#012C3B',
      dark: '#011519',
    },
    background: {
      paper: darkMode ? '#282828' : '#f8f8f8',
    },
  },
});
