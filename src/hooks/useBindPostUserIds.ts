import { useEffect, useState } from "react";
import { loadJSON, saveJSON, StorageKeys } from "../utils/storage";
import { Post } from "../pages/Post";
import { User } from "../http/hooks";

type PostId = string;
type UserId = string;
export type BindedPostUserIDs = Record<PostId, UserId>;

export function useBindPostUserIds(posts: Post[], users: User[]) {
  const [map, setMap] = useState<BindedPostUserIDs>(() =>
    loadJSON(StorageKeys.BINDED_POSTID_USER_ID, {})
  );

  useEffect(() => {
    if (!posts.length || !users.length) return;

    setMap((prev) => {
      const next = { ...prev };
      let updated = false;

      for (const post of posts) {
        const isBinded = next[post.id] !== undefined;
        if (isBinded) continue;

        const user = users[Math.floor(Math.random() * users.length)];
        next[String(post.id)] = String(user.id);
        updated = true;
      }

      if (updated) saveJSON(StorageKeys.BINDED_POSTID_USER_ID, next);
      return next;
    });
  }, [posts, users]);

  return map;
}
