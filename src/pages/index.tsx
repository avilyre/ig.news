import { GetStaticProps } from "next";

import { HomeProps } from "../interfaces/home.interfaces";
import { currencyFormatter } from "../utils/currencyFormatter";
import { SubscribeButton } from "../components/SubscribeButton";
import { NextHead } from "../components/NextHead";

import { stripe } from "../services/stripe";

import styles from "../styles/pages/home.module.scss";

export default function Home({ product }: HomeProps) {
  
  return (
    <>
      <NextHead title="Home" />

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

export const getStaticProps: GetStaticProps = async () => {
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
    },
    revalidate: 60 * 60 * 24 // 24 Hours
  }
}
