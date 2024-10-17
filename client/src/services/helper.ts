export const generateYearOptions = (startYear, endYear) => {
  return Array.from({ length: endYear - startYear + 1 }, (_, index) => {
    const year = startYear + index;
    return {
      label: year,
      value: year,
    };
  }).reverse(); // Reverse the array to have the latest year first
};
  