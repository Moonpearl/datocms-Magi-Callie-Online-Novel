import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  header: {
    fontFamily: 'MORPHEUS, Arial, sans-serif',
    fontWeight: 'normal',
  }
}));

const Header = ({ children, level, className }) => {
  if (![1,2,3,4,5,6].includes(level)) {
    throw new Error(`Invalid level number "${level}" passed to Header component`);
  }

  const TagName = `h${level}`;

  const styles = useStyles();

  return <TagName className={`${className} ${styles.header}`}>{children}</TagName>;
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.number,
  className: PropTypes.string,
}

Header.defaultProps = {
  level: 1,
  className: '',
}

export default Header;
