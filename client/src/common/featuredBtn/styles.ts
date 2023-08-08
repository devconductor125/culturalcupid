import { Box, BoxProps, styled } from '@mui/material';

export const ButtonContainer = styled(Box)<BoxProps>(() => ({
  width: '145px',
  height: '40px',
  borderRadius: '10px',
  background: 'green',
  color: 'white',
  ':hover': {
    cursor: 'pointer',
    background: 'gray',
  },
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  margin: '0px 10px',
}));
