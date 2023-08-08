import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

type Props = {
  open: boolean;
  onClose: any;
  onAgree: any;
  title: string;
  description: string;
  agreeText?: string;
  disAgreeText?: string;
  third?: boolean;
  thirdText?: string;
  thirdClick?: any;
};

const ConfirmationModal = ({
  open,
  onClose,
  onAgree,
  title,
  description,
  agreeText,
  disAgreeText,
  third,
  thirdClick,
  thirdText,
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent sx={{ width: "60vw" }}>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          {disAgreeText ? disAgreeText : "Disagree"}
        </Button>
        <Button onClick={onAgree} autoFocus>
          {agreeText ? agreeText : "Agree"}
        </Button>
        {third && (
          <Button onClick={thirdClick} autoFocus>
            {thirdText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
