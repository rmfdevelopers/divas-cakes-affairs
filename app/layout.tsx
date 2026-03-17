import { Oswald, Sora } from 'next/font/google';
import './globals.css';

const heading = Oswald({ subsets: ['latin'], variable: '--font-heading' });
const body = Sora({ subsets: ['latin'], variable: '--font-body' });

export const metadata = {
  title: "Diva's Cakes Affairs | Artisanal Masterpieces",
  description: "Bespoke, artisanal cakes for weddings, birthdays, and all significant milestones.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}