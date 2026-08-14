import HomeHero from "@/components/home/HomeHero";
import SelectedWork from "@/components/selected-work/SelectedWork";
import Experience from "@/components/home/Experience";
import MusicPreview from "@/components/home/MusicPreview";

export default function Home() {
  return (
    <>
      <HomeHero />
      <SelectedWork />
      <Experience />
      <MusicPreview />
    </>
  );
}
