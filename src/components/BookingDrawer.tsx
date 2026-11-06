"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  ExternalLink,
  Phone,
  ShieldCheck,
  X,
} from "lucide-react";
import { BARBERS, BUSINESS, CAL_LINKS, SERVICES, type ServiceId } from "@/lib/site-data";

type Props = {
  open: boolean;
  onClose: () => void;
  initialBarber?: string;
  initialService?: ServiceId;
};

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

function makePreviewDates(): Date[] {
  // The six preview dates are UI samples, not real availability.
  return Array.from({ length: 6 }, (_, offset) => {
    const date = new Date();
    date.setDate(date.getDate() + offset + 1);
    return date;
  });
}

export function BookingDrawer({ open, onClose, initialBarber = "any", initialService = "haircut" }: Props) {
  const [serviceId, setServiceId] = useState<ServiceId>(initialService);
  const [barberId, setBarberId] = useState(initialBarber);
  const [stage, setStage] = useState<"choose" | "calendar">("choose");
  const [selectedPreviewDate, setSelectedPreviewDate] = useState(0);
  const [selectedPreviewTime, setSelectedPreviewTime] = useState("");
  const [previewDates, setPreviewDates] = useState<Date[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    setServiceId(initialService);
    setBarberId(initialBarber);
    setStage("choose");
    setSelectedPreviewDate(0);
    setSelectedPreviewTime("");
    setPreviewDates(makePreviewDates());
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = priorOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, initialBarber, initialService, onClose]);

  if (!open) return null;

  const service = SERVICES.find((item) => item.id === serviceId)!;
  const barberName =
    barberId === "any" ? "First available" : BARBERS.find((item) => item.id === barberId)?.name || "Selected barber";
  const liveLink = barberId === "any" ? CAL_LINKS[serviceId].any : CAL_LINKS[serviceId].barbers[barberId];
  const hasLiveLink = Boolean(liveLink && /^https:\/\//.test(liveLink));
  // Cal.com live event-type pages support ?embed=1 in an iframe; test the owner's actual link.
  const iframeUrl = hasLiveLink ? `${liveLink}${liveLink.includes("?") ? "&" : "?"}embed=1&theme=dark` : "";

  return (
    <div className="fixed inset-0 z-[100]" role="presentation">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-[7px]" onClick={onClose} />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="absolute bottom-0 right-0 top-0 flex w-full max-w-[650px] flex-col overflow-hidden border-l border-white/15 bg-[#131513] shadow-[-30px_0_100px_rgba(0,0,0,.55)] sm:bottom-5 sm:right-5 sm:top-5 sm:rounded-[22px] sm:border"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.26em] text-acid">D&apos;CLASICOS / APPOINTMENTS</p>
            <h2 id="booking-title" className="mt-1 text-[23px] font-black tracking-[-.05em] sm:text-[27px]">
              Claim your chair.
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close booking panel"
            className="btn-motion grid h-11 w-11 place-items-center rounded-full border border-white/15 text-bone hover:border-acid hover:text-acid"
          >
            <X size={19} />
          </button>
        </div>

        <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-8 pt-6 sm:px-8">
          <div className="mb-7 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.17em]">
            <span className="flex items-center gap-2 text-acid"><span className="grid h-6 w-6 place-items-center rounded-full bg-acid text-ink">1</span> Customize</span>
            <span className="h-px flex-1 bg-white/15" />
            <span className={`flex items-center gap-2 ${stage === "calendar" ? "text-acid" : "text-white/40"}`}>
              <span className={`grid h-6 w-6 place-items-center rounded-full ${stage === "calendar" ? "bg-acid text-ink" : "border border-white/20"}`}>2</span>
              Availability
            </span>
          </div>

          {stage === "choose" ? (
            <>
              <div className="mb-7">
                <h3 className="mb-3 text-sm font-bold tracking-tight">01. What are we doing today?</h3>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {SERVICES.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={serviceId === item.id}
                      onClick={() => setServiceId(item.id)}
                      className={`btn-motion flex min-h-[70px] items-center justify-between gap-3 rounded-xl border p-4 text-left ${serviceId === item.id ? "border-acid bg-acid/10" : "border-white/10 bg-white/[.025] hover:border-white/30"}`}
                    >
                      <span className="text-[13px] font-bold">{item.label}</span>
                      <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${serviceId === item.id ? "border-acid bg-acid text-ink" : "border-white/25"}`}>
                        {serviceId === item.id && <Check size={12} strokeWidth={3} />}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-bold tracking-tight">02. Who&apos;s your barber?</h3>
                <button
                  type="button"
                  onClick={() => setBarberId("any")}
                  aria-pressed={barberId === "any"}
                  className={`btn-motion mb-2 flex w-full items-center justify-between rounded-xl border p-4 text-left ${barberId === "any" ? "border-acid bg-acid/10" : "border-white/10 bg-white/[.025] hover:border-white/30"}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-acid text-ink"><Clock3 size={19}/></span>
                    <span><strong className="block text-sm">First available</strong><span className="text-xs text-muted">Best option for the soonest appointment</span></span>
                  </span>
                  <span className={`grid h-5 w-5 place-items-center rounded-full border ${barberId === "any" ? "border-acid bg-acid text-ink" : "border-white/30"}`}>
                    {barberId === "any" && <Check size={12} strokeWidth={3}/>}
                  </span>
                </button>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {BARBERS.map((barber) => (
                    <button
                      key={barber.id}
                      type="button"
                      aria-pressed={barberId === barber.id}
                      onClick={() => setBarberId(barber.id)}
                      className={`btn-motion flex items-center gap-3 rounded-xl border p-3 text-left ${barberId === barber.id ? "border-acid bg-acid/10" : "border-white/10 bg-white/[.025] hover:border-white/30"}`}
                    >
                      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg text-xs font-black ${barberId === barber.id ? "bg-acid text-ink" : "bg-white/10 text-bone"}`}>{barber.number}</span>
                      <span className="text-xs font-bold">{barber.name}</span>
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-muted">Barber names and individual booking links will be added after team onboarding.</p>
              </div>
              <button
                type="button"
                onClick={() => setStage("calendar")}
                className="btn-motion mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-acid px-6 py-4 text-xs font-black uppercase tracking-[.16em] text-ink hover:bg-white"
              >
                See availability <ArrowRight size={17} />
              </button>
              <p className="mt-3 flex items-center justify-center gap-2 text-[11px] text-muted"><ShieldCheck size={13}/> No account required with the planned Cal.com booking flow</p>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setStage("choose")}
                className="btn-motion mb-5 flex items-center gap-2 text-xs font-bold text-muted hover:text-acid"
              ><ArrowLeft size={15}/> Change service or barber</button>
              <div className="mb-6 rounded-xl border border-white/10 bg-white/[.035] p-4">
                <span className="mb-2 block text-[10px] uppercase tracking-[.2em] text-muted">Your appointment</span>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <strong className="text-xl tracking-tight">{service.label}</strong>
                  <span className="rounded-full border border-white/15 px-3 py-1.5 text-xs">{barberName}</span>
                </div>
              </div>
              {hasLiveLink ? (
                <>
                  <p className="mb-4 flex items-center gap-2 text-xs text-acid"><span className="h-2 w-2 rounded-full bg-acid"/> Live calendar · times checked by Cal.com</p>
                  <iframe title={`Live booking for ${service.label} with ${barberName}`} src={iframeUrl} loading="lazy" className="min-h-[600px] w-full rounded-xl border border-white/10 bg-white" />
                  <a href={liveLink} target="_blank" rel="noopener noreferrer" className="btn-motion mt-4 inline-flex items-center gap-2 text-xs font-bold text-acid hover:text-white">
                    Open calendar in a separate tab <ExternalLink size={14}/>
                  </a>
                </>
              ) : (
                <>
                  <div className="mb-5 rounded-xl border border-amber-300/25 bg-amber-300/[.06] p-4 text-xs leading-relaxed text-amber-100/90">
                    <strong className="mb-1 block uppercase tracking-[.1em]">Design preview — not live availability</strong>
                    The times below illustrate the booking interface only. No appointment will be created until individual Cal.com calendars are connected.
                  </div>
                  <div className="mb-4 flex items-center gap-2"><CalendarDays size={17} className="text-acid"/><h3 className="text-sm font-bold">Choose a day</h3></div>
                  <div className="no-scrollbar mb-6 flex gap-2 overflow-x-auto pb-2">
                    {previewDates.map((date, index) => (
                      <button
                        type="button"
                        key={date.toDateString()}
                        onClick={() => { setSelectedPreviewDate(index); setSelectedPreviewTime(""); }}
                        aria-pressed={selectedPreviewDate === index}
                        className={`btn-motion min-w-[84px] rounded-xl border px-3 py-4 text-center ${selectedPreviewDate === index ? "border-acid bg-acid text-ink" : "border-white/15 text-bone hover:border-white/40"}`}
                      >
                        <span className="block text-[10px] font-bold uppercase">{date.toLocaleDateString("en-US", { weekday: "short" })}</span>
                        <span className="mt-1 block text-2xl font-black">{date.getDate()}</span>
                      </button>
                    ))}
                  </div>
                  <h3 className="mb-3 text-sm font-bold">Sample times</h3>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {["9:30 AM", "10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"].map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedPreviewTime(time)}
                        aria-pressed={selectedPreviewTime === time}
                        className={`btn-motion rounded-xl border px-4 py-3 text-xs font-bold ${selectedPreviewTime === time ? "border-acid bg-acid text-ink" : "border-white/15 hover:border-acid"}`}
                      >{time}</button>
                    ))}
                  </div>
                  {selectedPreviewTime && previewDates[selectedPreviewDate] && (
                    <div className="mt-5 rounded-xl border border-acid/20 bg-acid/[.055] p-4 text-xs leading-relaxed text-bone">
                      <strong className="mb-2 block text-acid">Sample selection only</strong>
                      {formatDate(previewDates[selectedPreviewDate])} at {selectedPreviewTime} · {barberName}
                      <p className="mt-2 text-muted">This is not a reservation. Booking confirmation is disabled until the real calendar is connected.</p>
                    </div>
                  )}
                  <a
                    href={`tel:${BUSINESS.phoneHref}`}
                    className="btn-motion mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-acid px-5 py-4 text-xs font-black uppercase tracking-[.13em] text-ink hover:bg-white"
                  >
                    <Phone size={16}/> Call the shop to book
                  </a>
                </>
              )}
            </>
          )}
        </div>
        <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-[10px] font-bold uppercase tracking-[.14em] text-white/45 sm:px-8">
          <span>4947 N 5th St · Olney</span><span>By appointment</span>
        </div>
      </section>
    </div>
  );
}
