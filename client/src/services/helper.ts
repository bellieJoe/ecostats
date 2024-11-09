export const generateYearOptions = (startYear, endYear) => {
  return Array.from({ length: endYear - startYear + 1 }, (_, index) => {
    const year = startYear + index;
    return {
      label: year,
      value: year,
    };
  }).reverse(); // Reverse the array to have the latest year first
};

export const generateYearOptionsFixed = generateYearOptions(2010, new Date().getFullYear());

export const municipalityOptions : any[] = [
  {
    label : "Boac",
    value : "Boac"
  },
  {
    label : "Mogpog",
    value : "Mogpog"
  },
  {
    label : "Gasan",
    value : "Gasan"
  },
  {
    label : "Sta. Cruz",
    value : "Sta. Cruz"
  },
  {
    label : "Torrijos",
    value : "Torrijos"
  },
  {
    label : "Buenavista",
    value : "Buenavista"
  },
]