import countryCode from "country-code-lookup";

export const groupObjectByProperty = (objArray, property) => {
  return objArray.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      return {
        ...acc,
        [key]: {
          conflicts: 1,
          fatalities: obj.best,
          countryName: obj.country,
          type: obj.type_of_violence,
        },
      };
    }

    return {
      ...acc,
      [key]: {
        ...acc[key],
        conflicts: acc[key].conflicts + 1,
        fatalities: acc[key].fatalities + obj.best,
      },
    };
  }, {});
};

export const formatConflicts = (data, property = "countryCode") => {
  const conflicts = data?.map((item) => ({
    ...item,
    countryCode: countryCode.byCountry(item.country)?.iso3 || [],
  }));

  const groupedData = groupObjectByProperty(conflicts, "countryCode");

  const maxConflicts = Object.keys(groupedData).reduce((max, country) =>
    max > groupedData[country].conflicts ? max : groupedData[country].conflicts
  );

  return { conflicts: groupedData, maxConflicts };
};
