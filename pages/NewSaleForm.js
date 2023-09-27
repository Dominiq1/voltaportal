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
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import circularProgressClasses from "@mui/material";
import { GET_CRM_USERS } from "@/gql/mutations/CRM";
import Image from "next/image";
import backgroundImage from "./images/VC.png";
import Alert from "@mui/material/Alert";
import { storage } from "@/API/firebase";
import { PUSH_NEW_SALE_MUTATION } from "@/gql/mutations/CRM";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { v4 as uuidv4 } from "uuid";
import { uuid } from "uuidv4";

const MyForm = () => {
  const [CRMusers, setCRMusers] = useState([]);
  const [pushNewSale, { newSaleloading, error }] = useMutation(
    PUSH_NEW_SALE_MUTATION
  );

  const [loading, setLoading] = useState(false);

  const [installMarkets, setInstallers] = useState([
    { id: 0, name: "Voltaic Construction" },
    { id: 1, name: "Greenspire" },
    { id: 2, name: "Voltaic Finance" },
    { id: 3, name: "Titanium Solar" },
    { id: 4, name: "AC/DC" },
    { id: 4, name: "Ascension" },
    { id: 4, name: "LGCY" },
  ]);

  const [programs, setPrograms] = useState([
    { id: 0, name: "Cash" },
    { id: 1, name: "Dividend" },
    { id: 2, name: "Enium" },
    { id: 3, name: "Everbright" },
    { id: 4, name: "Everbrite" },
    { id: 5, name: "Foundation" },
    { id: 6, name: "Goodleap" },
    { id: 7, name: "Loanpal" },
    { id: 8, name: "Mosaic" },
    { id: 9, name: "Sunnova" },
    { id: 10, name: "Sunrun" },
    { id: 11, name: "Ygrene" },
  ]);

  const [adders, serAddres] = useState([
    { id: 0, name: "Quiet Cool" },
    { id: 1, name: "Roof" },
    { id: 2, name: "MPU" },
    { id: 3, name: "HVAC" },
    { id: 4, name: "Insulation" },
    { id: 5, name: "Sub Pannel" },
    { id: 6, name: "Solar" },
    { id: 7, name: "Battery" },
    { id: 8, name: "Critter Guard" },
    { id: 9, name: "Derate" },
    { id: 10, name: "EV Charger" },
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
  const [leadgen, setLeadgen] = React.useState("");

  const [atticImage, setAtticImage] = React.useState(null);
  const [electricalImage, setElectricalImage] = React.useState(null);
  const [licenseImage, setLicenseImage] = React.useState(null);
  const [depositImage, setDepositImage] = React.useState(null);

  const [ownerName, setOwnerName] = React.useState("");
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

  const handleLeadgenChange = (event) => {
    setLeadgen(event.target.value);
  };
  const handleOwnerChange = (event) => {
    setOwnerName(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNotes(event.target.value);
  };

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
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
      if (!value) {
        formIsValid = false;
      }
    }
    if (!atticFile || !electricalFile || !licenseFile) {
      formIsValid = false;
    }
    if (formIsValid) {
      setFormValid(true);
      console.log("ownerName:", ownerName);
      console.log("Installer:", installer.name);
      console.log("Rep:", rep.name);
      console.log("Attic File:", atticImage);
      console.log("Electrical File:", electricalImage);
      console.log("Driver's License File:", licenseImage);
      console.log("Deposit File:", depositImage);
      console.log("adders:", adders[0].name);
      console.log("program:", program.name);
      console.log("notes:", notes);

      pushNewSale({
        variables: {
          ownerName: ownerName,
          leadGen: leadgen.name,
          saleRep: rep.name,
          atticImage: String(atticImage),
          electricalImage: String(electricalImage),
          LicenseImage: String(licenseImage),
          depositImage: String(depositImage),
          installer: installer.name,
          program: program.name,
          adders: adders[0].name,
          notes: notes,
          repEmail: rep.email,
        },
      })
        .then((result) => {
          setOwnerName("");
          setAtticImage(null);
          setElectricalImage(null);
          setLicenseImage(null);
          setDepositImage(null);
          setInstaller(null);
          setProgram(null);
          setAdder([]);
          setNotes("");
          setRep(null);
          setLeadgen(null);
          setAtticFile(null);
          setElectricalFile(null);
          setLicenseFile(null);
          setDepositFile(null);

          // Handle successful mutation result here
        })
        .catch((error) => {
          // Handle error here
        });
    } else {
      setFormValid(false);
    }
  };

  useEffect(() => {
    getCRMusers().then((response) => {
      //   alert("Data has been sent to the server");

      console.log(response.data.GetCRMusers);

      const usersWithIds = response.data.GetCRMusers.map((user, index) => {
        return {
          ...user,
          id: index,
        };
      });

      setCRMusers(usersWithIds);
    });
  }, []);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100%",
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
          style={{ width: "25rem", height: "9.5em" }}
        />
      </Box>
      <Box sx={{ backgroundColor: "#fff", p: "2rem" }}>
        {/* <Typography variant="h5" sx={{ mb: '2rem', fontFamily: 'Montserrat', fontWeight: 'bold', color: '#333' }}>Solar Sale Form</Typography> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "60vw",
          }}
        >
          <h1> New Sale Form</h1>
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
              Lead Generator*
            </InputLabel>

            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={leadgen}
              label="Lead Gen"
              onChange={handleLeadgenChange}
              sx={{ width: "20em", marginBottom: "20px" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {data &&
                data.GetCRMusers.map((user) => (
                  <MenuItem key={user.id} value={user}>
                    {user.email}
                  </MenuItem>
                ))}
            </Select>

            {/* SALES REP NAME */}

            <InputLabel sx={{ marginBottom: "20px", color: "red" }}>
              Sales Rep *
            </InputLabel>

            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={rep}
              label="Sale Rep"
              onChange={handleRepChange}
              sx={{ width: "20em", marginBottom: "20px" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {data &&
                data.GetCRMusers.map((user) => (
                  <MenuItem key={user.id} value={user}>
                    {user.email}
                  </MenuItem>
                ))}
            </Select>

            {/* INSTALLER  */}

            <InputLabel sx={{ marginBottom: "20px", color: "red" }}>
              Installer *
            </InputLabel>

            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={installer}
              label="Age"
              onChange={handleChange}
              sx={{ width: "15em", marginBottom: "20px" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {installMarkets.map((installMarket) => (
                <MenuItem key={installMarket.id} value={installMarket}>
                  {installMarket.name}
                </MenuItem>
              ))}
            </Select>

            <InputLabel sx={{ marginBottom: "20px", color: "red" }}>
              Program *
            </InputLabel>

            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={program}
              label="Program"
              onChange={handleProgramChange}
              sx={{ width: "15em", marginBottom: "20px" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {programs.map((installMarket) => (
                <MenuItem key={installMarket.id} value={installMarket}>
                  {installMarket.name}
                </MenuItem>
              ))}
            </Select>

            <InputLabel sx={{ marginBottom: "20px", color: "red" }}>
              Adders *
            </InputLabel>

            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={adder}
              multiple
              label="Adder"
              onChange={handleAdderChange}
              sx={{ width: "15em", marginBottom: "20px" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {adders.map((installMarket) => (
                <MenuItem key={installMarket.id} value={installMarket}>
                  {installMarket.name}
                </MenuItem>
              ))}
            </Select>

            <InputLabel
              sx={{ marginTop: "20px", marginBottom: "20px", color: "red" }}
            >
              Utility Bill *
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
              {...getAtticProps()}
            >
              <input {...getAtticInputProps()} />
              <Typography variant="body1" sx={{ color: "#333" }}>
                Drag and drop your Attic file here, or click to select a file
              </Typography>
              {atticFile ? (
                <Typography variant="body1" sx={{ color: "#333" }}>
                  {atticFile.name}
                </Typography>
              ) : null}
            </Box>

            <InputLabel
              sx={{ marginTop: "20px", marginBottom: "20px", color: "red" }}
            >
              Attic *
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
              {...getElectricalProps()}
            >
              <input {...getElectricalInputProps()} />
              <Typography variant="body1" sx={{ color: "#333" }}>
                Drag and drop your Electrical file here, or click to select a
                file
              </Typography>
              {electricalFile ? (
                <Typography variant="body1" sx={{ color: "#333" }}>
                  {electricalFile.name}
                </Typography>
              ) : null}
            </Box>

            <InputLabel
              sx={{ marginTop: "20px", marginBottom: "20px", color: "red" }}
            >
              Drivers License{" "}
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
              {...getLicenseProps()}
            >
              <input {...getLicenseInputProps()} />
              <Typography variant="body1" sx={{ color: "#333" }}>
                Drag and drop your Drivers License file here, or click to select
                a file
              </Typography>
              {licenseFile ? (
                <Typography variant="body1" sx={{ color: "#333" }}>
                  {licenseFile.name}
                </Typography>
              ) : null}
            </Box>

            <InputLabel
              sx={{ marginTop: "20px", marginBottom: "20px", color: "red" }}
            >
              Deposit
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
              {...getDepositProps()}
            >
              <input {...getDepositInputProps()} />
              <Typography variant="body1" sx={{ color: "#333" }}>
                Drag and drop your Deposit file here, or click to select a file
              </Typography>
              {depositFile ? (
                <Typography variant="body1" sx={{ color: "#333" }}>
                  {depositFile.name}
                </Typography>
              ) : null}
            </Box>

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
                Please fill out all required fields and upload all required
                files
              </Alert>
            )}
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

export default MyForm;
