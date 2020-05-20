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

  const [currentDate, setCurrentDate] = useState(date);

  const midgardDate = useMemo(() =>
    new MidgardDate(currentDate)
  , [currentDate]);

  const styles = useStyles();

  let date = new Date();
  let noDate = true;
  let error = false;

  if (!location.href) {
    return <div/>;
  }

  const params = new URL(location.href).searchParams;

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


// Main content
// class DatePage extends React.Component {
//   static propTypes = {
//     location: PropTypes.object.isRequired,
//   }

//   state = {
//     noDate: null,
//     error: true,
//     date: new Date(),
//     midgardDate: null,
//   }

//   componentDidMount() {
//     const { location } = this.props;

//     const params = new URL(location.href).searchParams;
  
//     const year = Number(params.get('year'));
//     const month = Number(params.get('month'));
//     const day = Number(params.get('day'));

//     let noDate = true;
//     let error = false;
//     let date = new Date();
//     if (year || month || day) {
//       if (year && month && day) {
//         noDate = false;
//         date = new Date(year, month, day, 0, 0, 0);
  
//         if (isNaN(year) || isNaN(month) || isNaN(day)) {
//           console.error(`Invalid parameter in request`);
//           error = true;
//         }
//       } else {
//         console.error(`Missing parameter in request`);
//         error = true;
//       }
//     }

//     this.setState({
//       noDate,
//       error,
//     });

//     this.update(date);
//   }

//   update = date => {
//     const midgardDate = new MidgardDate(date);

//     this.setState({
//       date,
//       midgardDate,
//     });
//   }

//   render() {
//     const { dateModel } = this.props.data;
//     const { noDate, error, date, midgardDate } = this.state;

//     const day = date.getDate();
//     const month = date.getMonth();
//     const year = date.getFullYear();

//     if (error) {
//       return (
//         <Layout backgroundImage={dateModel.backgroundImage.fluid.src}>
//           <div>
//             <h1>Whoops...</h1>
//             There was a problem in your request.
//             <Link to={`/date`}>
//               <button>
//                 Try again
//               </button>
//             </Link>
//           </div>
//         </Layout>
//       );
//     }
  
//     return (
//       <Layout backgroundImage={dateModel.backgroundImage.fluid.src}>
//         <div>
//           { noDate ? 'Today is' : 'You were born on' }
//           <h1>{midgardDate.display()}</h1>
//         </div>
//         <DatePicker
//           selected={date}
//           onChange={date => this.setState({date})}
//           dateFormat="MMMM d, yyyy"
//         />
//         <Link to={`/date?year=${year}&month=${month}&day=${day}`}>
//           <button onClick={() => this.update(date)}>
//             Calculate my birthday
//           </button>
//         </Link>
//       </Layout>
//     );
//   }
// }

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
