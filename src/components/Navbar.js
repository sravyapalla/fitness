import React from 'react';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';
import Logo from '../asset/images/Logo.png';

const Navbar = ({ onOpenBMI }) => (
  <Stack
    direction="row"
    justifyContent="space-around"
    alignItems="center"
    sx={{ gap: { sm: '123px', xs: '40px' }, mt: { sm: '32px', xs: '20px' } }}
    px="20px"
  >
    <Link to="/">
      <img
        src={Logo}
        alt="logo"
        style={{ width: 48, height: 48, margin: '0 20px' }}
      />
    </Link>

    <Stack
      direction="row"
      gap="40px"
      fontFamily="Alegreya"
      fontSize="24px"
      alignItems="flex-end"
    >
      <Link
        to="/"
        style={{ textDecoration: 'none', color: '#3A1212', borderBottom: '3px solid #FF2625' }}
      >
        Home
      </Link>

      <a href="#exercises" style={{ textDecoration: 'none', color: '#3A1212' }}>
        Exercises
      </a>

      {/* NEW: BMI button */}
      <button
        type="button"
        onClick={onOpenBMI}
        data-testid="nav-bmi"
        style={{
          background: 'transparent',
          border: 0,
          padding: 0,
          margin: 0,
          cursor: 'pointer',
          color: '#3A1212',
          fontFamily: 'inherit',
          fontSize: 'inherit',
        }}
      >
        BMI
      </button>
    </Stack>
  </Stack>
);

export default Navbar;
