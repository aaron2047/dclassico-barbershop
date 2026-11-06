"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  MoveUpRight,
  Phone,
  Scissors,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { BookingDrawer } from "@/components/BookingDrawer";
import { BARBERS, BUSINESS, GALLERY, SERVICES, type ServiceId } from "@/lib/site-data";

const NAV_ITEMS = [
  { label: "The craft", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our barbers", href: "#team" },
  { label: "The gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
];

const FAQS = [
  {
    question: "Do I need an appointment?",
    answer: "Appointments are recommended. Choose a service and barber to begin. Until the new online calendars are connected, call the shop directly to confirm availability.",
  },
  {
    question: "Can I book with a specific barber?",
    answer: "Yes—our new booking experience is designed for that. Select your preferred barber to see their personal appointment calendar once the shop activates the individual schedules.",
  },
  {
    question: "Do you offer cuts for kids?",
    answer: "Yes. Kids' haircuts are among the services listed by D'Clasicos. Call the shop to confirm age requirements, price, and appointment duration.",
  },
  {
    question: "Where can I find the shop?",
    answer: "D'Clasicos is at 4947 N 5th Street in Olney, Philadelphia, PA 19120. Use the directions link below to plan your visit.",
  },
];

function ActionButton({
  children,
  onClick,
  secondary = false,
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn-motion inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3.5 text-[11px] font-black uppercase tracking-[.15em] ${
        secondary
          ? "border border-white/30 text-bone hover:border-acid hover:bg-acid hover:text-ink"
          : "bg-acid text-ink shadow-[0_10px_40px_rgba(212,255,92,.15)] hover:bg-bone"
      } ${className}`}
    >
      {children}
    </button>
  );
}

function Eyebrow({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <p className="mb-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[.23em] text-acid">
      <span className="text-white/35">{number} /</span> {children}
    </p>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState<ServiceId>("haircut");
  const [bookingBarber, setBookingBarber] = useState("any");
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const openBooking = useCallback((service: ServiceId = "haircut", barber = "any") => {
    setBookingService(service);
    setBookingBarber(barber);
    setMenuOpen(false);
    setBookingOpen(true);
  }, []);
  const closeBooking = useCallback(() => setBookingOpen(false), []);

  useEffect(() => {
    if (galleryIndex === null) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGalleryIndex(null);
      if (e.key === "ArrowLeft") setGalleryIndex((i) => i === null ? null : (i + GALLERY.length - 1) % GALLERY.length);
      if (e.key === "ArrowRight") setGalleryIndex((i) => i === null ? null : (i + 1) % GALLERY.length);
    };
    window.addEventListener("keydown", onKeydown);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", onKeydown);
    };
  }, [galleryIndex]);

  return (
    <div className="min-h-screen bg-ink text-bone">
      {/* Topline */}
      <div className="hidden min-h-[34px] items-center justify-between border-b border-white/10 bg-[#171917] px-6 text-[10px] font-semibold uppercase tracking-[.19em] text-bone/65 md:flex lg:px-12">
        <span>4947 N 5th Street · Olney, Philadelphia</span>
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-acid"/>Neighborhood cuts. Individual style.</span>
        <a href={`tel:${BUSINESS.phoneHref}`} className="transition-colors hover:text-acid">{BUSINESS.phoneDisplay}</a>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[75px] max-w-[1600px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-12">
          <a href="#top" aria-label="D'Clasicos home" className="group flex items-center gap-3">
            <span className="relative grid h-10 w-10 rotate-45 place-items-center border-2 border-acid transition-transform duration-300 group-hover:rotate-[135deg]">
              <Scissors size={21} className="-rotate-45 text-acid transition-transform duration-300 group-hover:-rotate-[135deg]" strokeWidth={1.8}/>
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[20px] font-black tracking-[-.075em] sm:text-[23px]">D&apos;CLASICOS<span className="text-acid">.</span></span>
              <span className="mt-1 text-[8px] font-bold uppercase tracking-[.27em] text-muted">BARBER SHOP · PHILADELPHIA</span>
            </span>
          </a>
          <nav aria-label="Main navigation" className="hidden items-center gap-7 xl:gap-9 lg:flex">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="text-[11px] font-bold text-bone/70 transition-colors duration-300 hover:text-acid">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3 lg:ml-0">
            <ActionButton onClick={() => openBooking()} className="hidden sm:inline-flex">
              Book your cut <ArrowUpRight size={15} strokeWidth={2.5}/>
            </ActionButton>
            <button
              type="button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className="btn-motion grid h-11 w-11 place-items-center border border-white/20 text-bone hover:border-acid hover:text-acid lg:hidden"
            >
              {menuOpen ? <X size={22}/> : <Menu size={22}/>}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav aria-label="Mobile navigation" className="border-t border-white/10 bg-panel px-5 pb-6 pt-4 lg:hidden">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-b border-white/10 py-4 text-sm font-bold">
                {item.label}<ArrowUpRight size={16} className="text-acid"/>
              </a>
            ))}
            <ActionButton onClick={() => openBooking()} className="mt-5 w-full">Book your cut <ArrowUpRight size={16}/></ActionButton>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative isolate min-h-[730px] overflow-hidden border-b border-white/10 lg:min-h-[780px]">
          <div className="grain pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_45%,rgba(69,89,48,.16),transparent_52%),linear-gradient(110deg,#101310_5%,#0b0c0b_70%)]"/>
          <div className="relative mx-auto grid min-h-[730px] max-w-[1600px] grid-cols-1 items-center gap-12 px-5 pb-16 pt-12 sm:px-8 lg:min-h-[780px] lg:grid-cols-[.98fr_1.02fr] lg:gap-8 lg:px-12 lg:py-16">
            <div className="relative z-10 pt-4 lg:pt-0">
              <p className="mb-8 inline-flex items-center gap-3 border border-white/20 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[.2em] text-bone/75">
                <span className="h-2 w-2 animate-pulse rounded-full bg-acid"/>Olney, Philadelphia · Est. in the neighborhood
              </p>
              <h1 className="display max-w-[760px] text-[clamp(5rem,12vw,10.9rem)] uppercase leading-[.78] text-bone lg:text-[clamp(6rem,9.3vw,11.2rem)]">
                THE CUT<br/><span className="text-acid">SPEAKS</span><span className="text-acid">.</span>
              </h1>
              <p className="mt-8 max-w-[450px] border-l-2 border-acid pl-5 text-[15px] leading-[1.8] text-bone/65 sm:text-base">
                No copy-paste cuts. No shortcuts. Just precision, personality, and a chair with your name on it.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ActionButton onClick={() => openBooking()} className="sm:min-w-[204px]">
                  Find your appointment <ArrowUpRight size={17} strokeWidth={2.5}/>
                </ActionButton>
                <a href="#gallery" className="btn-motion inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/20 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[.15em] text-bone hover:border-acid hover:text-acid">
                  See the work <ArrowDownRight size={17}/>
                </a>
              </div>
              <div className="mt-11 flex items-center gap-5 sm:mt-14">
                <a href={BUSINESS.googleReviews} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
                  <span className="display text-[41px] leading-none">4.6</span>
                  <span>
                    <span className="flex gap-1 text-acid" aria-label="Google rating shown in supplied screenshot"><Star size={13} fill="currentColor"/><Star size={13} fill="currentColor"/><Star size={13} fill="currentColor"/><Star size={13} fill="currentColor"/><Star size={13} fill="currentColor"/></span>
                    <span className="mt-1 block text-[10px] text-bone/50 transition-colors group-hover:text-acid">Google rating · 80 reviews*</span>
                  </span>
                </a>
                <span className="h-9 w-px bg-white/20"/>
                <div className="text-[10px] font-bold uppercase leading-[1.8] tracking-[.15em] text-bone/55">7 local barbers<br/>One standard of craft</div>
              </div>
            </div>
            <div className="relative min-h-[470px] lg:min-h-[610px]">
              <div className="absolute right-0 top-[3%] h-[78%] w-[83%] border border-acid/50 sm:w-[78%]"/>
              <div className="picture-shine absolute left-[1%] top-[8%] h-[84%] w-[82%] overflow-hidden bg-panel sm:left-[6%] sm:w-[75%]">
                <img src="/images/cut-hero.webp" alt="Fresh fade and clean beard line at D'Clasicos" className="h-full w-full object-cover object-center" fetchPriority="high"/>
              </div>
              <div className="absolute right-[-1%] top-[45%] h-[38%] w-[40%] overflow-hidden border-[5px] border-ink bg-panel shadow-[0_18px_60px_rgba(0,0,0,.65)] sm:right-[-2%] sm:w-[37%]">
                <img src="/images/barber-working.webp" alt="Barber detailing a haircut with clippers" className="h-full w-full object-cover object-center"/>
              </div>
              <div className="absolute bottom-[5%] left-[-2%] flex items-center gap-3 bg-acid px-5 py-4 text-ink shadow-2xl sm:left-[1%] sm:px-6">
                <Scissors size={20}/>
                <span className="text-[10px] font-black uppercase tracking-[.16em]">Your look. Your barber.</span>
              </div>
              <span className="pointer-events-none absolute right-[0%] top-[-1%] hidden [writing-mode:vertical-rl] text-[10px] font-black tracking-[.3em] text-bone/25 sm:block">PRECISION / CULTURE / CONFIDENCE</span>
            </div>
          </div>
          <div className="absolute bottom-5 left-12 hidden items-center gap-2 text-[10px] uppercase tracking-[.2em] text-white/35 xl:flex"><ArrowDown size={14}/> Scroll to explore</div>
        </section>

        {/* Animated strip */}
        <div className="overflow-hidden border-b border-black/30 bg-acid py-3 text-ink" aria-hidden="true">
          <div className="marquee-track flex w-max whitespace-nowrap text-[12px] font-black uppercase tracking-[.25em]">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="flex items-center gap-8 px-4">PRECISION FADES <Scissors size={15}/> CLEAN LINES <Sparkles size={14}/> REAL CRAFT <Scissors size={15}/> OLNEY MADE <Sparkles size={14}/></span>
            ))}
          </div>
        </div>

        {/* Intro */}
        <section id="about" className="scroll-mt-24 border-b border-white/10 bg-[#111310] py-24 sm:py-28 lg:py-36">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[.68fr_1.32fr] lg:gap-24 lg:px-12">
            <div>
              <Eyebrow number="01">The D&apos;Clasicos standard</Eyebrow>
              <div className="relative max-w-[350px] overflow-hidden grayscale-[30%]">
                <img src="/images/shop-interior.webp" alt="D'Clasicos barbershop interior with geometric lighting" className="aspect-[4/3] w-full object-cover" loading="lazy"/>
                <span className="absolute bottom-0 right-0 bg-acid px-3 py-2 text-[10px] font-black uppercase tracking-[.14em] text-ink">4947 N 5TH</span>
              </div>
            </div>
            <div>
              <h2 className="display max-w-[900px] text-[clamp(3.6rem,7.5vw,7.8rem)] uppercase leading-[.89]">
                NOT JUST<br/>A <span className="text-acid">HAIRCUT.</span><br/>A STATEMENT.
              </h2>
              <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <p className="max-w-xl text-[15px] leading-[1.9] text-bone/60">
                  Every detail matters—from the first conversation to the final edge-up. D&apos;Clasicos brings the art of barbering to North 5th Street, with room for every style and every generation.
                </p>
                <a href="#services" className="btn-motion group inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[.16em] text-acid hover:text-bone">
                  Explore our services <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1" size={18}/>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="scroll-mt-24 border-b border-white/10 px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 md:flex-row md:items-end">
              <div>
                <Eyebrow number="02">The service menu</Eyebrow>
                <h2 className="display text-[clamp(4rem,8vw,8rem)] uppercase leading-[.85]">YOUR LOOK.<br/><span className="text-acid">OUR CRAFT.</span></h2>
              </div>
              <p className="max-w-[310px] text-[13px] leading-[1.8] text-muted">From the everyday refresh to the full transformation. Pick your service. We&apos;ll handle the details.</p>
            </div>
            <div className="grid overflow-hidden border border-white/15 md:grid-cols-2 xl:grid-cols-3">
              {SERVICES.map((service, index) => (
                <article key={service.id} className="group relative flex min-h-[240px] flex-col border-b border-white/15 bg-[#131512] p-7 transition-all duration-300 hover:bg-[#1d2419] md:border-r xl:min-h-[270px] xl:p-9">
                  <div className="flex items-start justify-between gap-5">
                    <span className="text-[10px] font-black uppercase tracking-[.22em] text-acid">{service.category}</span>
                    <span className="text-[10px] font-semibold text-bone/35">0{index + 1}</span>
                  </div>
                  <h3 className="mt-9 text-[27px] font-black tracking-[-.065em] sm:text-[30px]">{service.label}</h3>
                  <p className="mb-8 mt-3 max-w-[290px] text-[12px] leading-[1.75] text-bone/55">{service.summary}</p>
                  <div className="mt-auto flex items-end justify-between border-t border-white/10 pt-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[.12em] text-white/35">Rate confirmed at booking</span>
                    <button
                      type="button"
                      aria-label={`Book ${service.label}`}
                      onClick={() => openBooking(service.id)}
                      className="btn-motion grid h-11 w-11 place-items-center rounded-full border border-acid text-acid hover:bg-acid hover:text-ink"
                    >
                      <ArrowUpRight size={18}/>
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-5 text-[11px] text-muted">Final prices and service durations will be published after confirmation with the shop.</p>
          </div>
        </section>

        {/* Book teaser */}
        <section className="relative overflow-hidden border-b border-white/10 bg-[#1a2017] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="pointer-events-none absolute -right-10 -top-32 text-[28rem] font-black leading-none text-white/[.025]">07</div>
          <div className="relative mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-24">
            <div>
              <Eyebrow number="03">Booking, without the runaround</Eyebrow>
              <h2 className="display max-w-[750px] text-[clamp(3.8rem,7vw,7rem)] uppercase leading-[.87]">LESS TAPPING.<br/><span className="text-acid">MORE FRESH.</span></h2>
              <p className="mt-7 max-w-lg text-[14px] leading-[1.9] text-bone/65">A straightforward path to your next cut. No hunting through profiles. No guessing who&apos;s available. Choose your chair and claim your time when live scheduling launches.</p>
              <ActionButton onClick={() => openBooking()} className="mt-8">Try the booking preview <ArrowUpRight size={17}/></ActionButton>
            </div>
            <div className="divide-y divide-white/15 border-y border-white/15">
              {[
                ["01", "CHOOSE THE CUT", "Select the service that fits your style."],
                ["02", "CHOOSE YOUR BARBER", "Go with your favorite or the first available."],
                ["03", "PICK YOUR TIME", "Real schedules will sync with each barber's calendar."],
              ].map(([number, title, description]) => (
                <div key={number} className="flex items-start gap-6 py-7 sm:gap-9">
                  <span className="display min-w-[70px] text-[44px] leading-none text-acid/70">{number}</span>
                  <div><h3 className="text-[15px] font-black tracking-[-.02em]">{title}</h3><p className="mt-2 text-[12px] leading-relaxed text-bone/55">{description}</p></div>
                  <Check className="ml-auto mt-1 shrink-0 text-acid" size={17}/>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="team" className="scroll-mt-24 border-b border-white/10 px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Eyebrow number="04">Meet your lineup</Eyebrow>
                <h2 className="display text-[clamp(4rem,8vw,8rem)] uppercase leading-[.84]">SEVEN BARBERS.<br/><span className="text-acid">YOUR CHOICE.</span></h2>
              </div>
              <div className="max-w-[340px] text-[13px] leading-[1.8] text-muted">
                Every barber brings their own approach. Individual profiles, work samples, and live schedules are the next step.
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
              {BARBERS.map((barber, index) => (
                <article key={barber.id} className="group relative isolate min-h-[300px] overflow-hidden border border-white/15 bg-[#191e18] p-5 transition-colors duration-300 hover:border-acid/70 sm:min-h-[365px] sm:p-7">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(212,255,92,.10),transparent_50%)] transition-opacity duration-300 group-hover:opacity-100"/>
                  <div className="pointer-events-none absolute -bottom-11 -right-4 text-[12rem] font-black leading-none tracking-[-.15em] text-white/[.025] sm:text-[15rem]">{index + 1}</div>
                  <div className="relative flex h-full flex-col">
                    <span className="flex items-center justify-between text-[9px] font-black uppercase tracking-[.16em] text-acid">
                      <span>THE LINEUP / {barber.number}</span><Scissors size={16}/>
                    </span>
                    <div className="my-auto flex min-h-[180px] items-center justify-center sm:min-h-[210px]">
                      <div className="relative grid h-[128px] w-[128px] place-items-center rounded-full border border-white/10 bg-gradient-to-br from-[#292e29] to-[#101210] sm:h-[154px] sm:w-[154px]">
                        <Scissors className="rotate-[-20deg] text-white/15" size={62} strokeWidth={1}/>
                        <span className="absolute bottom-0 right-0 grid h-9 w-9 place-items-center rounded-full border-4 border-[#191e18] bg-acid text-[11px] font-black text-ink">{barber.number}</span>
                      </div>
                    </div>
                    <p className="text-[9px] font-semibold uppercase tracking-[.18em] text-white/40">Profile coming soon</p>
                    <h3 className="mt-2 text-[22px] font-black tracking-[-.05em] sm:text-[26px]">{barber.name}</h3>
                    <button
                      type="button"
                      onClick={() => openBooking("haircut", barber.id)}
                      className="btn-motion mt-4 flex items-center justify-between border-t border-white/15 pt-4 text-[10px] font-bold uppercase tracking-[.13em] text-acid hover:text-bone"
                    >
                      Choose this barber <ArrowUpRight size={18}/>
                    </button>
                  </div>
                </article>
              ))}
              <div className="relative col-span-2 flex min-h-[300px] flex-col justify-center overflow-hidden bg-acid p-7 text-ink md:col-span-2 xl:col-span-1 xl:min-h-[365px] xl:p-9">
                <span className="text-[10px] font-black uppercase tracking-[.2em]">Don&apos;t have a favorite yet?</span>
                <h3 className="display mt-8 text-[58px] uppercase leading-[.85] sm:text-[70px]">FIRST<br/>AVAILABLE.</h3>
                <p className="mt-6 max-w-[260px] text-[12px] leading-[1.8] text-ink/70">Let the calendar find the next open chair on the team.</p>
                <button type="button" onClick={() => openBooking("haircut", "any")} className="btn-motion mt-8 flex items-center justify-between border-t border-ink/20 pt-4 text-[11px] font-black uppercase tracking-[.12em] hover:text-ink/60">
                  Find the next opening <ArrowUpRight size={18}/>
                </button>
              </div>
            </div>
            <p className="mt-5 text-[11px] text-muted">Preview team slots only. Replace with the seven barbers&apos; approved names, portraits, specialties, and calendar links before launch.</p>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="scroll-mt-24 border-b border-white/10 bg-[#111310] px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div><Eyebrow number="05">The proof is in the details</Eyebrow><h2 className="display text-[clamp(4rem,8vw,8rem)] uppercase leading-[.85]">WORK THAT<br/><span className="text-acid">TALKS.</span></h2></div>
              <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="btn-motion inline-flex w-fit items-center gap-3 border-b border-acid pb-2 text-[11px] font-black uppercase tracking-[.12em] text-acid hover:text-white">
                <Instagram size={17}/> More on Instagram <ArrowUpRight size={17}/>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
              {GALLERY.map((item, index) => (
                <button
                  key={`${item.src}-${index}`}
                  type="button"
                  onClick={() => setGalleryIndex(index)}
                  aria-label={`View ${item.label.toLowerCase()} photo`}
                  className={`btn-motion group picture-shine relative overflow-hidden bg-panel text-left ${index === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : index === 4 ? "col-span-2 aspect-[2/1]" : "aspect-[4/5] md:aspect-[4/5]"}`}
                >
                  <img src={item.src} alt={item.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"/>
                  <span className="absolute bottom-4 left-4 z-10 text-[9px] font-black uppercase tracking-[.17em] text-white sm:bottom-5 sm:left-5">{item.label}</span>
                  <span className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/70 text-white opacity-0 transition-all duration-300 group-hover:opacity-100"><ArrowUpRight size={17}/></span>
                </button>
              ))}
            </div>
            <p className="mt-5 text-[11px] leading-relaxed text-muted">Preview images cropped from public-facing screenshots supplied for this project; replace with owner-approved original photography before publication.</p>
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="scroll-mt-24 border-b border-white/10 px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
          <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-28">
            <div>
              <Eyebrow number="06">Word around the neighborhood</Eyebrow>
              <h2 className="display text-[clamp(4rem,8vw,8rem)] uppercase leading-[.87]">DON&apos;T<br/>TAKE <span className="text-acid">OUR</span><br/>WORD.</h2>
              <p className="mt-8 max-w-lg text-[14px] leading-[1.9] text-muted">Reviews are part of the conversation. Read what people have experienced, good and bad, and make the call for yourself. We&apos;re keeping it transparent.</p>
              <a href={BUSINESS.googleReviews} target="_blank" rel="noopener noreferrer" className="btn-motion mt-8 inline-flex items-center gap-3 rounded-full bg-bone px-7 py-4 text-[11px] font-black uppercase tracking-[.14em] text-ink hover:bg-acid">
                Read Google reviews <ArrowUpRight size={17}/>
              </a>
            </div>
            <div className="relative overflow-hidden border border-white/15 bg-[#171a16] p-7 sm:p-10 lg:p-14">
              <div className="absolute -right-5 -top-9 text-[150px] font-black leading-none text-acid/[.04]">“</div>
              <div className="relative">
                <div className="flex items-center justify-between gap-5"><span className="text-[11px] font-black uppercase tracking-[.17em] text-muted">Google review snapshot</span><span className="text-[22px] font-extrabold tracking-[-.08em]">Google<span className="ml-1 text-acid">↗</span></span></div>
                <div className="mt-12 flex flex-wrap items-end gap-7 sm:gap-10">
                  <span className="display text-[112px] leading-[.8] text-bone sm:text-[140px]">4.6</span>
                  <div className="pb-1">
                    <div className="mb-2 flex gap-1.5 text-acid"><Star size={20} fill="currentColor"/><Star size={20} fill="currentColor"/><Star size={20} fill="currentColor"/><Star size={20} fill="currentColor"/><Star size={20} fill="currentColor"/></div>
                    <p className="text-[12px] text-muted">80 reviews in supplied screenshot*</p>
                  </div>
                </div>
                <div className="mt-12 grid grid-cols-2 gap-3 border-t border-white/15 pt-7">
                  <div className="flex items-center gap-3"><ShieldCheck size={21} className="text-acid"/><span className="text-[11px] font-bold">Transparent feedback</span></div>
                  <div className="flex items-center gap-3"><MessageCircle size={21} className="text-acid"/><span className="text-[11px] font-bold">See all perspectives</span></div>
                </div>
                <p className="mt-7 text-[10px] leading-[1.8] text-white/40">*Historical rating supplied by project screenshots. This is not a live Google Reviews feed. Verify live score before launch.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Visit */}
        <section id="location" className="scroll-mt-24 border-b border-white/10 bg-[#111310] px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1440px]">
            <Eyebrow number="07">Your neighborhood barbershop</Eyebrow>
            <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-stretch lg:gap-10">
              <div className="flex flex-col">
                <h2 className="display text-[clamp(4rem,8vw,7.8rem)] uppercase leading-[.87]">FIND<br/>YOUR <span className="text-acid">WAY.</span></h2>
                <p className="mt-8 max-w-[340px] text-[14px] leading-[1.8] text-muted">Right here on North 5th. Your next great cut is closer than you think.</p>
                <div className="mt-10 space-y-7">
                  <div className="flex items-start gap-4"><MapPin size={22} className="mt-1 shrink-0 text-acid"/><div><p className="mb-1 text-[10px] font-black uppercase tracking-[.17em] text-white/40">Visit us</p><p className="text-lg font-extrabold tracking-tight">{BUSINESS.streetAddress}</p><p className="text-sm text-muted">{BUSINESS.locality}</p></div></div>
                  <div className="flex items-start gap-4"><CalendarDays size={22} className="mt-1 shrink-0 text-acid"/><div><p className="mb-1 text-[10px] font-black uppercase tracking-[.17em] text-white/40">Appointments</p><p className="text-lg font-extrabold tracking-tight">By appointment</p><p className="text-sm text-muted">Call to verify hours and availability</p></div></div>
                  <div className="flex items-start gap-4"><Phone size={22} className="mt-1 shrink-0 text-acid"/><div><p className="mb-1 text-[10px] font-black uppercase tracking-[.17em] text-white/40">Call the shop</p><a href={`tel:${BUSINESS.phoneHref}`} className="text-lg font-extrabold tracking-tight transition-colors hover:text-acid">{BUSINESS.phoneDisplay}</a></div></div>
                </div>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <a href={BUSINESS.googleDirections} target="_blank" rel="noopener noreferrer" className="btn-motion inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-acid px-6 py-3.5 text-[11px] font-black uppercase tracking-[.14em] text-ink hover:bg-bone">Get directions <MoveUpRight size={17}/></a>
                  <a href={`tel:${BUSINESS.phoneHref}`} className="btn-motion inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/25 px-6 py-3.5 text-[11px] font-black uppercase tracking-[.14em] hover:border-acid hover:text-acid">Call us <Phone size={16}/></a>
                </div>
              </div>
              <div className="relative min-h-[420px] overflow-hidden border border-white/20 bg-panel lg:min-h-[560px]">
                <iframe title="Map showing D'Clasicos Barber Shop at 4947 N 5th St in Philadelphia" src="https://www.google.com/maps?q=4947+N+5th+St,+Philadelphia,+PA+19120&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0"/>
                <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3 bg-ink/95 p-4 shadow-2xl backdrop-blur-md sm:left-6 sm:right-auto sm:top-6 sm:min-w-[320px] sm:p-5">
                  <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-acid text-ink"><MapPin size={19}/></span><div><p className="text-[13px] font-bold">D&apos;Clasicos Barber Shop</p><p className="text-[11px] text-muted">Olney · Philadelphia, PA</p></div></div>
                  <a aria-label="Open directions" href={BUSINESS.googleDirections} target="_blank" rel="noopener noreferrer" className="btn-motion grid h-10 w-10 shrink-0 place-items-center border border-white/30 hover:border-acid hover:text-acid"><ArrowUpRight size={19}/></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-white/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
            <div><Eyebrow number="08">The fine print</Eyebrow><h2 className="display text-[clamp(4rem,7vw,7.5rem)] uppercase leading-[.87]">GOOD<br/><span className="text-acid">QUESTIONS.</span></h2><p className="mt-8 max-w-[350px] text-[13px] leading-[1.9] text-muted">Need something that isn&apos;t covered here? Give the team a call.</p></div>
            <div className="border-t border-white/15">
              {FAQS.map((faq, index) => (
                <div key={faq.question} className="border-b border-white/15">
                  <button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)} className="btn-motion flex w-full items-center justify-between gap-8 py-6 text-left hover:text-acid">
                    <span className="text-[15px] font-bold sm:text-[17px]">{faq.question}</span><ChevronDown size={19} className={`shrink-0 text-acid transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}/>
                  </button>
                  {openFaq === index && <p className="max-w-[590px] pb-7 text-[13px] leading-[1.9] text-muted">{faq.answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="relative isolate overflow-hidden bg-acid px-5 py-24 text-ink sm:px-8 lg:px-12 lg:py-32">
          <div className="pointer-events-none absolute right-[-2%] top-[-30%] rotate-[-22deg] opacity-[.055]"><Scissors size={520} strokeWidth={1}/></div>
          <div className="relative mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <div><p className="mb-7 text-[11px] font-black uppercase tracking-[.21em]">Your next cut is calling</p><h2 className="display text-[clamp(5rem,12vw,13rem)] uppercase leading-[.78]">SIT DOWN.<br/>LEVEL UP.</h2></div>
            <ActionButton onClick={() => openBooking()} className="!bg-ink !text-bone hover:!bg-[#293126] hover:!text-acid">Book your chair <ArrowUpRight size={18}/></ActionButton>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-ink px-5 pb-28 pt-16 sm:px-8 sm:pb-16 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] gap-14 border-b border-white/15 pb-14 md:grid-cols-[1.3fr_.65fr_.8fr]">
          <div>
            <a href="#top" className="inline-block text-[36px] font-black tracking-[-.085em] sm:text-[44px]">D&apos;CLASICOS<span className="text-acid">.</span></a>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[.25em] text-muted">Barber Shop · Olney · Philadelphia</p>
            <p className="mt-7 max-w-[360px] text-[13px] leading-[1.85] text-muted">Individual style. Neighborhood roots. Precision from start to finish.</p>
            <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" aria-label="D'Clasicos Instagram" className="btn-motion mt-6 grid h-11 w-11 place-items-center rounded-full border border-white/25 hover:border-acid hover:text-acid"><Instagram size={19}/></a>
          </div>
          <div><p className="mb-5 text-[10px] font-black uppercase tracking-[.19em] text-acid">Explore</p><div className="flex flex-col gap-4">{NAV_ITEMS.map((item) => <a key={item.href} href={item.href} className="w-fit text-[13px] text-bone/75 transition-colors hover:text-acid">{item.label}</a>)}</div></div>
          <div><p className="mb-5 text-[10px] font-black uppercase tracking-[.19em] text-acid">The shop</p><p className="mb-3 text-[13px] leading-[1.75] text-bone/75">{BUSINESS.streetAddress}<br/>{BUSINESS.locality}</p><a href={`tel:${BUSINESS.phoneHref}`} className="text-[13px] text-bone/75 transition-colors hover:text-acid">{BUSINESS.phoneDisplay}</a><div className="mt-5"><button type="button" onClick={() => openBooking()} className="btn-motion flex items-center gap-2 text-[12px] font-black uppercase tracking-[.13em] text-acid hover:text-white">Book a chair <ArrowUpRight size={16}/></button></div></div>
        </div>
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-3 pt-7 text-[10px] leading-[1.7] text-bone/40 sm:flex-row sm:gap-7">
          <p>© {new Date().getFullYear()} D&apos;Clasicos Barber Shop. Concept preview · Not an official live booking site.</p>
          <p>Designed for the Olney community. Preview imagery and review statistics require owner verification.</p>
        </div>
      </footer>

      {/* Mobile conversion CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/20 bg-ink/95 p-3 backdrop-blur-xl sm:hidden">
        <ActionButton onClick={() => openBooking()} className="w-full">Book your cut <ArrowUpRight size={17}/></ActionButton>
      </div>

      <BookingDrawer open={bookingOpen} onClose={closeBooking} initialBarber={bookingBarber} initialService={bookingService}/>

      {/* Lightbox */}
      {galleryIndex !== null && (
        <div className="fixed inset-0 z-[90] flex flex-col bg-black/95 p-3 backdrop-blur-lg sm:p-7" role="dialog" aria-modal="true" aria-label="Gallery photo viewer" onClick={() => setGalleryIndex(null)}>
          <div className="mx-auto flex w-full max-w-[1250px] items-center justify-between py-2 text-[11px] font-black uppercase tracking-[.18em] text-bone/70" onClick={(event) => event.stopPropagation()}>
            <span>D&apos;CLASICOS / THE WORK <span className="ml-3 text-acid">{String(galleryIndex + 1).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")}</span></span>
            <button type="button" aria-label="Close gallery" onClick={() => setGalleryIndex(null)} className="btn-motion grid h-10 w-10 place-items-center border border-white/20 hover:border-acid hover:text-acid"><X size={22}/></button>
          </div>
          <div className="relative mx-auto flex min-h-0 w-full max-w-[1250px] flex-1 items-center justify-center" onClick={(event) => event.stopPropagation()}>
            <button type="button" aria-label="Previous gallery photo" onClick={() => setGalleryIndex((galleryIndex + GALLERY.length - 1) % GALLERY.length)} className="btn-motion absolute left-1 z-10 grid h-11 w-11 place-items-center rounded-full bg-acid text-ink hover:bg-white sm:left-5"><ArrowLeft size={20}/></button>
            <img src={GALLERY[galleryIndex].src} alt={GALLERY[galleryIndex].alt} className="max-h-full max-w-full object-contain"/>
            <button type="button" aria-label="Next gallery photo" onClick={() => setGalleryIndex((galleryIndex + 1) % GALLERY.length)} className="btn-motion absolute right-1 z-10 grid h-11 w-11 place-items-center rounded-full bg-acid text-ink hover:bg-white sm:right-5"><ArrowRight size={20}/></button>
          </div>
          <p className="py-3 text-center text-[10px] font-black uppercase tracking-[.18em] text-bone/70">{GALLERY[galleryIndex].label}</p>
        </div>
      )}
    </div>
  );
}
