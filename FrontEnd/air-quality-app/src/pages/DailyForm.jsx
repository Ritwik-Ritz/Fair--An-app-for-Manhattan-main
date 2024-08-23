import React, { useState, useContext, useEffect, useRef } from "react";
import UserContent from "../components/usercontent";
import { Box, Container, Typography, Button } from "@mui/material";
import DailySearchbar from "../components/dailysearchbar";
import CustomNumberInput from "../components/customnumberinput";
import { letterSpacing, styled, useTheme } from "@mui/system";
import { ThickHeadingTypography } from "./Home";

import constants from "./../constant";
import axiosInstance from "../../src/axios";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/usersidebar";
import CustomModal from "../components/custommodal";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/loadingscreen";

const QuestionTypography = styled(Typography)(({ theme }) => ({
  marginBottom: "1rem",
  fontWeight: "bold",
  color: theme.palette.text.primary,
}));

const GreyBackgroundBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#0D1B2A" : "#F1F3F2",
  margin: "1rem",
  padding: "2rem",
  borderRadius: "20px",
  borderColor: theme.palette.mode === "dark" ? "#F7F7F2" : "black",
  borderStyle: "solid",
  borderWidth: 4,
}));

// image from https://fearlesstravels.com/the-streets-of-new-york/
const bannerImage = "static/backgroundDaily.jpg";

