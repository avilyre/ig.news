import { GetServerSideProps } from "next";
import Head from "next/head";

import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";
import { HomeProps } from "../interfaces/home.interfaces";

import { currencyFormatter } from "../utils/currencyFormatter";

import styles from "../styles/pages/home.module.scss";

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world</h1>

          <p>
            Get access to all publications <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton productId={product.productId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve("price_1KqQw8CXCCDs6rb5omQK8m6I", {
    // Trás todas as informações do produto ligado a esse preço
    // expand: ['product']
  });

  const product = {
    productId: price.id,
    amount: currencyFormatter(price.unit_amount / 100)
  }

  return {
    props: {
      product
    }
  }
}
