import { PrismicRichText, PrismicTextProps } from "@prismicio/react";
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"

import { NextHead } from "../../components/NextHead";
import { PostProps } from "../../interfaces/post.intefaces";
import { createClient } from "../../services/prismic";
import { dateFormatter } from "../../utils/dateFormatter";

import styles from "../../styles/pages/post.module.scss";

export default function Post({ post }: PostProps): JSX.Element {

  return (
    <>
      <NextHead title={post.title[0].text} />

      <main className={styles.container}>
        <article className={styles.post}>
          <time>{post.updatedAt}</time>
          <PrismicRichText field={post.title as unknown as []} />
          <PrismicRichText field={post.content} />
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params, previewData }) => {
  const session = await getSession({ req });

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  const { uid } = params

  const client = createClient({ previewData });
  const response = await client.getByUID("posts", uid as string)

  const post = {
    uid: response.uid,
    title: response.data.title,
    content: response.data.content,
    updatedAt: dateFormatter(response.last_publication_date)
  }

  return {
    props: {
      post
    }
  }
}
