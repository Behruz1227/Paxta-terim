// src/components/CustomModal.tsx
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';


interface CustomModalProps {
  title: string;                
  children: React.ReactNode;    
  open: boolean;               
  onClose: () => void;          
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',                
  maxWidth: 400,            
  bgcolor: 'background.paper',
  borderRadius:1,
  boxShadow: 24,
  p: 4,
};

export const Modals: React.FC<CustomModalProps> = ({ title, children, open, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <Box sx={style}>
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      <Box sx={{ mt: 2 }}>
        {children}
      </Box>
    </Box>
  </Modal>
);
