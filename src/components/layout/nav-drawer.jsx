import React, { useState } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { useRecoilState } from 'recoil';
import { Divider, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { FaBookReader, FaCalendarDay, FaHome, FaQuestionCircle } from 'react-icons/fa';
import { MdExpandMore, MdExpandLess, MdBrightness4, MdBrightness7 } from 'react-icons/md';
import { darkModeState } from '../../utils/states';

const useStyles = makeStyles( theme =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

const NavData = [
  { text: 'Home', path: '/', Icon: FaHome },
  { text: 'About Me', path: '/about', Icon: FaQuestionCircle },
  { text: 'Calendar', path: '/date', Icon: FaCalendarDay },
];

const NavDrawer = () => {
  const { allDatoCmsBook } = useStaticQuery(graphql`
    query NavQuery {
      allDatoCmsBook(sort: {fields: position, order: ASC}) {
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

  const styles = useStyles();
  const [open, setOpen] = useState(true);
  const toggleOpen = () => {
    setOpen(!open);
  };
  const OpenIcon = open ? MdExpandLess : MdExpandMore;

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
        <ListItem button onClick={toggleOpen} component="li">
          <ListItemIcon>
            <FaBookReader size="1.5em" />
          </ListItemIcon>
          <ListItemText primary="Read" />
          <OpenIcon size="1.5em" />
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
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
