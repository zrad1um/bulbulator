import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const kanit = Kanit({
  variable: "--font-kanit",
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BULBULATOR",
  description: "BULBULATOR — the calculator you never knew you needed, but now can’t live without. Fast, fabulous, and dangerously overengineered. LOL XD KEK LMAO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className={`${kanit.variable} ${kanit.variable}`}
    >
      <body className="antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
