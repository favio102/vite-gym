// Recently-viewed exercise ids in localStorage — most recent first,
// deduped, capped so the Home row stays short.

const STORAGE_KEY = "recentlyViewed";
const MAX_ENTRIES = 10;

export const getRecentlyViewed = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

export const addRecentlyViewed = (id) => {
  try {
    const next = [id, ...getRecentlyViewed().filter((entry) => entry !== id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next.slice(0, MAX_ENTRIES)));
  } catch {
    // storage unavailable — the row just won't populate
  }
};
