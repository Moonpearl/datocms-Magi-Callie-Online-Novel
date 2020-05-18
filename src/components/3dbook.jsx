import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Img from 'gatsby-image';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    margin: 'auto 0',
  },
  coverContainer: {
    margin: 'auto',
    width: '42%',
    position: 'absolute',
    top: '14%',
    left: '25%',
    transformStyle: 'preserve-3d',
    perspective: '1000px',
    [theme.breakpoints.down('xs')]: {
      perspective: '350px',
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      perspective: '500px',
    },
    [theme.breakpoints.up('lg')]: {
      perspective: '750px',
    },
  },
  coverGraphic: {
    transform: 'rotateY(-25deg)',
    transformOrigin: '0 50%',
    transition: 'transform .3s ease, box-shadow .3s ease',
    boxShadow: '10px 0px 10px -5px rgba(0,0,0,.5)',
    '&:hover': {
      transform: 'rotateY(-35deg)',
      boxShadow: '10px 0px 20px -10px rgba(0,0,0,1)',
    },
  }
}));

const useTooltipStyles = makeStyles(theme => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

const ArrowTooltip = props => {
  const styles = useTooltipStyles();

  return <Tooltip arrow classes={styles} {...props} />;
}

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
      <div className={styles.coverContainer}>
        <ArrowTooltip title="Click to read!">
          <Img
            className={styles.coverGraphic}
            fluid={cover.fluid}
            alt="Book cover"
          />
        </ArrowTooltip>
      </div>
    </div>
  );
}

ThreeDBook.propTypes = {
  cover: PropTypes.object.isRequired,
}

export default ThreeDBook;
