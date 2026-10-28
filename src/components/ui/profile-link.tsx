import type { ReactNode } from "react";

type ProfileLinkProps = {
  href: `https://${string}`;
  children: ReactNode;
};

export function ProfileLink({ href, children }: ProfileLinkProps) {
  return (
    <a className="profile-link" href={href}>
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
