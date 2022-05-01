import { GetStaticProps } from "next";
import { PrismicRichText } from "@prismicio/react";

import { NextHead } from "../../components/NextHead";
import { PostsProps } from "../../interfaces/posts.interfaces";
import { createClient } from "../../services/prismic";
import { dateFormatter } from "../../utils/dateFormatter";

import styles from "../../styles/pages/posts.module.scss";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Posts({ posts }: PostsProps) {
  const { data } = useSession();
  const isSubscribed = !!data?.activeSubscription;

  return (
    <>
      <NextHead title="Posts" />

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link
              key={post.uid}
              href={`/posts${isSubscribed ? "" : "/preview"}/${post.uid}`}
            >
              <a>
                <time>{post.updatedAt}</time>
                <PrismicRichText field={post.title} />
                <PrismicRichText field={post.content} />
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData })

  const response = await client.getAllByType("posts")

  const posts = response.map(post => {
    console.log(post)
    return {
      uid: post.uid,
      title: post.data.title,
      content: [
        post.data.content.find(content => content.type === "paragraph")
      ],
      updatedAt: dateFormatter(post.last_publication_date)
    }
  })

  return {
    props: { posts }
  }
}
