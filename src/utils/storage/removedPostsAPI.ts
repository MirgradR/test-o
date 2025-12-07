import { StorageKeys } from "../../configs/storageKeys";

const key = StorageKeys.REMOVED_POSTS_IDS;

/** Добавить ID удаленного поста в LocalStorage */
export function addRemovedPost(postId: number) {
  const exist: string[] = JSON.parse(localStorage.getItem(key) ?? "[]");
  const next = exist.concat(String(postId));
  localStorage.setItem(key, JSON.stringify(next));
}

/** Получить все ID удаленных постов */
export function getRemovedPostsIds() {
  const exist: string[] = JSON.parse(localStorage.getItem(key) ?? "[]");
  return exist.map(Number);
}
