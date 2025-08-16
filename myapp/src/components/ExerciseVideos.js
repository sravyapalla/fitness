import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const ExerciseVideos = ({ videos, name, error }) => {
  // Add debugging
  console.log('🎬 ExerciseVideos component received:', { videos, name, error });
  console.log('🔍 Videos array check:', Array.isArray(videos), 'Length:', videos?.length);
  
  // Handle different error states
  if (error === 'not_subscribed') {
    return (
      <Box sx={{ marginTop: { lg: '200px', xs: '20px' }, p: '20px' }}>
        <Typography variant="h6" color="error" mt="20px">
          ⚠️ YouTube API Error: Please subscribe to the YouTube v2 API on RapidAPI
        </Typography>
        <Typography variant="body2" color="text.secondary" mt="10px">
          Visit: <a href="https://rapidapi.com/ytdlfree/api/youtube-v2" target="_blank" rel="noopener">
            https://rapidapi.com/ytdlfree/api/youtube-v2
          </a>
        </Typography>
      </Box>
    );
  }
  
  if (error === 'rate_limit') {
    return (
      <Box sx={{ marginTop: { lg: '200px', xs: '20px' }, p: '20px' }}>
        <Typography variant="h6" color="warning.main" mt="20px">
          ⏳ Rate limit exceeded. Please try again later.
        </Typography>
      </Box>
    );
  }
  
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
            href={`https://www.youtube.com/watch?v=${item.video_id}`}
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: 'none',
              marginBottom: '20px'
            }}
          >
            <img
              src={item.thumbnails && item.thumbnails.length > 0 ? item.thumbnails[0].url : ''}
              alt={item.title || 'Video thumbnail'}
              style={{ 
                borderRadius: '10px',
                width: '358px',
                height: '180px',
                objectFit: 'cover'
              }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/358x180?text=No+Image';
              }}
            />
            <Box sx={{ mt: '10px', maxWidth: '358px' }}>
              <Typography variant="h6" color="#000" sx={{ 
                fontSize: '16px',
                fontWeight: 'bold',
                lineHeight: '1.3',
                mb: '5px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {item.title}
              </Typography>
              <Typography variant="subtitle2" color="gray" sx={{ mb: '3px' }}>
                {item.author}
              </Typography>
              <Typography variant="caption" color="gray" sx={{ fontSize: '12px' }}>
                {item.number_of_views ? `${item.number_of_views.toLocaleString()} views` : ''} 
                {item.video_length && ` • ${item.video_length}`} 
                {item.published_time && ` • ${item.published_time}`}
              </Typography>
            </Box>
          </a>
        ))}
      </Stack>
    </Box>
  );
};

export default ExerciseVideos;