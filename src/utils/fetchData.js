export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '93b0daaf2cmshbc31d90c28d3a53p1f1a5bjsn80690b2e1793',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '93b0daaf2cmshbc31d90c28d3a53p1f1a5bjsn80690b2e1793',
    'X-RapidAPI-Host': 'youtube-media-downloader.p.rapidapi.com',
  },
};

export const fetchData = async (url, options) => {
  if (typeof url === 'string' && url.includes('youtube-search-and-download')) {
    console.error('❌ Deprecated host used →', url);
    console.trace(); // shows the caller (file + line)
  }
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
export const searchYouTubeMedia = async (keyword, max = 12) => {
  const base = 'https://youtube-media-downloader.p.rapidapi.com/v2';
  const url = `${base}/search/videos?keyword=${encodeURIComponent(keyword)}&uploadDate=all&duration=all&sortBy=relevance`;

  console.log('YT request →', url);   // <— should show youtube-media-downloader…/v2/…
  const data = await fetchData(url, youtubeOptions);
  const items = Array.isArray(data?.items) ? data.items : [];
  return items.filter(it => it?.type === 'video').slice(0, max);
};
export const bmiOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '93b0daaf2cmshbc31d90c28d3a53p1f1a5bjsn80690b2e1793',
    'X-RapidAPI-Host': 'body-mass-index-bmi-calculator.p.rapidapi.com',
  },
};

export const getBMI = async (weightKg, heightM) => {
  const url = `https://body-mass-index-bmi-calculator.p.rapidapi.com/metric?weight=${weightKg}&height=${heightM}`;
  // this API usually returns JSON; if it ever returns text, we will fallback
  try {
    return await fetchData(url, bmiOptions);
  } catch {
    const res = await fetch(url, bmiOptions);
    const txt = await res.text();
    try { return JSON.parse(txt); } catch { return { bmi: null }; }
  }
};

export const getBMICategory = async (bmi) => {
  const url = `https://body-mass-index-bmi-calculator.p.rapidapi.com/weight-category?bmi=${bmi}`;
  try {
    return await fetchData(url, bmiOptions);
  } catch {
    const res = await fetch(url, bmiOptions);
    const txt = await res.text();
    try { return JSON.parse(txt); } catch { return { weightCategory: '' }; }
  }
};
