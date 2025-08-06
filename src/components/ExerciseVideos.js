import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const ExerciseVideos = ({ videos, name }) => {
  // 💡 Ensure `videos` is always a valid array
  if (!Array.isArray(videos) || videos.length === 0) {
    return (
      <Typography variant="h6" color="error" mt="20px">
        No videos available for <strong>{name}</strong>.
      </Typography>
    );
  }

  return (
    <Box sx={{ marginTop: { lg: '200px', xs: '20px' }, p: '20px' }}>
      <Typography variant="h4" mb="33px">
        Watch <span style={{ color: '#FF2625', textTransform: 'capitalize' }}>{name}</span> exercise videos
      </Typography>

      <Stack
        justifyContent="flex-start"
        flexWrap="wrap"
        alignItems="center"
        sx={{
          flexDirection: { lg: 'row' },
          gap: { lg: '110px', xs: '0px' },
        }}
      >
        {videos.slice(0, 6).map((item, index) => (
          <a
            key={index}
            className="exercise-video"
            href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={item.video.thumbnails[0].url}
              alt={item.video.title}
              style={{ borderRadius: '10px' }}
            />
            <Box>
              <Typography variant="h6" color="#000">
                {item.video.title}
              </Typography>
              <Typography variant="subtitle2" color="gray">
                {item.video.channelName}
              </Typography>
            </Box>
          </a>
        ))}
      </Stack>
    </Box>
  );
};

export default ExerciseVideos;
