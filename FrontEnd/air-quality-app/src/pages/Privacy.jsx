import { Box, Container } from "@mui/system";
// import { List, ListItem, Typography } from "@mui/material"
import { styled, useTheme } from "@mui/system";
import constants from "./../constant";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import {useNavigate} from 'react-router-dom'
import Footer from "../components/footer";

const QuestionTypography = styled(Typography)({
  fontWeight: 420,
});

const AnswerTypography = styled(Typography)({
  marginBottom: "2rem",
  marginTop: "1rem"
});

export default function Privacy() {
    const navigate = useNavigate();

    const handleClick= () => {
        navigate(-1)
    }
    const theme = useTheme();
  return (
    <>
        <Box
          sx={{
            paddingTop: "2rem",
            paddingBottom: "2rem",
            minHeight:"100%",
            backgroundColor:  theme.palette.mode === 'dark' ? 'black' : "#F7F7F2",
          }}
        >
          <Container
            sx={{
              padding: 0,
              backgroundColor:  theme.palette.mode === 'dark' ? 'black' : "#F7F7F2",
            }}
          >
            {/* Header section */}
            <Box
              sx={{
                marginBottom: "3rem",
              }}
            >
              <Typography variant="h2" component="h1" sx={{
                fontWeight: "medium",
              }}>
                {constants.privacy.title}
              </Typography>
              <Box sx={{
                marginTop: "1rem"
              }}>
              <Typography variant="body2">{constants.privacy.datepublished}</Typography>
              <Typography variant="body2">{constants.privacy.lastupdated}</Typography>
              </Box>
              <AnswerTypography variant="body1" component="p">
                {constants.privacy.introduction}
              </AnswerTypography>
            </Box>

            {/* Information section */}
            <Box>
              <QuestionTypography variant="h4" component="h2">
                {constants.privacy.q1_personalData}
              </QuestionTypography>
              <AnswerTypography variant="body1" component="p">
                {constants.privacy.content1}
              </AnswerTypography>

              <QuestionTypography variant="h4" component="h2">
                {constants.privacy.q2_useOfPersonalData}
              </QuestionTypography>
              <AnswerTypography variant="body1" component="p">
                {constants.privacy.content2}
              </AnswerTypography>

              <List
                sx={{
                  marginTop: -4,
                  paddingLeft: 2,
                }}
              >
                <ListItem>
                  <ListItemIcon sx={{ minWidth: "auto", marginRight: 1 }}>
                    <CircleIcon sx={{ fontSize: 10 }} />
                  </ListItemIcon>
                  <ListItemText primary={constants.privacy.l1} />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: "auto", marginRight: 1 }}>
                    <CircleIcon sx={{ fontSize: 10 }} />
                  </ListItemIcon>
                  <ListItemText primary={constants.privacy.l2} />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: "auto", marginRight: 1 }}>
                    <CircleIcon sx={{ fontSize: 10 }} />
                  </ListItemIcon>
                  <ListItemText primary={constants.privacy.l3} />
                </ListItem>
              </List>

              <QuestionTypography variant="h4" component="h2">
                {constants.privacy.q3_sharingOfPersonalData}
              </QuestionTypography>
              <AnswerTypography variant="body1" component="p">
                {" "}
                {constants.privacy.content3}
              </AnswerTypography>

              {/* Glossary */}
              <Box sx={{
                marginBottom: "2rem"
              }}>
              <Typography variant="h3" component="h2" sx={{
                  fontWeight: 'medium',
                  marginBottom: "1rem",
                }}>{constants.privacy.terms_title}</Typography>
              <Typography sx={{
                marginBottom: "1rem"
              }}>
                {constants.privacy.terms}
              </Typography>
              <Typography>
                {constants.privacy.terms2}
              </Typography>
              </Box>
            </Box>
            <Button variant="contained"
            onClick={handleClick}
            size="large"
          sx={{
            marginTop: "2rem",
            margin: "auto",
            backgroundColor:  theme.palette.mode === 'dark' ? 'lightgrey' : "black",
          }}>Back to Previous Page</Button>
          </Container>
          
        </Box>
      <Footer />
      
      
    </>
  );
}
