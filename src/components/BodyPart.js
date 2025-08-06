import React from 'react';
import { Stack, Typography } from '@mui/material';
import Icon from '../asset/icons/gym.png'; // make sure path is correct

const BodyPart = ({ item, setBodyPart, bodyPart }) => {
  const normalizedItem = item.toLowerCase();

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      className="bodyPart-card"
      sx={
        bodyPart === normalizedItem
          ? {
              borderTop: '4px solid #FF2625',
              background: '#fff',
              borderBottomLeftRadius: '20px',
              width: '270px',
              height: '282px',
              cursor: 'pointer',
              gap: '47px',
            }
          : {
              background: '#fff',
              borderBottomLeftRadius: '20px',
              width: '270px',
              height: '282px',
              cursor: 'pointer',
              gap: '47px',
            }
      }
      onClick={() => {
        setBodyPart(normalizedItem);
        window.scrollTo({ top: 1800, behavior: 'smooth' });
      }}
    >
      <img src={Icon} alt="dumbbell" style={{ width: '40px', height: '40px' }} />
      <Typography
        fontSize="24px"
        fontWeight="bold"
        fontFamily="Alegreya"
        color="#3A1212"
        textTransform="lowercase" // ✅ force lowercase display
      >
        {item}
      </Typography>
    </Stack>
  );
};

export default BodyPart;
