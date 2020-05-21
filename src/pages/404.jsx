import React from 'react'
import { Layout } from '../components';
import { useStaticQuery, graphql } from 'gatsby';
import { Header } from '../components/common';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  container: {
    color: '#fff',
    textAlign: 'center',
    fontSize: '1.25rem',
  },
});

const NotFoundPage = () => {
  const { page } = useStaticQuery(graphql`
    query NotFoundPage {
      page: datoCmsNotFoundPage {
        backgroundImage {
          url
        }
        text
      }
    }
  `);

  const styles = useStyles();

  return (
    <Layout backgroundImage={page.backgroundImage.url}>
      <div className={styles.container}>
        <Header level={1}>Page not found</Header>
        <p>{page.text}</p>
      </div>
    </Layout>
  );
}

export default NotFoundPage
