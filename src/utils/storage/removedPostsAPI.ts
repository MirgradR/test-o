import { loadJSON, saveJSON, StorageKeys } from "./core";

const key = StorageKeys.REMOVED_POSTS_IDS;

/** Добавить ID удаленного поста в LocalStorage */
export function addRemovedPost(postId: number) {
  const exist: string[] = loadJSON(key, []);
  const next = exist.concat(String(postId));
  return saveJSON(StorageKeys.REMOVED_POSTS_IDS, next);
}

/** Получить все ID удаленных постов */
export function getRemovedPostsIds() {
  const exist: string[] = loadJSON(key, []);
  return exist.map(Number);
}
