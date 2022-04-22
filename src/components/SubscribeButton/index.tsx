import { signIn, useSession } from "next-auth/react";

import { SubscribeButtonProps } from "./interfaces";
import styles from "./styles.module.scss";

export function SubscribeButton({ productId }: SubscribeButtonProps) {
  const { status } = useSession();

  function handleSubscribe() {
    if (status !== "authenticated") {
      signIn("github");
      return;
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