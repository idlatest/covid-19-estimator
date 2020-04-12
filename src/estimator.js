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

const severeCasesByRequestedTime = (infections, percentage) => {
  const cases = Math.trunc((percentage / 100) * infections);

  return cases;
};

const hospitalBedsByRequestedTime = (totalHospitalBeds, cases) => {
  const availableBeds = (totalHospitalBeds * (35 / 100));

  return Math.trunc(availableBeds - cases);
};

const covid19ImpactEstimator = (data) => {
  // currentlyInfected
  const iCurrentlyInfected = currentlyInfected(data.reportedCases, 10);
  const sCurrentlyInfected = currentlyInfected(data.reportedCases, 50);

  // infectionsByRequestedTime
  const iInfectionsByRequestedTime = infectionsByRequestedTime(
    iCurrentlyInfected,
    data.periodType,
    data.timeToElapse
  );
  const sInfectionsByRequestedTime = infectionsByRequestedTime(
    sCurrentlyInfected,
    data.periodType,
    data.timeToElapse
  );

  // severeCasesByRequestedTime
  const iSevereCasesByRequestedTime = severeCasesByRequestedTime(
    iInfectionsByRequestedTime,
    15
  );
  const sSevereCasesByRequestedTime = severeCasesByRequestedTime(
    sInfectionsByRequestedTime,
    15
  );

  const iHospitalBedsByRequestedTime = hospitalBedsByRequestedTime(
    data.totalHospitalBeds,
    iSevereCasesByRequestedTime
  );
  const sHospitalBedsByRequestedTime = hospitalBedsByRequestedTime(
    data.totalHospitalBeds,
    sSevereCasesByRequestedTime
  );

  const input = data;

  return {
    input, // the input data you got
    impact: {
      currentlyInfected: iCurrentlyInfected,
      infectionsByRequestedTime: iInfectionsByRequestedTime,
      severeCasesByRequestedTime: iSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: iHospitalBedsByRequestedTime
    }, // your best case estimation
    severeImpact: {
      currentlyInfected: sCurrentlyInfected,
      infectionsByRequestedTime: sInfectionsByRequestedTime,
      severeCasesByRequestedTime: sSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: sHospitalBedsByRequestedTime
    }
  };
};

export default covid19ImpactEstimator;
