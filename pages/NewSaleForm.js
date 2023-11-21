import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  ToggleButton, ToggleButtonGroup,
  Typography,
  Button,
  InputLabel,
  Select,
  Paper,
  MenuItem,
} from "@mui/material";
import { CircularProgress } from '@mui/material'; // Make sure to import CircularProgress

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
  const [isSubmitted, setIsSubmitted] = useState(false);

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


  const handleToggle = () => {
    setIsSubmitted(!isSubmitted);
  };

  const [uploadingUtility1, setUploadingUtility1] = useState(false);
  const [progressUtility1, setProgressUtility1] = useState(0);
  const [uploadingUtility2, setUploadingUtility2] = useState(false);
  const [progressUtility2, setProgressUtility2] = useState(0);

  const [uploadingUtility3, setUploadingUtility3] = useState(false);
  const [progressUtility3, setProgressUtility3] = useState(0);
  const [uploadingUtility4, setUploadingUtility4] = useState(false);
  const [progressUtility4, setProgressUtility4] = useState(0);
  const [uploadingUtility5, setUploadingUtility5] = useState(false);
  const [progressUtility5, setProgressUtility5] = useState(0);
  const [uploadingUtility6, setUploadingUtility6] = useState(false);
  const [progressUtility6, setProgressUtility6] = useState(0);
  const [uploadingUtility7, setUploadingUtility7] = useState(false);
  const [progressUtility7, setProgressUtility7] = useState(0);

  

  const [uploadingLicense1, setUploadingLicense1] = useState(false);
  const [progressLicense1, setProgressLicense1] = useState(0);
  

  const [uploadingAttic1, setUploadingAttic1] = useState(false);
  const [progressAttic1, setProgressAttic1] = useState(0);
  
  const [uploadingAttic2, setUploadingAttic2] = useState(false);
  const [progressAttic2, setProgressAttic2] = useState(0);
  


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

  const [UtilityFile, setUtilityFile] = React.useState(null);
  const [UtilityFile2, setutilityFile2] = React.useState(null);
  const [UtilityFile3, setutilityFile3] = React.useState(null);
  const [UtilityFile4, setutilityFile4] = React.useState(null);
  const [UtilityFile5, setutilityFile5] = React.useState(null);
  const [UtilityFile6, setutilityFile6] = React.useState(null);
  const [UtilityFile7, setutilityFile7] = React.useState(null);
  const [AtticFile, setAtticFile] = React.useState(null);
 
  const [AtticFile2, setAtticFile2] = React.useState(null);





  const [licenseFile, setLicenseFile] = React.useState(null);
  const [depositFile, setDepositFile] = React.useState(null);
  const [formValid, setFormValid] = React.useState(true);
  const [installer, setInstaller] = React.useState("");

  const [adder, setAdder] = React.useState([]);
  const [rep, setRep] = React.useState("");
  const [leadgen, setLeadgen] = React.useState("");

  const [UtilityImagesURL, setUtilityImagesUrl] = React.useState(null);
  const [AtticImage1, setAtticImage] = React.useState(null);

  const [UtilityImagesURL2, setUtilityImagesUrl2] = React.useState("null");
  const [UtilityImagesURL3, setUtilityImagesUrl3] = React.useState("null");
  const [UtilityImagesURL4, setUtilityImagesUrl4] = React.useState("null");
  const [UtilityImagesURL5, setUtilityImagesUrl5] = React.useState("null");
  const [UtilityImagesURL6, setUtilityImagesUrl6] = React.useState("null");
  const [UtilityImagesURL7, setUtilityImagesUrl7] = React.useState("null");

  const [AtticImage2, setAtticImage2] = React.useState(null);
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
    //  console.log(event.target.value)
    // alert("Lead change")
  };
  const handleOwnerChange = (event) => {
    setOwnerName(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNotes(event.target.value);
  };


  //Utility Drop Functions

  //1

  const { getRootProps: getUtilityProps, getInputProps: getUtilityInputProps } =
    useDropzone({
      onDrop: (acceptedFiles) => {


        setUploadingUtility1(true)
        setProgressUtility1(35)
        // console.log(acceptedFiles)

        // alert("Accepted files here")
        setUtilityFile(acceptedFiles[0]);

        const file = acceptedFiles[0];

        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            //   setPreview(reader.result);
          };
          reader.readAsDataURL(file);

          // const storageRef = ref(storage, `images/${uuid()}`);

          const preUri = "images/utility"+ uuidv4() +".jpg" ;
          const pathReference = ref(storage, preUri);
          // 'file' comes from the Blob or File API
          uploadBytes(pathReference, file,  {
              onProgress: (snapshot) => {
                const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgressUtility1(percentage);
              },
            }).then((snapshot) => {
            
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
              setUtilityImagesUrl(url); 
              setUploadingUtility1(false);
            });
          }).catch(error => {
            setUploadingUtility1(false); // Finish uploading even on error
            console.error("Upload error:", error);
          });





        } else {
          console.log("no file");
        }
      },
    });
  //2
    const { getRootProps: getUtilityProps2, getInputProps: getUtilityInputProps2 } = useDropzone({
      onDrop: (acceptedFiles) => {
        setUploadingUtility2(true); // Start uploading
        setProgressUtility2(35); // Initialize progress to 0
        
        const file = acceptedFiles[0];
        setutilityFile2(file);
    
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
    
          const preUri = "images/utility"+ uuidv4() +".jpg" ;
          const pathReference = ref(storage, preUri);
    
          uploadBytes(pathReference, file, {
            onProgress: (snapshot) => {
              const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgressUtility2(percentage);
            },
          }).then((snapshot) => {
            const httpsReference = ref(
              storage,
              "https://firebasestorage.googleapis.com/v0/b/voltaic-383203.appspot.com/o/" +
                encodeURIComponent(preUri)
            );
    
            getDownloadURL(httpsReference).then((url) => {
              setUtilityImagesUrl2(url);
              setUploadingUtility2(false); // Finish uploading
            });
          }).catch(error => {
            setUploadingUtility2(false); // Handle error but finish uploading process visually
            console.error("Upload error:", error);
          });
        } else {
          console.log("no file");
        }
      },
    });
    
  //3

    const { getRootProps: getUtilityProps3, getInputProps: getUtilityInputProps3 } = useDropzone({
      onDrop: (acceptedFiles) => {
        setUploadingUtility3(true); // Start uploading
        setProgressUtility3(35); // Initialize progress to 0
        
        const file = acceptedFiles[0];
        setutilityFile3(file);
    
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
    
          // const preUri = "images/item.jpg" + uuidv4();
          const preUri = "images/utility"+ uuidv4() +".jpg" ;
          const pathReference = ref(storage, preUri);
    
          uploadBytes(pathReference, file, {
            onProgress: (snapshot) => {
              const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgressUtility3(percentage);
            },
          }).then((snapshot) => {
            const httpsReference = ref(
              storage,
              "https://firebasestorage.googleapis.com/v0/b/voltaic-383203.appspot.com/o/" +
                encodeURIComponent(preUri)
            );
    
            getDownloadURL(httpsReference).then((url) => {
              setUtilityImagesUrl3(url);
              setUploadingUtility3(false); // Finish uploading
            });
          }).catch(error => {
            setUploadingUtility3(false); // Handle error but finish uploading process visually
            console.error("Upload error:", error);
          });
        } else {
          console.log("no file");
        }
      },
    });
    
  //4
    const { getRootProps: getUtilityProps4, getInputProps: getUtilityInputProps4 } = useDropzone({
      onDrop: (acceptedFiles) => {
        setUploadingUtility4(true); // Start uploading
        setProgressUtility4(35); // Initialize progress to 0
        
        const file = acceptedFiles[0];
        setutilityFile4(file);
    
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
    
          // const preUri = "images/item.jpg" + uuidv4();
          const preUri = "images/utility"+ uuidv4() +".jpg" ;
          const pathReference = ref(storage, preUri);
    
          uploadBytes(pathReference, file, {
            onProgress: (snapshot) => {
              const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgressUtility4(percentage);
            },
          }).then((snapshot) => {
            const httpsReference = ref(
              storage,
              "https://firebasestorage.googleapis.com/v0/b/voltaic-383203.appspot.com/o/" +
                encodeURIComponent(preUri)
            );
    
            getDownloadURL(httpsReference).then((url) => {
              setUtilityImagesUrl4(url);
              setUploadingUtility4(false); // Finish uploading
            });
          }).catch(error => {
            setUploadingUtility4(false); // Handle error but finish uploading process visually
            console.error("Upload error:", error);
          });
        } else {
          console.log("no file");
        }
      },
    });
    
  //5

    const { getRootProps: getUtilityProps5, getInputProps: getUtilityInputProps5 } = useDropzone({
      onDrop: (acceptedFiles) => {
        setUploadingUtility5(true); // Start uploading
        setProgressUtility5(35); // Initialize progress to 0
        
        const file = acceptedFiles[0];
        setutilityFile5(file);
    
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
    
          // const preUri = "images/item.jpg" + uuidv4();
          const preUri = "images/utility"+ uuidv4() +".jpg" ;
          const pathReference = ref(storage, preUri);
    
          uploadBytes(pathReference, file, {
            onProgress: (snapshot) => {
              const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgressUtility4(percentage);
            },
          }).then((snapshot) => {
            const httpsReference = ref(
              storage,
              "https://firebasestorage.googleapis.com/v0/b/voltaic-383203.appspot.com/o/" +
                encodeURIComponent(preUri)
            );
    
            getDownloadURL(httpsReference).then((url) => {
              setUtilityImagesUrl5(url);
              setUploadingUtility5(false); // Finish uploading
            });
          }).catch(error => {
            setUploadingUtility5(false); // Handle error but finish uploading process visually
            console.error("Upload error:", error);
          });
        } else {
          console.log("no file");
        }
      },
    });
    
  //6
  const { getRootProps: getUtilityProps6, getInputProps: getUtilityInputProps6 } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadingUtility6(true); // Start uploading
      setProgressUtility6(35); // Initialize progress to 0
      
      const file = acceptedFiles[0];
      setutilityFile6(file);
  
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
  
        const preUri = "images/utility"+ uuidv4() +".jpg" ;
        const pathReference = ref(storage, preUri);
  
        uploadBytes(pathReference, file, {
          onProgress: (snapshot) => {
            const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgressUtility6(percentage);
          },
        }).then((snapshot) => {
          const httpsReference = ref(
            storage,
            "https://firebasestorage.googleapis.com/v0/b/voltaic-383203.appspot.com/o/" +
              encodeURIComponent(preUri)
          );
  
          getDownloadURL(httpsReference).then((url) => {
            setUtilityImagesUrl6(url);
            setUploadingUtility6(false); // Finish uploading
          });
        }).catch(error => {
          setUploadingUtility6(false); // Handle error but finish uploading process visually
          console.error("Upload error:", error);
        });
      } else {
        console.log("no file");
      }
    },
  });
  //7
  const { getRootProps: getUtilityProps7, getInputProps: getUtilityInputProps7 } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadingUtility7(true); // Start uploading
      setProgressUtility7(35); // Initialize progress to 0
      
      const file = acceptedFiles[0];
      setutilityFile7(file);
  
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
  
        const preUri = "images/utility"+ uuidv4() +".jpg" ;
        const pathReference = ref(storage, preUri);
  
        uploadBytes(pathReference, file, {
          onProgress: (snapshot) => {
            const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgressUtility7(percentage);
          },
        }).then((snapshot) => {
          const httpsReference = ref(
            storage,
            "https://firebasestorage.googleapis.com/v0/b/voltaic-383203.appspot.com/o/" +
              encodeURIComponent(preUri)
          );
  
          getDownloadURL(httpsReference).then((url) => {
            setUtilityImagesUrl7(url);
            setUploadingUtility7(false); // Finish uploading
          });
        }).catch(error => {
          setUploadingUtility7(false); // Handle error but finish uploading process visually
          console.error("Upload error:", error);
        });
      } else {
        console.log("no file");
      }
    },
  });
  
    

    const { getRootProps: getAtticProps, getInputProps: getAtticInputProps } = useDropzone({
      onDrop: (acceptedFiles) => {
        setUploadingAttic1(true); // Start uploading
        setProgressAttic1(35); // Initialize progress to 0
        setAtticFile(acceptedFiles[0]);
    
        const file = acceptedFiles[0];
    
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
    
          const preUri = "images/attic"+ uuidv4() +".jpg" ;
          const pathReference = ref(storage, preUri);
    
          uploadBytes(pathReference, file, {
            onProgress: (snapshot) => {
              const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgressAttic1(percentage);
            },
          }).then((snapshot) => {
            const httpsReference = ref(
              storage,
              "https://firebasestorage.googleapis.com/v0/b/voltaic-383203.appspot.com/o/" +
                encodeURIComponent(preUri)
            );
    
            getDownloadURL(httpsReference).then((url) => {
              setAtticImage(url);
              setUploadingAttic1(false); // Finish uploading
            });
          }).catch(error => {
            setUploadingAttic1(false); // Handle error but finish uploading process visually
            console.error("Upload error:", error);
          });
        } else {
          console.log("no file");
        }
      },
    });
    

  const { getRootProps: getAtticProps2, getInputProps: getAtticInputProps2 } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadingAttic2(true); // Start uploading
      setProgressAttic2(35); // Initialize progress to 0
      
      const file = acceptedFiles[0];
      setAtticFile2(file);
  
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
  
        const preUri = "images/attic"+ uuidv4() +".jpg" ;

        
        const pathReference = ref(storage, preUri);
  
        uploadBytes(pathReference, file, {
          onProgress: (snapshot) => {
            const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgressAttic2(percentage);
          },
        }).then((snapshot) => {
          const httpsReference = ref(
            storage,
            "https://firebasestorage.googleapis.com/v0/b/voltaic-383203.appspot.com/o/" +
              encodeURIComponent(preUri)
          );
  
          getDownloadURL(httpsReference).then((url) => {
            setAtticImage2(url);
            setUploadingAttic2(false); // Finish uploading
          });
        }).catch(error => {
          setUploadingAttic2(false); // Handle error but finish uploading process visually
          console.error("Upload error:", error);
        });
      } else {
        console.log("no file");
      }
    },
  });
  


  // const { getRootProps: getLicenseProps, getInputProps: getLicenseInputProps } =
  //   useDropzone({
  //     onDrop: (acceptedFiles) => {
  //       setLicenseFile(acceptedFiles[0]);

  //       const file = acceptedFiles[0];

  //       if (file) {
  //         const reader = new FileReader();
  //         reader.onloadend = () => {
  //           //   setPreview(reader.result);
  //         };
  //         reader.readAsDataURL(file);

  //         // const storageRef = ref(storage, `images/${uuid()}`);

  //         const preUri = "images/item.jpg" + uuidv4();
  //         const pathReference = ref(storage, preUri);
  //         // 'file' comes from the Blob or File API
  //         uploadBytes(pathReference, file).then((snapshot) => {
  //           console.log("Uploaded a blob or file!");
  //           console.log(snapshot.metadata.fullPath);
  //           const gsReference = ref(storage, "gs://bucket" + preUri);

  //           // Create a reference from an HTTPS URL
  //           // Note that in the URL, characters are URL escaped!
  //           const httpsReference = ref(
  //             storage,
  //             "https://firebasestorage.googleapis.com/v0/b/voltaic-383203.appspot.com/o/" +
  //               encodeURIComponent(preUri)
  //           );

  //           getDownloadURL(httpsReference).then((url) => {
  //             // `url` is the download URL for 'images/stars.jpg'

  //             setLicenseImage(url);

  //             console.log(url);
  //           });
  //         });
  //       } else {
  //         console.log("no file");
  //       }
  //     },
  //   });


  const { getRootProps: getLicenseProps, getInputProps: getLicenseInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadingLicense1(true); // Start uploading
      setProgressLicense1(35); // Initialize progress to 0
      setLicenseFile(acceptedFiles[0]);
  
      const file = acceptedFiles[0];
  
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
  
        const preUri = "images/license"+ uuidv4() +".jpg" ;
        const pathReference = ref(storage, preUri);
  
        uploadBytes(pathReference, file, {
          onProgress: (snapshot) => {
            const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgressLicense1(percentage);
          },
        }).then((snapshot) => {
          const httpsReference = ref(
            storage,
            "https://firebasestorage.googleapis.com/v0/b/voltaic-383203.appspot.com/o/" +
              encodeURIComponent(preUri)
          );
  
          getDownloadURL(httpsReference).then((url) => {
            setLicenseImage(url);
            setUploadingLicense1(false); // Finish uploading
          });
        }).catch(error => {
          setUploadingLicense1(false); // Handle error but finish uploading process visually
          console.error("Upload error:", error);
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

          const preUri = "images/deposit"+ uuidv4() +".jpg" ;
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
    if (!UtilityFile || !AtticFile || !licenseFile || !UtilityFile2) {
      formIsValid = false;
    }
    if (formIsValid) {
      setFormValid(true);
      console.log("ownerName:", ownerName);
      console.log("Installer:", installer.name);
      console.log("Rep:", rep.name);
      console.log("Utility Image 1 :", UtilityImagesURL); 
       console.log("Utility Image 2 :", UtilityImagesURL2);
       console.log("Utility Image 3 :", UtilityImagesURL3); 
       console.log("Utility Image 4 :", UtilityImagesURL4);
       console.log("Utility Image 5 File:", UtilityImagesURL5);
       console.log("Utility Image 6 File:", UtilityImagesURL6);
       console.log("Utility Image 7 File:", UtilityImagesURL7);
      console.log("Attic Image 1:", AtticImage1);
      console.log("Attic Image 2", AtticImage2);
      console.log("Driver's License File:", licenseImage);
      console.log("Deposit File:", depositImage);
      console.log("adders:", adder);
      console.log("program:", program.name);
      console.log("notes:", notes);

      
      const addersNameList = adder.map(obj => obj.name);
 

      pushNewSale({
        variables: {
          ownerName: ownerName,
          leadGen: leadgen.name,
          saleRep: rep.name,
          utilityImage1: String(UtilityImagesURL),
          utilityImage2: String(UtilityImagesURL2),
          utilityImage3: String(UtilityImagesURL3),
          utilityImage4: String(UtilityImagesURL4),
          utilityImage5: String(UtilityImagesURL5),
          utilityImage6: String(UtilityImagesURL6),
          utilityImage7: String(UtilityImagesURL7),
          atticImage1: String(AtticImage1),
          atticImage2: String(AtticImage2),
          LicenseImage: String(licenseImage),
          depositImage: String(depositImage),
          installer: installer.name,
          program: program.name,
          adders: addersNameList,
          notes: notes,
          repEmail: rep.email,
          leadgenEmail: leadgen.email,
        },
      })
        .then((result) => {
          setOwnerName("");
          setUtilityImagesUrl(null);
          setAtticImage(null);
          setAtticFile2(null);
          setutilityFile2(null);
          setutilityFile3(null);
          setutilityFile4(null);
          setutilityFile5(null);
          setutilityFile6(null);
          setutilityFile7(null);
          setLicenseImage(null);
          setDepositImage(null);
          setInstaller(null);
          setProgram(null);
          setAdder([]);
          setNotes("");
          setRep(null);
          setLeadgen(null);
          setUtilityFile(null);
       
          setAtticFile(null);
          setAtticFile2(null)
          setLicenseFile(null);
          setDepositFile(null);
          setIsSubmitted(true)
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




  //if (isSubmitted) {
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
        backgroundColor: "#f0f0f0", // Use a light background color
        color: "#333", // Use a dark text color
      }}
    >
      <Paper
        elevation={6} // Add a subtle shadow
        sx={{
          padding: "24px",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Thank you for submitting!
        </Typography>

        {isSubmitted && (
          <ToggleButtonGroup
            value={isSubmitted ? "on" : "off"}
            exclusive
            onChange={handleToggle}
            sx={{ marginTop: "16px" }}
          >
            <ToggleButton value="on">
              Submit again
            </ToggleButton>
          </ToggleButtonGroup>
        )}
      </Paper>
    </Box>
    );
  }else{

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
        {/* <Typography variant="h5" sx={{ mb: '2rem', fontFamily: 'Montserrat', fontWeight: 'bold', color: '#333' }}>Solar Sale Form</Typography> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "60vw",
          }}
        >
          <h1 style={{ fontFamily: 'sans-serif', fontWeight: 'bold' , color: 'black' }} > New Sale Form</h1>



          
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
                    {user.name}
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
                    {user.name}
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





            {/* Working Utility Bill Image */}
            <Box
  sx={{
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  }}
> 

            <InputLabel
    sx={{ marginTop: "20px", marginBottom: "20px", color: "red" }}
  >
              Utility Bill * (1/2 Required)
            </InputLabel>

            <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: "row" }, // Columns on extra-small devices, rows on small devices and up
      justifyContent: "space-between",
      width: '100%', // Set to 100% width
      flexWrap: { sm: 'wrap' }, // Wrap items on small devices and up
    }}
  >

               
        {/* Utility Bill 1 */}
        <Box
sx={{
  flex: { xs: "1 1 100%", sm: "1 1 calc(33% - 10px)" }, // Full width on xs, 1/3 width on sm and up
  border: "2px dashed #333",
  borderRadius: "5px",
  padding: "1rem",
  cursor: "pointer",
  margin: { xs: "10px 0", sm: "0 5px" }, // Margin adjustment for different screen sizes
  position: 'relative',
}}
      {...getUtilityProps()}
    >
{/* uploadingUtility1 */}
  {uploadingUtility1 ? (
    <CircularProgress 
      variant={progressUtility1 < 100 ? "determinate" : "indeterminate"}
      value={progressUtility1}
      size={50}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    
      }}
    />
  ) : (
    <>
      <input {...getUtilityInputProps()} />
      <Typography variant="body1" sx={{ color: "#333" }}>
         Utility file #1
      </Typography>

      {UtilityFile && (
        <Typography variant="body1" sx={{ color: "#333" }}>
          {UtilityFile.name}
        </Typography>
      )}
    </>
  )}
