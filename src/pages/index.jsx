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
    color: 'white',
    fontSize: '1.5em',
    lineHeight: '150%',
    margin: 'auto 0',
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
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Netus et malesuada fames ac turpis. Viverra suspendisse potenti nullam ac tortor vitae. A cras semper auctor neque vitae tempus quam pellentesque. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi. Ac tortor dignissim convallis aenean et tortor at. Pellentesque sit amet porttitor eget dolor morbi. Neque aliquam vestibulum morbi blandit cursus risus. Pretium nibh ipsum consequat nisl vel pretium. Ut sem viverra aliquet eget sit amet tellus. Habitant morbi tristique senectus et. At tellus at urna condimentum mattis pellentesque. Odio morbi quis commodo odio aenean. At volutpat diam ut venenatis tellus in. Vulputate mi sit amet mauris commodo quis. Justo nec ultrices dui sapien. Vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet.
        </MarkdownTextContainer>
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
