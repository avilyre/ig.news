import * as prismic from "@prismicio/client";

export function createClient(config = {}) {
  const client = prismic.createClient(
    "ignews-avily", { ...config });
  
  return client;
}
