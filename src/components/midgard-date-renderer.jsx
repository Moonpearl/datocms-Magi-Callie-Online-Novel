import React from 'react';
import PropTypes from 'prop-types';
import { MidgardDate, displayElapsedTime } from '../utils';

const MidgardDateRenderer = ({ date, withTime, withElapsed }) => {
  const midgardDate = new MidgardDate(date);

  return (
    <span>
      {midgardDate.display()}
      {withTime && <span> {date.toLocaleTimeString('en-EN')}</span>}
      {withElapsed && <span> ({displayElapsedTime(date)})</span>}
    </span>
  )
}

MidgardDateRenderer.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  withTime: PropTypes.bool,
  withElapsed: PropTypes.bool,
}

export default MidgardDateRenderer;
