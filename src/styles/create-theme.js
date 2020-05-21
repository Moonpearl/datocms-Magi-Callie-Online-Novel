export default (darkMode) => ({
  palette: {
    type: darkMode ? 'dark' : 'light',
    primary: {
      main: '#044862',
      dark: '#011519',
    },
    background: {
      paper: darkMode ? '#282828' : '#f8f8f8',
    },
  },
});
