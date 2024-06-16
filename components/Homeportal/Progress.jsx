import React from 'react';
import { Stepper, Step, StepLabel, Typography, Box } from '@mui/material';

const steps = ['New Sale', 'Welcome Call', 'Site Survey', 'NTP', 'QC Check', 'Plans', 'FLA', 'Solar Install', 'Final Inspection', 'PTO'];

const ProgressTracker = ({ currentStep }) => {
  return (
    <Box
      sx={{
        minHeight: '100px',
        maxHeight: '400px',
        overflowY: 'auto',
        scrollbarWidth: 'thin',
        WebkitOverflowScrolling: 'touch',
        padding: '0 50px'
      }}
    >
      <Stepper activeStep={currentStep} orientation="vertical">
        {steps.map((step, index) => {
          const isCompleted = currentStep[index] && currentStep[index].length > 0;
          return (
            <Step key={step} completed={isCompleted}>
              <StepLabel>
                {step}
                {isCompleted && (
                  <Typography variant="caption" sx={{ color: 'green', display: 'block', mt: 0.5 }}>
                    Completed
                  </Typography>
                )}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default ProgressTracker;
