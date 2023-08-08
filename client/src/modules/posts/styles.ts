import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Rectangle from '../../assets/vector.svg';

export const ModalContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: `url(${Rectangle}) no-repeat`,
  border: '2px solid #000',
  boxShadow: '24px',
  padding: '25px',
  width: '80vw',
  height: '90vh',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  backgroundPosition: 'top',
  overflowY: 'scroll',
}));
