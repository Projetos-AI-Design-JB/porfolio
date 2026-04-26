import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Art Gallery",
  description: "A collection of AI-generated artworks and experiments.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
