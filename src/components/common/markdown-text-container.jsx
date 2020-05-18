import React from 'react';
import PropTypes from 'prop-types';

const MarkdownTextContainer = ({ textNode, className }) =>
  <div
    className={className}
    dangerouslySetInnerHTML={{__html: textNode.childMarkdownRemark.html }}
  />
;

MarkdownTextContainer.propTypes = {
  textNode: PropTypes.shape({
    childMarkdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default MarkdownTextContainer;
