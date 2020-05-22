import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Layout } from '../components';
import { Header, MarkdownTextContainer } from '../components/common';
import { Typography, Paper, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    maxWidth: '900px',
    margin: '0 auto',
  },
}));

const NewsPage = ({ data: { page, post } }) => {
  const { title, contentNode, meta } = post;

  const styles = useStyles();

  return (
    <Layout backgroundImage={page.backgroundImage.fluid.src}>
      <Paper className={styles.root}>
        <Typography align="center" gutterBottomon>
          <Header level={1}>{title}</Header>
        </Typography>
        <Typography variant="caption" color="textSecondary" gutterBottom>
          Published on {(new Date(meta.updatedAt)).toLocaleString('en-EN')}
        </Typography>
        <Divider />
        <Typography variant="body1" align="justify">
          <MarkdownTextContainer
            textNode={contentNode}
          />
        </Typography>
      </Paper>
    </Layout>
  );
}

NewsPage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      backgroundImage: PropTypes.shape({
        fluid: PropTypes.shape({
          src: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    post: PropTypes.shape({
      title: PropTypes.string.isRequired,
      contentNode: PropTypes.shape({
        childMarkdownRemark: PropTypes.shape({
          html: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      meta: PropTypes.shape({
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default NewsPage;

export const query = graphql`
  query NewsQuery($slug: String!) {
    page: datoCmsNewsPage {
      backgroundImage {
        fluid {
          src
        }
      }
    }
    post: datoCmsNews(slug: { eq: $slug }) {
      title
      contentNode {
        childMarkdownRemark {
          html
        }
      }
      meta {
        createdAt
        updatedAt
      }
    }
  }
`;
