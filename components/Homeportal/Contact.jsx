import React from 'react';
import { Box, Fab } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

const QuickContact = ({ onChatClick }) => {
  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
      <Fab color="primary" aria-label="chat" onClick={onChatClick}>
        <ChatIcon />
      </Fab>
    </Box>
  );
};

export default QuickContact;
