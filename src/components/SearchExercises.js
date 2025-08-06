import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchBodyPartsData = async () => {
      const data = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
        exerciseOptions
      );

      console.log('Fetched body parts:', data); // 🔍 Debug log

      if (Array.isArray(data) && data.length > 0) {
        setBodyParts(['all', ...data]);
      } else {
        console.warn('Using fallback body parts due to API error or empty response');
        setBodyParts([
          'all',
          'back',
          'cardio',
          'chest',
          'lower arms',
          'lower legs',
          'neck',
          'shoulders',
          'upper arms',
          'upper legs',
          'waist',
        ]);
      }
    };

    fetchBodyPartsData();
  }, []);

  const handleSearch = async () => {
    if (search.trim()) {
      const exercisesData = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises',
        exerciseOptions
      );

      if (!Array.isArray(exercisesData)) {
        console.error('Search data fetch failed:', exercisesData);
        return;
      }

      const searchedExercises = exercisesData.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(search.toLowerCase()) ||
          exercise.target.toLowerCase().includes(search.toLowerCase()) ||
          exercise.equipment.toLowerCase().includes(search.toLowerCase()) ||
          exercise.bodyPart.toLowerCase().includes(search.toLowerCase())
      );

      setSearch('');
      setExercises(searchedExercises);
      window.scrollTo({ top: 1500, left: 100, behavior: 'smooth' });
    }
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: '44px', xs: '30px' } }}
        mb="50px"
        textAlign="center"
      >
        Awesome Exercises You <br /> Should Know
      </Typography>

      <Box position="relative" mb="72px">
        <TextField
          height="76px"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Exercises"
          type="text"
          sx={{
            input: {
              fontWeight: '700',
              border: 'none',
              borderRadius: '4px',
            },
            width: { lg: '800px', xs: '350px' },
            backgroundColor: '#fff',
            borderRadius: '40px',
          }}
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: '#FF2625',
            color: '#fff',
            textTransform: 'none',
            width: { lg: '175px', xs: '80px' },
            height: '56px',
            position: 'absolute',
            right: '0',
            fontSize: { lg: '20px', xs: '14px' },
            borderTopRightRadius: '40px',
            borderBottomRightRadius: '40px',
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          bodyParts
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
