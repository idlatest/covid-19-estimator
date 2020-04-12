const currentlyInfected = (reportedCases, multiplier) => reportedCases * multiplier;

const infectionsByRequestedTime = (currentlyInfectedCount, periodType, timeToElapse) => {
  let factor;

  if (periodType === 'days') {
    factor = 2 ** Math.trunc(timeToElapse / 3);
  } else if (periodType === 'weeks') {
    const days = timeToElapse * 7;

    factor = 2 ** Math.trunc(days / 3);
  } else {
    const days = timeToElapse * 30;

    factor = 2 ** Math.trunc(days / 3);
  }

  return currentlyInfectedCount * factor;
};

const covid19ImpactEstimator = (data) => {
  // currentlyInfected
  const iCurrentlyInfected = currentlyInfected(data.reportedCases, 10);
  const sImpactCurrentlyInfected = currentlyInfected(data.reportedCases, 50);

  // infectionsByRequestedTime
  const iInfectionsByRequestedTime = infectionsByRequestedTime(
    iCurrentlyInfected,
    data.periodType,
    data.timeToElapse
  );
  const sImpactInfectionsByRequestedTime = infectionsByRequestedTime(
    sImpactCurrentlyInfected,
    data.periodType,
    data.timeToElapse
  );

  const input = data;

  return {
    input, // the input data you got
    impact: {
      currentlyInfected: iCurrentlyInfected,
      infectionsByRequestedTime: iInfectionsByRequestedTime
    }, // your best case estimation
    severeImpact: {
      currentlyInfected: sImpactCurrentlyInfected,
      infectionsByRequestedTime: sImpactInfectionsByRequestedTime
    }
  };
};


export default covid19ImpactEstimator;
