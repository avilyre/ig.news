import Head from "next/head";

import { NextHeadProps } from "./interfaces";

export function NextHead({ title }: NextHeadProps) {
  return (
    <Head>
      <title>{title ? `${title} | ig.news` : title}</title>
    </Head>
  )
}
