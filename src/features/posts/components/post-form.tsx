"use client";

import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ImagePlus, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { PostEditor } from "./post-editor";
import { COVER_TYPES, postSchema, type PostFormInput } from "../schema";
import type { Post } from "../types";

interface PostFormProps {
  post?: Post;
  isPending: boolean;
  onSubmit: (values: PostFormInput, meta: { removeCover: boolean }) => void;
}

export function PostForm({ post, isPending, onSubmit }: PostFormProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(post?.cover_image_url || null);
  const [removeCover, setRemoveCover] = useState(false);

  const form = useForm<PostFormInput>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title ?? "",
      subtitle: post?.subtitle ?? "",
      published_at: format(post ? new Date(post.published_at) : new Date(), "yyyy-MM-dd"),
      body: post?.body ?? "",
      cover: undefined,
    },
  });
  const { errors } = form.formState;

  const pickCover = (file: File | undefined) => {
    form.setValue("cover", file, { shouldValidate: true });
    if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    setPreview(file ? URL.createObjectURL(file) : null);
    setRemoveCover(!file);
  };

  const clearCover = () => {
    pickCover(undefined);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <form onSubmit={form.handleSubmit((v) => onSubmit(v, { removeCover }))} noValidate>
      <FieldGroup>
        <Field data-invalid={!!errors.title}>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input id="title" placeholder="A title that makes people stop scrolling" className="h-11 text-lg font-medium" aria-invalid={!!errors.title} {...form.register("title")} />
          <FieldError errors={[errors.title]} />
        </Field>

        <Field data-invalid={!!errors.subtitle}>
          <FieldLabel htmlFor="subtitle">Subtitle</FieldLabel>
          <Input id="subtitle" placeholder="One line that sets the scene (optional)" aria-invalid={!!errors.subtitle} {...form.register("subtitle")} />
          <FieldError errors={[errors.subtitle]} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!errors.published_at}>
            <FieldLabel htmlFor="published_at">Publish date</FieldLabel>
            <Input id="published_at" type="date" aria-invalid={!!errors.published_at} {...form.register("published_at")} />
            <FieldError errors={[errors.published_at]} />
          </Field>

          <Field data-invalid={!!errors.cover}>
            <FieldLabel htmlFor="cover">Cover image</FieldLabel>
            <input
              ref={fileRef}
              id="cover"
              type="file"
              accept={COVER_TYPES.join(",")}
              className="sr-only"
              onChange={(e) => pickCover(e.target.files?.[0])}
            />
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" onClick={() => fileRef.current?.click()}>
                <ImagePlus data-icon="inline-start" />
                {preview ? "Change" : "Upload"}
              </Button>
              {preview && (
                <Button type="button" variant="ghost" size="sm" onClick={clearCover}>
                  <X data-icon="inline-start" /> Remove
                </Button>
              )}
            </div>
            <FieldDescription>JPEG, PNG, WebP or GIF up to 5 MB.</FieldDescription>
            <FieldError errors={[errors.cover]} />
          </Field>
        </div>

        {preview && (
          // eslint-disable-next-line @next/next/no-img-element -- blob: previews and arbitrary Cloudinary URLs
          <img src={preview} alt="Cover preview" className="aspect-[21/9] w-full rounded-lg object-cover ring-1 ring-foreground/10" />
        )}

        <Field data-invalid={!!errors.body}>
          <FieldLabel>Story</FieldLabel>
          <Controller
            control={form.control}
            name="body"
            render={({ field }) => <PostEditor value={field.value} onChange={field.onChange} invalid={!!errors.body} />}
          />
          <FieldError errors={[errors.body]} />
        </Field>

        <div className="flex items-center justify-end gap-2 border-t pt-5">
          <Button type="button" variant="ghost" onClick={() => history.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="animate-spin" data-icon="inline-start" />}
            {post ? "Save changes" : "Publish"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
