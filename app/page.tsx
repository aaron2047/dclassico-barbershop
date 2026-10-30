import BarbershopHero from "@/components/BarbershopHero";
import ServicesMenu from "@/components/ServicesMenu";
import HoursLocation from "@/components/HoursLocation";
import StickyBookBar from "@/components/StickyBookBar";

export default function Home() {
  return (
    <>
      <BarbershopHero />
      <ServicesMenu />
      <HoursLocation />
      <StickyBookBar />
    </>
  );
}
