import { ReactElement } from "react";
import { LinkProps } from "next/link";

export interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string;
}