</Box>



            {/* Utility Bill 2     */}
            {/* <Box
             sx={{
              flex: "1 1 calc(33% - 10px)", // take up 1/3 of the width minus a small margin
              border: "2px dashed #333",
              borderRadius: "5px",
              padding: "1rem",
              cursor: "pointer",
              margin: "0 5px",  // added a small margin to space out the boxes
            }}
              {...getUtilityProps2()}
            >
              <input {...getUtilityInputProps2()} />
              <Typography variant="body1" sx={{ color: "#333" }}>
                Drag and drop your Attic file here, or click to select a file
              </Typography>



              {UtilityFile2 ? (
                <Typography variant="body1" sx={{ color: "#333" }}>
                  {UtilityFile2.name}
                </Typography>
              ) : null}

            </Box> */}


{/* Utility Bill 2 */}
<Box
  sx={{
    flex: "1 1 calc(33% - 10px)", 
    border: "2px dashed #333",
    borderRadius: "5px",
    padding: "1rem",
    cursor: "pointer",
    margin: "0 5px", 
    position: 'relative' // Added this for absolute positioning of CircularProgress
  }}
  {...getUtilityProps2()}
>
  {uploadingUtility2 && (
    <CircularProgress 
      variant={progressUtility2 < 100 ? "determinate" : "indeterminate"}
      value={progressUtility2}
      size={50}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    />
  )}
  
  <input {...getUtilityInputProps2()} />
  {!uploadingUtility2 && (
    <Typography variant="body1" sx={{ color: "#333" }}>
       Utility file #2
    </Typography>
  )}
  {UtilityFile2 && !uploadingUtility2 ? (
    <Typography variant="body1" sx={{ color: "#333" }}>
      {UtilityFile2.name}
    </Typography>
  ) : null}
