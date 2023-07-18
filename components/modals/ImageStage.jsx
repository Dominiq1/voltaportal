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
import { getStorage, ref, uploadBytes , getDownloadURL} from "firebase/storage";
import { storage } from '../../API/firebase';
import { uuid } from 'uuidv4';
import { UPDATE_VAN_ITEM } from '@/gql/mutations/addVanItem';



function ImageUpload({setImage, setUploaded}) {
  const [preview, setPreview] = useState([]);
  const [preview2, setPreview2] = useState([]);
  const [preview3, setPreview3] = useState([]);
  const [preview4, setPreview4] = useState([]);
  const [preview5, setPreview5] = useState([]);
  const [preview6, setPreview6] = useState([]);

  const [updateVanItem, { Leadloading, error, Leaddata }] = useMutation(UPDATE_VAN_ITEM);


  const handleImageChange = async (e) => {
    setUploaded(true);
    const files = e.target.files;
    const previews = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        setPreview(previews);
      };
      reader.readAsDataURL(file);
  
      const preUri = 'images/item.jpg' + uuid();
      const pathReference = ref(storage, preUri);
  
      uploadBytes(pathReference, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        console.log(snapshot.metadata.fullPath);
        const gsReference = ref(storage, 'gs://bucket' + preUri);
  
        // Create a reference from an HTTPS URL
        // Note that in the URL, characters are URL escaped!
        const httpsReference = ref(
          storage,
          'https://firebasestorage.googleapis.com/v0/b/voltaic-383203.appspot.com/o/' +
            encodeURIComponent(preUri)
        );
  
        getDownloadURL(httpsReference).then((url) => {
          // `url` is the download URL for 'images/stars.jpg'
          console.log(url);
          setImage(url);
          //   handleUpdateLead(url);
  
          // you may want to store the download URL in an array so you can send them to the backend together
        });
      });
    }
  };
  



const handleUpdateLead = async (image) => {
    try {
      console.log("Updating Lead");
      console.log(image);
      console.log(params.row.id);
      console.log(params.row.itemName);
      console.log(params.row.itemQuantity);
      console.log(params.row.itemDescription);

     const result = await updateVanItem({
        variables: {
          itemId: params.row.id,
          itemName: params.row.itemName,
          itemDescription: 'null',
          itemQuantity: params.row.itemQuantity,
          itemImage: image,
          vanId: "64067ba9d93b3428a600075a"
        }
      }).then((res) => {

     successCheck();
      // console.log(result.data.updateLead);
        console.log(res)
      }).catch((err) => {
        console.log("error updating lead.");
    console.log(err)
        console.log(err)
      });

 
      return result
    // return result.data.updateLead;
    } catch (error) {
      console.log("Failed updating the lead");
      console.log(error);
      return null;
    }finally{
      setUploaded(false);
        console.log("Lead Updated");
        // setHighlighted(false);
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


export default function ImageStage({setImage}) {
 

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
      const storage = getStorage();
      const imageUrls = [];
    
      for (let i = 0; i < acceptedFiles.length; i++) {
        const file = acceptedFiles[i];
        const imageRef = storage.ref(`images/${file.name + uuid()}`);
        uploadBytes(imageRef, file).then((snapshot) => {
          console.log('Uploaded a blob or file!');
          console.log(snapshot.metadata.fullPath);
          const gsReference = ref(storage, snapshot.metadata.fullPath);
          const httpsReference = ref(storage, `https://firebasestorage.googleapis.com/v0/b/${storage.app.options.storageBucket}/o/${encodeURIComponent(snapshot.metadata.fullPath)}?alt=media`);
          getDownloadURL(httpsReference).then((url) => {
            console.log(url);
            imageUrls.push(url);
            setImageUrls(imageUrls); // set the state to store all image urls
          });
        });
      }
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
            Successfully Added Image
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm</DialogTitle>
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
         
              <Button onClick={() => setUploaded(false)}>Confirm</Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <div>
          <Button variant="outlined" onClick={handleClickOpen} sx={{width: '25px', height: '25px'}}>
            +
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Image Uploads</DialogTitle>
            <DialogContent sx={{  width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
              <DialogContentText>


            {/* 3 x 3 grid with image droppers and optional image preview */}

            <Box  display="flex" flexDirection="column">
  {[...Array(3)].map((_, rowIndex) => (
    <Box key={rowIndex} display="flex" justifyContent="space-between" sx={{ width: '25%'}}>
      {[...Array(3)].map((_, colIndex) => (
        <ImageUpload  setUploaded={setUploaded} setImage={setImage}  key={`${rowIndex}-${colIndex}`} />
      ))}
    </Box>
  ))}
</Box>

                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Confirm</Button>
               
                </DialogActions>
                </Dialog>
                </div>
                )}
                </Box>
                );
                }



