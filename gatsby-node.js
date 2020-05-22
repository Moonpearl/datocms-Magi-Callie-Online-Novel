const papa = require('papaparse');
const googleApiService = require('./googledrive');

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

const entityData = [
  { entity: 'allDatoCmsBook', uri: 'books', template: 'book.jsx' },
  { entity: 'allDatoCmsNews', uri: 'news', template: 'news.jsx' },
];

exports.createPages = async ({ graphql, actions }) => {
  console.info(`
  Fetching Google Drive files...
  `);

  const documents = {};
  const chapters = [];

  // Fetch all books
  const { data } = await graphql(`
    {
      allDatoCmsBook {
        edges {
          node {
            title
            slug
            gdriveChaptersFileId
            backgroundImage {
              url
            }
          }
        }
      }
    }
  `);

  // For each book, get chapter index
  for (const edge of data.allDatoCmsBook.edges) {
    const book = edge.node;

    try {
      // Get index file from Google Sheets
      const csv = await googleApiService.getDriveFile(book.gdriveChaptersFileId, googleApiService.TYPE_DRIVE_CSV);
      // Parse data from index
      const { data, errors } = papa.parse(csv, {
        header: true,
        dynamicTyping: true,
      });
      // Throw any errors encountered while parsing index
      for (const error of errors) {
        throw error;
      }
      console.info(`✔️ Succesfully fetched chapter index from \x1b[35m${book.title}\x1b[0m`);
    
      // For each chapter in index, fetch corresponding document
      for (const chapterData of data) {
        const { documentId, title } = chapterData;
    
        // Fetch document only if it hasn't been previously fetched
        if (typeof documents[documentId] === 'undefined') {
          try {
            // Fetch document from Google Docs
            const info = await googleApiService.getDriveFile(documentId);
            const html = await googleApiService.getDriveFile(documentId, googleApiService.TYPE_DRIVE_HTML);
            // Parse document into sections
            const style = html.match(/<style .+?>(.*)<\/style>/)[1];
            const body = html.match(/<body .+?>(.*)<\/body>/)[1]; 
            const sections = body.split(/<h2 .+?>.*?<\/h2>/);
            documents[documentId] = { body, info, sections, style };
            console.info(`✔️ Succesfully fetched document for \x1b[35m${book.title}\x1b[0m: \x1b[35m${title}\x1b[0m`);
          }
          catch(error) {
            console.error(`❌ Unable to fetch document for \x1b[35m${book.title}\x1b[0m: \x1b[35m${title}\x1b[0m`);
            console.error(`  ${error.message}`)
          }  
        } else {
          console.info(`  Already fetched document for \x1b[35m${book.title}\x1b[0m: \x1b[35m${title}\x1b[0m`);
        }
      }

      // For each chapter, create chapter object
      let index = 1;
      for (const chapterData of data) {
        try {
          const { title, documentId, headerId } = chapterData;
          const document = documents[documentId];

          if (typeof document === 'undefined') {
            throw new Error(`Google document \x1b[36m[${documentId}]\x1b[0m wasn't fetched properly`);
          }

          // Get corresponding HTML
          let html;
          if (headerId === null) {
            html = document.body;
          } else {
            html = document.sections[headerId];
          }

          // Interrupt if HTML couldn't be found
          if (typeof html === 'undefined' || html === '') {
            throw new Error(`Section #${headerId} doesn't exist or is empty in Google document \x1b[36m${document.info.name} [${documentId}]\x1b[0m`);
          }
          html = `<style>${document.style}</style>${html}`;

          chapters.push({
            title,
            html,
            book,
            index,
          });

          index += 1;

          console.info(`✔️ Succesfully created chapter from \x1b[35m${book.title}\x1b[0m: \x1b[35m${title}\x1b[0m`);
        }
        catch(error) {
          const { title } = chapterData;
          console.info(`❌ Problem while creating chapter from \x1b[35m${book.title}\x1b[0m: \x1b[35m${title}\x1b[0m`);
          console.error(`  ${error.message}`)
        }
      }
    }
    catch(error) {
      console.error(`❌ Unable to fetch chapter index from \x1b[35m${book.title}\x1b[0m`);
      console.error(`  ${error.message}`)
    }  
  }

  console.info(`
  `);

  const { createPage } = actions;

  // Create pages for each chapter
  for (const chapter of chapters) {
    const { book, index } = chapter;

    createPage({
      path: `books/${book.slug}/${index}`,
      component: path.resolve(`./src/templates/chapter.jsx`),
      context: {
        chapter,
        nextChapter: chapters.filter( item =>
          item.book.slug === book.slug && item.index === index + 1
        )[0],
      },
    })
  }

  // Create pages from templates
  for (const instance of entityData) {
    const { entity, uri, template } = instance;

    const result = await graphql(`
      {
        ${entity} {
          edges {
            node {
              slug
            }
          }
        }
      }
    `);
    
    result.data[entity].edges.map(({ node: entity }) => {
      createPage({
        path: `${uri}/${entity.slug}`,
        component: path.resolve(`./src/templates/${template}`),
        context: {
          slug: entity.slug,
          chapters,
        },
      })
    });
  }
}
