import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio - Julian",
  description: "Explore the projects and creations of Julian Kezy.",
};

export default function StarForgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
