const GREGORIAN_NAME_MONTH = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const NAME_MONTH = [
  'Snowymoon',
  'Idlemoon',
  'Rainymoon',
  'Wildmoon',
  'Blossomoon',
  'Meadowmoon',
  'Sunnymoon',
  'Haymoon',
  'Harvestmoon',
  'Spiritsmoon',
  'Bloodmoon',
  'Holymoon'
];

const NAME_WEEK = [
  'Rising',
  'Towering',
  'Falling',
  'Dying',
  'Slumbering'
];

const NAME_DAY = [
  'Månisday',
  'Tyrsday',
  'Odinsday',
  'Thorsday',
  'Friggsday',
  'Baldersday',
  'Solisday'
];

const SEASON_STRUCT = [
  [0, 1, 2, 3],
  [4, 5, 6, 7, 8],
  [9, 10, 11, 12]
];

class MidgardDate {
  data = {};

  constructor(date = null) {
    this.setDate(date || new Date());
  }

  isLeap = year => new Date(year, 1, 29).getDate() === 29;
  
  setDate = date => {
    const year = date.getFullYear();
    const daysInYear = this.isLeap(year - 1) ? 366 : 365;

    const absoluteDay = Math.floor((date - new Date(year, 0, 1)) / 86400000);
    const absoluteMidgardianDay = (absoluteDay + 10) % daysInYear;

    const weekInSeason = Math.floor(absoluteMidgardianDay / 7) % 13;

    let week = weekInSeason;
    let month;
    for (let i = 0; i < 3; i++) {
      if (SEASON_STRUCT[i].includes(weekInSeason)) {
        month = i;
        break;
      }
      week -= SEASON_STRUCT[i].length;
    }
    
    month += 3 * Math.floor(absoluteMidgardianDay / 91);

    const day = absoluteMidgardianDay % 7;
    
    this.data = {
      month,
      week,
      day,
    };
  }

  display = () => {
    const { month, week, day } = this.data;

    if (month === 12) {
      return 'Yule';
    }

    return `${NAME_DAY[day]}, ${NAME_WEEK[week]} ${NAME_MONTH[month]}`;
  }
}

export default MidgardDate;
