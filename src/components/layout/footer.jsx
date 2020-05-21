import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FaFacebook, FaTwitter } from 'react-icons/fa';

const useStyles = makeStyles(theme => ({
  footer: {
    margin: -theme.spacing(3),
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
    textAlign: 'center',
  },
  icons: {
    fontSize: '3rem',
    '& > *': {
      padding: theme.spacing(1),
    },
  },
}));

const Footer = () => {
  const styles = useStyles();
  
  return (
    <Box
      component="footer"
      color="text.secondary"
      bgcolor="background.paper"
      className={styles.footer}
    >
      <Box
        className={styles.icons}
      >
        <FaFacebook />
        <FaTwitter />
      </Box>
      <Box
        color="text.disabled"
      >
        Copyright &copy; {(new Date()).getFullYear()} Elinor Molat, all rights reserved
      </Box>
    </Box>
  );
}

export default Footer;
