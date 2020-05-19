import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import { darkModeState } from '../utils/states';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { createTheme } from '../styles';
import { hexToRgba } from '../utils';

const useStyles = makeStyles(theme => ({
  root: {
    '& hr': {
      position: 'relative',
      margin: '3em 0',
      border: 'none',
      
      '&:before': {
        content: '""',
        position: 'absolute',
        top: '50%',
        width: '100%',
        height: '1px',
        backgroundImage: `linear-gradient(
          to right,
          ${hexToRgba(theme.palette.text.primary, 0)},
          ${hexToRgba(theme.palette.text.primary)},
          ${hexToRgba(theme.palette.text.primary, 0)}
        )`,
        // theme.palette.text.primary,
      },

      '&:after': {
        backgroundColor: theme.palette.background.paper,
        padding: '1rem',
        margin: '-1.5rem',
        content: '"ᛃ"',
        fontSize: '2rem',
        position: 'relative',
        left: '50%',
        top: '50%',
      },
    },
  },
}));

const ChapterContent = ({ html }) => {
  const [darkMode, setDarkMode] = useRecoilState(darkModeState); 
  const theme = useMemo(
    () =>
      createMuiTheme(createTheme(darkMode)),
    [darkMode],
  );

  const styles = useStyles(theme);
  
  const __html = html.replace(/color:#000000;/g, '');

  return (
    <div
      className={styles.root}
      dangerouslySetInnerHTML={{
        __html
      }}
    />
  );
}

ChapterContent.propTypes = {
  html: PropTypes.string.isRequired,
}

export default ChapterContent;
