import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface BackdropProps {
    open: boolean
    onClose?: (flag: boolean) => void
}

export default function SimpleBackdrop({onClose, open}:BackdropProps) {

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={() => onClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}