

import React, { useEffect, useState } from 'react';
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
  
    if (loading) return <div>Loading...</div>;
    if (error) return <p>Error: {error.message}</p>;
  
    // Directly access the first item of the list if the schema remains unchanged
    // and you're certain the backend always returns a single object within an array
    const user = data?.GetQBUser[0]; // Adjust based on actual data structure
  
    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
        <h1>Installer Profile</h1>
        <p>Installer Name: {user?.name || 'Name unavailable'}</p>
        <p>Phone: {user?.phone || 'Phone unavailable'}</p>
        <div>
          <h2>Resources</h2>
          <button onClick={() => router.push('/projectsMap')} style={{ marginRight: '10px' }}>
            Projects Map
          </button>
          <button onClick={() => router.push(`/ConstructionCal/${id}`)}>
            Calendar
          </button>
        </div>
      </div>
    );
  };
  
  export default VCPage;
  