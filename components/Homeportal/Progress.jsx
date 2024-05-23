import React from 'react';
import { Box, Chip, Stack, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const steps = ['New Sale', 'Welcome Call', 'Site Survey', 'Site Survey', 'NTP', 'QC Check', 'Plans', 'FLA'];

const ProgressTracker = ({ currentStep }) => {
  return (
    <Stack direction="row" spacing={1} sx={{ margin: 2, overflowX: 'auto' }}>
      {steps.map((step, index) => (
        <Chip
          label={step}
          key={index}
          color={index <= currentStep ? 'primary' : 'default'}
          icon={index <= currentStep ? <CheckIcon /> : null}
          clickable={false}
        />
      ))}
    </Stack>
  );
};

export default ProgressTracker;
