import { GetStaticProps } from "next";
import { PrismicRichText } from "@prismicio/react";

import { NextHead } from "../../components/NextHead";
import { PostsProps } from "../../interfaces/posts.interfaces";
import { createClient } from "../../services/prismic";

import styles from "../../styles/pages/posts.module.scss";

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <NextHead title="Posts" />

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <a key={post.slug} href="#">
              <time>{post.updatedAt}</time>
              <PrismicRichText field={post.title} />
              <PrismicRichText field={post.content} />
            </a>
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
    return {
      slug: post.id,
      title: post.data.title,
      content: [
        post.data.content.find(content => content.type === "paragraph")
      ],
      updatedAt: new Date(post.last_publication_date)
      .toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      })
    }
  })
  
  console.log(JSON.stringify(posts))

  return {
    props: { posts }
  }
}
