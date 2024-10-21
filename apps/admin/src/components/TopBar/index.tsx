import { cn } from "@/utils/cn";
import type { ComponentProps } from "react";
import { Logo } from "./Logo";
import { Settings } from "./Settings";

export const TopBar = async ({ className, ...rest }: ComponentProps<"nav">) => {
  return (
    <nav
      className={cn(
        "sticky left-0 top-0 flex w-full items-center justify-between px-6 py-4",
        className,
      )}
      {...rest}
    >
      <Logo />

      <div className="flex gap-2">
        <Settings />
      </div>
    </nav>
  );
};
