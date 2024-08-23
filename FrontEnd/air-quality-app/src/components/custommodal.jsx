import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Box, Modal, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from 'prop-types';

const ModalStyle = {
  display: "flex",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  justifyContent: "center",
  borderRadius: "20px"
};

const CustomModal = forwardRef((props, ref) => {
  const { title, description, IconComponent, iconColor, onClose } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose(); 
    }
  };

  useImperativeHandle(ref, () => ({
    openModal: handleOpen,
    closeModal: handleClose
  }));

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={ModalStyle}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            position: "relative"
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: -20,
              right: -20
            }}
          >
            <CloseIcon />
          </IconButton>
          {IconComponent && (
            <IconComponent
              sx={{ paddingBottom: "1rem", fontSize: "10rem", color: iconColor }}
            />
          )}
          <Typography id="modal-modal-title" variant="h4" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
});

CustomModal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  IconComponent: PropTypes.object,
  iconColor: PropTypes.string,
  onClose: PropTypes.func,
};

CustomModal.displayName = "CustomModal";

export default CustomModal;