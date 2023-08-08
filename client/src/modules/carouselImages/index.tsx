import {
  CarouselProvider,
  Slider,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import { useTheme, useMediaQuery } from '@mui/material';
import left from '../../assets/icons/left.svg';
import leftPurple from '../../assets/leftPurple.png';
import rightPurple from '../../assets/rightPurple.png';
import right from '../../assets/icons/right.svg';

interface CarousalImagesProps {
  children?: React.ReactNode[];
  isPlatform?: boolean;
}

const LeftBtnStyle: React.CSSProperties = {
  position: 'absolute',
  top: '45%',
  zIndex: 1,
  transform: 'translateY(-50%)',
  borderRadius: 50,
  width: 60,
  height: 60,
  opacity: 0.6,
  border: 'transparent',
};

const LeftBtnStyleMD: React.CSSProperties = {
  position: 'absolute',
  top: '25%',
  zIndex: 1,
  transform: 'translateX(-50%)',
  borderRadius: 30,
  // width: 60,
  // height: 60,
  width: 40,
  height: 40,
  opacity: 0.6,
  border: 'transparent',
  background: '#F0A8AA',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  // paddingRight: "11px"
};

const LeftBtnStylePlatformMD: React.CSSProperties = {
  position: 'absolute',
  top: '22%',
  zIndex: 1,
  transform: 'translateX(-30%)',
  borderRadius: 30,
  background: 'transparent',
  border: 'transparent',
  width: 60,
  height: 70,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
};

const RightBtnStyle: React.CSSProperties = {
  position: 'absolute',
  top: '45%',
  zIndex: 1,
  right: 0,
  transform: 'translateY(-50%)',
  borderRadius: 50,
  width: 60,
  height: 60,
  opacity: 0.6,
  border: 'transparent',
};

const RightBtnStyleMD: React.CSSProperties = {
  position: 'absolute',
  top: '25%',
  zIndex: 1,
  right: 0,
  transform: 'translateX(50%)',
  borderRadius: 30,
  // width: 60,
  // height: 60,
  width: 40,
  height: 40,
  opacity: 0.6,
  border: 'transparent',
  background: '#F0A8AA',
  display: 'flex',
  alignItems: 'center',
  // paddingLeft : "11px"
};

const RightBtnStylePlatformMD: React.CSSProperties = {
  position: 'absolute',
  top: '22%',
  zIndex: 1,
  right: 0,
  transform: 'translateX(30%)',
  borderRadius: 30,
  background: 'transparent',
  border: 'transparent',
  width: 60,
  height: 70,
  display: 'flex',
  // justifyContent: "flex-end",
  alignItems: 'center',
};

const CarousalImages = ({ children, isPlatform }: CarousalImagesProps) => {
  const theme = useTheme();
  const mediaQuery = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={120}
      visibleSlides={mediaQuery && isPlatform ? 1 : mediaQuery ? 3 : 4}
      totalSlides={children && children?.length > 0 ? children.length : 0}
      lockOnWindowScroll={false}
      dragEnabled={false}
    >
      {mediaQuery && isPlatform ? (
        <ButtonBack style={mediaQuery && LeftBtnStylePlatformMD}>
          <img src={leftPurple} height={'70px'} alt="" />
        </ButtonBack>
      ) : (
        <ButtonBack style={mediaQuery ? LeftBtnStyleMD : LeftBtnStyle}>
          <img src={left} height={mediaQuery ? 15 : 'auto'} alt="" />
        </ButtonBack>
      )}
      {/* <ButtonBack style={mediaQuery ? LeftBtnStyleMD : LeftBtnStyle}>
          <img src={left} height={mediaQuery ? 15: "auto"} alt="" />
        </ButtonBack> */}
      {mediaQuery && isPlatform ? (
        <ButtonNext style={mediaQuery && RightBtnStylePlatformMD}>
          <img src={rightPurple} height={'70px'} alt="" />
        </ButtonNext>
      ) : (
        <ButtonNext style={mediaQuery ? RightBtnStyleMD : RightBtnStyle}>
          <img src={right} height={mediaQuery ? 15 : 'auto'} alt="" />
        </ButtonNext>
      )}
      {/* <ButtonNext style={mediaQuery ? RightBtnStyleMD : RightBtnStyle}>
          <img src={right} height={mediaQuery ? 15: "auto"} alt="" />
        </ButtonNext> */}
      <Slider
        style={{
          textAlign: '-webkit-center',
          height:
            mediaQuery && isPlatform ? '500px' : mediaQuery ? '130px' : '500px',
        }}
      >
        {children}
      </Slider>
    </CarouselProvider>
  );
};

export default CarousalImages;
