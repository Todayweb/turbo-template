"use client";

import type { Locale } from "@/i18n/config";
import { setUserLocale } from "@/utils/locale";
import { Button } from "antd";
import { useTransition } from "react";

type Props = {
  items: Array<{ value: string; label: string }>;
};

export default function LocaleSwitcherSelect({ items }: Props) {
  const [_, startTransition] = useTransition();

  function onClick(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="relative">
      {items.map((item) => (
        <Button key={item.value} onClick={() => onClick(item.value)}>
          {item.label}
        </Button>
      ))}
    </div>
  );
}
