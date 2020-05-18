// Dependencies
import React from 'react';

// Components
import { Layout } from '../components';
import { graphql } from 'gatsby';

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

  return (
    <Layout>
      <ul>
        {bookChapters.map( (chapter, index) =>
          <li key={index}>
            {chapter.title}
          </li>
        )}
      </ul>
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
      summaryNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
