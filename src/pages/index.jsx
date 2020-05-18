// Dependencies
import React from 'react';
import { Link, graphql } from 'gatsby';

// Components
import { Layout, ThreeDBook } from '../components';
import { makeStyles } from '@material-ui/core';
import { MarkdownTextContainer } from '../components/common';

// Styles
const useStyles = makeStyles({
  responsiveGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
  },
  summary: {
    position: 'relative',
    color: 'white',
    fontSize: '1.5em',
    lineHeight: '150%',
    padding: '0 1.75em',
    margin: 'auto 0',
    '&:before': {
      position: 'absolute',
      fontSize: '4em',
      fontStyle: 'normal',
      content: '\'\u201C\'',
      top: '.5em',
      left: 0,
    },
    '&:after': {
      position: 'absolute',
      fontSize: '4em',
      fontStyle: 'normal',
      content: '\'\u201D\'',
      bottom: '-.25em',
      right: 0,
    },
  }
});

// Main content
const IndexPage = ({
  data: {
    home
  }
}) => {
  const { featuredBook } = home;

  const styles = useStyles();

  return (
    <Layout backgroundImage={featuredBook.backgroundImage.fluid.src}>
      <div className={styles.responsiveGrid}>
        <ThreeDBook 
          cover={featuredBook.cover}
        />
        <MarkdownTextContainer
          className={styles.summary}
          textNode={featuredBook.summaryNode}
        />
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
  }
`;