</Box>




{/* Utility Bill 3 */}
<Box
  sx={{
    flex: "1 1 calc(33% - 10px)", 
    border: "2px dashed #333",
    borderRadius: "5px",
    padding: "1rem",
    cursor: "pointer",
    margin: "0 5px", 
    position: 'relative' // Added this for absolute positioning of CircularProgress
  }}
  {...getUtilityProps3()}
>
  {uploadingUtility3 && (
    <CircularProgress 
      variant={progressUtility3 < 100 ? "determinate" : "indeterminate"}
      value={progressUtility3}
      size={50}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    />
  )}
  
  <input {...getUtilityInputProps3()} />
  {!uploadingUtility3 && (
    <Typography variant="body1" sx={{ color: "#333" }}>
       Utility file #3
    </Typography>
  )}
  {UtilityFile3 && !uploadingUtility3 ? (
    <Typography variant="body1" sx={{ color: "#333" }}>
      {UtilityFile3.name}
    </Typography>
  ) : null}
</Box>



{/* Utility Bill 4 */}
<Box
  sx={{
    flex: "1 1 calc(33% - 10px)", 
    border: "2px dashed #333",
    borderRadius: "5px",
    padding: "1rem",
    cursor: "pointer",
    margin: "0 5px", 
    position: 'relative' // Added this for absolute positioning of CircularProgress
  }}
  {...getUtilityProps4()}
