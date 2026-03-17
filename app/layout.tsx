import { Cormorant_Garamond, Lato } from 'next/font/google';
import './globals.css';

const heading = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heading' 
});

const body = Lato({ 
  subsets: ['latin'], 
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-body' 
});

export const metadata = {
  title: "Diva's Cakes Affairs | Premium Cakes in Lagos",
  description: "Bespoke celebration cakes, wedding cakes, and dessert boxes crafted in Lagos, Nigeria.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${heading.variable} ${body.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}