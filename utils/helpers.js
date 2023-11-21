module.exports = {
    format_date: (date) => {
      if (date) {
        return new Date(date).toLocaleDateString();
      }
      return '';
    },
};
  