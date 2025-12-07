import { Post } from "../../pages/Post";
import { loadJSON, saveJSON, StorageKeys } from "./core";

const key = StorageKeys.CREATED_POSTS;

/** Создать пост пользователя */
export function createUserPost({ userPost }: { userPost: Post }) {
  const exist: Post[] = loadJSON(key, []);
  const next = exist.concat(userPost);
  return saveJSON(key, next);
}

/** Получить все посты пользователя */
export function getUserPosts() {
  const exist: Post[] = loadJSON(key, []);
  return exist;
}

/** Удалить пост пользователя */
export function removeUserPost({ userPostId }: { userPostId: number }) {
  const exist: Post[] = loadJSON(key, []);
  const next = exist.filter((p) => p.id !== userPostId);
  return saveJSON(key, next);
}
