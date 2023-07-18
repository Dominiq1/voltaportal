import React from "react";
import { Box, Button } from "@mui/material";
import logo from "../../public/images/voltaicLogo.png";
import Image from "next/image";

const HomeScreen = () => {
  const buttons = [
    { label: "Inventory", link: "/Inventory" },
    { label: "Install Map", link: "/InstallMap" },
    { label: "Button 3", link: "/" },
    { label: "Button 4", link: "/" },
    { label: "Button 5", link: "/" },
    { label: "Button 6", link: "/" },
    { label: "Button 7", link: "/" },
    { label: "Button 8", link: "/" },
    { label: "Button 9", link: "/" },
  ];

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ height: "200px", width: "200px", position: "relative" }}>
        <Image
          src={logo}
          alt="Logo"
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridGap: "1rem",
          marginTop: "2rem",
        }}
      >
        {buttons.map((button, index) => (
          <Button
            key={index}
            variant="contained"
            color="primary"
            size="large"
            onClick={() => (window.location.href = button.link)}
          >
            {button.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default HomeScreen;
