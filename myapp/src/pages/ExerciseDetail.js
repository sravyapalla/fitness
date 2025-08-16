import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { exerciseOptions, fetchData, fetchYouTubeVideosWithDetails } from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [videoError, setVideoError] = useState(null);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchExercisesData = async () => {
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';

      try {
        // Fetch exercise details
        const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
        setExerciseDetail(exerciseDetailData);

        // Fetch YouTube videos using the new two-step API approach
        if (exerciseDetailData.name) {
          console.log('🏋️ Exercise name:', exerciseDetailData.name);
          const searchQuery = `${exerciseDetailData.name} exercise`;
          console.log('🔍 Search query:', searchQuery);
          
          const exerciseVideosData = await fetchYouTubeVideosWithDetails(searchQuery, 6);
          console.log('📺 Combined videos data received:', exerciseVideosData);
          
          // Check for errors
          if (exerciseVideosData.error) {
            setVideoError(exerciseVideosData.error);
            setExerciseVideos([]);
          } else {
            // Set the videos from the combined results
            const videos = exerciseVideosData.videos || [];
            console.log('📋 Setting videos:', videos.length, 'videos');
            setExerciseVideos(videos);
            setVideoError(null);
          }
        }

        // Fetch target muscle exercises
        const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);
        setTargetMuscleExercises(targetMuscleExercisesData);

        // Fetch equipment exercises
        const equipmentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions);
        setEquipmentExercises(equipmentExercisesData);
      } catch (error) {
        console.error('Error fetching exercise data:', error);
      }
    };

    fetchExercisesData();
  }, [id]);

  if (!exerciseDetail) return <div>No Data</div>;

  return (
    <Box sx={{ mt: { lg: '96px', xs: '60px' } }}>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos videos={exerciseVideos} name={exerciseDetail.name} error={videoError} />
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
    </Box>
  );
};

export default ExerciseDetail;