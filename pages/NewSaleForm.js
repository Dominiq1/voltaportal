import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  useMediaQuery,
  useTheme,
  Paper
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { GET_CRM_USERS } from '@/gql/mutations/CRM';
import { PUSH_NEW_SALE_MUTATION } from "@/gql/mutations/CRM";
import { useDropzone } from 'react-dropzone';
import { CircularProgress, Modal } from '@mui/material'; // Make sure to import CircularProgress
import { v4 as uuidv4 } from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/API/firebase";


import { Chip, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const TitleHoldersInput = ({ onTitleHoldersUpdate }) => {
  const [titleHolders, setTitleHolders] = useState([]);
  const [newTitleHolder, setNewTitleHolder] = useState('');

  const handleInputChange = (event) => {
    setNewTitleHolder(event.target.value);
  };

  const handleAddTitleHolder = () => {
    if (newTitleHolder.trim()) {
      setTitleHolders([...titleHolders, newTitleHolder.trim()]);
      setNewTitleHolder('');
    }
  };

  const handleRemoveTitleHolder = (index) => {
    const updatedTitleHolders = [...titleHolders];
    updatedTitleHolders.splice(index, 1);
    setTitleHolders(updatedTitleHolders);
  };



  useEffect(() => {
    onTitleHoldersUpdate(titleHolders);
  }, [titleHolders, onTitleHoldersUpdate]);


  const memoizedOnTitleHoldersUpdate = useCallback(
    onTitleHoldersUpdate,
    []
  );


  useEffect(() => {
    memoizedOnTitleHoldersUpdate(titleHolders);
  }, [titleHolders, memoizedOnTitleHoldersUpdate]);
  return (
    <Box  sx={{ marginBottom: "20px",
    color: '#48979d' }}>
      <TextField
    
        label="Add Title Holder"
        value={newTitleHolder}
        onChange={handleInputChange}
        variant="outlined"
        margin="normal"
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={handleAddTitleHolder}
              aria-label="Add Title Holder"
              edge="end"
            >
              <AddIcon />
            </IconButton>
          ),
        }}
      />
      <Box mt={2}>
        {titleHolders.map((titleHolder, index) => (
          <Chip
            key={index}
            label={titleHolder}
            onDelete={() => handleRemoveTitleHolder(index)}
            sx={{ marginRight: 1 }}
          />
        ))}
      </Box>
    </Box>
  );
};

