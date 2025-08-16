import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import ExerciseDetail from './pages/ExerciseDetail';
import BMIModal from './components/BMIModal'; // make sure this file exists

const App = () => {
  const [openBMI, setOpenBMI] = useState(false);

  return (
    <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
      <Navbar onOpenBMI={() => setOpenBMI(true)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
      </Routes>

      <BMIModal open={openBMI} onClose={() => setOpenBMI(false)} />
    </Box>
  );
};

export default App;
