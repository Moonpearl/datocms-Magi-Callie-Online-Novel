import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  // style rule
  backgroundImage: ({ backgroundImage }) => ({
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : null,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    position: 'fixed',
    width: '100%',
    height: '100vh',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }),
});

const BackgroundImage = ({ backgroundImage }) => {
  const styles = useStyles({ backgroundImage });

  return (
    <div className={styles.backgroundImage} />
  );
}

export default BackgroundImage;
