const currentlyInfected = (reportedCases, multiplier) => reportedCases * multiplier;

const infectionsByRequestedTime = (currentlyInfectedCount) => {
  const infections = Math.abs(currentlyInfectedCount * (2 ** 9));

  return infections - Math.floor(infections);
};

const covid19ImpactEstimator = (data) => {
  // currentlyInfected
  const iCurrentlyInfected = currentlyInfected(data.reportedCases * 10);
  const sImpactCurrentlyInfected = currentlyInfected(data.reportedCases * 50);

  // infectionsByRequestedTime
  const iInfectionsByRequestedTime = infectionsByRequestedTime(iCurrentlyInfected);
  const sImpactInfectionsByRequestedTime = infectionsByRequestedTime(sImpactCurrentlyInfected);

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
