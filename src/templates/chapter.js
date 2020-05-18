// Dependencies
import React from 'react';
import { Link } from 'gatsby';

// Components
import { Layout } from '../components';

export default ({ pageContext }) => {
  const { chapter, nextChapter } = pageContext;

  return (
    <Layout>
      <div
        dangerouslySetInnerHTML={{
          __html: chapter.html,
        }}
      />
    </Layout>
  );
}
