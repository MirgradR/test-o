export enum StorageKeys {
  BINDED_POSTID_USER_ID = "BINDED_POSTID_USER_ID",
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
  } catch (err) {
    console.error(err);
  }
}
