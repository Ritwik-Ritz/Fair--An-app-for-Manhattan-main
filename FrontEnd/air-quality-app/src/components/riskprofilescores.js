// Placeholder values for demonstration purposes
const avgHoursIndoors = 22;
const avgHoursOutdoors = 2;
const indoorFactor = 3;
const bestMaskFactor = 14;

function getAvg(averageAQI) {
    const avgRiskScore = ((averageAQI * avgHoursOutdoors) + (averageAQI * avgHoursIndoors / indoorFactor)) / 24;
    return avgRiskScore;
}

function getSScore(averageAQI) {
    const sRiskScore = ((averageAQI * avgHoursOutdoors / bestMaskFactor) + (averageAQI * avgHoursIndoors / indoorFactor)) / 24;
    return sRiskScore;
}

function getGrade(averageAQI, userAQI) {
    const avgRiskScore = getAvg(averageAQI);
    const sRiskScore = getSScore(averageAQI);

    const aRiskScore = sRiskScore + ((avgRiskScore - sRiskScore) / 3);
    const bRiskScore = aRiskScore + ((avgRiskScore - sRiskScore) / 3);
    const dRiskScore = avgRiskScore * 1.1;
    const fRiskScore = avgRiskScore * 1.2;

    if (userAQI <= sRiskScore) {
        return "S";
    } else if (userAQI > sRiskScore && userAQI < bRiskScore) {
        return "A";
    } else if (userAQI > aRiskScore && userAQI < avgRiskScore) {
        return "B";
    } else if (userAQI > bRiskScore && userAQI < dRiskScore) {
        return "C";
    } else if (userAQI > avgRiskScore && userAQI < fRiskScore) {
        return "D";
    } else if (userAQI >= fRiskScore) {
        return "F";
    }
}

const riskvalueHeadingText = {
    "S": "At Very Low Risk",
    "A": "At Low Risk",
    "B": "At Some Risk",
    "C": "At Considerable Risk",
    "D": "At High Risk",
    "F": "At Very High Risk",
    "*": "Welcome To Fair",
    "!": "Daily Quiz Not Yet Filled"
};

const riskvalueContentText = {
    "S": "Well done! You have taken many of the necessary steps to significantly curb air pollutant exposure. Keep it up to continue improving your respiratory and circulatory health, and hopefully live a happier and healthier life for even longer!",
    "A": "Well done! You have taken many of the necessary steps to significantly curb air pollutant exposure. Keep it up to continue improving your respiratory and circulatory health, and hopefully live a happier and healthier life for even longer!",
    "B": "Good job, you have taken some steps to reduce air pollutant exposure. Consult the AQI map daily to better understand where the more and less polluted areas are, bring a mask out on more polluted days, and circulate your home with fresh air on lesser polluted days. By further developing these habits, you’re gradually improving your overall health, while reducing the risk of developing/aggravating chronic respiratory and circulatory conditions.",
    "C": "Your air pollutant exposure score is about average for anyone living in your area. Taking on board even one of your personalised health recommendations can greatly reduce overall pollutant exposure, allowing you to curb the negative health effects of poor air quality that will inevitably show in the later years of life. Be mindful of your actions, and do your best to improve your score tomorrow for a better you.",
    "D": "Your air pollutant exposure score is below average for anyone living in your area. You may have spent an excessive period of time in or around busy areas such as roads, and perhaps did not take the necessary precautions to reduce overall exposure such as wearing a mask in these environments. Be aware that disregarding the negative effects of air pollution, while not immediately detrimental, are highly likely to cause serious problems in the later years of one’s life. Fortunately, you may greatly improve your score by assessing the AQI of locations you will stay in with our map, wearing a face mask in highly polluted areas, and using an air purifier at home. Try your best to get back to at least a C grade as soon as possible.",
    "F": "Your air pollutant exposure score is extremely high for your area. You may have been exposed to excessive quantities of pollutants based on your location. Consult your doctor if you develop symptoms of respiratory distress and monitor your condition closely for the next while. Be mindful that continuous exposure to such a high level of pollutants may lead to irreparable respiratory and circulatory system damage that could manifest into a chronic condition later in life. To mitigate this risk, avoid staying near roads for extended periods of time, wear a face mask when in highly polluted areas, avoid visiting char-broil cuisine restaurants, use an air purifier at home, and continue to monitor your exposure levels. By implementing these recommendations, along with your personalised recommendations, you may significantly reduce your exposure, and greatly reduce the risk of developing chronic diseases later in life.",
    "*": "Your Risk Profile will allow you to quickly see how you're doing in terms of exposure",
    "!": "Please complete your Daily quiz to see your Risk Profile today! "
};

const riskvalueColor = {
    "S": "#00FF00",
    "A": "#3EACEB",
    "B": "#AD00FF",
    "C": "#FF867C",
    "D": "#FF0000",
    "F": "#8B0000",
    "*": "#3783bd",
    "!": "#94d138",
};

function renderGrade(averageAQI, userAQI) {
    const grade = getGrade(averageAQI, userAQI); 
    const headingText = riskvalueHeadingText[grade];
    const contentText = riskvalueContentText[grade];

    return {
        headingText: headingText,
        contentText: contentText,
    };
}

function renderColor(averageAQI, userAQI) {
    const grade = getGrade(averageAQI,userAQI); 
    return riskvalueColor[grade];
}

export {
    getGrade,
    renderGrade,
    renderColor,
    riskvalueContentText,
    riskvalueHeadingText,
    riskvalueColor
};
