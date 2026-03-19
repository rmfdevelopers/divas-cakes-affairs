import type { Metadata } from "next";
import { Oswald, Sora } from "next/font/google";
import "./globals.css";

const heading = Oswald({ subsets: ["latin"], variable: "--font-heading" });
const body = Sora({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Diva's Cakes Affairs | Bespoke Luxury Cakes Lagos",
  description: "Lagos' premier destination for handcrafted masterpieces and artisanal flavors.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}