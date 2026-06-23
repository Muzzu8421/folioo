"use client";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["Services", "Process", "Work", "Pricing"];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"
    }`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          <Image src="/folioo_logo.png" alt="Folioo" width={110} height={110} className="object-contain" />

          <div className="hidden lg:flex items-center gap-10">
            {links.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`}
                className="text-[14px] text-white/40 hover:text-white transition-colors duration-300">
                {l}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login">
              <button className="text-[14px] text-white/40 hover:text-white transition-colors">Log in</button>
            </Link>
            <Link href="/login">
              <button className="group px-6 py-2.5 bg-[#c084fc] text-[#0a0a0a] rounded-full font-semibold text-[14px] hover:bg-[#d8b4fe] transition-all duration-300 flex items-center gap-1">
                Start Free
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-white/60 hover:text-white">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-[#0a0a0a] border-t border-white/5 px-6 py-6 space-y-1">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className="block py-3 px-4 text-white/40 hover:text-white rounded-lg text-[14px] transition-all"
              onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
          <div className="pt-4 space-y-2 border-t border-white/5 mt-4">
            <Link href="/login" className="block">
              <button className="w-full py-3 text-white border border-white/10 rounded-xl text-[14px] font-medium">Log in</button>
            </Link>
            <Link href="/login" className="block">
              <button className="w-full py-3 bg-[#c084fc] text-[#0a0a0a] rounded-xl text-[14px] font-semibold">Start Free</button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
