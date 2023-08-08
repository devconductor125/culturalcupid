import { Button, ButtonProps, styled } from '@mui/material';

export const ButtonStyles = styled(Button)<ButtonProps>(() => ({
  borderRadius: 10,
  background: 'green',
  height: 72,
  width: 247,
  fontFamily: 'Heebo',
  fontSize: '32px !important',
}));

export const ButtonLabel = styled('div')(() => ({
  fontFamily: 'Heebo',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '26px',
  margin: 'auto',
  textTransform: 'capitalize',
}));
