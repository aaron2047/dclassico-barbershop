import { client } from "@/client.config";

// Quiet strip under the hero — the Runway-style muted fact bar, adapted:
// specific facts instead of partner logos, since that's the barbershop
// equivalent of social proof.
export default function TrustStrip() {
  return (
    <div className="bg-black text-stone-400 text-sm py-4 px-6 text-center">
      {client.acceptsWalkIns ? "Walk-ins welcome" : "Appointment-only"} &middot;{" "}
      {client.barbers} master barbers &middot; open 7 days a week
    </div>
  );
}
