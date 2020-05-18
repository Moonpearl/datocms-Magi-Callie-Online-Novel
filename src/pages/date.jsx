// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Location } from '@reach/router';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// Components
import { Layout } from '../components';
import { MidgardDate } from '../utils';


// Main content
class DatePage extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  state = {
    noDate: null,
    error: true,
    date: new Date(),
    midgardDate: null,
  }

  componentDidMount() {
    const { location } = this.props;

    const params = new URL(location.href).searchParams;
  
    const year = Number(params.get('year'));
    const month = Number(params.get('month'));
    const day = Number(params.get('day'));

    let noDate = true;
    let error = false;
    let date = new Date();
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

    this.setState({
      noDate,
      error,
    });

    this.update(date);
  }

  update = date => {
    const midgardDate = new MidgardDate(date);

    this.setState({
      date,
      midgardDate,
    });
  }

  render() {
    const { noDate, error, date, midgardDate } = this.state;

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    if (error) {
      return (
        <Layout>
          <div>
            <h1>Whoops...</h1>
            There was a problem in your request.
            <Link to={`/date`}>
              <button>
                Try again
              </button>
            </Link>
          </div>
        </Layout>
      );
    }
  
    return (
      <Layout>
        <div>
          { noDate ? 'Today is' : 'You were born on' }
          <h1>{midgardDate.display()}</h1>
        </div>
        <DatePicker
          selected={date}
          onChange={date => this.setState({date})}
          dateFormat="MMMM d, yyyy"
        />
        <Link to={`/date?year=${year}&month=${month}&day=${day}`}>
          <button onClick={() => this.update(date)}>
            Calculate my birthday
          </button>
        </Link>
      </Layout>
    );
  }
}

// Exports
export default props => (
  <Location>
    {locationProps => <DatePage {...locationProps} {...props} />}
  </Location>
);
