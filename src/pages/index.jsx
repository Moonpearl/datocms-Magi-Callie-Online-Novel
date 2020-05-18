// Dependencies
import React from 'react';
import { Link, graphql } from 'gatsby';

// Components
import { Layout, ThreeDBook } from '../components';
import { makeStyles } from '@material-ui/core';
import { MarkdownTextContainer } from '../components/common';

// Styles
const useStyles = makeStyles({
  responsiveGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
  },
  summary: {
    color: 'white',
    fontSize: '1.5em',
    lineHeight: '150%',
    margin: 'auto 0',
  }
});

// Main content
const IndexPage = ({
  data: {
    home
  }
}) => {
  const { featuredBook } = home;

  const styles = useStyles();

  const images = [
    { name: 'background', url: home.coverBackground.url },
    { name: 'title', url: home.coverTitle.url },
  ];

  return (
    <Layout backgroundImage={featuredBook.backgroundImage.fluid.src}>
      <div className={styles.responsiveGrid}>
        <ThreeDBook 
          cover={featuredBook.cover}
        />
        <MarkdownTextContainer
          className={styles.summary}
          textNode={featuredBook.summaryNode}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Netus et malesuada fames ac turpis. Viverra suspendisse potenti nullam ac tortor vitae. A cras semper auctor neque vitae tempus quam pellentesque. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi. Ac tortor dignissim convallis aenean et tortor at. Pellentesque sit amet porttitor eget dolor morbi. Neque aliquam vestibulum morbi blandit cursus risus. Pretium nibh ipsum consequat nisl vel pretium. Ut sem viverra aliquet eget sit amet tellus. Habitant morbi tristique senectus et. At tellus at urna condimentum mattis pellentesque. Odio morbi quis commodo odio aenean. At volutpat diam ut venenatis tellus in. Vulputate mi sit amet mauris commodo quis. Justo nec ultrices dui sapien. Vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet.
        </MarkdownTextContainer>
      </div>
      {/*
      <BookImages id="BookImages">
        {images.map( image => 
          <BookImage
            key={image.name}
            name={image.name}
            src={image.url}
          />
        )}
      </BookImages>

      <section id="BookInfo">
        <BookSummary
          dangerouslySetInnerHTML={{
            __html: home.featuredBook.summaryNode.childMarkdownRemark.html,
          }}
        />
      </section>

      <ButtonWrapperWithMargin>
        <Link to={`/books/${home.featuredBook.slug}`}>
          <Button>
            Start Reading <FontAwesomeIcon icon={ faAngleDoubleRight } />
          </Button>
        </Link>
      </ButtonWrapperWithMargin>
      */}
    </Layout>
  );
}

// const IndexPage = ({ data }) => (
//   <Layout>
//     <Masonry className="showcase">
//       {data.allDatoCmsWork.edges.map(({ node: work }) => (
//         <div key={work.id} className="showcase__item">
//           <figure className="card">
//             <Link to={`/works/${work.slug}`} className="card__image">
//               <Img fluid={work.coverImage.fluid} />
//             </Link>
//             <figcaption className="card__caption">
//               <h6 className="card__title">
//                 <Link to={`/works/${work.slug}`}>{work.title}</Link>
//               </h6>
//               <div className="card__description">
//                 <p>{work.excerpt}</p>
//               </div>
//             </figcaption>
//           </figure>
//         </div>
//       ))}
//     </Masonry>
//   </Layout>
// )

// Exports
export default IndexPage

// Queries
export const query = graphql`
  query HomeQuery {
    home: datoCmsHome {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      coverTitle {
        url
        # fluid(maxWidth: 768, imgixParams: { fm: "png", auto: "compress" }) {
        #   ...GatsbyDatoCmsSizes
        # }
      }
      coverBackground {
        url
        # fluid(maxWidth: 1024, imgixParams: { fm: "jpg", auto: "compress" }) {
        #   ...GatsbyDatoCmsSizes
        # }
      }
      featuredBook {
        slug
        cover {
          fluid(maxWidth: 512, imgixParams: { fm: "jpg", auto: "compress" }) {
            ...GatsbyDatoCmsSizes
          }
        }
        backgroundImage {
          fluid {
            src
          }
        }
        summaryNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`

// export const query = graphql`
//   query IndexQuery {
//     allDatoCmsWork(sort: { fields: [position], order: ASC }) {
//       edges {
//         node {
//           id
//           title
//           slug
//           excerpt
//           coverImage {
//             fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
//               ...GatsbyDatoCmsSizes
//             }
//           }
//         }
//       }
//     }
//   }
// `
