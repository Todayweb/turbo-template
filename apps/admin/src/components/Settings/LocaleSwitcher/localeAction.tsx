"use server";

import { setUserLocale } from "@/utils/locale";
import { localeSchema } from "./localeSchema";

export async function localeAction(prevState: unknown, data: FormData) {
  const formData = Object.fromEntries(data);
  const parsed = localeSchema.safeParse(formData);

  if (!parsed.success) return { error: "Wrong form data input." };

  const { locale } = parsed.data;

  await setUserLocale(locale);
}
