import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Container,
  Stack,
  Box,
  useTheme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import LeftArrow from '../../assets/icons/LeftArrow.svg';
import RightArrow from '../../assets/icons/RightArrow.svg';
import SwipeableViews from 'react-swipeable-views';
import { CardContainer } from './styles';
import { Slide } from 'pure-react-carousel';
import CarousalImages from '../carouselImages';

const platforms = [
  {
    name: 'World Talents',
    src: [
      'https://images.pexels.com/photos/14783579/pexels-photo-14783579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/12267963/pexels-photo-12267963.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    ],
  },
  {
    name: 'Car Bazar',
    src: [
      'https://images.pexels.com/photos/2920064/pexels-photo-2920064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/15978375/pexels-photo-15978375/free-photo-of-landscape-mountains-man-people.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    ],
  },
  {
    name: 'Cultural Cupid',
    src: [
      'https://images.pexels.com/photos/1122407/pexels-photo-1122407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/17552526/pexels-photo-17552526/free-photo-of-city-road-man-person.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    ],
  },
  {
    name: 'Italian Pizza',
    src: [
      'https://images.pexels.com/photos/6072095/pexels-photo-6072095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/16446072/pexels-photo-16446072/free-photo-of-woman-taking-a-picture-on-a-sidewalk-in-city.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    ],
  },
];

export default function Platforms() {
  const [activeSteps, setActiveSteps] = useState<number[]>(
    platforms.map(() => 0)
  );
  const theme = useTheme();
  const matchesMobile = useMediaQuery('(max-width: 600px)');
  const matchesTablet = useMediaQuery('(max-width: 960px)');

  const handleNext = (index: number) => {
    setActiveSteps((prevActiveSteps) => {
      const updatedSteps = [...prevActiveSteps];
      if (platforms[index].src.length - 1 > prevActiveSteps[index]) {
        updatedSteps[index] = prevActiveSteps[index] + 1;
      }
      return updatedSteps;
    });
  };

  const handleBack = (index: number) => {
    setActiveSteps((prevActiveSteps) => {
      const updatedSteps = [...prevActiveSteps];
      if (prevActiveSteps[index] > 0) {
        updatedSteps[index] = prevActiveSteps[index] - 1;
      }
      return updatedSteps;
    });
  };

  const handleStepChange = (step: number, index: number) => {
    setActiveSteps((prevActiveSteps) => {
      const updatedSteps = [...prevActiveSteps];
      updatedSteps[index] = step;
      return updatedSteps;
    });
  };

  return (
    <>
      {matchesMobile && matchesTablet ? (
        <CarousalImages isPlatform={true}>
          {platforms?.map((item, index) => (
            <Slide index={index}>
              <Box key={index}>
                <Card
                  sx={{
                    width: matchesMobile
                      ? '80%'
                      : matchesTablet
                      ? '50%'
                      : '25%',
                    height: '100%',
                    borderRadius: '20px',
                    backgroundColor: 'green',
                  }}
                >
                  <CardActionArea>
                    <CardMedia>
                      <Box sx={{ position: 'relative' }}>
                        <SwipeableViews
                          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                          index={activeSteps[index]}
                          onChangeIndex={(step) =>
                            handleStepChange(step, index)
                          }
                          enableMouseEvents
                        >
                          {item?.src?.map((step: any, imgIndex: any) => (
                            <div key={imgIndex}>
                              <>
                                <img
                                  src={step}
                                  // width={fullScreen ? "100%" : 345}
                                  // height={fullScreen ? "500px" : 255}
                                  alt="PlatformImage"
                                  style={{
                                    borderRadius: '22px 22px 0px 0px',
                                    width: '100%',
                                    height: '255px',
                                    objectFit: 'cover',
                                  }}
                                />
                              </>
                            </div>
                          ))}
                        </SwipeableViews>
                        <Box
                          sx={{
                            display: 'flex',
                            position: 'absolute',
                            top: 0,
                            width: '100%',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Typography
                            component={'button'}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBack(index);
                            }}
                            sx={{
                              height: '255px',
                              justifyContent: 'center',
                              paddingTop: '40px',
                              background: '#0000006b',
                              borderRadius: '20px 0px 0px 0px',
                            }}
                            disabled={activeSteps[index] === 0}
                          >
                            <img src={LeftArrow} alt="LeftArrow" height={15} />
                          </Typography>
                          <Typography
                            component={'button'}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNext(index);
                            }}
                            sx={{
                              height: '255px',
                              justifyContent: 'center',
                              paddingTop: '40px',
                              background: '#0000006b',
                              borderRadius: '0px 20px 0px 0px',
                            }}
                            disabled={
                              activeSteps[index] === item.src.length - 1
                            }
                          >
                            <img
                              src={RightArrow}
                              alt="RightArrow"
                              height={15}
                            />
                          </Typography>
                        </Box>
                      </Box>
                    </CardMedia>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        color={'white'}
                        sx={{ textTransform: 'uppercase', fontWeight: 900 }}
                      >
                        {item.name}
                      </Typography>
                      <Box
                        sx={{
                          position: 'relative',
                          bottom: '10%',
                          // left: "20%",
                        }}
                      >
                        <Button
                          // variant="text"
                          sx={{
                            background: 'white',
                            color: 'black',
                            fontSize: '20px',
                            fontWeight: 600,
                            paddingX: 1,
                            paddingY: 0,
                          }}
                          size="small"
                        >
                          Visit website
                        </Button>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            </Slide>
          ))}
        </CarousalImages>
      ) : (
        <CardContainer>
          <Stack
            display="flex"
            direction="row"
            alignItems="center"
            justifyContent="start"
            spacing={4}
            mb={2}
            py={2}
            textAlign="center"
          >
            {platforms.map((item, index) => (
              <Card
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '20px',
                  backgroundColor: 'green',
                }}
              >
                <CardActionArea>
                  <CardMedia>
                    <Box sx={{ position: 'relative' }}>
                      <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeSteps[index]}
                        onChangeIndex={(step) => handleStepChange(step, index)}
                        enableMouseEvents
                      >
                        {item?.src?.map((step: any, imgIndex: any) => (
                          <div key={imgIndex}>
                            <>
                              <img
                                src={step}
                                // width={fullScreen ? "100%" : 345}
                                // height={fullScreen ? "500px" : 255}
                                alt="PlatformImage"
                                style={{
                                  borderRadius: '22px 22px 0px 0px',
                                  width: '100%',
                                  height: '255px',
                                  objectFit: 'cover',
                                }}
                              />
                            </>
                          </div>
                        ))}
                      </SwipeableViews>
                      <Box
                        sx={{
                          display: 'flex',
                          position: 'absolute',
                          top: 0,
                          width: '100%',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography
                          component={'button'}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBack(index);
                          }}
                          sx={{
                            height: '255px',
                            justifyContent: 'center',
                            paddingTop: '40px',
                            background: '#0000006b',
                            borderRadius: '20px 0px 0px 0px',
                          }}
                          disabled={activeSteps[index] === 0}
                        >
                          <img src={LeftArrow} alt="LeftArrow" height={30} />
                        </Typography>
                        <Typography
                          component={'button'}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNext(index);
                          }}
                          sx={{
                            height: '255px',
                            justifyContent: 'center',
                            paddingTop: '40px',
                            background: '#0000006b',
                            borderRadius: '0px 20px 0px 0px',
                          }}
                          disabled={activeSteps[index] === item.src.length - 1}
                        >
                          <img src={RightArrow} alt="RightArrow" height={30} />
                        </Typography>
                      </Box>
                    </Box>
                  </CardMedia>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      color={'white'}
                      sx={{ textTransform: 'uppercase', fontWeight: 900 }}
                    >
                      {item.name}
                    </Typography>
                    <Box
                      sx={{
                        position: 'relative',
                        bottom: '10%',
                        // left: "20%",
                      }}
                    >
                      <Button
                        // variant="text"
                        sx={{
                          background: 'white',
                          color: 'black',
                          fontSize: '20px',
                          fontWeight: 600,
                          paddingX: 1,
                          paddingY: 0,
                        }}
                        size="small"
                      >
                        Visit website
                      </Button>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Stack>
        </CardContainer>
      )}
    </>
  );
}
