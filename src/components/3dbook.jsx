import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';
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
      perspective: '900px',
    },
  },
  coverGraphic: {
    transform: 'rotateY(-25deg)',
    transformOrigin: '0 50%',
    transition: 'transform .3s ease, box-shadow .3s ease',
    boxShadow: '10px 0px 10px -5px rgba(0,0,0,.5)',
    '&:hover': {
      transform: props => props.interactive && 'rotateY(-35deg)',
      boxShadow: props => props.interactive && '10px 0px 20px -10px rgba(0,0,0,1)',
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


const ThreeDBook = ({ cover, href, interactive }) => {
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

  const styles = useStyles({ interactive });

  const coverImage = <Img
    className={styles.coverGraphic}
    fluid={cover.fluid}
    alt="Book cover"
  />;

  return (
    <div className={styles.container}>
      <Img
        fluid={file.childImageSharp.fluid}
        alt="Book image"
      />
      <div className={styles.coverContainer}>
        {interactive ?
          <Link to={href}>
            <ArrowTooltip title="Click to read!" placement="bottom">
              {coverImage}
            </ArrowTooltip>
          </Link>
        :
          coverImage
        }
      </div>
    </div>
  );
}

ThreeDBook.propTypes = {
  cover: PropTypes.object.isRequired,
}

export default ThreeDBook;
