import { signIn, useSession } from "next-auth/react";

import { SubscribeButtonProps } from "./interfaces";
import styles from "./styles.module.scss";

import { api } from "../../services/api";
import { getStripe } from "../../services/stripe-js";

export function SubscribeButton({ productId }: SubscribeButtonProps) {
  const { status } = useSession();

  async function handleSubscribe() {
    if (status !== "authenticated") {
      signIn("github");
      return;
    }

    try {
      const response = await api.post("/subscribe");
      const stripe = await getStripe();

      const { sessionId } = response.data;

      stripe.redirectToCheckout({ sessionId });
    } catch(err) {
      alert(err.message);
    }
  }

  
  return (
    <button
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}