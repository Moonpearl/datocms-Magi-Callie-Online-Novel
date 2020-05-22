// Dependencies
import React from 'react';
import { Link, graphql } from 'gatsby';

// Components
import { Layout, ThreeDBook, ArticlePreview } from '../components';
import { makeStyles, Divider, Button, Container } from '@material-ui/core';
import { MarkdownTextContainer, Header } from '../components/common';
import { FaAngleDoubleRight } from 'react-icons/fa';

// Styles
const useStyles = makeStyles(theme => ({
  responsiveGrid: {
    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  root: {
    textAlign: 'center',
    color: 'white',
    fontSize: '1.2em',
  },
  mainTitle: {
    fontSize: '3rem',
  },
  description: {
    lineHeight: '200%',
    margin: 'auto 0',
  },
  summary: {
    position: 'relative',
    padding: '0 1.75em',
    textAlign: 'justify',
    textJustify: 'inter-word',
    fontStyle: 'italic',
    '&:before': {
      position: 'absolute',
      fontSize: '3em',
      fontStyle: 'normal',
      content: '\'\u201C\'',
      top: '.25em',
      left: 0,
    },
    '&:after': {
      position: 'absolute',
      fontSize: '3em',
      fontStyle: 'normal',
      content: '\'\u201D\'',
      bottom: '-.25em',
      right: 0,
    },
  },
  news: {
    maxWidth: '600px',
    marginTop: theme.spacing(16),
  },
}));

// Main content
const IndexPage = ({
  data: {
    home,
    allDatoCmsNews
  }
}) => {
  const { featuredBook } = home;
  const news = allDatoCmsNews.edges.map(edge => edge.node);

  const styles = useStyles();

  return (
    <Layout backgroundImage={featuredBook.backgroundImage.fluid.src}>
      <div className={styles.root}>
        <Header level={1} className={styles.mainTitle}>Welcome to Midgård</Header>
        <div className={styles.responsiveGrid}>
          <ThreeDBook 
            cover={featuredBook.cover}
            href={`/books/${featuredBook.slug}`}
            interactive
          />
          <div className={styles.description}>
            <Header level={2}>{featuredBook.title}</Header>
            <Divider />
            <MarkdownTextContainer
              className={styles.summary}
              textNode={featuredBook.summaryNode}
            />
            <Link to={`/books/${featuredBook.slug}`}>
              <Button variant="contained" color="primary">
                Start Reading{` `}<FaAngleDoubleRight />
              </Button>
            </Link>
          </div>
        </div>
        <Container className={styles.news}>
          <Header level={2}>Latest news</Header>
          <Divider />
          <Container component="ul">
            {news.map( (post, index) =>
              <ArticlePreview
                key={index}
                component="li"
                {...post}
              />
            )}
          </Container>
        </Container>
      </div>
    </Layout>
  );
}

// Exports
export default IndexPage

// Queries
export const query = graphql`
  query HomeQuery {
    home: datoCmsHome {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      featuredBook {
        slug
        title
        cover {
          fluid(maxWidth: 512, imgixParams: { fm: "jpg", auto: "compress" }) {
            ...GatsbyDatoCmsSizes
          }
        }
        backgroundImage {
          fluid {
            src
          }
        }
        summaryNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
    allDatoCmsNews(sort: {fields: meta___updatedAt, order: DESC}, limit: 3) {
      edges {
        node {
          slug
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
    }
  }
`;
