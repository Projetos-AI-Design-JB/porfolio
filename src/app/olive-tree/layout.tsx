import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Olive Tree - Cinematic",
  description: "A cinematic experience exploring biological legacy and digital future.",
};

export default function OliveTreeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
