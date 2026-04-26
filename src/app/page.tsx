
import dynamic from "next/dynamic";

const ScrollVideoScrub = dynamic(() => import("@/components/cinematic/ScrollVideoScrub"), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/cinematic/SmoothScroll"), { ssr: false });

export default function HomePage() {
  return (
    <SmoothScroll>
      <main style={{ backgroundColor: "#000", margin: 0, padding: 0 }}>
        <ScrollVideoScrub />
      </main>
    </SmoothScroll>
  );
}
