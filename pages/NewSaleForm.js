import React , {useEffect, useState}from 'react';
import { Box, TextField, Typography, Button, InputLabel, Select, MenuItem } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import circularProgressClasses from '@mui/material';    
import { GET_CRM_USERS } from '@/gql/mutations/CRM';
import Image from 'next/image';
import backgroundImage from './images/VC.png';
import Alert from '@mui/material/Alert';
import { storage } from '@/API/firebase';

const MyForm = () => {

    const [ CRMusers, setCRMusers ] = useState([ ]);


    const [loading, setLoading] = useState(false);

    const [installMarkets, setInstallers] = useState([ { id: 0, name: 'Voltaic Construction' }, { id: 1,name: 'Greenspire' },  {id: 2, name: 'Voltaic Finance' },
        { id: 3,name: 'Titanium Solar' },
        { id: 4,name: 'AC/DC' }
      ] );

  const [getCRMusers, { data }] = useMutation(GET_CRM_USERS);
  const [atticFile, setAtticFile] = React.useState(null);
  const [electricalFile, setElectricalFile] = React.useState(null);
  const [licenseFile, setLicenseFile] = React.useState(null);
  const [depositFile, setDepositFile] = React.useState(null);
  const [formValid, setFormValid] = React.useState(true);

  const [installer, setInstaller] = React.useState('');

  const [rep, setRep] = React.useState('');

//   const [installer, setInstaller] = React.useState('');

//   const [installer, setInstaller] = React.useState('');

//   const [installer, setInstaller] = React.useState('');




// CHANGE HANDLERS

  const handleChange = (event) => {
    setInstaller(event.target.value);
  };



  const handleRepChange = (event) => {
    setRep(event.target.value);
    };








  const { getRootProps: getAtticProps, getInputProps: getAtticInputProps } = useDropzone({
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
  
  
  const preUri = 'images/item.jpg' + uuid();
        const pathReference = ref(storage,preUri);
  
  
        // 'file' comes from the Blob or File API
       uploadBytes(pathReference, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        console.log(snapshot.metadata.fullPath);
        const gsReference = ref(storage, 'gs://bucket' + preUri);
  
        
     // Create a reference from an HTTPS URL
  // Note that in the URL, characters are URL escaped!
  const httpsReference = ref(storage, 'https://firebasestorage.googleapis.com/v0/b/voltaic-383203.appspot.com/o/' + encodeURIComponent(preUri));  
  
  getDownloadURL(httpsReference).then((url) => {
    // `url` is the download URL for 'images/stars.jpg'
    console.log(url);
  
    handleUpdateLead(url);
    
  })
  
  
  
  
      });
  
  
  
        
      } else {
    console.log('no file');
      }
    },
  });

  const { getRootProps: getElectricalProps, getInputProps: getElectricalInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setElectricalFile(acceptedFiles[0]);
    },
  });

  const { getRootProps: getLicenseProps, getInputProps: getLicenseInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setLicenseFile(acceptedFiles[0]);
    },
  });

  const { getRootProps: getDepositProps, getInputProps: getDepositInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setDepositFile(acceptedFiles[0]);
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
       
        console.log('Installer:', installer);
        console.log('Rep:', rep);
      console.log('Attic File:', atticFile);
      console.log('Electrical File:', electricalFile);
      console.log("Driver's License File:", licenseFile);
      console.log('Deposit File:', depositFile);
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
        id: index
      }
    });
  
    setCRMusers(usersWithIds);

    });
  }, []);
  

  return (
    <Box sx={{ width: '100vw', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Box sx={{ width: '100%', height: '20vh', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Image src={backgroundImage} style={{ width: '25rem', height: '9.5em' }} />
      </Box>
      <Box sx={{ backgroundColor: '#fff', p: '2rem' }}>
        {/* <Typography variant="h5" sx={{ mb: '2rem', fontFamily: 'Montserrat', fontWeight: 'bold', color: '#333' }}>Solar Sale Form</Typography> */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '60vw' }}>
          <form onSubmit={handleSubmit}>


          <InputLabel sx={{ marginBottom: '20px', color: 'red' }}>Installer *</InputLabel>

<Select
labelId="demo-simple-select-helper-label"
id="demo-simple-select-helper"
value={rep}
label="Sale Rep"
onChange={handleRepChange}
sx={{ width: '20em' , marginBottom: '20px'}}
>
<MenuItem value="">
<em>None</em>
</MenuItem>

{data && data.GetCRMusers.map((user) => (
    <MenuItem key={user.id} value={user}>{user.name}</MenuItem>



))}
</Select>



            <InputLabel sx={{ marginBottom: '20px', color: 'red' }}>Installer *</InputLabel>

            <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={installer}
          label="Age"
          onChange={handleChange}
          sx={{ width: '15em' , marginBottom: '20px'}}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
    
     
{installMarkets.map(installMarket => (
   <MenuItem key={installMarket.id} value={installMarket}>{installMarket.name}</MenuItem>

  ))}
    
        </Select>




<InputLabel sx={{ marginBottom: '20px', color: 'red' }}>Attic *</InputLabel>
<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px dashed #333', borderRadius: '5px', padding: '1rem', cursor: 'pointer' }} {...getAtticProps()}>
  <input {...getAtticInputProps()} />
  <Typography variant="body1" sx={{ color: '#333' }}>Drag and drop your Attic file here, or click to select a file</Typography>
  {atticFile ? (
    <Typography variant="body1" sx={{ color: '#333' }}>{atticFile.name}</Typography>
  ) : null}
</Box>

<InputLabel sx={{ marginBottom: '20px', color: 'red' }}>Electrical *</InputLabel>
<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px dashed #333', borderRadius: '5px', padding: '1rem', cursor: 'pointer' }} {...getElectricalProps()}>
  <input {...getElectricalInputProps()} />
  <Typography variant="body1" sx={{ color: '#333' }}>Drag and drop your Electrical file here, or click to select a file</Typography>
  {electricalFile ? (
    <Typography variant="body1" sx={{ color: '#333' }}>{electricalFile.name}</Typography>
  ) : null}
</Box>

<InputLabel sx={{ marginBottom: '20px', color: 'red' }}>Drivers License </InputLabel>
<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px dashed #333', borderRadius: '5px', padding: '1rem', cursor: 'pointer' }} {...getLicenseProps()}>
  <input {...getLicenseInputProps()} />
  <Typography variant="body1" sx={{ color: '#333' }}>Drag and drop your Drivers License file here, or click to select a file</Typography>
  {licenseFile ? (
    <Typography variant="body1" sx={{ color: '#333' }}>{licenseFile.name}</Typography>
  ) : null}
</Box>

<InputLabel sx={{ marginBottom: '20px' }}>Deposit</InputLabel>
<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px dashed #333', borderRadius: '5px', padding: '1rem', cursor: 'pointer' }} {...getDepositProps()}>
  <input {...getDepositInputProps()} />
  <Typography variant="body1" sx={{ color: '#333' }}>Drag and drop your Deposit file here, or click to select a file</Typography>
  {depositFile ? (
    <Typography variant="body1" sx={{ color: '#333' }}>{depositFile.name}</Typography>
  ) : null}
</Box>

{!formValid && (
  <Alert severity="error" sx={{ marginTop: '1rem' }}>Please fill out all required fields and upload all required files</Alert>
)}

<Button variant="contained" sx={{ backgroundColor: '#333', color: '#fff', marginTop: '1rem' }} type="submit">
  Submit
</Button>
</form>
</Box>
</Box>
</Box>
);
};

export default MyForm;







// import React from 'react';
// import { Box, TextField, Typography, Button } from '@mui/material';
// import { useDropzone } from 'react-dropzone';
// import Image from 'next/image';

// import backgroundImage from './images/VC.png'


// const MyForm = () => {
//   const [atticFile, setAtticFile] = React.useState(null);
//   const [electricalFile, setElectricalFile] = React.useState(null);
//   const [licenseFile, setLicenseFile] = React.useState(null);
//   const [depositFile, setDepositFile] = React.useState(null);

//   const { getRootProps: getAtticProps, getInputProps: getAtticInputProps } = useDropzone({
//     onDrop: (acceptedFiles) => {
//       setAtticFile(acceptedFiles[0]);
//     },
//   });

//   const { getRootProps: getElectricalProps, getInputProps: getElectricalInputProps } = useDropzone({
//     onDrop: (acceptedFiles) => {
//       setElectricalFile(acceptedFiles[0]);
//     },
//   });

//   const { getRootProps: getLicenseProps, getInputProps: getLicenseInputProps } = useDropzone({
//     onDrop: (acceptedFiles) => {
//       setLicenseFile(acceptedFiles[0]);
//     },
//   });

//   const { getRootProps: getDepositProps, getInputProps: getDepositInputProps } = useDropzone({
//     onDrop: (acceptedFiles) => {
//       setDepositFile(acceptedFiles[0]);
//     },
//   });

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}: ${value}`);
//     }
//     console.log('Attic File:', atticFile);
//     console.log('Electrical File:', electricalFile);
//     console.log("Driver's License File:", licenseFile);
//     console.log('Deposit File:', depositFile);
//   };

//   return (
//     <Box sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
//       <Box sx={{ width: '100%', height: '20vh', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//         <Image src={backgroundImage}  style={{ width: '25rem', height: '9.5em' }} />
//       </Box>
//       <Box sx={{ backgroundColor: '#fff', p: '2rem' }}>
//         <Typography variant="h5" sx={{ mb: '2rem', fontFamily: 'Montserrat', fontWeight: 'bold', color: '#333' }}>Solar Sale Form</Typography>
//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '60vw' }}>
//           <form onSubmit={handleSubmit}>
//             <TextField sx={{marginBottom: '20px'}} name="Sale Rep" label="Sale Rep" fullWidth />
//             <TextField sx={{marginBottom: '20px'}} name="Installer" label="Installer" fullWidth />
//             <TextField sx={{marginBottom: '20px'}} name="Program" label="Program" fullWidth />
//             <TextField sx={{marginBottom: '20px'}} name="Adders" label="Adders" fullWidth />
//             <TextField sx={{marginBottom: '20px'}} name="Notes" label="Notes" fullWidth />
//             <Button  variant="contained" {...getAtticProps()} sx={{ display: 'block' , marginBottom: '10px' }}>
//               {atticFile ? `Attic Photos: ${atticFile.name}` : 'Attic Photos: Select File'}
//               <input {...getAtticInputProps()} style={{ display: 'none' }} />
//             </Button>
//             <Button variant="contained" {...getElectricalProps()} sx={{ display: 'block', marginBottom: '10px' }}>
//               {electricalFile ? `Electrical Photos: ${electricalFile.name}` : 'Electrical Photos: Select File'}
//               <input {...getElectricalInputProps()} style={{ display: 'none' }} />
//             </Button>
//             <Button variant="contained" {...getLicenseProps()} sx={{ display: 'block' , marginBottom: '10px'}}>
//               {licenseFile ? `Driver's License: ${licenseFile.name}` : "Driver's License: Select File"}
//               <input {...getLicenseInputProps()} style={{ display: 'none' }} />
//             </Button>
//             <Button variant="contained" {...getDepositProps()} sx={{ display: 'block', marginBottom: '10px' }}>
//               {depositFile ? `Picture of Deposit: ${depositFile.name}` : 'Picture of Deposit: Select File'}
//               <input {...getDepositInputProps()} style={{ display: 'none' }} />
//             </Button>
//             <Button type="submit" variant="contained" sx={{ mt: '1rem' }}>Submit</Button>
//           </form>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default MyForm;