>
  {uploadingUtility4 && (
    <CircularProgress 
      variant={progressUtility4 < 100 ? "determinate" : "indeterminate"}
      value={progressUtility4}
      size={50}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    />
  )}
  
  <input {...getUtilityInputProps4()} />
  {!uploadingUtility4 && (
    <Typography variant="body1" sx={{ color: "#333" }}>
         Utility file #4
    </Typography>
  )}
  {UtilityFile4 && !uploadingUtility4 ? (
    <Typography variant="body1" sx={{ color: "#333" }}>
      {UtilityFile4.name}
    </Typography>
  ) : null}
</Box>




{/* Utility Bill 5 */}
<Box
  sx={{
    flex: "1 1 calc(33% - 10px)", 
    border: "2px dashed #333",
    borderRadius: "5px",
    padding: "1rem",
    cursor: "pointer",
    margin: "0 5px", 
    position: 'relative' // Added this for absolute positioning of CircularProgress
  }}
  {...getUtilityProps5()}
>
  {uploadingUtility5 && (
    <CircularProgress 
      variant={progressUtility5< 100 ? "determinate" : "indeterminate"}
      value={progressUtility5}
      size={50}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    />
  )}
  
  <input {...getUtilityInputProps5()} />
  {!uploadingUtility5 && (
    <Typography variant="body1" sx={{ color: "#333" }}>
        Utility file #5
    </Typography>
  )}
  {UtilityFile5 && !uploadingUtility5 ? (
    <Typography variant="body1" sx={{ color: "#333" }}>
      {UtilityFile5.name}
    </Typography>
  ) : null}
