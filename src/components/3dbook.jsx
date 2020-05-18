import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { makeStyles } from '@material-ui/core';
import Img from 'gatsby-image';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
  },
  cover: {
    margin: 'auto',
    width: '42%',
    position: 'absolute',
    top: '14%',
    left: '25%',
    transformStyle: 'preserve-3d',
    perspective: '1000px',
    [theme.breakpoints.down('xs')]: {
      perspective: '750px',
    },
    [theme.breakpoints.only('lg')]: {
      perspective: '500px',
    },
    [theme.breakpoints.up('lg')]: {
      perspective: '750px',
    },
  },
  cover2: {
    transform: 'rotateY(-25deg)',
    transformOrigin: '0 50%',
    transition: 'transform .3s ease',
    '&:hover': {
      transform: 'rotateY(-30deg)',
    },
  }
}));

const ThreeDBook = ({ cover }) => {
  const { file } = useStaticQuery(graphql`
    query ImageQuery {
      file(relativePath: { eq: "images/book-blank.png" }) {
        childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Img
        fluid={file.childImageSharp.fluid}
        alt="Book image"
      />
      <div className={styles.cover}>
        <Img
          className={styles.cover2}
          fluid={cover.fluid}
          alt="Book cover"
        />
      </div>
    </div>
  );
}

ThreeDBook.propTypes = {
  cover: PropTypes.object.isRequired,
}

export default ThreeDBook;
