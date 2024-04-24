import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_QB_JOBS } from '@/gql/queries/serviceQueries';
import Image from 'next/image'; // 
// Import a placeholder profile image or ensure you have a URL to one
// import profilePic from '../../public/pro'; // Adjust the path as necessary

const VCPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_QB_JOBS, {
    variables: { repID: id },
    skip: !id,
  });

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%', backgroundColor: 'white' }}>
      <div style={{ position: 'relative', width: '150px', height: '150px' }}>
        <Image src="/images/voltaicLogo.png" alt="Loading..." layout="fill" objectFit="contain" />
      </div>
    </div>
  );
  
  if (error) return <p>Error: {error.message}</p>;

  const user = data?.GetQBUser; // Adjust based on actual data structure

  // Instagram-like layout styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: "blue",
      width:'100vw',
      padding: '20px',
      backgroundColor: '#FAFAFA', // Instagram's background color
      minHeight: '100%', // Ensure at least full height
     height: '100vh',
    },
    profileImageContainer: {
      borderRadius: '50%',
      overflow: 'hidden',
      width: '120px',
      height: '120px',
   
      position: 'relative', // Required for next/image with layout='fill'
      marginTop: '20px',
    },
    profileImage: {
      borderRadius: '50%',
      width: '120px',
      height: '120px',
      border: '5px solid #007872', 
      objectFit: 'cover',
      // Reduce or remove marginTop if necessary
      marginTop: '10px', // Adjust this value as needed, maybe even to '0'
    },
    userName: {
      color: '#262626', // Instagram text color
      fontSize: '1.5em',
      fontWeight: '700',

      // Reduce the top and bottom margin around the user's name
      margin: '10px 0', // Adjust top and bottom margin as needed
    },
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'column', // Stack buttons vertically
      alignItems: 'center', // Center buttons horizontally
      width: '80vw', // Set width of the container to be the same as buttons
      marginTop: '20px', // Adjust this value as needed
    },
    button: {
      backgroundColor: '#007872', // Instagram button color
      color: 'white',
      width: '80vw', // Set button width to 80% of the viewport width
      height: "40px",
      border: 'none',
      borderRadius: '4px',
      padding: '5px 15px',
      cursor: 'pointer',
      marginBottom: '10px', // Add space between the buttons
    },
    stats: {
      display: 'flex',
      justifyContent: 'space-around',
      // backgroundColor: 'red',
      width: '100%',
      maxWidth: '400px',
      margin: '10px 0',
    },
    statItem: {
      textAlign: 'center',
    },
   
 
  };

  return (
    <div style={styles.container}>


     <img src={user?.profileImage || '/defaultProfilePic.jpg'} alt="Profile" style={styles.profileImage} />
     
     
     
      <h2 style={styles.userName}>{user?.name || 'Name unavailable'}</h2>
      {/* <div style={styles.stats}>
        <div style={styles.statItem}>
          <strong>10</strong>
          <p>Projects</p>
        </div>
        <div style={styles.statItem}>
          <strong>20</strong>
          <p>Calendar</p>
        </div>
      </div> */}
      <div style={styles.buttonsContainer}>
        <button style={styles.button} onClick={() => router.push(`/VCMap/${id}`)}>Projects Map</button>
        <button style={styles.button} onClick={() => router.push(`/ConstructionCal/${id}`)}>Calendar</button>


       {/* Quick resources */}

       {/* Quick resources */}
       <button style={styles.button} onClick={() => window.open('https://drive.google.com/drive/u/1/folders/164l1OHlNIt5-eOP0UI_hNeuiu3D50VzC', '_blank')}>Sunnova Quick reference Guide</button>
    <button style={styles.button} onClick={() => window.open('https://help.palmetto.finance/en/articles/8306274-install-photo-documentation', '_blank')}>Lightreach Quick reference Guide</button>


      </div>
    </div>
  );
};

export default VCPage;
