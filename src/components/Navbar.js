"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({ onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`poppins fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/folioo_logo.png"
              alt="Folioo Logo"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <a
              href="#features"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#templates"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Templates
            </a>
            <a
              href="#showcase"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Showcase
            </a>
            <a
              href="#pricing"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#docs"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Docs
            </a>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login">
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
              Sign In
            </button>
            </Link>
            <Link href="/login">
            <button className="px-6 py-2 bg-linear-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all">
              Get Started
            </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-linear-to-br from-[#4f46e5] via-[#7c3aed] to-[#fb923c] text-white">
          <div className="px-4 py-6 space-y-4">
            <a href="#features" className="block py-2">
              Features
            </a>
            <a href="#templates" className="block py-2">
              Templates
            </a>
            <a href="#showcase" className="block py-2">
              Showcase
            </a>
            <a href="#pricing" className="block py-2">
              Pricing
            </a>
            <a href="#docs" className="block py-2">
              Docs
            </a>
            <div className="pt-4 space-y-2">
              <button
                onClick={() => onNavigate?.("login")}
                className="w-full py-3 bg-white text-[#4f46e5] rounded-xl font-semibold"
              >
                Sign In
              </button>
              <button
                onClick={() => onNavigate?.("login")}
                className="w-full py-3 bg-white/20 backdrop-blur text-white rounded-xl font-semibold"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
