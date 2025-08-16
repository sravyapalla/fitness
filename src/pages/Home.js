import React, { useState } from 'react';
import { Box, Button } from '@mui/material';

import HeroBanner from '../components/HeroBanner';
import SearchExercises from '../components/SearchExercises';
import Exercises from '../components/Exercises';

const Home = ({ onOpenBMI }) => {
  const [bodyPart, setBodyPart] = useState('all');
  const [exercises, setExercises] = useState([]);

  return (
    <Box>
      <HeroBanner />

      {/* Optional CTA to open BMI modal */}
      {onOpenBMI && (
        <Box textAlign="center" mt={3}>
          <Button
            variant="contained"
            sx={{ bgcolor: '#FF2625', '&:hover': { bgcolor: '#e02421' } }}
            onClick={onOpenBMI}
          >
            Check your BMI
          </Button>
        </Box>
      )}

      <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercises
        exercises={exercises}
        setExercises={setExercises}
        bodyPart={bodyPart}
      />
    </Box>
  );
};

export default Home;
