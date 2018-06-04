const withLeadingZero = amount => (amount < 10 ? `0${amount}` : `${amount}`);

const formattedTime = (timeInSeconds) => {
  if (Number.isNaN(timeInSeconds)) {
    return '';
  }
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${withLeadingZero(minutes)}:${withLeadingZero(seconds.toFixed(0))}`;
};

export { formattedTime, withLeadingZero };
