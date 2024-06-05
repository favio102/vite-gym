const apiKey = import.meta.env.VITE_APP_RAPID_API_KEY;

export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    "X-RapidAPI-Key": apiKey,
  },
};

export const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
    "X-RapidAPI-Key": apiKey,
  },
};

export const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Too many requests, please try again later.');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error.message);
    return null;
  }
};