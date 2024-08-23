import { Container, Typography, Box} from "@mui/material";
import Infocard from "../components/infocard";
import ReactPlayer from "react-player";
import constants from "./../constant";
import { styled, useTheme } from "@mui/system";
import Footer from "../components/footer";

const image1 = "static/proxy-image.png";
const image2 = "static/face-mask2.png";
const image3 = "static/heart.png";
const bannerImage = "static/newyorktest8.jpg"
const videoUrl = "https://www.youtube.com/watch?v=FKBVwX8dVhI";

const BannerBox = styled(Box)({
  backgroundColor: "#2E6095",
  display: "flex",
  alignItems: "center",
  paddingBottom: "5rem",
  position: "relative", 
  backgroundImage: `url(${bannerImage})`,
  backgroundSize: "cover",
});

const QuoteBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  marginLeft: "4rem",
});

const ThickHeadingTypography = styled(Typography)({
  fontFamily: "Roboto flex, Roboto, sans-serif",
  fontWeight: 700,
  color: "white",
});

const GetStartedBox = styled(Box) (({theme}) => ({
  height: "80vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: theme.palette.mode === 'dark' ? '#0D1B2A' : "white",
  borderRadius: "2vh",
  borderColor: theme.palette.mode === 'dark' ? '#F7F7F2' : "black",
  borderStyle: 'solid',
  borderWidth: 1,
  padding: "2rem",
  position: "relative",
  zIndex: 10, 
}));

const CreamBackgroundBox = styled(Box) (({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'blue' : "#F7F7F2",
  minHeight: "100vh",
  paddingBottom: "2rem"
}));

const SmallerHeadingBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  mb: 4,
});

const InfoCardBox = styled(Box) (({theme}) => ({
  backgroundColor:  theme.palette.mode === 'dark' ? '#151515' : "#F7F7F2",
  marginTop: "2rem",
  padding: 5,
}));

const Home = () => {
  const theme = useTheme();
  
  return (
    <>
      {/* Introduction Section */}
      <section>
        <header>
          <BannerBox
            sx={{
              paddingTop: "2rem",
              height: {md: 870, lg: 900 },
              maxWidth: "100%",
            }}
          >
            <QuoteBox>
              <ThickHeadingTypography variant="h2" component="h1">
                {constants.homePage.title1}
              </ThickHeadingTypography>
              <Typography
                variant="h4"
                component="p"
                sx={{
                  color: "white",
                  marginTop: 3,
                }}
              >
                {constants.homePage.title1_subtext}
              </Typography>
            </QuoteBox>
          </BannerBox>
        </header>
      </section>
      <Container
        sx={{
          maxWidth: { xs: "100%", md: "90%", lg: "70%" },
          marginTop: { xs: -2, md: -3 },
        }}
      >
        <GetStartedBox>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              margin: 2,
            }}
          >
            {constants.homePage.getting_started}
          </Typography>
          <ReactPlayer
            url={videoUrl}
            width="100%"
            height="100%"
            style={{
              top: 0,
              left: 0,
            }}
          />
        </GetStartedBox>
      </Container>

      {/* Info-card Section */}
      <section>
        <InfoCardBox
          sx={{
            border: "1px",
          }}>
          <Container
            maxWidth={false}
            sx={{
              marginTop: 4,
              marginBottom: 5,
              width: { xs: "100%", md: "90%", lg: "80%" },
              backgroundColor:  theme.palette.mode === 'dark' ? '#151515' : "#F7F7F2",
            }}
          >
            <SmallerHeadingBox
              sx={{
                backgroundColor:  theme.palette.mode === 'dark' ? '#151515' : "#F7F7F2",
              }}>
              <Typography variant="h2" component="h2" sx={{
                fontWeight: 'medium',
              }}>
                {constants.homePage.air_pollution_heading}
              </Typography>
              <Typography variant="body1" component="p">
                {constants.homePage.air_pollution_body}
              </Typography>
            </SmallerHeadingBox>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md:"repeat(3, 1fr)"},
                gap: 4,
                margin: { xs: 6 },
                marginBottom: 2,
                backgroundColor:  theme.palette.mode === 'dark' ? '#151515' : "#F7F7F2",
              }}
            >
              <Infocard
                image={image1}
                alt="An icon of lungs with branching leaves inside the lungs"
                heading="Life Expectancy"
                text={constants.homePage.more_info1}
                style={{
                  maxWidth: "11rem",
                  margin: "auto",
                  paddingTop: "1rem",
                  filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none'
                }}
              />
              <Infocard
                image={image2}
                alt="A mask icon"
                heading="Everyday Protection"
                text={constants.homePage.more_info2}
                style={{
                  maxWidth: "14rem",
                  margin: "auto",
                  paddingTop: "1rem",
                  filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none'
                }}
              />
              <Infocard
                image={image3}
                alt="A heart icon"
                heading="Exposure"
                text={constants.homePage.more_info3}
                style={{
                  maxWidth: "10rem",
                  margin: "auto",
                  paddingTop: "1rem",
                  filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none'
                }}
              />
            </Box>
          </Container>
        </InfoCardBox>
      </section>
      <Container>
        <Footer />
      </Container>
    </>
  );
};

export default Home;
export { ThickHeadingTypography, CreamBackgroundBox, SmallerHeadingBox };
