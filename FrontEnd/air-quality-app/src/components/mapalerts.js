// https://www.airnow.gov/aqi/aqi-basics/ & https://aqicn.org/scale/all AQI information is based on this!


function setAqiStatus(aqiForLocation) {
    if (aqiForLocation <0) {
        return "AQI invalid"
    } else if (aqiForLocation < 50) {
        return "Good";
    } else if (aqiForLocation >=51 && aqiForLocation <= 100) {
        return "Moderate";
    } else if (aqiForLocation >= 101 && aqiForLocation <= 150) {
        return "Unhealthy_for_Sensitive_Groups"
    } else if (aqiForLocation >=151 && aqiForLocation <= 200) {
        return 'Unhealthy'
    } else if (aqiForLocation >=201 && aqiForLocation <= 300) {
        return 'Very_Unhealthy'
    } else if (aqiForLocation > 300) {
        return 'Hazardous'
    }
}

let alertHeading = {
    'Good': 'Good Air Quality',
    'Moderate': 'Moderate Air Quality:',
    'Unhealthy_for_Sensitive_Groups': 'Poor Air Quality: Caution Advised For Sensitive Groups',
    'Unhealthy':'Very Poor Air Quality: Caution Advised To All Groups',
    'Very_Unhealthy': "Severe Air Quality: Extreme Caution Advised To All Groups",
    'Hazardous': "Hazardous Air Quality: Seek Shelter Immediately"
}

let aqiNumber = {
    'Good': '0-50',
    'Moderate': '51-100', 
    'Unhealthy_for_Sensitive_Groups':  '101-150',
    'Unhealthy': '151-200',
    'Very_Unhealthy':  '201-300',
    'Hazardous': '300+',
}

let alertContent = {
    'Good': 'Air pollution levels pose little or no risk in this area',
    'Moderate': 'Air pollution levels pose moderate health concerns for groups highly sensitive to air pollution. Highly Sensitive groups should limit prolonged outdoor exposure', 
    'Unhealthy_for_Sensitive_Groups':  'Air pollution levels pose considerable health concerns, and sensitive groups may experience ill effects. Adults and children with respiratory disease should limit prolonged outdoor exposure. Please consider wearing a mask.',
    'Unhealthy': 'Air pollution levels pose high risk for all groups. All groups are advised to limit outdoor exposure, especially children. Please wear masks when engaging in outdoor activities.',
    'Very_Unhealthy':  'Air pollution levels pose extreme risk for entire population. It is strongly advised to remain indoors. ',
    'Hazardous': 'Air pollution levels poses extreme danger to human life, all groups should remain indoors.',
}

function renderMapAlert(aqiForLocation) {
    let aqiStatus = setAqiStatus(aqiForLocation);
    let alertHeadingText= alertHeading[aqiStatus];
    let aqiNumberText = aqiNumber[aqiStatus];
    let alertContentText = alertContent[aqiStatus];


    return {
        alertHeading: alertHeadingText,
        aqiNumber: aqiNumberText,
        alertContent: alertContentText,
    };
}


export {renderMapAlert}