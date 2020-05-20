// Dependencies
import React from 'react';

// Components
import { Layout } from '../components';
import { graphql, Link } from 'gatsby';
import { Paper, List, ListItem, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Header, MarkdownTextContainer } from '../components/common';

const useStyles = makeStyles({
  container: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  description: {
    textAlign: 'center',
    color: 'white',
    lineHeight: '200%',
    '& > *': {
      margin: '2em 0',
    },
  },
});

// Main content
const BookPage = ({ data, pageContext }) => {
  const { chapters } = pageContext;

  const { book } = data;
  const bookChapters = chapters.filter( chapter =>
    chapter.book.slug === book.slug
  )
  .sort( (chapter1, chapter2) =>
    chapter1.index < chapter2.index
  );

  const styles = useStyles();

  return (
    <Layout backgroundImage={book.backgroundImage.url}>
      <div className={styles.container}>
        <div className={styles.description}>
          <Header level={1}>{book.title}</Header>
          <MarkdownTextContainer textNode={book.summaryNode} />
        </div>
        <Paper>
          <List>
            <ListItem>
              <Header level={2}>Table of contents</Header>
            </ListItem>
            <Divider />
            {bookChapters.map( (chapter, index) =>
              <li key={index}>
                <Link to={`/books/${book.slug}/${chapter.index}`}>
                  <ListItem button>
                    {chapter.title}
                  </ListItem>
                </Link>
              </li>
            )}
          </List>
        </Paper>
      </div>
    </Layout>
  );
}

export default BookPage;

export const query = graphql`
  query BookQuery($slug: String!) {
    book: datoCmsBook(slug: { eq: $slug }) {
      id
      slug
      title
      cover {
        url
      }
      backgroundImage {
        url
      }
      summaryNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
