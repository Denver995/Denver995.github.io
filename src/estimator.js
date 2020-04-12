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
};

export default covid19ImpactEstimator;
