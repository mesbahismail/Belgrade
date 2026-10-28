import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Belgrade — Your All-in-One Smart Wallet",
    template: "%s · Belgrade",
  },
  description:
    "Belgrade is a free Next.js + shadcn/ui landing page template for a modern wallet and money management app.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
