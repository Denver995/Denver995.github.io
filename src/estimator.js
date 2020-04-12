//funtion that estimate the infection By RequestedTime
const infectionsByRequestedTimeFunction = (periodType, currentlyInfected, timeToElapse) => {
	let time = 0;
	let result = 0;
	switch (periodType) {
		case "days":
			time = Math.trunc(timeToElapse/3); 
			break;
		case "weeks":
			time = Math.trunc((timeToElapse * 7)/3); 
			break;
		case "months":
			time = Math.trunc((timeToElapse * 30)/3); 
			break;
		default:
			time = 0;
			break;
	}

	result = Math.trunc(currentlyInfected * time);
	return result;
};

const covid19ImpactEstimator = (data) => {
	//---------------starting challenge 1
	//estimation of currentlyInfected
	impact.currentlyInfected = Math.trunc(data.reportedCases * 10);
	severeImpact.currentlyInfected = Math.trunc(data.reportedCases * 50);

	//estimation of infectionsByRequestedTime
	impact.infectionsByRequestedTime = infectionsByRequestedTimeFunction(data.periodType, impact.currentlyInfected, data.timeToElapse);
	severeImpact.infectionsByRequestedTime = infectionsByRequestedTimeFunction(data.periodType, severeImpact.currentlyInfected, data.timeToElapse);

	//---------------starting challenge 2
	//estimation of severeCasesByRequestedTime
	impact.severeCasesByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.15);
	severeImpact.severeCasesByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * 0.15);

	//estimation of hospitalBedsByRequestedTime
	impact.hospitalBedsByRequestedTime = Math.trunc(( data.totalHospitalBeds * 0.35 ) - impact.severeCasesByRequestedTime);
	severeImpact.hospitalBedsByRequestedTime = Math.trunc(( data.totalHospitalBeds * 0.35 ) - severeImpact.severeCasesByRequestedTime);

	//---------------starting challenge 3
	impact.casesForICUByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.05);
	severeImpact.casesForICUByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * 0.05);

	impact.casesForVentilatorsByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.05);
	severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * 0.05);

	impact.dollarsInFlight = dollarsInFlightFunction(impact.avgDailyIncomeInUSD, data.region.avgDailyIncomePopulation, data.infectionsByRequestedTime, data.periodType, data.period);
	severeImpact.dollarsInFlight = dollarsInFlightFunction(severeImpact.avgDailyIncomeInUSD, data.region.avgDailyIncomePopulation, data.infectionsByRequestedTime, data.periodType, data.period);

};

export default covid19ImpactEstimator;
