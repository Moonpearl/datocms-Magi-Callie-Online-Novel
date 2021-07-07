// Dependencies
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { graphql, navigate } from 'gatsby';
import { Location } from '@reach/router';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import { Layout } from '../components';
import { MidgardDate } from '../utils';
import { Header } from '../components/common';


const useStyles = makeStyles(theme => ({
  content: {
    maxWidth: '600px',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
    textAlign: 'center',
  }
}));

const DatePage = ({ data, location }) => {
  const { dateModel } = data;

  let date = new Date();
  let noDate = true;
  let error = false;

  const params = new URL(location.href || 'http://localhost:8000/').searchParams;

  const year = Number(params.get('year'));
  const month = Number(params.get('month'));
  const day = Number(params.get('day'));

  if (year || month || day) {
    if (year && month && day) {
      noDate = false;
      date = new Date(year, month, day, 0, 0, 0);

      if (isNaN(year) || isNaN(month) || isNaN(day)) {
        console.error(`Invalid parameter in request`);
        error = true;
      }
    } else {
      console.error(`Missing parameter in request`);
      error = true;
    }
  }

  const flags = {
    noDate,
    error,
  };

  const [currentDate, setCurrentDate] = useState(date);

  const midgardDate = useMemo(() =>
    new MidgardDate(currentDate)
  , [currentDate]);

  const styles = useStyles();

  return (
    <Layout backgroundImage={dateModel.backgroundImage.fluid.src}>
      <Paper className={styles.content}>
        <div>{flags.noDate ? 'Today is' : 'You were born on'}</div>
        <Header level={1}>
          {midgardDate.display()}
        </Header>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            label="Choose your birthdate"
            format="MM/dd/yyyy"
            value={currentDate}
            onChange={date => {
              const day = date.getDate();
              const month = date.getMonth();
              const year = date.getFullYear();
              navigate(`/date?year=${year}&month=${month}&day=${day}`);
              setCurrentDate(date);
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </Paper>
    </Layout>
  );
}

DatePage.propTypes = {
  location: PropTypes.object.isRequired,
};

// Exports
export default props => (
  <Location>
    {locationProps => <DatePage {...locationProps} {...props} />}
  </Location>
);

export const query = graphql`
  query DateQuery {
    dateModel: datoCmsDate {
      backgroundImage {
        fluid {
          src
        }
      }
    }
  }
`;
