import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import circularProgressClasses from "@mui/material";
import { GET_CRM_USERS, PUSH_NEW_LEAD } from "@/gql/mutations/CRM";
import Image from "next/image";
import backgroundImage from "./images/VC.png";
import Alert from "@mui/material/Alert";
import { storage } from "@/API/firebase";
import { PUSH_NEW_SALE_MUTATION } from "@/gql/mutations/CRM";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import { v4 as uuidv4 } from "uuid";
import { uuid } from "uuidv4";

const LeadIntake = () => {
  const [pushNewLead, { Leadloading, Leaderror }] = useMutation(PUSH_NEW_LEAD);

  const [CRMusers, setCRMusers] = useState([]);
  const [pushNewSale, { newSaleloading, error }] = useMutation(
    PUSH_NEW_SALE_MUTATION
  );

  const [selectedDate, setSelectedDate] = useState(null);
  const [value, onChange] = useState(new Date());

  const [utilityBillFile, setUtilityBillFile] = React.useState(null);
  const [utilityBillImage, setUtilityBillImage] = React.useState(null);

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  const [loading, setLoading] = useState(false);

  const [installMarkets, setInstallers] = useState([
    { id: 0, name: "Voltaic Construction" },
    { id: 1, name: "Greenspire" },
    { id: 2, name: "Voltaic Finance" },
    { id: 3, name: "Titanium Solar" },
    { id: 4, name: "AC/DC" },
  ]);

  const [programs, setPrograms] = useState([
    { id: 0, name: "Financing" },
    { id: 1, name: "Program 2" },
    { id: 2, name: "Program 3" },
    { id: 3, name: "Program 4" },
    { id: 4, name: "Program 5" },
    { id: 5, name: "Program 6" },
  ]);

  const [adders, serAddres] = useState([
    { id: 0, name: "Quiet Cool" },
    { id: 1, name: "Roof" },
    { id: 2, name: "MPU" },
    { id: 3, name: "HVAC" },
    { id: 4, name: "Insulation" },
    { id: 5, name: "Sub Pannel" },
  ]);

  const [getCRMusers, { data }] = useMutation(GET_CRM_USERS);
  const [atticFile, setAtticFile] = React.useState(null);
  const [electricalFile, setElectricalFile] = React.useState(null);
  const [licenseFile, setLicenseFile] = React.useState(null);
  const [depositFile, setDepositFile] = React.useState(null);
  const [formValid, setFormValid] = React.useState(true);
  const [installer, setInstaller] = React.useState("");

  const [adder, setAdder] = React.useState([]);
  const [rep, setRep] = React.useState("");
  const [atticImage, setAtticImage] = React.useState(null);
  const [electricalImage, setElectricalImage] = React.useState(null);
  const [licenseImage, setLicenseImage] = React.useState(null);
  const [depositImage, setDepositImage] = React.useState(null);

  const [ownerName, setOwnerName] = React.useState("");

  const [Ambassador, setAmbassador] = React.useState("");
  const [Address, setAddress] = React.useState("");

  const [Phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [notes, setNotes] = React.useState("");
  const [program, setProgram] = React.useState("");

  //   const [installer, setInstaller] = React.useState('');

  //   const [installer, setInstaller] = React.useState('');

  //   const [installer, setInstaller] = React.useState('');

  // CHANGE HANDLERS

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

  const handleOwnerChange = (event) => {
    setOwnerName(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNotes(event.target.value);
  };

  const {
    getRootProps: getUtilityBillProps,
    getInputProps: getUtilityBillInputProps,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUtilityBillFile(acceptedFiles[0]);

      const file = acceptedFiles[0];

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          // setPreview(reader.result);
        };
        reader.readAsDataURL(file);

        const preUri = "images/item.jpg" + uuidv4();
        const pathReference = ref(storage, preUri);
        // 'file' comes from the Blob or File API
        uploadBytes(pathReference, file).then((snapshot) => {
          console.log("Uploaded a blob or file!");
          console.log(snapshot.metadata.fullPath);
          const gsReference = ref(storage, "gs://bucket" + preUri);

          // Create a reference from an HTTPS URL
          // Note that in the URL, characters are URL escaped!
          const httpsReference = ref(
            storage,
            "https://firebasestorage.googleapis.com/v0/b/voltaic-383203.appspot.com/o/" +
              encodeURIComponent(preUri)
          );

          getDownloadURL(httpsReference).then((url) => {
            // `url` is the download URL for 'images/stars.jpg'
            console.log(url);
            setUtilityBillImage(url);
          });
        });
      } else {
        console.log("no file");
      }
    },
  });

  const { getRootProps: getAtticProps, getInputProps: getAtticInputProps } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        setAtticFile(acceptedFiles[0]);

        const file = acceptedFiles[0];

        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            //   setPreview(reader.result);
          };
          reader.readAsDataURL(file);

          // const storageRef = ref(storage, `images/${uuid()}`);

          const preUri = "images/item.jpg" + uuidv4();
          const pathReference = ref(storage, preUri);
          // 'file' comes from the Blob or File API
          uploadBytes(pathReference, file).then((snapshot) => {
            console.log("Uploaded a blob or file!");
            console.log(snapshot.metadata.fullPath);
            const gsReference = ref(storage, "gs://bucket" + preUri);

            // Create a reference from an HTTPS URL
            // Note that in the URL, characters are URL escaped!
            const httpsReference = ref(
              storage,
              "https://firebasestorage.googleapis.com/v0/b/voltaic-383203.appspot.com/o/" +
                encodeURIComponent(preUri)
            );

            getDownloadURL(httpsReference).then((url) => {
              // `url` is the download URL for 'images/stars.jpg'

              console.log(url);
              setAtticImage(url);
            });
          });
        } else {
          console.log("no file");
        }
      },
    });

  const {
    getRootProps: getElectricalProps,
    getInputProps: getElectricalInputProps,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setElectricalFile(acceptedFiles[0]);

      const file = acceptedFiles[0];

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          //   setPreview(reader.result);
        };
        reader.readAsDataURL(file);

        // const storageRef = ref(storage, `images/${uuid()}`);

        const preUri = "images/item.jpg" + uuidv4();
        const pathReference = ref(storage, preUri);
        // 'file' comes from the Blob or File API
        uploadBytes(pathReference, file).then((snapshot) => {
          console.log("Uploaded a blob or file!");
          console.log(snapshot.metadata.fullPath);
          const gsReference = ref(storage, "gs://bucket" + preUri);

          // Create a reference from an HTTPS URL
          // Note that in the URL, characters are URL escaped!
          const httpsReference = ref(
            storage,
            "https://firebasestorage.googleapis.com/v0/b/voltaic-383203.appspot.com/o/" +
              encodeURIComponent(preUri)
          );

          getDownloadURL(httpsReference).then((url) => {
            // `url` is the download URL for 'images/stars.jpg'

            console.log(url);
            setElectricalImage(url);
          });
        });
      } else {
        console.log("no file");
      }
    },
  });

  const { getRootProps: getLicenseProps, getInputProps: getLicenseInputProps } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        setLicenseFile(acceptedFiles[0]);

        const file = acceptedFiles[0];

        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            //   setPreview(reader.result);
          };
          reader.readAsDataURL(file);

          // const storageRef = ref(storage, `images/${uuid()}`);

          const preUri = "images/item.jpg" + uuidv4();
          const pathReference = ref(storage, preUri);
          // 'file' comes from the Blob or File API
          uploadBytes(pathReference, file).then((snapshot) => {
            console.log("Uploaded a blob or file!");
            console.log(snapshot.metadata.fullPath);
            const gsReference = ref(storage, "gs://bucket" + preUri);

            // Create a reference from an HTTPS URL
            // Note that in the URL, characters are URL escaped!
            const httpsReference = ref(
              storage,
              "https://firebasestorage.googleapis.com/v0/b/voltaic-383203.appspot.com/o/" +
                encodeURIComponent(preUri)
            );

            getDownloadURL(httpsReference).then((url) => {
              // `url` is the download URL for 'images/stars.jpg'

              setLicenseImage(url);

              console.log(url);
            });
          });
        } else {
          console.log("no file");
        }
      },
    });

  const { getRootProps: getDepositProps, getInputProps: getDepositInputProps } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        setDepositFile(acceptedFiles[0]);

        const file = acceptedFiles[0];

        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            //   setPreview(reader.result);
          };
          reader.readAsDataURL(file);

          // const storageRef = ref(storage, `images/${uuid()}`);

          const preUri = "images/item.jpg" + uuidv4();
          const pathReference = ref(storage, preUri);
          // 'file' comes from the Blob or File API
          uploadBytes(pathReference, file).then((snapshot) => {
            console.log("Uploaded a blob or file!");
            console.log(snapshot.metadata.fullPath);
            const gsReference = ref(storage, "gs://bucket" + preUri);

            // Create a reference from an HTTPS URL
            // Note that in the URL, characters are URL escaped!
            const httpsReference = ref(
              storage,
              "https://firebasestorage.googleapis.com/v0/b/voltaic-383203.appspot.com/o/" +
                encodeURIComponent(preUri)
            );

            getDownloadURL(httpsReference).then((url) => {
              // `url` is the download URL for 'images/stars.jpg'

              setDepositImage(url);
              console.log(url);

              //  alert("url");
            });
          });
        } else {
          console.log("no file");
        }
      },
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let formIsValid = true;

    // Validate form fields
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
      if (!value) {
        formIsValid = false;
      }
    }

    // Validate file inputs
    if (!utilityBillFile) {
      formIsValid = false;
    }

    if (formIsValid) {
      setFormValid(true);
      console.log("Form is valid");
      console.log("ownerName:", ownerName);
      console.log("Ambassador:", Ambassador);
      console.log("Address:", Address);
      console.log("Phone:", Phone);
      console.log("Email:", email);
      console.log("Date:", selectedDate);
      console.log("Utility Bill File:", utilityBillImage);

      pushNewLead({
        variables: {
          HomeownerName: ownerName,
          AmbassadorName: Ambassador,
          Address: Address,
          Phone: Phone,
          Email: email,
          DateString: "selectedDate",
          UtilityBill: utilityBillImage,
        },
      }).catch(console.error);

      console.log("Pushed lead record to qb.");

      // Rest of your code
    } else {
      console.log("Form is invalid");
      console.log("Utility Bill File:", utilityBillImage);
      setFormValid(false);
    }
  };

  // useEffect(() => {
  //   getCRMusers().then((response) => {
  //     //   alert("Data has been sent to the server");

  //     console.log(response.data.GetCRMusers);

  //     const usersWithIds = response.data.GetCRMusers.map((user, index) => {
  //       return {
  //         ...user,
  //         id: index,
  //       };
  //     });

  //     setCRMusers(usersWithIds);
  //   });
  // }, []);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
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
          sx={{
            width: { xs: "100%", md: "2rem" },
            height: ".5em",
          }}
        />
      </Box>
      <Box sx={{ backgroundColor: "#fff", p: "2rem", marginTop: "20vh" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: "1rem",
            width: { xs: "80vw", md: "60vw" },
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* HOME OWNER NAME */}
            <InputLabel sx={{ marginBottom: "20px", color: "red" }}>
              Home Owner Name *
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
            {/* SALES REP NAME */}
            <InputLabel sx={{ marginBottom: "20px", color: "red" }}>
              Ambassador Name
            </InputLabel>
            <TextField
              id="outlined-basic"
              label="Ambassador"
              variant="outlined"
              name="Ambassador"
              value={Ambassador}
              onChange={(event) => setAmbassador(event.target.value)}
              sx={{ width: "20em", marginBottom: "20px" }}
            />
            {/* INSTALLER  */}
            <InputLabel sx={{ marginBottom: "20px", color: "red" }}>
              Address
            </InputLabel>

            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              name="Address"
              value={Address}
              onChange={(event) => setAddress(event.target.value)}
              sx={{ width: "20em", marginBottom: "20px" }}
            />
            <InputLabel sx={{ marginBottom: "20px", color: "red" }}>
              Phone
            </InputLabel>

            <TextField
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              name="Phone"
              value={Phone}
              onChange={(event) => setPhone(event.target.value)}
              sx={{ width: "20em", marginBottom: "20px" }}
            />
            <InputLabel sx={{ marginBottom: "20px", color: "red" }}>
              Email
            </InputLabel>

            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              name="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              sx={{ width: "20em", marginBottom: "20px" }}
            />
            {/* Date and Time */}
            <InputLabel sx={{ marginBottom: "20px", color: "red" }}>
              Date
            </InputLabel>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "2px dashed #333",
                borderRadius: "5px",
                padding: "1rem",
                cursor: "pointer",
              }}
            >
              <DateTimePicker onChange={onChange} value={value} />
            </Box>

            <InputLabel sx={{ marginBottom: "20px", color: "red" }}>
              Utility Bill
            </InputLabel>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "2px dashed #333",
                borderRadius: "5px",
                padding: "1rem",
                cursor: "pointer",
              }}
              {...getUtilityBillProps()}
            >
              <input {...getUtilityBillInputProps()} />
              <Typography variant="body1" sx={{ color: "#333" }}>
                Drag and drop your Utility Bill file here, or click to select a
                file
              </Typography>
              {utilityBillFile ? (
                <Typography variant="body1" sx={{ color: "#333" }}>
                  {utilityBillFile.name}
                </Typography>
              ) : null}
            </Box>

            <Button
              variant="contained"
              sx={{ backgroundColor: "#333", color: "#fff", marginTop: "1rem" }}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default LeadIntake;
