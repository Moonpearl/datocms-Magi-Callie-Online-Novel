// Dependencies
import React from 'react';

// Components
import { Layout, ThreeDBook } from '../components';
import { graphql, Link } from 'gatsby';
import { Paper, List, ListItem, Divider, ListItemIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Header, MarkdownTextContainer } from '../components/common';
import { FaBookReader } from 'react-icons/fa';

const useStyles = makeStyles(theme => ({
  container: {
    width: '600px',
    margin: '0 auto',
  },
  description: {
    textAlign: 'justify',
    textJustify: 'inter-word',
    textAlignLast: 'center',
    color: 'white',
    lineHeight: '200%',
    '& > *': {
      marginBottom: '2rem',
    },
  },
  table: {
    fontSize: '1.75em',
  },
  chapter: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    '& svg': {
      fontSize: 0,
      transformOrigin: 'center',
      transition: 'all .3s ease',
    },
    '& .MuiListItemIcon-root': {
      transition: 'margin .3s ease',
      marginRight: '-1rem',
    },
    '&:hover .MuiListItemIcon-root': {
      marginRight: 'initial',
    },
    '&:hover svg': {
      fontSize: 'inherit',
    }
  },
}));

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
          <ThreeDBook
            cover={book.cover}
            href={`/books/${book.slug}`}
          />
          <Header level={1}>{book.title}</Header>
          <Divider />
          <MarkdownTextContainer textNode={book.summaryNode} />
        </div>
        <Paper>
          <List id="table">
            <ListItem>
              <Header level={2} className={styles.table}>Table of contents</Header>
            </ListItem>
            <Divider />
            {bookChapters.map( (chapter, index) =>
              <li key={index}>
                <Link to={`/books/${book.slug}/${chapter.index}`}>
                  <ListItem className={styles.chapter} button>
                    <ListItemIcon>
                      <FaBookReader />
                    </ListItemIcon>
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
        fluid(maxWidth: 512, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
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
