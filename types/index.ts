export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface PostResponse {
  items: Post[];
  nextPage: number | null;
}
