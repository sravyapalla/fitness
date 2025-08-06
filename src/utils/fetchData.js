export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '32bd37f1fbmshae95db891d45e2ep169f3djsnbb02d1ec67b4', // replace this
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '32bd37f1fbmshae95db891d45e2ep169f3djsnbb02d1ec67b4', // replace this
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
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
    console.error('❌ fetchData error:', error.message);
    return [];
  }
};
