import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { MarkdownTextContainer, Header } from './common';
import { Box, Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: -theme.spacing(3),
    marginRight: -theme.spacing(3),
    marginBottom: -theme.spacing(4),
  },
  textContainer: {
    padding: theme.spacing(2),
    textAlign: 'justify',
    textAlignLast: 'left',
    lineHeight: '2rem',
  },
  image: {
    backgroundImage: props => `url(${props.image})`,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100vh',
  },
  overlay: {
    height: '100%',
    backgroundImage: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.5))',
  },
}));

const Section = ({ title, contentNode, backgroundImage }) => {
  const styles = useStyles({
    image: backgroundImage.fluid.src,
  });

  return (
    <div className={styles.container}>
      <Box
        color="text.primary"
        bgcolor="background.paper"
        className={styles.textContainer}
      >
        <Container>
          <Header level={2}>{title}</Header>
          <MarkdownTextContainer
            textNode={contentNode}
          />
        </Container>
      </Box>
      <div className={styles.image}>
        <div className={styles.overlay} />
      </div>
    </div>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  contentNode: PropTypes.shape({
    childMarkdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  backgroundImage: PropTypes.shape({
    fluid: PropTypes.shape({
      src: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Section;
