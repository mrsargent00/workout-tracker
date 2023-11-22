module.exports = {
  format_date: (date) => {
    if (date) {
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZoneName: 'short',
      };
      return new Date(date).toLocaleString('en-US', options);
    }
    return '';
  },
};
