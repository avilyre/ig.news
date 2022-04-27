interface Post {
  slug: string;
  title: [];
  content: [];
  updatedAt: [];
}

export interface PostsProps {
  posts: Post[];
}
