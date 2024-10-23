"use client";

import { routes } from "@/config/routes";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useMemo } from "react";

type Props = {
  size?: "small" | "medium" | "large";
};

export const Logo = ({ size = "small" }: Props) => {
  const { resolvedTheme } = useTheme();

  const logoSize = useMemo(() => {
    if (size === "small") return "h-6";
    if (size === "medium") return "h-12";
    if (size === "large") return "h-20";

    return "";
  }, [size]);

  return (
    <Link href={routes.home}>
      {resolvedTheme === "light" ? (
        <img src="https://cdn.todayweb.net/logo-light.png" alt="logo" className={logoSize} />
      ) : (
        <img src="https://cdn.todayweb.net/logo-dark.png" alt="logo" className={logoSize} />
      )}
    </Link>
  );
};
