export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '32bd37f1fbmshae95db891d45e2ep169f3djsnbb02d1ec67b4', // Updated with your key
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};

// Updated YouTube options for the new API
export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '32bd37f1fbmshae95db891d45e2ep169f3djsnbb02d1ec67b4', // Updated with your key
    'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com',
  },
};

export const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid content-type, expected JSON');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('⚠ fetchData error:', error.message);
    return [];
  }
};

// New function specifically for YouTube API calls
export const fetchYouTubeVideos = async (query) => {
  try {
    // Format the query for URL encoding
    const encodedQuery = encodeURIComponent(query);
    const url = `https://youtube-v2.p.rapidapi.com/search/?query=${encodedQuery}&lang=en&order_by=this_month&country=us`;
    
    console.log('🔍 Fetching YouTube videos for:', query);
    console.log('📡 API URL:', url);
    
    const response = await fetch(url, youtubeOptions);

    console.log('📊 Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid content-type, expected JSON');
    }

    const data = await response.json();
    console.log('✅ YouTube API Response:', data);
    console.log('📺 Number of videos received:', data.videos ? data.videos.length : 'No videos array');
    
    return data;
  } catch (error) {
    console.error('⚠ fetchYouTubeVideos error:', error.message);
    return { videos: [] };
  }
};

// Function to search for videos and get video IDs
export const searchYouTubeVideos = async (query) => {
  try {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://youtube-v2.p.rapidapi.com/search/?query=${encodedQuery}&lang=en&order_by=this_month&country=us`;
    
    console.log('🔍 Searching YouTube for:', query);
    console.log('📡 Search URL:', url);
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
          try {
            const data = JSON.parse(this.responseText);
            console.log('✅ Search API Response:', data);
            
            if (data.message && data.message.includes('not subscribed')) {
              console.error('❌ API Subscription Error:', data.message);
              resolve({ videos: [], error: 'not_subscribed' });
              return;
            }
            
            if (data.message && data.message.includes('Too many requests')) {
              console.error('⚠️ Rate limit exceeded:', data.message);
              resolve({ videos: [], error: 'rate_limit' });
              return;
            }
            
            resolve(data);
          } catch (error) {
            console.error('❌ Error parsing search response:', error);
            resolve({ videos: [], error: 'parse_error' });
          }
        }
      });
      
      xhr.addEventListener('error', function(error) {
        console.error('❌ XHR Error:', error);
        resolve({ videos: [], error: 'network_error' });
      });

      xhr.open('GET', url);
      xhr.setRequestHeader('x-rapidapi-key', '4a9726fb59mshc91f2e583652206p181ae5jsn4ae76a2a0e42');
      xhr.setRequestHeader('x-rapidapi-host', 'youtube-v2.p.rapidapi.com');
      xhr.send(null);
    });
  } catch (error) {
    console.error('⚠ searchYouTubeVideos error:', error.message);
    return { videos: [], error: 'function_error' };
  }
};

// Function to get video details by video ID
export const getYouTubeVideoDetails = async (videoId) => {
  try {
    const url = `https://youtube-v2.p.rapidapi.com/video/details?video_id=${videoId}`;
    
    console.log('📺 Getting video details for:', videoId);
    console.log('📡 Details URL:', url);
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
          try {
            const data = JSON.parse(this.responseText);
            console.log('✅ Video Details Response:', data);
            resolve(data);
          } catch (error) {
            console.error('❌ Error parsing video details:', error);
            resolve(null);
          }
        }
      });
      
      xhr.addEventListener('error', function(error) {
        console.error('❌ Video Details XHR Error:', error);
        resolve(null);
      });

      xhr.open('GET', url);
      xhr.setRequestHeader('x-rapidapi-key', '4a9726fb59mshc91f2e583652206p181ae5jsn4ae76a2a0e42');
      xhr.setRequestHeader('x-rapidapi-host', 'youtube-v2.p.rapidapi.com');
      xhr.send(null);
    });
  } catch (error) {
    console.error('⚠ getYouTubeVideoDetails error:', error.message);
    return null;
  }
};

// Combined function to search and get detailed video information
export const fetchYouTubeVideosWithDetails = async (query, maxVideos = 6) => {
  try {
    // Step 1: Search for videos
    const searchResults = await searchYouTubeVideos(query);
    
    if (searchResults.error) {
      return { videos: [], error: searchResults.error };
    }
    
    if (!searchResults.videos || searchResults.videos.length === 0) {
      console.log('📭 No videos found in search results');
      return { videos: [], error: null };
    }
    
    console.log(`🎯 Found ${searchResults.videos.length} videos, getting details for first ${maxVideos}`);
    
    // Step 2: Get details for the first few videos
    const videoDetailsPromises = searchResults.videos
      .slice(0, maxVideos)
      .map(video => getYouTubeVideoDetails(video.video_id));
    
    const videoDetails = await Promise.all(videoDetailsPromises);
    
    // Step 3: Combine search results with detailed info
    const combinedVideos = searchResults.videos.slice(0, maxVideos).map((searchVideo, index) => {
      const details = videoDetails[index];
      return {
        // Keep original search data
        ...searchVideo,
        // Add detailed info if available
        detailedInfo: details,
        // Ensure we have the necessary fields for display
        video_id: searchVideo.video_id,
        title: searchVideo.title,
        author: searchVideo.author,
        thumbnails: searchVideo.thumbnails,
        number_of_views: searchVideo.number_of_views,
        video_length: searchVideo.video_length,
        published_time: searchVideo.published_time
      };
    });
    
    console.log('🎬 Final combined video data:', combinedVideos);
    return { videos: combinedVideos, error: null };
    
  } catch (error) {
    console.error('⚠ fetchYouTubeVideosWithDetails error:', error.message);
    return { videos: [], error: 'combined_function_error' };
  }
};