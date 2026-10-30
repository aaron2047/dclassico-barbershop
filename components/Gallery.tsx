import { client } from "@/client.config";

// Barbers convert on visuals more than copy. Placeholder photos here —
// swap client.config.ts `gallery` for the shop's real images once pulled.
export default function Gallery() {
  return (
    <section className="bg-stone-50 py-24 border-t border-stone-200">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-stone-900 mb-12">
          The Shop
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {client.gallery.map((photo, i) => (
            <div
              key={photo.src}
              className={`relative overflow-hidden rounded-sm ${
                i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
              }`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover grayscale-[15%] contrast-110"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
