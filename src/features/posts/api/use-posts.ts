"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import { postsApi } from "./posts.api";
import type { PostFormInput } from "../schema";
import type { PostListParams } from "../types";

export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (params: PostListParams) => [...postKeys.lists(), params] as const,
  details: () => [...postKeys.all, "detail"] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
};

export function usePosts(params: PostListParams = {}) {
  return useQuery({
    queryKey: postKeys.list(params),
    queryFn: () => postsApi.list(params),
    placeholderData: keepPreviousData,
  });
}

export function usePost(id: string) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => postsApi.get(id),
    enabled: Boolean(id),
  });
}

export function useCreatePost() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postsApi.create,
    onSuccess: (post) => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      queryClient.setQueryData(postKeys.detail(post.id), post);
      toast.success("Post published");
      router.push(`/posts/${post.id}`);
    },
    onError: (err) => toast.error(getErrorMessage(err, "Could not publish post")),
  });
}

export function useUpdatePost(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ input, removeCover }: { input: Partial<PostFormInput>; removeCover?: boolean }) =>
      postsApi.update(id, input, removeCover),
    onSuccess: (post) => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      queryClient.setQueryData(postKeys.detail(post.id), post);
      toast.success("Post updated");
      router.push(`/posts/${post.id}`);
    },
    onError: (err) => toast.error(getErrorMessage(err, "Could not update post")),
  });
}

export function useDeletePost() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postsApi.remove,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      queryClient.removeQueries({ queryKey: postKeys.detail(id) });
      toast.success("Post deleted");
      router.push("/posts");
    },
    onError: (err) => toast.error(getErrorMessage(err, "Could not delete post")),
  });
}
