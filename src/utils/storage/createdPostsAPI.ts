import { StorageKeys } from "../../configs/storageKeys";
import { Post } from "../../pages/Post";

const key = StorageKeys.CREATED_POSTS;

/** Создать пост пользователя */
export function createUserPost({ userPost }: { userPost: Post }) {
  const exist: Post[] = JSON.parse(localStorage.getItem(key) ?? "[]");
  const next = exist.concat(userPost);
  localStorage.setItem(key, JSON.stringify(next));
}

/** Получить все посты пользователя */
export function getUserPosts() {
  const exist: Post[] = JSON.parse(localStorage.getItem(key) ?? "[]");
  return exist;
}

/** Удалить пост пользователя */
export function removeUserPost({ userPostId }: { userPostId: number }) {
  const exist: Post[] = JSON.parse(localStorage.getItem(key) ?? "[]");
  const next = exist.filter((p) => p.id !== userPostId);
  localStorage.setItem(key, JSON.stringify(next));
}
