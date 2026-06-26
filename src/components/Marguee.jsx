export default function Marquee() {
  return (
    <div className="py-4 overflow-hidden border-y">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        <span className="mx-8 font-display font-bold text-xl">
          FREE SHIPPING OVER $50 🚚
        </span>
        <span className="mx-8 font-display font-bold text-xl">•</span>
        <span className="mx-8 font-display font-bold text-xl">
          NEW DROPS EVERY FRIDAY ✨
        </span>
        <span className="mx-8 font-display font-bold text-xl">•</span>
        <span className="mx-8 font-display font-bold text-xl">
          SUSTAINABLE FASHION 🌱
        </span>
        <span className="mx-8 font-display font-bold text-xl">•</span>
        {/* repeat for smooth looping */}
        <span className="mx-8 font-display font-bold text-xl">
          FREE SHIPPING OVER $50 🚚
        </span>
        <span className="mx-8 font-display font-bold text-xl">•</span>
        <span className="mx-8 font-display font-bold text-xl">
          NEW DROPS EVERY FRIDAY ✨
        </span>
        <span className="mx-8 font-display font-bold text-xl">•</span>
        <span className="mx-8 font-display font-bold text-xl">
          SUSTAINABLE FASHION 🌱
        </span>
      </div>
    </div>
  );
}