</Box>




{/* Utility Bill 6*/}
<Box
  sx={{
    flex: "1 1 calc(33% - 10px)", 
    border: "2px dashed #333",
    borderRadius: "5px",
    padding: "1rem",
    cursor: "pointer",
    margin: "0 5px", 
    position: 'relative' // Added this for absolute positioning of CircularProgress
  }}
  {...getUtilityProps6()}
>
  {uploadingUtility6 && (
    <CircularProgress 
      variant={progressUtility6< 100 ? "determinate" : "indeterminate"}
      value={progressUtility6}
      size={50}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    />
  )}
  
  <input {...getUtilityInputProps6()} />
  {!uploadingUtility6 && (
    <Typography variant="body1" sx={{ color: "#333" }}>
         Utility file #6
    </Typography>
  )}
  {UtilityFile6 && !uploadingUtility6 ? (
    <Typography variant="body1" sx={{ color: "#333" }}>
      {UtilityFile6.name}
    </Typography>
  ) : null}
</Box>


{/* Utility Bill 7*/}
<Box
  sx={{
    flex: "1 1 calc(33% - 10px)", 
    border: "2px dashed #333",
    borderRadius: "5px",
    padding: "1rem",
    cursor: "pointer",
    margin: "0 5px", 
    position: 'relative' // Added this for absolute positioning of CircularProgress
  }}
  {...getUtilityProps7()}
