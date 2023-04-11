

import * as React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ADD_ORDER } from '@/gql/mutations/addOrder';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { IconButton } from '@mui/material';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from '../../API/firebase';
import { uuid } from 'uuidv4';



function ImageUpload() {
  const [preview, setPreview] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const [preview3, setPreview3] = useState(null);
  const [preview4, setPreview4] = useState(null);
  const [preview5, setPreview5] = useState(null);
  const [preview6, setPreview6] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);



      // const storageRef = ref(storage, `images/${uuid()}`);


const preUri = 'images/stars.jpg'
      const pathReference = ref(storage, preUri);


      // 'file' comes from the Blob or File API
     uploadBytes(pathReference, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');


      console.log(snapshot.metadata.fullPath);


      const gsReference = ref(storage, 'gs://bucket/images/stars.jpg');


      

      // pathReference.getDownloadURL().then((url) => {
      //   console.log('Download URL:', url);

      //   // Here is the image URI that you can use to display or download the image:
      //   const imageURI = url;

      //   console.log(imageURI);
      //   alert("success!");
      // });

    });












      
    } else {
      setPreview(null);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <IconButton
        component="label"
        htmlFor="image-upload"
        color={preview ? 'primary' : 'default'}
      >
        <AddPhotoAlternateIcon fontSize="large" />
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />
      </IconButton>
      {preview && (
        <img
          src={preview}
          alt="preview"
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
      )}
    </Box>
  );
}


export default function OrderInventory() {
 

  // INSTEAD O ADDING ORDER, UPDATE THE VANITEMS IMAGE. 
  const [addOrder, { data }] = useMutation(ADD_ORDER);

  const [uploadInProcess, setUploaded] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    event.persist();

  };

  const handleClose = () => {
    setOpen(false);
  };



  const handleUpload = (acceptedFiles, index) => {
    setUploadedFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles[index] = acceptedFiles[0];
      setImageUpload(acceptedFiles[0]);
      return newFiles;
    });

    const storage = getStorage();

    const imageRef = storage.ref(`images/${imageUpload.name + uuid()}}`);


    alert("uploading image");
    // 'file' comes from the Blob or File API


    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      console.log(snapshot);
      console.log(snapshot.metadata.fullPath);
      alert("success!");    
      //push full path to database by updating vanItem with it and making it the latest pic for preview at order.


    });
    









  };




  const handleLeadSubmit = (e) => {

    // console.log(formData)
    e.preventDefault();










    addOrder({
    variables: {
      orderId: "123",
      itemName: "james",
      itemDescription: "444",
      itemImages: "http:.",
      quantity: "47",
      status: "inQue",
      vanId: "64064e66fe9b22647414a812"
      }
      }).then((res) => {
         console.log("Order Submitted");
    console.log(res);
    // setUploaded(false);
   

    }).catch((err) => {
      console.log("Order Not Submitted");
      console.log(err);
    });


  };

  return (
    <Box  >
      {uploadInProcess ? (
        <div>
          <Button variant="outlined" onClick={handleClickOpen} >
            Order Item!
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Order Receipt</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Box display="flex" flexDirection="column">


 {/* 3 X 3 IMAGE DROPPERS HERE WITH OPTIONAL IMAGE PREVIEW */}


                    
                </Box>


              </DialogContentText>
              <Box  display="flex" justifyContent="center">
                <img
                  src="https://img.freepik.com/premium-vector/3d-check-mark-icon-realistic-green-tick-button-isolated-white-background-vector-illustration_113065-1285.jpg"
                  alt="CSV Upload"
                  width="200"
                  height="200"
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => setUploaded(false)}>Order Item</Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <div>
          <Button variant="outlined" onClick={handleClickOpen} sx={{marginLeft: '10px'}}>
            Add Images
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Order Summary</DialogTitle>
            <DialogContent sx={{  width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
              <DialogContentText>


            {/* 3 x 3 grid with image droppers and optional image preview */}

            <Box  display="flex" flexDirection="column">
  {[...Array(3)].map((_, rowIndex) => (
    <Box key={rowIndex} display="flex" justifyContent="space-between" sx={{ width: '25%'}}>
      {[...Array(3)].map((_, colIndex) => (
        <ImageUpload key={`${rowIndex}-${colIndex}`} />
      ))}
    </Box>
  ))}
</Box>

                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleLeadSubmit}>Upload Image</Button>
                </DialogActions>
                </Dialog>
                </div>
                )}
                </Box>
                );
                }



