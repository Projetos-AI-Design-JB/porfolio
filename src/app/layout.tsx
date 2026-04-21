import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Julian Kezy - Software Engineer",
  description: "Portfolio of Julian Kezy, Full Stack Developer and UI/UX Designer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=Open+Sans:wght@300;400;500;600;700;800&family=Syne:wght@400..800&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const originalOpen = window.open;
              window.open = function(url, target, features) {
                if (url && url.includes('victor-granado-garcia')) {
                  url = 'https://linkedin.com/in/juliano-bianchesi';
                }
                return originalOpen(url, target, features);
              };
            })();
          `
        }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
