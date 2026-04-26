import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elite Software Development",
  description: "Master the future of code with advanced architectures and cinematic design.",
};

export default function VendasSoftwareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
