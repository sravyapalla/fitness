import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { exerciseOptions, fetchData, youtubeOptions, searchYouTubeMedia } from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();

  // prevent React 18 StrictMode double fetch (avoids 429s)
  const fetchedOnceRef = useRef(false);
  useEffect(() => { fetchedOnceRef.current = false; }, [id]);

  useEffect(() => {
    if (fetchedOnceRef.current) return;
    fetchedOnceRef.current = true;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchExercisesData = async () => {
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';

      // 1) Exercise detail
      const exerciseDetailData = await fetchData(
        `${exerciseDbUrl}/exercises/exercise/${id}`,
        exerciseOptions
      );
      setExerciseDetail(exerciseDetailData);

      // 2) YouTube search (NEW API)
      const query = `${exerciseDetailData?.name || ''} exercise`;
      const videos = await searchYouTubeMedia(query, 12);
      console.log('YouTube items (youtube-media-downloader /v2):', videos);
      setExerciseVideos(Array.isArray(videos) ? videos : []);

      // 3) Similar exercises (unchanged)
      const targetMuscleExercisesData = await fetchData(
        `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
        exerciseOptions
      );
      setTargetMuscleExercises(Array.isArray(targetMuscleExercisesData) ? targetMuscleExercisesData : []);

      const equimentExercisesData = await fetchData(
        `${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
        exerciseOptions
      );
      setEquipmentExercises(Array.isArray(equimentExercisesData) ? equimentExercisesData : []);
    };

    fetchExercisesData();
  }, [id]);

  if (!exerciseDetail) return <div>No Data</div>;

  return (
    <Box sx={{ mt: { lg: '96px', xs: '60px' } }}>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos videos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </Box>
  );
};

export default ExerciseDetail;
