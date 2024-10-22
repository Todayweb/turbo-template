"use client";

import { routes } from "@/config/routes";
import { useTheme } from "next-themes";
import Link from "next/link";

export const Logo = () => {
  const { resolvedTheme } = useTheme();

  const logoClassName = "h-8";

  return (
    <Link href={routes.home}>
      {resolvedTheme === "light" ? (
        <img
          src="https://cdn.gurmeo.sk/logo/ikona-svetla.png"
          alt="logo"
          className={logoClassName}
        />
      ) : (
        <img
          src="https://cdn.gurmeo.sk/logo/ikona-tmava.png"
          alt="logo"
          className={logoClassName}
        />
      )}
    </Link>
  );
};
