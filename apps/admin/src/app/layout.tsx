import { Metadata } from "next";
import "@/styles/globals.css";
import { AntdConfigProvider } from "@/providers/AntdConfigProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { cn } from "@/utils/cn";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Montserrat as FontSans } from "next/font/google";
import { ReactNode } from "react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Todayweb admin",
  description: "Todayweb admin CMS",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn("min-h-screen", fontSans.variable)}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            defaultTheme="system"
            attribute="class"
            enableSystem
            disableTransitionOnChange
          >
            <AntdRegistry>
              <AntdConfigProvider>{children}</AntdConfigProvider>
            </AntdRegistry>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
