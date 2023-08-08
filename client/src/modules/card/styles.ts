import { Box, TypographyProps, styled } from '@mui/material';
import Rectangle from '../../assets/Rectangle.png';

export const CardConatiner = styled('div')<TypographyProps>(() => ({
  width: '345px',
  height: '390px',
  borderRadius: '20px',
  background: 'green',
}));

export const UtilsText = styled('span')(() => ({
  marginLeft: '2px',
  fontFamily: 'Heebo',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '11px',
  cursor: 'pointer',
}));

export const ModalContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: `url(${Rectangle}) no-repeat`,
  border: '2px solid #000',
  boxShadow: '24px',
  padding: '25px',
  width: '60vw',
  height: '60vh',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  flexDirection: 'column',
  backgroundPosition: 'top',
}));