export default function DailyForm() {
  const [indoorLocation, setIndoorLocation] = useState("");
  const [outdoorLocation, setOutdoorLocation] = useState("");
  const [indoorHours, setIndoorHours] = useState(0);
  const [outdoorHours, setOutdoorHours] = useState(0);

  const theme = useTheme();

  const { userId } = useContext(AuthContext);
  const [isValidatingHours, setIsValidatingHours] = useState(false);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const modalRef = useRef();

  const indoorSbarTextRef = useRef();
  const outdoorSbarTextRef = useRef();
  const navigate = useNavigate();

  const checkValidLocation = (indoorLocation, outdoorLocation) => {
    let isValid = false;
    let indoorCheck = false;
    let outdoorCheck = false;

    if (indoorLocation.components_array) {
      indoorLocation.components_array.forEach((component) => {
        if (
          component.long_name === "Manhattan" ||
          component.short_name === "Manhattan"
        ) {
          indoorCheck = true;
        }
      });
    }

    if (outdoorLocation.components_array) {
      outdoorLocation.components_array.forEach((component) => {
        if (
          component.long_name === "Manhattan" ||
          component.short_name === "Manhattan"
        ) {
          outdoorCheck = true;
        }
      });
    }

    if (indoorCheck && outdoorCheck) {
      isValid = true;
    }
    return isValid;
  };

  const check24Hours = (indoorHours, outdoorHours) => {
    let hourCheck = true;
    if (indoorHours + outdoorHours > 24) {
      hourCheck = false;
    }
    return hourCheck;
  };

  const adjustHours = (indoorHours, outdoorHours) => {
    const totalHours = indoorHours + outdoorHours;

    if (totalHours === 0) {
      setIndoorHours(22);
      setOutdoorHours(2);
    } else if (totalHours < 24) {
      const indoorHourRatio = indoorHours / totalHours;
      const outdoorHourRatio = outdoorHours / totalHours;

      const leftoverHours = 24 - totalHours;
      console.log("leftover hours:" + leftoverHours);

      const newIndoorHours = Math.round(leftoverHours * indoorHourRatio);
      console.log("new indoor hours:", newIndoorHours);
      const newOutdoorHours = Math.round(leftoverHours * outdoorHourRatio);
      console.log("new outdoor hours:", newOutdoorHours);

      let adjustedIndoorHours = indoorHours + newIndoorHours;
      let adjustedOutdoorHours = outdoorHours + newOutdoorHours;

      console.log(adjustedIndoorHours, adjustedOutdoorHours);

      if (adjustedIndoorHours + adjustedOutdoorHours > 24) {
        const excess = adjustedIndoorHours + adjustedOutdoorHours - 24;

        if (adjustedIndoorHours > adjustedOutdoorHours) {
          adjustedIndoorHours = adjustedIndoorHours - excess;
          console.log("here in calc indoor", adjustedIndoorHours);
        } else if (adjustedOutdoorHours > adjustedIndoorHours) {
          adjustedOutdoorHours = adjustedOutdoorHours - excess;
          console.log("here in calc zdoor", adjustedIndoorHours);
        }
      }
      setIndoorHours(adjustedIndoorHours);
      setOutdoorHours(adjustedOutdoorHours);
    }
  };

  useEffect(() => {
    if (isValidatingHours) {
      adjustHours(indoorHours, outdoorHours);
      setIsValidatingHours(false);
      setIsReadyToSubmit(true);
    }
  }, [isValidatingHours]);

  useEffect(() => {
    if (isReadyToSubmit) {
      handleSubmit();
    }
  }, [isReadyToSubmit]);

  const handleSubmit = async () => {
    const isValid = checkValidLocation(indoorLocation, outdoorLocation);
    const is24Hours = check24Hours(indoorHours, outdoorHours);

    let indoorLocationArray = [indoorLocation.lat, indoorLocation.lng];
    let outdoorLocationArray = [outdoorLocation.lat, outdoorLocation.lng];

    let indoorLocationToSend = indoorLocationArray.toString();
    let outdoorLocationToSend = outdoorLocationArray.toString();

    const data = {
      user_id: userId, // Use userId from AuthContext
      quiz_date: new Date(),
      indoor_location: indoorLocationToSend,
      outdoor_location: outdoorLocationToSend,
      indoor_hours: indoorHours,
      outdoor_hours: outdoorHours,
    };

    if (!isValid) {
      alert("Please choose a location in Manhattan");
    } else if (!is24Hours) {
      alert("24 hours exceeded, number inputs are invalid");
    } else {
      try {
        await axiosInstance
          .post("/dailyquizscores/createDailyQuizScore", data)
          .then((response) => {
            console.log("Data sent successfully!", response);
          })
          .catch((error) => {
            console.error("There was an error sending the data!", error);
          });

        setIndoorLocation("");
        setOutdoorLocation("");
        setIndoorHours(0);
        setOutdoorHours(0);

        modalRef.current.openModal(); // Open the modal using the ref

        if (indoorSbarTextRef.current) {
          indoorSbarTextRef.current.handleReset();
        }

        if (outdoorSbarTextRef.current) {
          outdoorSbarTextRef.current.handleReset();
        }
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }

    setIsReadyToSubmit(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsValidatingHours(true);
  };

  const handleIndoorHoursChange = (event, newValue) => {
    setIndoorHours(newValue);
  };

  const handleOutdoorHoursChange = (event, newValue) => {
    setOutdoorHours(newValue);
  };

  const handleIndoorPlaceChange = (placeData) => {
    setIndoorLocation(placeData);
  };

  const handleOutdoorPlaceChange = (placeData) => {
    setOutdoorLocation(placeData);
  };

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleDrawer = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleModalClose = (redirectUrl = "/user-dashboard") => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(redirectUrl);
    }, 1500);
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen loadingtext={constants.dailyForm.loadingText} />
      ) : (
        <div className="flex">
          <Sidebar isOpen={isSidebarOpen} toggleDrawer={toggleDrawer} />
          <Box
            sx={{
              backgroundImage: `url(${bannerImage})`,
              backgroundSize: "cover",
              width: "100%",
              height: "100%",
              minHeight: "95vh",
            }}
          >
            <UserContent
              className={`transition-all duration-300 ${
                isSidebarOpen ? "ml-60" : "ml-0"
              } p-6`}
            >
              <Container sx={{ marginTop: "2rem", marginLeft: "-3rem" }}>
                <ThickHeadingTypography
                  variant="h2"
                  component="h1"
                  sx={{
                    color: theme.palette.mode === "dark" ? "#F1F3F2" : "white",
                    paddingLeft: "1rem",
                  }}
                >
                  {constants.dailyForm.title}
                </ThickHeadingTypography>

                <GreyBackgroundBox>
                  <form onSubmit={submitHandler}>
                    <QuestionTypography variant="h5" component="h2">
                      {constants.dailyForm.q1_indoorLocation}
                    </QuestionTypography>
                    <DailySearchbar
                      value={indoorLocation.address}
                      passPlaceData={handleIndoorPlaceChange}
                      ref={indoorSbarTextRef}
                    />

                    <QuestionTypography variant="h5" component="h2">
                      {constants.dailyForm.q2_indoorHours}
                    </QuestionTypography>
                    <CustomNumberInput
                      value={indoorHours}
                      onChange={handleIndoorHoursChange}
                      arialabel={"Number of Hours spent indoors"}
                    />
                    <QuestionTypography variant="h5" component="h2">
                      {constants.dailyForm.q3_outdoorLocation}
                    </QuestionTypography>
                    <DailySearchbar
                      passPlaceData={handleOutdoorPlaceChange}
                      ref={outdoorSbarTextRef}
                    />

                    <QuestionTypography variant="h5" component="h2">
                      {constants.dailyForm.q4_outdoorHours}
                    </QuestionTypography>
                    <CustomNumberInput
                      value={outdoorHours}
                      onChange={handleOutdoorHoursChange}
                      arialabel={"Number of Hours spent outdoors"}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "2rem",
                      }}
                    >
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{
                          width: "200px", // Set a fixed width for the button
                        }}
                      >
                        {constants.dailyForm.submitButton}
                      </Button>
                    </Box>

                    <CustomModal
                      ref={modalRef}
                      title={constants.dailyForm.modalTitle}
                      description={constants.dailyForm.modalThankYou}
                      IconComponent={TaskAltIcon}
                      iconColor="green"
                      // Comment/ uncomment below to test redirect.
                      onClose={() => handleModalClose("/user")}
                    />
                  </form>
                </GreyBackgroundBox>
              </Container>
            </UserContent>
          </Box>
        </div>
      )}
    </>
  );
}
