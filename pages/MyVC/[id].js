import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_QB_JOBS } from '@/gql/queries/serviceQueries';

const VCPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Execute the GraphQL query
  const { loading, error, data } = useQuery(GET_QB_JOBS, {
    variables: { repID: id },
    skip: !id,
  });

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data?.GetQBUser; // Adjust based on actual data structure

  const styles = {
    container: {
      display: 'flex',
      height: '60em',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#E0F2F1', // Light teal background
    },
    header: {
      color: '#00897B', // Teal text color
      margin: '0',
      fontSize: '2em',
    },
    name: {
      color: '#004D40', // Darker teal text color
      fontSize: '1.5em',
      fontWeight: 'bold',
      margin: '0.5em 0',
    },
    button: {
      backgroundColor: '#004D40', // Darker teal background
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      margin: '10px',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Installer Profile</h1>
      <p style={styles.name}>{user?.name || 'Name unavailable'}</p>
      {/* <p>Phone: {user?.phone || 'Phone unavailable'}</p> */}
      <div>
  
        <button style={styles.button} onClick={() => router.push('/projectsMap')}>
          Projects Map
        </button>
        <button style={styles.button} onClick={() => router.push(`/ConstructionCal/${id}`)}>
          Calendar
        </button>
      </div>
    </div>
  );
};

export default VCPage;
