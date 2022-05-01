import { useEffect } from "react";
import { useRouter } from "next/router";
import { PrismicRichText } from "@prismicio/react";
import { GetStaticPaths, GetStaticProps } from "next"
import { useSession } from "next-auth/react"

import { NextHead } from "../../../components/NextHead";
import { PostProps } from "../../../interfaces/post.intefaces";
import { createClient } from "../../../services/prismic";
import { dateFormatter } from "../../../utils/dateFormatter";

import styles from "../../../styles/pages/post.module.scss";
import Link from "next/link";

export default function PostPreview({ post }: PostProps): JSX.Element {
  const router = useRouter();
  const { data } = useSession();

  useEffect(() => {
    console.log(data);

    if (data?.activeSubscription) {
      router.push(`/posts/${post.uid}`);
    }
  }, [data])

  return (
    <>
      <NextHead title={post.title[0].text} />

      <main className={styles.container}>
        <article className={styles.post}>
          <div className={styles.previewContent}>
            <time>{post.updatedAt}</time>
            <PrismicRichText field={post.title as unknown as []} />
            <PrismicRichText field={post.content} />
          </div>
          <div className={styles.continueReading}>
            Wanne continue reading ?
            <Link href="/">
              <a>Subscribe now</a>
            </Link>
            🤗
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async ({ params, previewData }) => {
  const { uid } = params

  const client = createClient({ previewData });
  const response = await client.getByUID("posts", uid as string)

  const post = {
    uid: response.uid,
    title: response.data.title,
    content: response.data.content.splice(3, 3),
    updatedAt: dateFormatter(response.last_publication_date)
  }

  return {
    props: {
      post
    },
    revalidate: 60 * 30 // 30 Minutes
  }
}
