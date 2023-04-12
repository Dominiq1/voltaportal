import { useState, useEffect } from 'react'
import { Box } from '@mui/system';
import { CircularProgress, Fab , Button} from '@mui/material';
import { BsCamera } from 'react-icons/bs';
import { useDropzone } from 'react-dropzone';
import Modal from '@mui/material';
import ImagesModal from './modals/ImagesModal';

// import { useState, useEffect } from 'react'
// import { Box } from '@mui/system'
// import { CircularProgress, Fab, Button } from '@mui/material'
// import { BsCamera } from 'react-icons/bs'
// import { useDropzone } from 'react-dropzone'


function PhotoBox({params, rowId, setRowId, item }) {
const [uploadedFile, setUploadedFile] = useState(null);
const[ image, setImage] = useState(null);


useEffect(() => {
  
  const {itemImage, id, } = params.row;
  
  if (itemImage) {
    setImage(itemImage);
  }

  return () => {
    
  }
}, [])


return (
  <Box
    sx={{
      position: 'relative',
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
    }}

  >

    <Box sx={{ width: '55px', height: '55px'}}> 
        <img src={image} style={{width: '100%', height: '100%'}}/>
 
    </Box>

    <Box sx={{ width: '25px', height: '25px' }}> 

    <ImagesModal params={params}/>

    </Box>

  



  </Box>
);
}

export default PhotoBox;