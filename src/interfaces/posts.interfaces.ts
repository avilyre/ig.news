export interface Post {
  uid: string;
  title: [] | unknown[];
  content: [];
  updatedAt: [];
}

export interface PostsProps {
  posts: Post[];
}
