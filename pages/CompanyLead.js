import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Button,
  InputLabel,
  Select,
  Paper,
  MenuItem,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { PUSH_NEW_COMPANY_LEAD } from "@/gql/mutations/CRM";
import { useMutation, gql } from "@apollo/client"; // Import useMutation and gql
import { CircularProgress } from '@mui/material';
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import backgroundImage from "./images/VC.png";
import Alert from "@mui/material/Alert";

const MyForm = () => {
  const [CRMusers, setCRMusers] = useState([]);
  
  const [pushNewLead, { newSaleloading, error }] = useMutation(
    PUSH_NEW_COMPANY_LEAD
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formValid, setFormValid] = React.useState(true);
  const [installer, setInstaller] = React.useState("");
  const [adder, setAdder] = React.useState([]);
  const [rep, setRep] = React.useState("");
  const [leadgen, setLeadgen] = React.useState("");
  const [ownerName, setOwnerName] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [program, setProgram] = React.useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [disableDateTimeInput, setDisableDateTimeInput] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toISOString().slice(0, 16));

  const handleCheckboxChange = (checked) => {
    setIsChecked(checked);
    setDisableDateTimeInput(!checked);
  };

  const handleChange = (event) => {
    setInstaller(event.target.value);
  };

  const handleProgramChange = (event) => {
    setProgram(event.target.value);
  };

  const handleAdderChange = (event) => {
    setAdder(event.target.value);
  };

  const handleRepChange = (event) => {
    setRep(event.target.value);
  };

  const handleLeadgenChange = (event) => {
    setLeadgen(event.target.value);
  };

  const handleOwnerChange = (event) => {
    setOwnerName(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNotes(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let formIsValid = true;
    for (let [key, value] of formData.entries()) {
      if (!value) {
        formIsValid = false;
      }
    }

    if (formIsValid) {
      setFormValid(true);
      try {
        const result = await pushNewLead({
          variables: {
            homeowner: ownerName,
            electricBill: leadgen,
            primaryStatus: rep,
            secondaryStatus: installer,
            FollowUp: isChecked ? "Held" : "Not Held",
            Datetime: isChecked ? currentDateTime : null,
            Notes: notes
          }
        });
        console.log("Mutation result:", result);
        setIsSubmitted(true);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setFormValid(false);
    }
  };

  useEffect(() => {
    // Fetch CRM users data
  }, []);

  if (isSubmitted) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
          color: "#333",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: "24px",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Thank you for submitting!
          </Typography>
          <ToggleButtonGroup
            value={isSubmitted ? "on" : "off"}
            exclusive
            onChange={() => setIsSubmitted(false)}
            sx={{ marginTop: "16px" }}
          >
            <ToggleButton value="on">
              Submit again
            </ToggleButton>
          </ToggleButtonGroup>
        </Paper>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: '10em'
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "20vh",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={backgroundImage}
            style={{ width: "25rem", height: "9.5em" }}
          />
        </Box>
        <Box sx={{ backgroundColor: "#fff", width :"90%",  paddingLeft: '10%' }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "60vw",
            }}
          >
            <h1 style={{ fontFamily: 'sans-serif', fontWeight: 'bold' , color: 'black' }} > Company Lead</h1>
            <form onSubmit={handleSubmit}>
              <InputLabel sx={{ marginBottom: "20px", color: "red" }}>
                Homeowner Name *
              </InputLabel>
              <TextField
                id="outlined-basic"
                label="ownerName"
                variant="outlined"
                name="ownerName"
                value={ownerName}
                onChange={handleOwnerChange}
                sx={{ width: "20em", marginBottom: "20px" }}
              />
              <InputLabel sx={{ marginBottom: "20px", color: "red" }}>
                Average Electric Bill*
              </InputLabel>
              <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={leadgen}
              label="Utility Bill"
              onChange={handleLeadgenChange}
              sx={{ width: "20em", marginBottom: "20px" }}
            >
              <MenuItem value="0-$50">
                0-$50
              </MenuItem>
              <MenuItem value="$51-100">
                $51-100
              </MenuItem>
              <MenuItem value="$101 - $150">
                $101 - $150
              </MenuItem>
              <MenuItem value="$150-$200">
                $150-$200
              </MenuItem>
              <MenuItem value="$200+">
                $200+
              </MenuItem>
            </Select>

              <InputLabel sx={{ marginBottom: "20px", color: "red" }}>
                Primary Appt Status *
              </InputLabel>
              <Select
  labelId="demo-simple-select-helper-label"
  id="demo-simple-select-helper"
  value={rep}
  label="Sale Rep"
  onChange={handleRepChange}
  sx={{ width: "20em", marginBottom: "20px" }}
>
  <MenuItem value="Held">
    Held
  </MenuItem>
  <MenuItem value="Not Held">
    Not Held
  </MenuItem>
</Select>
      <InputLabel sx={{ marginBottom: "20px", color: "red" }}>
                Secondary Appt Status *
              </InputLabel>
<Select
  labelId="demo-simple-select-helper-label"
  id="demo-simple-select-helper"
  value={installer}
  label="Age"
  onChange={handleChange}
  sx={{ width: "15em", marginBottom: "20px" }}
>
  <MenuItem value="Held">
    Held
  </MenuItem>
  <MenuItem value="Not Held">
    Not Held
  </MenuItem>
</Select>

        
              
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={(e) => handleCheckboxChange(e.target.checked)}
                  />
                }
                label="Your Checkbox Label"
              />
              <TextField
                id="datetime-local"
                label="Next appointment"
                type="datetime-local"
                defaultValue={currentDateTime}
                disabled={disableDateTimeInput}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <InputLabel
                sx={{ marginTop: "20px", marginBottom: "20px", color: "red" }}
              >
                Notes{" "}
              </InputLabel>
              <TextField
                id="outlined-basic"
                label="notes"
                variant="outlined"
                name="notes"
                value={notes}
                onChange={handleNoteChange}
                sx={{ width: "20em", marginBottom: "20px" }}
              />
              {!formValid && (
                <Alert severity="error" sx={{ marginTop: "1rem" }}>
                  Please fill out all required fields and upload all required files
                </Alert>
              )}
              {(ownerName) ? (
                <>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#333", color: "#fff", marginTop: "1rem" }}
                    type="submit"
                  >
                    Submit
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#333", color: "#fff", marginTop: "1rem" , width: '100%' }}
                    type="submit"
                    disabled={true}
                  >
                    Please Submit all required fields
                  </Button>
                </>
              )}
            </form>
          </Box>
        </Box>
      </Box>
    );
  }
};

export default MyForm;