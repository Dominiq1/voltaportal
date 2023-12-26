import Head from 'next/head'
import { useEffect } from 'react';
import { useQuery } from '@apollo/client'
import { Box } from '@mui/material'
import { GET_MAP_DATA } from '@/gql/mutations/InstallMap'

export default function Home() {
  const { loading, error, data } = useQuery(GET_MAP_DATA);

  useEffect(() => {
    // Add the script dynamically after the initial render
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://stella.demand-iq.com/widget-address/voltaic-construction.estimate.demand-iq.com/';
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Voltaic Install Map</title>
        <meta name="description" content="Voltiac OPS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={{ height: '100vh', width: '100vw', backgroundColor: 'black', p: 2, color: 'black' }}>
        <h1>Stella</h1>
        <div className="demand-iq-stella-widget" data-utm-content=""></div>
      </Box>
    </>
  );
}
