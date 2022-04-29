import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

import { signIn, signOut, useSession } from "next-auth/react";

import styles from "./styles.module.scss";

export function SignInButton() {
  const { status, data } = useSession();

  return status === "authenticated" ? (
    <button
      className={styles.signInButton}
      onClick={() => signOut()}
    >
      <FaGithub color="#04D361" />
      {data.user?.name}
      <FiX className={styles.closeIcon} color="#737380" />
    </button>
  ) : (
    <button
      className={styles.signInButton}
      onClick={() => signIn("github")}
    >
      <FaGithub color="#eba417" />
      SignIn with Github
    </button>
  )
}
