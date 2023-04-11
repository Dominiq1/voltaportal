// import { useState } from "react";
// import { Box } from "@mui/material";
// import { getStorage, ref, uploadBytes } from "firebase/storage";
// import storage from '../API/firebase';
// import { uuid } from 'uuidv4';

// export default function ImageGrid({ params, rowId, setRowId }) {






//     const [selectedBox, setSelectedBox] = useState(null);
//     const [uploadedFiles, setUploadedFiles] = useState(Array.from({ length: 9 }));



//     const [imageUpload, setImageUpload] = useState(null);
   
  
  
  
  
//     const handleUpload = (acceptedFiles, index) => {
//       setUploadedFiles((prevFiles) => {
//         const newFiles = [...prevFiles];
//         newFiles[index] = acceptedFiles[0];
//         setImageUpload(acceptedFiles[0]);
//         return newFiles;
//       });

//       const storage = getStorage();

//       const imageRef = storage.ref(`images/${imageUpload.name + uuid()}}`);


//       alert("uploading image");
//       // 'file' comes from the Blob or File API


//       uploadBytes(imageRef, imageUpload).then((snapshot) => {
//         console.log('Uploaded a blob or file!');
//         console.log(snapshot);
//         console.log(snapshot.metadata.fullPath);
//         alert("success!");    
//         //push full path to database by updating vanItem with it and making it the latest pic for preview at order.


//       });
      









//     };
  
//     const handleClick = (index) => {
//       setSelectedBox(index);
//     };
  
//     const handleCloseModal = () => {
//       setSelectedBox(null);
//     };
  
//     const handleSave = () => {
//       console.log(uploadedFiles); // Log the uploaded image data
//       setSelectedBox(null);
//     };
  
//     return (
//       <>
//         <Box sx={{ display: 'flex', flexWrap: 'wrap', maxWidth: '100%', mt: 2 }}>
//           {Array.from({ length: 9 }).map((_, index) => (
//             <Box
//               key={index}
//               sx={{
//                 width: '33%',
//                 height: '33%',
//                 position: 'relative',
//                 // Add some padding to create space between the ImageBox components
//                 p: 1,
//               }}
//             >

                
//               {/* <ImageBox
//                 params={params}
//                 rowId={rowId}
//                 setRowId={setRowId}
//                 item={index + 1}
//                 onClick={() => handleClick(index)}
//               /> */}



//             </Box>
//           ))}
//         </Box>
//         <Modal open={selectedBox !== null} onClose={handleCloseModal}>
//           <Box sx={{ p: 2 }}>
//             <PhotoBox
//               onUpload={(acceptedFiles) => handleUpload(acceptedFiles, selectedBox)}
//             />
//             <Button onClick={handleSave}>Save</Button>
//           </Box>
//         </Modal>
//       </>
//     );
//   }
  