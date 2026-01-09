import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space"
});

export const metadata = {
  title: "RepoMetric",
  description: "Unified GitHub organization observability"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              document.documentElement.classList.add('dark');
            })();
          `
        }} />
      </head>
      <body className="flex min-h-screen flex-col items-center justify-center bg-background-light bg-grid font-sans text-text-main-light antialiased selection:bg-primary selection:text-white transition-colors duration-300 dark:bg-background-dark dark:text-text-main-dark">
        {children}
      </body>
    </html>
  );
}
