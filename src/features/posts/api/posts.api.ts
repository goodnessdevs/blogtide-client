import { api } from "@/lib/axios";
import type { PostFormInput } from "../schema";
import type { Post, PostList, PostListParams } from "../types";

// Posts travel as multipart so the optional cover image rides along.
function toFormData(input: Partial<PostFormInput>, extra: Record<string, string> = {}) {
  const fd = new FormData();
  if (input.title !== undefined) fd.append("title", input.title);
  if (input.subtitle !== undefined) fd.append("subtitle", input.subtitle);
  if (input.body !== undefined) fd.append("body", input.body);
  if (input.published_at !== undefined) fd.append("published_at", input.published_at);
  if (input.cover) fd.append("cover", input.cover);
  for (const [k, v] of Object.entries(extra)) fd.append(k, v);
  return fd;
}

export const postsApi = {
  list: (params: PostListParams = {}) =>
    api.get<PostList>("/posts", { params }).then((r) => r.data),

  get: (id: string) => api.get<Post>(`/posts/${id}`).then((r) => r.data),

  create: (input: PostFormInput) =>
    api.post<Post>("/posts", toFormData(input)).then((r) => r.data),

  update: (id: string, input: Partial<PostFormInput>, removeCover = false) =>
    api
      .put<Post>(`/posts/${id}`, toFormData(input, removeCover ? { remove_cover: "true" } : {}))
      .then((r) => r.data),

  remove: (id: string) => api.delete<{ message: string }>(`/posts/${id}`).then((r) => r.data),
};