>
  {uploadingUtility7 && (
    <CircularProgress 
      variant={progressUtility7< 100 ? "determinate" : "indeterminate"}
      value={progressUtility7}
      size={50}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    />
  )}
  
  <input {...getUtilityInputProps7()} />
  {!uploadingUtility7 && (
    <Typography variant="body1" sx={{ color: "#333" }}>
         Utility file #7
    </Typography>
  )}
  {UtilityFile7 && !uploadingUtility7 ? (
    <Typography variant="body1" sx={{ color: "#333" }}>
      {UtilityFile7.name}
    </Typography>
  ) : null}
</Box>


            </Box>

            </Box>






            
            {/* Attic Image * */}
            <InputLabel
              sx={{ marginTop: "20px", marginBottom: "20px", color: "red" }}
            >
              Attic *
            </InputLabel>


            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",  // added to space out the boxes
              }}
            >
       

       {/* Attic Pic 1 */}
{/* Attic Pic 1 */}
<Box
  sx={{
    flex: "1 1 calc(33% - 10px)", 
    border: "2px dashed #333",
    borderRadius: "5px",
    padding: "1rem",
    cursor: "pointer",
    margin: "0 5px", 
    position: 'relative' // Added this for absolute positioning of CircularProgress
  }}
  {...getAtticProps()}
