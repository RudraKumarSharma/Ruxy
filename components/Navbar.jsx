function Navbar() {
  return (
    <nav className="w-full bg-[#0f0f19] border-b border-white/10 backdrop-blur-lg">
      {/* Centered container like Kosh, Solana, Coinbase */}
      <div className="max-w-7xl mx-auto px-2 py-6 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-white font-bold text-3xl">Ruxy</h1>

        {/* Right side (empty for now) */}
        <div></div>

      </div>
    </nav>
  );
}

export default Navbar;
