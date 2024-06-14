import React, { useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

const Approve = ({ result, id }) => {




// Function to format the date in YYYY-MM-DD format
function formatDate(date) {
  let day = ('0' + date.getDate()).slice(-2); // Get the day and pad with zero if needed
  let month = ('0' + (date.getMonth() + 1)).slice(-2); // Get the month, add 1 (since months are zero-indexed), and pad with zero if needed
  let year = date.getFullYear(); // Get the full year
  return `${year}-${month}-${day}`; // Concatenate in the desired format
}



  const submitFLAresponse = async ({ decisionStatus, eventID }) => {

    // Today's date formatted
    var today = formatDate(new Date()).toString();

   
    const QB_DOMAIN = "voltaic.quickbase.com";
    const API_ENDPOINT = "https://api.quickbase.com/v1/records";

    const headers = {
      Authorization: "QB-USER-TOKEN b7738j_qjt3_0_dkaew43bvzcxutbu9q4e6crw3ei3",
      "QB-Realm-Hostname": QB_DOMAIN,
      "Content-Type": "application/json",
    };

    let requestBody = {
      to: "br5cqr3sn", // Table identifier in Quickbase
      data: [{
        3: { value: eventID },
        26: { value: "" },
        17: { value: today }, //Needs to be date
      }],
      fieldsToReturn: [] // Specify fields to return, if any
    };

    if (decisionStatus === "1") { // Use `===` for comparison
      requestBody.data = [{
        3: { value: eventID },
        26: { value: "251" },
        17: { value: today  },
      }];
    } else {
      requestBody.data = [{
        3: { value: eventID },
        26: { value: "629" },
        17: { value: today  },//Needs to be date
      }];
    }

    try {
      const response = await axios.post(API_ENDPOINT, requestBody, { headers });
      console.log("Success!", response.data);
    } catch (error) {
      console.error("Failed to send data:", error);
      throw error; // Rethrow or handle error as needed
    }
  };

  // useEffect to call submitFLAresponse on component mount
  useEffect(() => {
    if (id && result) {
      submitFLAresponse({ decisionStatus: result, eventID: id });
    }
  }, [id, result]); // Dependencies array includes id and result

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'blue',
      }}
    >
      <Box
        sx={{
          padding: 4,
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h6" textAlign="center">
          Hello {id}, Thank you for confirming your FLA approval!
        </Typography>
      </Box>
    </Box>
  );
};

export default Approve;
