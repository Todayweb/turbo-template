import { locales } from "@/i18n/config";
import { z } from "zod";

export const localeSchema = z.object({
  locale: z.enum(locales),
});
