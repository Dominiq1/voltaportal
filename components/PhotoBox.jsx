import { useState, useEffect } from 'react'
import { Box } from '@mui/system';
import { CircularProgress, Fab , Button} from '@mui/material';
import { BsCamera } from 'react-icons/bs';
import { useDropzone } from 'react-dropzone';
import ImageGrid from './ImageBox';
import Modal from '@mui/material';
import ImagesModal from './modals/ImagesModal';

// import { useState, useEffect } from 'react'
// import { Box } from '@mui/system'
// import { CircularProgress, Fab, Button } from '@mui/material'
// import { BsCamera } from 'react-icons/bs'
// import { useDropzone } from 'react-dropzone'


function PhotoBox({params, rowId, setRowId, item }) {
const [uploadedFile, setUploadedFile] = useState(null);


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

    {/* <Button
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '8px',
        width: '240px',
        height: '48px',
        padding: '12px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: 'white',
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
      }}
      {...getInputProps()}
    >
      <BsCamera
        sx={{
          color: 'white',
          marginRight: '12px',
          fontSize: '24px',
        }}
      />
      <span>Select a photo</span>
    </Button> */}

    <ImagesModal/>



    {/* {uploadedFile && <p>{uploadedFile.name}</p>} */}
  </Box>
);
}

export default PhotoBox;