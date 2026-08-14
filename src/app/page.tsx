import HomeHero from "@/components/home/HomeHero";
import SelectedWork from "@/components/selected-work/SelectedWork";
import Experience from "@/components/home/Experience";
import MusicPreview from "@/components/home/MusicPreview";
import { AudioProvider } from "./context/AudioContext";

export default function Home() {
  return (
    <AudioProvider>
      <HomeHero />
      <SelectedWork />
      <Experience />
      <MusicPreview />
    </AudioProvider>
  );
}
