//	funtion that estimate the infection By RequestedTime
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

const dollarsInFlightFunction = (avgDailyIncomeInUSD, avgDailyIncomePopulation, infectionsByRequestedTime, periodType, period) => {
	let time = 0;
	let result = 0;
	switch (periodType) {
		case "days":
			time = period; 
			break;
		case "weeks":
			time = period * 7; 
			break;
		case "months":
			time = period * 30; 
			break;
		default:
			time = 0;
			break;
	}

	result = Math.trunc((currentlyInfected * (avgDailyIncomeInUSD/100) * (avgDailyIncomePopulation/100)) / time);
	return result;
};

const covid19ImpactEstimator = (data) => {
	const input = data;
	const impact = {};
	const severeImpact = {};
	//	starting challenge 1
	//	estimation of currentlyInfected
	impact.currentlyInfected = Math.trunc(input.reportedCases * 10);
	severeImpact.currentlyInfected = Math.trunc(input.reportedCases * 50);

	//	estimation of infectionsByRequestedTime
	impact.infectionsByRequestedTime = infectionsByRequestedTimeFunction(input.periodType, impact.currentlyInfected, input.timeToElapse);
	severeImpact.infectionsByRequestedTime = infectionsByRequestedTimeFunction(input.periodType, severeImpact.currentlyInfected, input.timeToElapse);

	//	starting challenge 2
	//	estimation of severeCasesByRequestedTime
	impact.severeCasesByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.15);
	severeImpact.severeCasesByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * 0.15);

	//	estimation of hospitalBedsByRequestedTime
	impact.hospitalBedsByRequestedTime = Math.trunc(( input.totalHospitalBeds * 0.35 ) - impact.severeCasesByRequestedTime);
	severeImpact.hospitalBedsByRequestedTime = Math.trunc(( input.totalHospitalBeds * 0.35 ) - severeImpact.severeCasesByRequestedTime);

	//	starting challenge 3
	impact.casesForICUByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.05);
	severeImpact.casesForICUByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * 0.05);

	impact.casesForVentilatorsByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.05);
	severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * 0.05);

	impact.dollarsInFlight = dollarsInFlightFunction(impact.avgDailyIncomeInUSD, input.region.avgDailyIncomePopulation, input.infectionsByRequestedTime, input.periodType, input.timeToElapse);
	severeImpact.dollarsInFlight = dollarsInFlightFunction(severeImpact.avgDailyIncomeInUSD, input.region.avgDailyIncomePopulation, input.infectionsByRequestedTime, input.periodType, input.timeToElapse);

	return {
		data: input,
		impact: impact,
		severeImpact: severeImpact
	};

};

export default covid19ImpactEstimator;
