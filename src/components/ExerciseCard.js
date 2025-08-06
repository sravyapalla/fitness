import React from 'react';
import { Link } from 'react-router-dom';
import { Stack, Typography, Button } from '@mui/material';

const ExerciseCard = ({ exercise }) => {
  if (!exercise || typeof exercise !== 'object') return null;

  return (
    <Link
      to={`/exercise/${exercise.id}`}
      className="exercise-card"
      style={{
        textDecoration: 'none',
        borderTop: '4px solid transparent',
        background: '#fff',
        borderBottomLeftRadius: '20px',
        width: '320px',
        height: '410px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: '15px',
        transition: 'transform 0.2s ease',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
      }}
    >
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        style={{
          width: '100%',
          height: '260px',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          objectFit: 'cover',
        }}
      />

      <Stack direction="row" spacing={1} sx={{ marginTop: '10px', paddingX: '10px' }}>
        <Button
          sx={{
            background: '#ffa9a9',
            color: '#fff',
            fontSize: '14px',
            borderRadius: '20px',
            padding: '5px 15px',
            textTransform: 'capitalize',
          }}
        >
          {exercise.bodyPart}
        </Button>

        <Button
          sx={{
            background: '#fcc757',
            color: '#fff',
            fontSize: '14px',
            borderRadius: '20px',
            padding: '5px 15px',
            textTransform: 'capitalize',
          }}
        >
          {exercise.target}
        </Button>
      </Stack>

      <Typography
        fontWeight="bold"
        color="#000"
        fontSize="18px"
        paddingX="10px"
        marginTop="10px"
        textTransform="capitalize"
      >
        {exercise.name}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;
