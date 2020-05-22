// Dependencies
import React from 'react';
import { Link } from 'gatsby';

// Components
import { Layout, ChapterContent } from '../components';
import { Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { MdList } from 'react-icons/md';
import { Header } from '../components/common';

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '1em',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '2em 0',
    '& > *': {
      margin: '0 .25em',
    },
  },
  header: {
    color: 'white',
    textAlign: 'center',
    padding: '2em 0',
  },
}));

const ChapterPage = ({ pageContext }) => {
  const { chapter, nextChapter } = pageContext;

  const styles = useStyles();

  return (
    <Layout backgroundImage={chapter.book.backgroundImage.url}>
      <Header level={1} className={styles.header}>
        {chapter.title}
      </Header>
      <Paper className={styles.container}>
        <ChapterContent html={chapter.html} />
      </Paper>
      <div className={styles.buttonContainer}>
        <Link to={`/books/${chapter.book.slug}#table`}>
          <Button variant="contained" color="primary">
            <MdList size="1.5em" />{` `}Table
          </Button>
        </Link>
        {nextChapter ?
          <Link to={`/books/${chapter.book.slug}/${nextChapter.index}`}>
            <Button variant="contained" color="primary">
              Next chapter{` `}<FaAngleDoubleRight />
            </Button>
          </Link>
        :
          <Button variant="contained" color="primay" disabled>
            To be continued …
          </Button>
        }
      </div>
    </Layout>
  );
}

export default ChapterPage;
