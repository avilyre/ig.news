import { SubscribeButtonProps } from "./interfaces";
import styles from "./styles.module.scss";

export function SubscribeButton({ productId }: SubscribeButtonProps) {
  return (
    <button
      className={styles.subscribeButton}
    >
      Subscribe now
    </button>
  )
}