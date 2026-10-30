import BarbershopHero from "@/components/BarbershopHero";
import TrustStrip from "@/components/TrustStrip";
import ServicesMenu from "@/components/ServicesMenu";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import HoursLocation from "@/components/HoursLocation";
import LeadForm from "@/components/LeadForm";
import StickyBookBar from "@/components/StickyBookBar";

export default function Home() {
  return (
    <>
      <BarbershopHero />
      <TrustStrip />
      <ServicesMenu />
      <Gallery />
      <Reviews />
      <HoursLocation />
      <LeadForm />
      <StickyBookBar />
    </>
  );
}
