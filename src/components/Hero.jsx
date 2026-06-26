import Register from "../pages/Register";

export default function Hero({ onShopClick }) {
  return ( <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-16">
    {/* Background Blobs */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl animate-float bg-orange-500/60"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full blur-3xl animate-float bg-purple-500/40" style={{ animationDelay: "-3s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl bg-orange-500/30" style={{ animationDelay: "-1.5s" }}></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-orange-500/20 text-orange-500">
              <span className="animate-pulse">✨</span>
              <span>New Collection Just Dropped</span>
            </div>
           <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-tight uppercase font-extrabold"> DRESS YOUR <br />
              <span className="relative inline-block"> VIBE<svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 10C50 2 150 2 198 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-orange-500 opacity-60" />
              </svg></span>
            </h1>
            <p className="text-lg sm:text-xl max-w-md opacity-80">
              Sustainable fits that hit different. Express yourself, save the
              planet. No cap. 💯
            </p>
            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button onClick={onShopClick} className="group px-8 py-4 rounded-full font-bold text-lg bg-orange-500 text-black transition-all duration-300 hover:scale-105 animate-pulse-glow flex items-center gap-2" >
                <span onClick={Register}>Shop Now</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </button>
              <button className="px-8 py-4 rounded-full font-bold text-lg border-2 border-white transition-all duration-300 hover:scale-105 hover:bg-orange-200 hover:text-black">View Lookbook</button>
            </div>
            {/* Stats */}
            <div className="flex gap-8 pt-8">
              {[
                { value: "50K+", label: "Happy Customers" },
                { value: "100%", label: "Sustainable" },
                { value: "24/7", label: "Support" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-3xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-sm opacity-60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Hero Visual */}
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 bg-zinc-900">
              <div className="aspect-[3/4] flex items-center justify-center p-8">
                <div className="text-center space-y-4">
                  <div className="text-8xl animate-float"><img src="/upload/Hero.jpg" alt="Hero" /></div>
                  <div className="font-display text-2xl font-bold text-orange-500">TRIM V-NECK SWEATER VEST</div>
                  <div className="text-lg opacity-80 text-orange-500">$49.99</div>
                </div>
              </div>
            </div>
            {/* Floating Tags */}
            <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full font-bold shadow-lg animate-float bg-orange-500 text-black" style={{ animationDelay: "-2s" }}>
              🔥 HOT
            </div>
            <div className="absolute -bottom-4 -left-4 px-4 py-2 rounded-full font-bold shadow-lg animate-float bg-gray-200 text-black" style={{ animationDelay: "-4s" }}>
              -30% OFF
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
