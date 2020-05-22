export default (then, now = new Date()) => {
  let diff = now - then;
  console.log(diff);

  // Get difference in seconds
  diff /= 1000;
  if (diff < 60) {
    return 'Just now';
  }

  // Get difference in minutes
  diff /= 60;
  if (diff < 60) {
    return `${Math.round(diff)} minutes ago`;
  }

  // Get difference in hours
  diff /= 60;
  if (diff < 24) {
    return `${Math.round(diff)} hours ago`;
  }

  // Get difference in days
  diff /= 24;
  if (diff < 7) {
    return `${Math.round(diff)} days ago`;
  }

  // Get difference in weeks
  diff /= 7;
  if (diff < 4) {
    return `${Math.round(diff)} weeks ago`;
  }
}
