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

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

const getCacheKey = (url) => `cache_${url}`;

const getFromCache = (url) => {
  try {
    const stored = localStorage.getItem(getCacheKey(url));
    if (!stored) return null;

    const { data, timestamp } = JSON.parse(stored);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(getCacheKey(url));
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

const saveToCache = (url, data) => {
  try {
    localStorage.setItem(
      getCacheKey(url),
      JSON.stringify({ data, timestamp: Date.now() }),
    );
  } catch {
    // localStorage full — clear old cache entries and retry
    clearExpiredCache();
  }
};

const clearExpiredCache = () => {
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key?.startsWith("cache_")) {
      try {
        const { timestamp } = JSON.parse(localStorage.getItem(key));
        if (Date.now() - timestamp > CACHE_DURATION) {
          localStorage.removeItem(key);
        }
      } catch {
        localStorage.removeItem(key);
      }
    }
  }
};

export const fetchData = async (url, options) => {
  const cached = getFromCache(url);
  if (cached) return cached;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Too many requests, please try again later.");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    const data = await response.json();
    saveToCache(url, data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error.message);
    return null;
  }
};
