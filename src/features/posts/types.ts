export interface PostAuthor {
  id: string;
  username: string;
}

export interface Post {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  cover_image_url: string;
  author: PostAuthor;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface PostSummary {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  cover_image_url: string;
  author: PostAuthor;
  published_at: string;
  created_at: string;
}

export interface PostList {
  items: PostSummary[];
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}

export interface PostListParams {
  page?: number;
  page_size?: number;
  q?: string;
  author_id?: string;
}
