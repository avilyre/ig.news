import { PrismicTextProps } from "@prismicio/react";

export interface Post {
  uid: string;
  title: Pick<PrismicTextProps, "field">;
  content: [];
  updatedAt: [];
}

export interface PostProps {
  post: Post;
}
