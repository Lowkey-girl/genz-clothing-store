
export default function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🔥</span>
                    <span className="font-display font-extrabold text-xl">Gen-Z Clothing</span>
                </div>
                <p className="text-sm opacity-60">Sustainable fashion for the culture. Made with love and recycled materials. 🌱</p>
            </div>
            {/* Shop */}
            <div>
                <h4 className="font-bold mb-4">Shop</h4>
                <ul className="space-y-2 text-sm opacity-60">
                    <li><a href="#" className="hover:opacity-100 transition-opacity">New Arrivals</a></li>
                    <li><a href="#" className="hover:opacity-100 transition-opacity">Best Sellers</a></li>
                    <li><a href="#" className="hover:opacity-100 transition-opacity">Sale</a></li>
                    <li><a href="#" className="hover:opacity-100 transition-opacity">Gift Cards</a></li>
                </ul>
            </div>
            {/* Help */}
            <div>
                <h4 className="font-bold mb-4">Help</h4>
                <ul className="space-y-2 text-sm opacity-60">
                    <li><a href="#" className="hover:opacity-100 transition-opacity">FAQ</a></li>
                    <li><a href="#" className="hover:opacity-100 transition-opacity">Shipping</a></li>
                    <li><a href="#" className="hover:opacity-100 transition-opacity">Returns</a></li>
                    <li><a href="#" className="hover:opacity-100 transition-opacity">Size Guide</a></li>
                </ul>
            </div>
            {/* Social */}
            <div>
                <h4 className="font-bold mb-4">Contact</h4>
                <div className="">
                     <ul className="space-y-2 text-sm opacity-60">
                        <li><a href="#" className="hover:opacity-100 transition-opacity">Facebook</a></li>
                        <li><a href="#" className="hover:opacity-100 transition-opacity">Instagram</a></li>
                        <li><a href="#" className="hover:opacity-100 transition-opacity">TikTok</a></li>
                        <li><a href="#" className="hover:opacity-100 transition-opacity">YouTube</a></li>
                    </ul>
                </div>
            </div>
        </div>
        {/* Bottom */}
        <div className="mt-12 pt-8 border-t text-center text-sm opacity-60">
          <p>© {new Date().getFullYear()} Gen-Z Clothing. All rights reserved. Made with 💚 for the planet.</p>
        </div>
      </div>
    </footer>
  );
}
