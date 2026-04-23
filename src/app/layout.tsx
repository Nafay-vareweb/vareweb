import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ClientLoader from "@/components/ClientLoader";
import CustomCursor from "@/components/CustomCursor";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VareWeb - Premium Web Design & Digital Agency",
  description:
    "Award-winning digital agency delivering creative branding, stunning websites, and automated growth solutions that drive results.",
  keywords: [
    "web design",
    "logo design",
    "digital agency",
    "branding",
    "SEO",
    "eCommerce",
    "web development",
  ],
  authors: [{ name: "VareWeb" }],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "VareWeb - Premium Web Design & Digital Agency",
    description:
      "Award-winning digital agency delivering creative branding, stunning websites, and automated growth solutions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VareWeb - Premium Web Design & Digital Agency",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <ClientLoader>{children}</ClientLoader>
        <CustomCursor />
        <Toaster />
      </body>
    </html>
  );
}
