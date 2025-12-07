export enum StorageKeys {
  REMOVED_POSTS_IDS = "REMOVED_POSTS_IDS",
  CREATED_POSTS = "CREATED_POSTS",
}

export function loadJSON<T>(key: StorageKeys, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveJSON<T>(key: StorageKeys, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
