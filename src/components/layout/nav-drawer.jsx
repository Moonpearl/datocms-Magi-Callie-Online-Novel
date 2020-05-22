import React, { useState } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { useRecoilState } from 'recoil';
import { Divider, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { FaBookReader, FaCalendarDay, FaHome, FaQuestionCircle, FaNewspaper } from 'react-icons/fa';
import { MdExpandMore, MdExpandLess, MdBrightness4, MdBrightness7 } from 'react-icons/md';
import { darkModeState } from '../../utils/states';

const useStyles = makeStyles( theme =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    nested: {
      paddingLeft: theme.spacing(4),
      whiteSpace: 'nowrap',
      '& span': {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
  }),
);

const NavData = [
  { text: 'Home', path: '/', Icon: FaHome },
  { text: 'About', path: '/about', Icon: FaQuestionCircle },
  { text: 'Calendar', path: '/date', Icon: FaCalendarDay },
];

const NavDrawer = () => {
  const { allDatoCmsBook, allDatoCmsNews } = useStaticQuery(graphql`
    query NavQuery {
      allDatoCmsBook(sort: {fields: position, order: ASC}) {
        edges {
          node {
            slug
            title
          }
        }
      }
      allDatoCmsNews(sort: {fields: meta___updatedAt, order:DESC}) {
        edges {
          node {
            slug
            title
          }
        }
      }
    }
  `);
  const books = allDatoCmsBook.edges.map(edge => edge.node);
  const news = allDatoCmsNews.edges.map(edge => edge.node);

  const styles = useStyles();

  const [readOpen, setReadOpen] = useState(false);
  const toggleReadOpen = () => {
    setReadOpen(!readOpen);
  };
  const ReadOpenIcon = readOpen ? MdExpandLess : MdExpandMore;

  const [newsOpen, setNewsOpen] = useState(false);
  const toggleNewsOpen = () => {
    setNewsOpen(!newsOpen);
  };
  const NewsOpenIcon = newsOpen ? MdExpandLess : MdExpandMore;

  const [darkMode, setDarkMode] = useRecoilState(darkModeState);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }
  const DarkModeIcon = darkMode ? MdBrightness7 : MdBrightness4;

  return (
    <div>
      <div className={styles.toolbar} />
      <Divider />
      <List>
        {NavData.map((nav, index) => (
          <Link to={nav.path} key={index}>
            <ListItem button component="li">
              <ListItemIcon>
                <nav.Icon size="1.5em" />
              </ListItemIcon>
              <ListItemText primary={nav.text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={toggleReadOpen} component="li">
          <ListItemIcon>
            <FaBookReader size="1.5em" />
          </ListItemIcon>
          <ListItemText primary="Read" />
          <ReadOpenIcon size="1.5em" />
        </ListItem>
        <Collapse in={readOpen} timeout="auto" unmountOnExit>
          <List disablePadding component="ul">
            {books.map( (book, index) => (
              <li key={index}>
                <Link to={`/books/${book.slug}`}>
                  <ListItem button className={styles.nested}>
                    <ListItemText primary={book.title} />
                  </ListItem>
                </Link>
              </li>
            ))}
          </List>
        </Collapse>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={toggleNewsOpen} component="li">
          <ListItemIcon>
            <FaNewspaper size="1.5em" />
          </ListItemIcon>
          <ListItemText primary="News" />
          <NewsOpenIcon size="1.5em" />
        </ListItem>
        <Collapse in={newsOpen} timeout="auto" unmountOnExit>
          <List disablePadding component="ul">
            {news.map( (post, index) => (
              <li key={index}>
                <Link to={`/news/${post.slug}`}>
                  <ListItem button className={styles.nested}>
                    <ListItemText primary={post.title} />
                  </ListItem>
                </Link>
              </li>
            ))}
          </List>
        </Collapse>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={toggleDarkMode}>
          <ListItemIcon>
            <DarkModeIcon size="1.5em" />
          </ListItemIcon>
          <ListItemText primary={darkMode ? 'Light Mode' : 'Dark Mode'} />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
}

export default NavDrawer;
