import Head from "next/head";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import HomeScreen from "@/components/page/HomePage";
import LoginDashboard from "@/components/page/LoginDashboard";

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [showHomeScreen, setShowHomeScreen] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    console.log("Router ID:", id);
    if (id) {
      setFade(true);
      setTimeout(() => {
        setIsValidPassword(true);
        setShowHomeScreen(true);
      }, 500); // Delay to let the fade-out transition complete
    }
  }, [id]);

  const fadeStyles = {
    transition: 'opacity 0.5s ease-in-out',
    opacity: fade ? 0 : 1,
  };

  console.log("isValidPassword:", isValidPassword);

  return (
    <>
      <Head>
        <title>Volta Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ position: 'relative', height: '100vh' }}>
        {!showHomeScreen ? (
          <div style={{ ...fadeStyles, position: 'absolute', width: '100%' }}>
            <LoginDashboard />
          </div>
        ) : (
          <div style={{ transition: 'opacity 0.5s ease-in-out', opacity: 1 }}>
            <HomeScreen projectID={id} />
          </div>
        )}
      </main>
    </>
  );
}
