import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography, Pagination } from '@mui/material';
import { fetchData, exerciseOptions } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';
import Loader from './Loader';

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 6;

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      try {
        if (bodyPart === 'all') {
          exercisesData = await fetchData(
            'https://exercisedb.p.rapidapi.com/exercises',
            exerciseOptions
          );
        } else {
          exercisesData = await fetchData(
            `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
            exerciseOptions
          );
        }

        if (Array.isArray(exercisesData)) {
          setExercises(exercisesData);
        } else {
          console.warn('⚠️ Invalid exercise data:', exercisesData);
          setExercises([]);
        }
      } catch (err) {
        console.error('❌ Error fetching exercises:', err);
        setExercises([]);
      }
    };

    fetchExercisesData();
  }, [bodyPart, setExercises]);

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = Array.isArray(exercises)
    ? exercises.slice(indexOfFirstExercise, indexOfLastExercise)
    : [];

  const paginate = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };

  if (!currentExercises.length) {
    return (
      <Box mt="50px" textAlign="center">
        <Loader />
        <Typography variant="h6" mt={2}>
          {bodyPart === 'all'
            ? 'Loading all exercises...'
            : `No exercises found for "${bodyPart}"`}
        </Typography>
      </Box>
    );
  }

  return (
    <Box id="exercises" sx={{ mt: { lg: '110px' }, p: '20px' }}>
      <Typography variant="h4" fontWeight="bold" mb="46px" textAlign="center">
        Showing Results for{' '}
        <span style={{ color: '#FF2625', textTransform: 'capitalize' }}>{bodyPart}</span>
      </Typography>

      <Stack direction="row" flexWrap="wrap" justifyContent="center" gap="40px">
        {currentExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </Stack>

      <Stack mt="100px" alignItems="center">
        {exercises.length > exercisesPerPage && (
          <Pagination
            color="standard"
            shape="rounded"
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