>
  {uploadingAttic1 && (
    <CircularProgress 
      variant={progressAttic1 < 100 ? "determinate" : "indeterminate"}
      value={progressAttic1}
      size={50}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    />
  )}
  
  <input {...getAtticInputProps()} />
  {!uploadingAttic1 && (
    <Typography variant="body1" sx={{ color: "#333" }}>
      Drag and drop your Attic PDF/PNG file here
    </Typography>
  )}
  {AtticFile && !uploadingAttic1 ? (
    <Typography variant="body1" sx={{ color: "#333" }}>
      {AtticFile.name}
    </Typography>
  ) : null}
</Box>

   {/* Attic Pic 2 */}
<Box
  sx={{
    flex: "1 1 calc(33% - 10px)", 
    border: "2px dashed #333",
    borderRadius: "5px",
    padding: "1rem",
    cursor: "pointer",
    margin: "0 5px",
    position: 'relative' // For absolute positioning of CircularProgress
  }}
  {...getAtticProps2()}
>
  {uploadingAttic2 && (
    <CircularProgress 
      variant={progressAttic2 < 100 ? "determinate" : "indeterminate"}
      value={progressAttic2}
      size={50}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    />
  )}
  
  <input {...getAtticInputProps2()} />
  {!uploadingAttic2 && (
    <Typography variant="body1" sx={{ color: "#333" }}>
      Drag and drop your Attic PDF/PNG file here
    </Typography>
  )}
  {AtticFile2 && !uploadingAttic2 ? (
    <Typography variant="body1" sx={{ color: "#333" }}>
      {AtticFile2.name}
    </Typography>
  ) : null}
</Box>





            </Box>


            {/* // Drivers License Section */}
            <InputLabel sx={{ marginTop: "20px", marginBottom: "20px", color: "red" }}>
              Drivers License
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
                position: 'relative' // For absolute positioning of CircularProgress
              }}
              {...getLicenseProps()}
            >
              {uploadingLicense1 && (
                <CircularProgress 
                  variant={progressLicense1 < 100 ? "determinate" : "indeterminate"}
                  value={progressLicense1}
                  size={50}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              )}
              
              <input {...getLicenseInputProps()} />
              {!uploadingLicense1 && ( // Only display this text if not uploading
                <Typography variant="body1" sx={{ color: "#333" }}>
                  Drag and drop your Drivers License file here, or click to select a file
                </Typography>
              )}

              {licenseFile && !uploadingLicense1 ? ( // Only display file name if it exists and not uploading
                <Typography variant="body1" sx={{ color: "#333" }}>
                  {licenseFile.name}
                </Typography>
              ) : null}
            </Box>

            <InputLabel
              sx={{ marginTop: "20px", marginBottom: "20px", color: "black" }}
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





{(rep && rep.email && leadgen && leadgen.email && UtilityImagesURL && AtticImage1 && licenseImage &&UtilityImagesURL2) ? (
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