const MyForm = () => {

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [titleHolders, setTitleHolders] = useState([]);
// Inside your component
const [errors, setErrors] = useState([]);
const [openErrorModal, setOpenErrorModal] = useState(false);
const errorModalBody = (
  <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Please correct the following errors:
    </Typography>
    <Box id="modal-modal-description" sx={{ mt: 2 }}>
      {errors.map((error, index) => (
        <Typography key={index} sx={{ mt: 1 }}>
          - {error}
        </Typography>
      ))}
    </Box>
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={() => setOpenErrorModal(false)}>Close</Button>
    </Box>
  </Box>
);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
 
    const [pushNewSale, { newSaleloading, error }] = useMutation(
    PUSH_NEW_SALE_MUTATION
  );


  const [UtilityFile, setUtilityFile] = React.useState(null);
  const [UtilityFile2, setutilityFile2] = React.useState(null);
  const [UtilityFile3, setutilityFile3] = React.useState(null);
  const [UtilityFile4, setutilityFile4] = React.useState(null);
  const [UtilityFile5, setutilityFile5] = React.useState(null);
  const [UtilityFile6, setutilityFile6] = React.useState(null);
  const [UtilityFile7, setutilityFile7] = React.useState(null);
  const [salesRep, setSalesRep] = React.useState(null);
  const [leadGen, setLeadGen] = React.useState(null);
  

  const [installer, setInstaller] = React.useState("");
  const [formValid, setFormValid] = React.useState(true);


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




  const [UtilityImagesURL, setUtilityImagesUrl] = React.useState(null);
  const [AtticImage1, setAtticImage] = React.useState("null");
  const [UtilityImagesURL2, setUtilityImagesUrl2] = React.useState("null");
  const [UtilityImagesURL3, setUtilityImagesUrl3] = React.useState("null");
  const [UtilityImagesURL4, setUtilityImagesUrl4] = React.useState("null");
  const [UtilityImagesURL5, setUtilityImagesUrl5] = React.useState("null");
  const [UtilityImagesURL6, setUtilityImagesUrl6] = React.useState("null");
  const [UtilityImagesURL7, setUtilityImagesUrl7] = React.useState("null");
  const [AtticImage2, setAtticImage2] = React.useState("null");
  const [licenseImage, setLicenseImage] =  React.useState("null");
  const [depositImage, setDepositImage] =  React.useState("null");

  const [AtticFile, setAtticFile] = React.useState("null");
  const [AtticFile2, setAtticFile2] = React.useState("null");

  const [uploadingLicense1, setUploadingLicense1] = useState(false);
  const [progressLicense1, setProgressLicense1] = useState(0);
  

  const [uploadingAttic1, setUploadingAttic1] = useState(false);
  const [progressAttic1, setProgressAttic1] = useState(0);
  
  const [uploadingAttic2, setUploadingAttic2] = useState(false);
  const [progressAttic2, setProgressAttic2] = useState(0);
  
  const [licenseFile, setLicenseFile] =  React.useState("null");
   const [depositFile, setDepositFile] =  React.useState("null");
   // Programs and adders data (assuming static for this example)
  //  const programs = [
  //   { id: 'cash', name: 'Cash' },
  //   // Add more programs here
  // ];

    const [programs, setPrograms] = useState([
    { id: 0, name: "Cash" },
    { id: 1, name: "Mosaic" },
    { id: 2, name: "Enium" },
    { id: 3, name: "Lightreach" },
    { id: 4, name: "Sunnova" },


    { id: 12, name: "Lightreach" },
  ]);


  const [installers, setInstallers] = useState([
    { id: 0, name: "Voltaic Construction" },
    { id: 1, name: "Greenspire" },
    { id: 2, name: "Voltaic Finance" },
    { id: 3, name: "Titanium Solar" },
    { id: 4, name: "AC/DC" },
    { id: 4, name: "Ascension" },
    { id: 4, name: "LGCY" },
  ]);
  const adders = [
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
    // Add more adders here
  ];

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

            // Create a rfeference from an HTTPS URL
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


    const handleRepChange = (event) => {
      console.log(event.target.value.email)
      console.log(event.target.value.name)
      console.log(event.target.value)
      setSalesRep(event.target.value)
    };
    
    const handleLeadgenChange = (event) => {
      console.log(event.target.value.email)
      console.log(event.target.value.name)
      console.log(event.target.value)
      setLeadGen(event.target.value);
      // alert(leadGen)
    };
    


  // State for CRM users
  const [CRMusers, setCRMusers] = useState([]);

  // Mutation for fetching CRM users
  const [getCRMusers, { loading: usersLoading, error: usersError }] = useMutation(GET_CRM_USERS);

  // Fetch CRM users on component mount
  useEffect(() => {
    // validateForm()

    getCRMusers().then((response) => {
      // Filter the users to include only those with status 'Active'
      const activeUsers = response.data.GetCRMusers.filter(user => user.sales === 'true' && user.status === 'Active');
    
      // Map through the filtered users to add an id to each
      const usersWithIds = activeUsers.map((user, index) => {
        return {
          ...user,
          id: index, // Assuming you want to maintain a zero-based index as id
        };
      });
    
      // Set the CRM users with the new array that includes only active users with ids
      setCRMusers(usersWithIds);
    });
    


    console.log(CRMusers)






  }, [getCRMusers]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
   
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });  
  
  };
  const handleProgramChange = (event) => {
    // Directly use the selected program object
    const selectedProgram = event.target.value;
    setFormData({ ...formData, program: selectedProgram });
  };
  const handleInstallerChange = (event) => {
    // Directly use the selected program object
    const instalerSelected = event.target.value;
    setFormData({ ...formData, installer: instalerSelected });
  };
  

  const handleAdderChange = (event) => {
    const {
      target: { value },
    } = event;
    // Assuming `formData.adders` is an array and you want to ensure unique selections
    let newAdders = typeof value === 'string' ? value.split(',') : value;
    
    // Remove duplicates - can be adjusted based on how your `adders` are structured
    newAdders = newAdders.filter((adder, index, self) =>
      index === self.findIndex(t => (t.id === adder.id))
    );
  
    setFormData({
      ...formData,
      adders: newAdders,
    });
  
  
  
  
  
  
  
  
    // const selectedAdders = event.target.value; // This will be an array of adder objects
  
   // setFormData({ ...formData, adders: selectedAdders });
  };
  

  
  const validateForm = () => {
    let isValid = true;
    let newErrors = [];

 //     ////////       VALIDATORS:       ///////////
  
  // Check Homeowner Name
  if (!formData.ownerName) {
    newErrors.push("Missing Homeowner Name.");
  }

  // Check Lead Generator
  if (!leadGen) {
    newErrors.push("Missing Lead Generator.");
  }

  // Check Sales Rep
  if (!salesRep) {
    newErrors.push("Missing Sales Rep.");
  }


   // Check Sales Rep
   if (titleHolders.length === 0) {
    newErrors.push("Missing Title Holders.");
  }
  // Check for a minimum of two utility bills
  if (!UtilityFile || !UtilityFile2) {
    newErrors.push("Missing at least one of the two required utility files.");
  }

  // Check Inverter
  if (!formData.inverter) {
    newErrors.push("Missing Inverter selection.");
  }

  // Conditional field: Main Panel Upgrade Notes
  if (formData.mainPanelUpgrade === 'yes' && !formData.mpuNotes) {
    newErrors.push("Missing MPU notes.");
  }

  // Dynamic requirement based on program selection
  if (formData.program === 'Cash' && !depositFile) {
    newErrors.push("Missing Deposit File for Cash Program.");
  }

  //Ensure notes are filled
  if (!formData.notes) {
    newErrors.push("Missing Project Notes.");
  }


  if( formData.batteries && formData.batteries !== 'NO BATTERY'){ 
      if (!formData.batteryMode) {
      newErrors.push("Missing The System Battery Mode.");
    }

    if (formData.batteryQuantity <= 0) {
      newErrors.push("Battery Quantity must be greater than 0.");
    }
  }

    //Ensure notes are filled
  





    // Additional validations as needed...
    setErrors(newErrors);
    return newErrors.length === 0;
    //return isValid;
  };
  
  const [formData, setFormData] = useState({
    ownerName: "",
    leadGen: leadGen ? leadGen.name : null,
    salesRep: salesRep ? salesRep.name : null,
    leadgenEmail: leadGen ? leadGen.name : null,
    repEmail: salesRep ? salesRep.name : null,
    installer: "",
    program: "",
    adders: [],
    design: "",
    designNotes: "",
    mainPanelUpgrade: "",
    mpuNotes: "",
    inverter: "",
    batteries: '',
    batteryQuantity: '0',
    batteryMode: "",
    batteryPlacement: "",
    batteryPlacementNotes: "",
    notes: "",
  });
 


  const handleTitleHoldersUpdate = (updatedTitleHolders) => {
    setTitleHolders(updatedTitleHolders);
  };
  const handleSubmit = (event) => {

    console.log('Form submitted');
    event.preventDefault();

    console.log(leadGen)
    console.log(salesRep)


    let formIsValid = validateForm(); // Assuming this function returns true if the form is valid
    
    // Extract adder names if adders are an array of objects
    const addersNameList = formData.adders.map(adder => adder.name);
  

 
    console.log("Submitting....")
    console.log(formData)


    if (formIsValid) {
      const titleHoldersString = titleHolders.join(', ');
      
      console.log("Form is valid !")
      const submissionData = {
        ownerName: formData.ownerName,
        leadGen: leadGen.name,
        titleHolders: titleHoldersString,
        saleRep:  salesRep.name,
        installer: formData.installer.name,
        program: formData.program.name,
        adders: addersNameList,
        design: formData.design,
        designNotes: formData.designNotes,
        mainPanelUpgrade: formData.mainPanelUpgrade,
        mpuNotes: formData.mpuNotes,
        inverter: formData.inverter,
        batteries: formData.batteries,
        batteryQuantity: formData.batteryQuantity,
        batteryMode:formData.batteryMode,
        batteryPlacement: formData.batteryPlacement,
        batteryPlacementNotes: formData.batteryPlacementNotes,
        notes: formData.notes,
        // Images URLs
        utilityImage1: UtilityImagesURL,
        utilityImage2: UtilityImagesURL2,
        utilityImage3: UtilityImagesURL3,
        utilityImage4: UtilityImagesURL4,
        utilityImage5: UtilityImagesURL5,
        utilityImage6: UtilityImagesURL6,
        utilityImage7: UtilityImagesURL7,
      
        atticImage1: AtticImage1,
        atticImage2: AtticImage2,
        LicenseImage: licenseImage,
        depositImage: depositImage,
        // Assuming repEmail and leadgenEmail are available in the formData
        repEmail: salesRep.email, 
        leadgenEmail: leadGen.email,
      };

      console.log(submissionData)
  
      pushNewSale({
        variables: submissionData,
      })
      .then((result) => {
        // Reset form state here if needed
        console.log('Form submission successful');
        setIsSubmitted(true);
        setLeadGen(null)
        setSalesRep(null)

        const initialFormState = {
          ownerName: '',
          leadGen: '',
          salesRep: '',
          installer: '',
          program: '',
          adders: [],
          design: '',
          designNotes: '',
          mainPanelUpgrade: '',
          mpuNotes: '',
          inverter: '',
          batteries: '',
          batteryQuantity: '0',
          batteryMode: '',
          batteryPlacement: '',
          batteryPlacementNotes: '',
          notes: '',
          utilityImage1: '',
          utilityImage2: '',
          utilityImage3: '',
          utilityImage4: '',
          utilityImage5: '',
          utilityImage6: '',
          utilityImage7: '',
          atticImage1: '',
          atticImage2: '',
          licenseImage: '',
          depositImage: '',
          repEmail: '',
          leadgenEmail: '',
        };
        


        setFormData(initialFormState);
        
        // You might want to navigate to a different page or show a success message
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        // Handle error here, such as showing an error message to the user
      });


    } else {
      setOpenErrorModal(true); // Open modal if form is invalid
   
      console.log("Form is not valid for the process")
      setFormValid(false);
      // Optionally show an error message or indicate validation failures
    }
  };





  // If the form has been submitted, show a success message
  if (isSubmitted) {
    return (

      <Box sx={{height:"59em", alignContent:"center", padding:'1em'}}>



  
      <Paper elevation={3} sx={{ padding: 4, margin: 2, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Submission Successful!
        </Typography>
        <Typography variant="subtitle1">
          Your sale has been successfully submitted. Thank you!
        </Typography>
        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={() => setIsSubmitted(false)} // Optional: Reset form or navigate elsewhere
        >
          Submit Another Sale
        </Button>
      </Paper>
      </Box>
    );
  }







  //Form Confirmed submitted


  return (

    <>
    
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
        maxWidth: '100%',
        mx: 'auto',
        padding: isSmallScreen ? 2 : 4,
        color: 'black',
        backgroundColor: 'White',
        boxSizing: 'border-box', // Make sure paddings are included in the width
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5" textAlign="center" mb={2}>
        New Sale Form
      </Typography>
      {/* <Button onClick={() => setOpenErrorModal(true)}>Test Error Modal</Button> */}


     
      <TextField
        name="ownerName"
        label="Home Owner Name"
        value={formData.ownerName}
        onChange={handleInputChange}
        required
        variant="outlined"
        margin="normal"
        
        InputLabelProps={{
          sx: { color: '#48979d' }, // Change 'green' to any color you need
        }}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel  
         sx={{ color: '#48979d' }} 
        id="leadGen-label">Lead Generator</InputLabel>
        {/* <p>{leadGen? leadGen.name: null}</p>
        <p>{leadGen? leadGen.email: null}</p> */}
        <Select
          labelId="leadGen-label"
          id="leadGen-select"
          name="leadGen"
          required
          variant="outlined"
          value={leadGen}
         onChange={handleLeadgenChange}
          label="Lead Generator"

        >

          {CRMusers.map((user) => (
            <MenuItem key={user.id} value={user}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
       <InputLabel
           sx={{ color: '#48979d' }} 
        id="salesrep-label">Sales Rep</InputLabel>
        {/*  <p>{salesRep? salesRep.name: null}</p>
        <p>{salesRep? salesRep.email: null}</p> */}
        <Select
          labelId="salesrep-label"
          id="leadGen-select"
          name="salesRep"
          value={salesRep}
          onChange={handleRepChange}
          label="Sales Rep"
        >
          {CRMusers.map((user) => (
            <MenuItem key={user.id} value={user}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
   
      {/* <TextField
        name="installer"
        label="Installer"
        value={formData.installer}
        onChange={handleInputChange}
        required
        variant="outlined"
        margin="normal"
        
      /> */}

         {/* Include other form fields here */}

   <FormControl fullWidth margin="normal">
        <InputLabel id="program-label">Installer</InputLabel>
        <InputLabel 
        sx={{ marginBottom: "20px",
              color: '#48979d' 
        }}>
              Installer *
            </InputLabel>

            <Select
  labelId="installer"
  id="installer-select"
  value={formData.installer}
  onChange={handleInstallerChange}
  label="installer"
  renderValue={(selected) => selected ? selected.name : ""}
>
  {installers.map((program) => (
    <MenuItem key={program.id} value={program}>
      {program.name}
    </MenuItem>
  ))}
</Select>



          



      </FormControl>


   {/* Include other form fields here */}

   <FormControl fullWidth margin="normal">
        <InputLabel id="program-label">Program</InputLabel>
        <InputLabel sx={{ marginBottom: "20px",
             color: '#48979d'  }}>
              Program *
            </InputLabel>

            <Select
  labelId="program-label"
  id="program-select"
  value={formData.program}
  onChange={handleProgramChange}
  label="Program"
  renderValue={(selected) => selected ? selected.name : ""}
>
  {programs.map((program) => (
    <MenuItem key={program.id} value={program}>
      {program.name}
    </MenuItem>
  ))}
</Select>



          



      </FormControl>

      <FormControl fullWidth margin="normal">
      <InputLabel sx={{ marginBottom: "20px",
           color: '#48979d' }}>
              Adders *
            </InputLabel>

            <Select
  labelId="adder-label"
  id="adder-select"
  multiple
  value={formData.adders}
  onChange={handleAdderChange}
  label="Adders"
  renderValue={(selected) => selected.map(adder => adder.name).join(', ')}
>
  {adders.map((adder) => (
    <MenuItem key={adder.id} value={adder}>
      {adder.name}
    </MenuItem>
  ))}
</Select>
      </FormControl>

      <TitleHoldersInput onTitleHoldersUpdate={handleTitleHoldersUpdate} />
           






      {/* Design Restrictions */}
      <Box sx={{ my: 2 }}>
        <Typography sx={{color:'#48979d'}}>Design Restrictions ? *</Typography>
        <RadioGroup
          row
          name="design"
          value={formData.design}
          onChange={handleInputChange}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
        {formData.design === 'yes' && (
          <TextField
            name="designNotes"
            label="What are the restrictions?"
            value={formData.designNotes}
            onChange={handleInputChange}
            required={formData.design === 'yes'}
            fullWidth
            variant="outlined"
            margin="normal"
          />
        )}
      </Box>

      {/* Main Panel Upgrade */}
      <FormControl component="fieldset" fullWidth margin="normal">
        <Typography sx={{color:'#48979d'}}>Main Panel Upgrade ?</Typography>
        <RadioGroup
          row
          name="mainPanelUpgrade"
          value={formData.mainPanelUpgrade}
          onChange={handleInputChange}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
          <FormControlLabel value="Try PCS to Avoid MPU" control={<Radio />} label="Try PCS to Avoid MPU" />
          {/* <Button
            onClick={() => setFormData({ ...formData, mainPanelUpgrade: "tryPCS" })}
            variant="outlined"
            size="small"
            sx={{ ml: 2 }}
          >
            Try PCS to avoid MPU
          </Button> */}
        </RadioGroup>
        {formData.mainPanelUpgrade === 'yes' && (
          <TextField
            name="mpuNotes"
            label="What was promised?"
            value={formData.mpuNotes}
            onChange={handleInputChange}
            required={formData.mainPanelUpgrade === 'yes'}
            fullWidth
            variant="outlined"
            margin="normal"
          />
        )}
      </FormControl>

      {/* Inverter */}
      <FormControl fullWidth margin="normal">
        <InputLabel sx={{ marginBottom: "20px",
           color: '#48979d' }} id="inverter-label">Inverter</InputLabel>
        <Select
          labelId="inverter-label"
          id="inverter-select"
          name="inverter"
          value={formData.inverter}
          onChange={handleInputChange}
          label="Inverter"
        >
          <MenuItem value="EnPhase iQ8+">EnPhase iQ8+</MenuItem>
          <MenuItem value="Tesla Inverter Standalone">Tesla Inverter Standalone</MenuItem>
          <MenuItem value="Tesla Integrated PW+">Tesla Integrated PW+</MenuItem>
          <MenuItem value="Tesla Integrated PW3">Tesla Integrated PW3</MenuItem>
        
          {/* More inverter options */}
        </Select>
      </FormControl>

      {/* Batteries */}
      <FormControl fullWidth margin="normal">
        <InputLabel 
        sx={{ marginBottom: "20px",
        color: '#48979d' }}id="batteries-label">Batteries</InputLabel>
        <Select
          labelId="batteries-label"
          id="batteries-select"
          name="batteries"
          value={formData.batteries}
          onChange={handleInputChange}
          label="Batteries"
        >
          <MenuItem value="NO BATTERY">NO BATTERY</MenuItem>
          <MenuItem value="EnPhase iQ 5P">EnPhase iQ 5P 5kWh</MenuItem>
          <MenuItem value="Tesla PowerWall 2">Tesla PowerWall 2 13.5kWh</MenuItem>
          <MenuItem value="Tesla Powerwall + 13.5kWh">Tesla Powerwall + 13.5kWh</MenuItem>
          <MenuItem value="Tesla Powerwall 3 13.5kWh">Tesla Powerwall 3 13.5kWh</MenuItem>

          {/* More battery options */}
        </Select>
      </FormControl>


{/* Conditional fields based on Batteries selection */}
{formData.batteries && formData.batteries !== 'NO BATTERY' && (
  <>
    {/* Battery Quantity */}
    <TextField
      name="batteryQuantity"
      label="Battery Quantity"
      type="number"
      value={formData.batteryQuantity}
      onChange={handleInputChange}
      required
      fullWidth
      variant="outlined"
      margin="normal"
    />


      {/* Battery Mode */}
      <Typography component="legend">What is the System Battery Mode?</Typography>
    <RadioGroup
  
      row
      name="batteryMode"
      value={formData.batteryMode}
      onChange={handleInputChange}
    >
      <FormControlLabel value="Partial Backup" control={<Radio />} label="Partial Backup" />
      <FormControlLabel value="Self Consumption No Backup" control={<Radio />} label="Self Consumption No Backup" />
    </RadioGroup>



    {/* Battery Placement Requests */}
    <Typography>Placement Requests</Typography>
    <RadioGroup
      row
      name="batteryPlacement"
      value={formData.batteryPlacement}
      onChange={handleInputChange}
    >
      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
      <FormControlLabel value="no" control={<Radio />} label="No" />
    </RadioGroup>
    {/* Battery Placement Notes */}
    {formData.batteryPlacement === 'yes' && (
      <TextField
        name="batteryPlacementNotes"
        label="Battery Placement Notes"
        value={formData.batteryPlacementNotes}
        onChange={handleInputChange}
        required={formData.batteryPlacement === 'yes'}
        fullWidth
        variant="outlined"
        margin="normal"
      />
    )}
  </>
)}
  


<      InputLabel
    sx={{ marginTop: "20px", marginBottom: "20px", color: "#48979d" }}
  >
              Utility Bill * (2 Files Required)
            </InputLabel>
            <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        width: "100%",
        flexWrap: { sm: "wrap" },
      }}
    >

               
        {/* Utility Bill 1 */}
        <Box
  sx={{
    flex: { xs: "1 1 100%", sm: "1 1 calc(33% - 10px)" },
    border: "2px dashed #333",
    borderRadius: "5px",
    padding: "1rem",
    cursor: "pointer",
    margin: { xs: "10px 0", sm: "0 5px" },
    position: "relative",
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



     

{/* Utility Bill 2 */}
<Box
    sx={{
      flex: { xs: "1 1 100%", sm: "1 1 calc(33% - 10px)" },
      border: "2px dashed #333",
      borderRadius: "5px",
      padding: "1rem",
      cursor: "pointer",
      margin: { xs: "10px 0", sm: "0 5px" },
      position: "relative",
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
      flex: { xs: "1 1 100%", sm: "1 1 calc(33% - 10px)" },
      border: "2px dashed #333",
      borderRadius: "5px",
      padding: "1rem",
      cursor: "pointer",
      margin: { xs: "10px 0", sm: "0 5px" },
      position: "relative",
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
      flex: { xs: "1 1 100%", sm: "1 1 calc(33% - 10px)" },
      border: "2px dashed #333",
      borderRadius: "5px",
      padding: "1rem",
      cursor: "pointer",
      margin: { xs: "10px 0", sm: "0 5px" },
      position: "relative",
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
      flex: { xs: "1 1 100%", sm: "1 1 calc(33% - 10px)" },
      border: "2px dashed #333",
      borderRadius: "5px",
      padding: "1rem",
      cursor: "pointer",
      margin: { xs: "10px 0", sm: "0 5px" },
      position: "relative",
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
      flex: { xs: "1 1 100%", sm: "1 1 calc(33% - 10px)" },
      border: "2px dashed #333",
      borderRadius: "5px",
      padding: "1rem",
      cursor: "pointer",
      margin: { xs: "10px 0", sm: "0 5px" },
      position: "relative",
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
                flex: { xs: "1 1 100%", sm: "1 1 calc(33% - 10px)" },
                border: "2px dashed #333",
                borderRadius: "5px",
                padding: "1rem",
                cursor: "pointer",
                margin: { xs: "10px 0", sm: "0 5px" },
                position: "relative",
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
            
            {/* Attic Image * */}
            <InputLabel
              sx={{ marginTop: "20px", marginBottom: "20px", color: "#48979d" }}
            >
              Attic * (1 File Required)
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
            <InputLabel sx={{ marginTop: "20px", marginBottom: "20px" }}>
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
             {/* // Deposit Section */}
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






      {/* Notes */}
      <TextField
 
 InputLabelProps={{
  sx: { color: '#48979d' }, // Use this to make the label red
}}
        name="notes"
        label="Notes"
        multiline
        rows={4}
        value={formData.notes}
        onChange={handleInputChange}
        fullWidth
        variant="outlined"
        margin="normal"
      />

      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
      
      >
        Submit
      </Button>
    </Box>
    <Modal
  open={openErrorModal}
  onClose={() => setOpenErrorModal(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'auto', // Adjust width as needed
      maxWidth: '600px', // Maximum width of the modal
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      borderRadius: '8px', // Rounded corners
    }}
  >
    <Typography
      id="modal-modal-title"
      variant="h6"
      component="h2"
      style={{ color: '#1976d2', fontWeight: 'bold', marginBottom: '16px' }}
    >
     You are missing some project data:
    </Typography>
    <Box id="modal-modal-description" sx={{ mt: 2, color: '#1976d2' }}>
      {errors.map((error, index) => (
        <Typography key={index} sx={{ mt: 1 }}>
          - {error}
        </Typography>
      ))}
    </Box>
    <Button
      onClick={() => setOpenErrorModal(false)}
      style={{
        marginTop: '24px',
        background: '#1976d2', // Blue background color for the button
        color: 'white', // White text color for the button
      }}
      variant="contained"
    >
      Continue
    </Button>
  </Box>
</Modal>

    </>
  );
};





export default MyForm;

