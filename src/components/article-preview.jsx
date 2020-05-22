import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, CardContent, CardActions, Button } from '@material-ui/core';
import { MarkdownTextContainer } from './common';
import { makeStyles } from '@material-ui/core/styles';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { Link } from 'gatsby';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
    textAlign: 'justify',
  },
  content: {
    maxHeight: theme.spacing(12),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
  },
}));

const ArticlePreview = ({ slug, title, contentNode, meta }) => {
  const styles = useStyles();

  return (
    <Card className={styles.root}>
      <CardContent>
        <Typography variant="h5" component="h3" gutterBottom>
          {title}
        </Typography>
        <Typography variant="caption" color="textSecondary" gutterBottom>
          Published at {(new Date(meta.updatedAt)).toLocaleString('en-EN')}
        </Typography>
        <Typography variant="body2">
          <MarkdownTextContainer
            className={styles.content}
            textNode={contentNode}
          />
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/news/${slug}`}>
          <Button size="small" variant="contained" color="primary">
            Read more{' '}<FaAngleDoubleRight />
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

ArticlePreview.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  contentNode: PropTypes.shape({
    childMarkdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }),
};

export default ArticlePreview;
