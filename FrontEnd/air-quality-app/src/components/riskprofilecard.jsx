import { renderGrade, getGrade, renderColor, riskvalueHeadingText, riskvalueContentText, riskvalueColor } from "./riskprofilescores";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import PropTypes from 'prop-types';

const RiskProfileCard = ({avgAQI, userAQI, specialCase}) => {
    let starImage = "static/star.png"
    let airImage ="static/air-icon.png" 
    let grade = "";
    let headingText ="";
    let contentText = "";
    let gradeColor = "";
    let gradeText = "";
    let specialCaseImage = "";

    //  WHERE WE SET INFORMATION AND CASES
    if (specialCase == "firstUse") {
        console.log("Im in risk profile card")
        headingText = riskvalueHeadingText["*"]
        contentText = riskvalueContentText["*"]
        gradeColor = riskvalueColor["*"]
        specialCaseImage = starImage
    } else if (specialCase == "NotYetFilled") {
        console.log("Im in NotYetFilled!")
        headingText = riskvalueHeadingText["!"]
        contentText = riskvalueContentText["!"]
        gradeColor = riskvalueColor["!"]
        specialCaseImage = airImage; 
    } else if (specialCase === "valid") {
    grade = getGrade(avgAQI, userAQI)
    gradeText = renderGrade(avgAQI, userAQI);
    headingText = gradeText.headingText;
    contentText = gradeText.contentText;
    gradeColor = renderColor(avgAQI, userAQI)
    }
    

    return(
    <Box sx={{
        marginTop:"1rem",
        backgroundColor: "black",
        display: "flex",
        borderRadius: 5,
        paddingRight: "1.5rem"
    }}>

    {/* Grade section */}
    <Box sx= {{
        display: "flex",
        margin: "1rem",
        padding: "2rem",
        backgroundColor: "white",
        borderRadius: 5,
        border: `solid 10px ${gradeColor}`,
        // maxWidth: "50rem",
        maxHeight: {xs: "15rem", md: "18rem" }
    }}>
    
    <Typography variant="h1" component="h3" sx={{
        margin: "auto",
        color: "black", 
        maxHeight: specialCaseImage? null : "2"
    }}>
        <Box component="img" src={specialCaseImage} sx={{
            maxWidth: specialCaseImage? "9rem": "2rem",
        }}></Box>
    {grade}
    </Typography>
    </Box>
   
    {/* Text section */}
    <Box sx={{
        marginLeft: "1rem",
        padding: "1rem"
    }}>
    <Typography variant= "h5"sx={{
        color: "white"
    }}>{headingText}</Typography>
    <Typography variant="body1" sx={{
        color: "white",
        textAlign: "justify"
    }}>{contentText}</Typography>
    </Box>

    </Box>)
}

RiskProfileCard.propTypes = {
    avgAQI: PropTypes.number,
    userAQI: PropTypes.number,
    specialCase: PropTypes.string,
}

export default RiskProfileCard