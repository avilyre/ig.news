import Stripe from "stripe";
import { name, version } from "../../package.json";

export const stripe = new Stripe(
  process.env.STRIPE_KEY_API,
  {
    apiVersion: "2020-08-27",
    appInfo: {
      name,
      version
    }
  }
);
