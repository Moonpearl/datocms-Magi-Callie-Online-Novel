import React from 'react';
import { graphql } from 'gatsby';
import { Layout, Section } from '../components';
import { Header } from '../components/common';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mainTitle: {
    fontSize: '3rem',
    color: '#fff',
    textAlign: 'center',
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const AboutPage = ({ data }) => {
  const { about } = data;

  const styles = useStyles();

  return (
    <Layout backgroundImage={about.backgroundImage.uploadId.fluid.src}>
      <Header level={1} className={styles.mainTitle}>About</Header>
      {about.sections.map( (section, index) =>
        <Section key={index} {...section} />
      )}
    </Layout>
  );
}

export default AboutPage;

export const query = graphql`
  query AboutQuery {
    about: datoCmsAboutPage {
      sections {
        title
        contentNode {
          childMarkdownRemark {
            html
          }
        }
        backgroundImage {
          uploadId {
            fluid {
              src
            }
          }
        }
      }
      backgroundImage {
        uploadId {
          fluid {
            src
          }
        }
      }
    }
  }
`;
