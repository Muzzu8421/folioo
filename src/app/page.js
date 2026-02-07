"use client";
import { useState, useEffect } from "react";
import {
  Sparkles,
  Palette,
  Rocket,
  RefreshCw,
  Upload,
  Link2,
  Menu,
  X,
  Star,
  Check,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Homepage({ onNavigate }) {
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
    <div className="min-h-screen bg-white">
      <Navbar isScrolled={isScrolled} onNavigate={onNavigate} />
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#f9fafb] to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-linear-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] bg-clip-text text-transparent text-sm font-semibold mb-6">
            Transform Your Career
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 max-w-5xl mx-auto">
            Turn Your Resume Into a Stunning Portfolio Website
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Create a professional portfolio in minutes. No coding required. Just
            upload your resume and let AI do the magic.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => onNavigate("login")}
              className="px-8 py-4 bg-linear-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] text-white rounded-xl font-semibold text-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              Create Your Portfolio Free
            </button>
            <button className="px-8 py-4 border-2 border-gray-200 text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors">
              See Examples
            </button>
          </div>

          {/* Hero Mockup */}
          <div className="relative max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1609941535028-83e3b0291aae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwb3J0Zm9saW8lMjB3ZWJzaXRlJTIwbGFwdG9wJTIwbW9ja3VwfGVufDF8fHx8MTc3MDI5Nzk1OXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Portfolio website mockup"
                width={1080}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-8">
            Trusted by professionals from
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 opacity-40">
            <div className="text-2xl font-bold text-gray-900">Google</div>
            <div className="text-2xl font-bold text-gray-900">Microsoft</div>
            <div className="text-2xl font-bold text-gray-900">Amazon</div>
            <div className="text-2xl font-bold text-gray-900">Meta</div>
            <div className="text-2xl font-bold text-gray-900">Apple</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Stand Out
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Powerful features designed to showcase your professional journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Sparkles className="w-12 h-12" />}
              title="AI-Powered Conversion"
              description="Upload your resume and our AI transforms it into a beautiful portfolio website"
            />
            <FeatureCard
              icon={<Palette className="w-12 h-12" />}
              title="Customizable Templates"
              description="Choose from dozens of professional templates designed for different industries"
            />
            <FeatureCard
              icon={<Rocket className="w-12 h-12" />}
              title="One-Click Deploy"
              description="Publish your portfolio with a custom domain in seconds"
            />
            <FeatureCard
              icon={<RefreshCw className="w-12 h-12" />}
              title="Always Up-to-Date"
              description="Update your resume once, and your portfolio updates automatically"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-700">
              Three simple steps to your dream portfolio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <StepCard
              number="01"
              icon={<Upload className="w-12 h-12" />}
              title="Upload Resume"
              description="Simply drag and drop your resume in PDF or DOCX format"
            />
            <StepCard
              number="02"
              icon={<Palette className="w-12 h-12" />}
              title="Customize Design"
              description="Choose a template and customize colors, fonts, and layout"
            />
            <StepCard
              number="03"
              icon={<Link2 className="w-12 h-12" />}
              title="Publish & Share"
              description="Get your custom URL and share your portfolio with the world"
            />
          </div>
        </div>
      </section>

      {/* Template Showcase */}
      <section id="templates" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Beautiful Templates for Every Professional
            </h2>
            <p className="text-xl text-gray-700">
              Choose from our curated collection
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TemplateCard
              name="Modern Developer"
              category="Developer"
              imageUrl="https://images.unsplash.com/photo-1566915896913-549d796d2166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
            />
            <TemplateCard
              name="Creative Designer"
              category="Designer"
              imageUrl="https://images.unsplash.com/photo-1728281144091-b743062a9bf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
            />
            <TemplateCard
              name="Marketing Pro"
              category="Marketing"
              imageUrl="https://images.unsplash.com/photo-1613759612065-d5971d32ca49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
            />
            <TemplateCard
              name="Business Executive"
              category="Business"
              imageUrl="https://images.unsplash.com/photo-1631247022917-53f9af27d719?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
            />
            <TemplateCard
              name="Data Scientist"
              category="Data"
              imageUrl="https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
            />
            <TemplateCard
              name="Product Manager"
              category="Product"
              imageUrl="https://images.unsplash.com/photo-1617529497832-5ad49d9b5928?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="showcase" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Loved by Professionals Worldwide
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Folioo transformed my job search. I got 3x more interview requests after sharing my portfolio!"
              name="Sarah Chen"
              title="Software Engineer"
              company="Google"
              imageUrl="https://images.unsplash.com/photo-1652471949169-9c587e8898cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
            />
            <TestimonialCard
              quote="The AI-powered conversion is amazing. It took my boring resume and made it into something beautiful."
              name="Michael Rodriguez"
              title="Product Designer"
              company="Airbnb"
              imageUrl="https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
            />
            <TestimonialCard
              quote="I landed my dream job thanks to my Folioo portfolio. Highly recommend to all job seekers!"
              name="Emily Watson"
              title="Marketing Manager"
              company="HubSpot"
              imageUrl="https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-700">
              Choose the plan that&apos;s right for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              name="Free"
              price="$0"
              period="forever"
              features={[
                "Basic portfolio website",
                "1 template",
                "Folioo subdomain",
                "Basic analytics",
              ]}
              buttonText="Get Started Free"
              onButtonClick={() => onNavigate("login")}
            />
            <PricingCard
              name="Pro"
              price="$9"
              period="per month"
              features={[
                "Everything in Free",
                "All premium templates",
                "Custom domain",
                "Advanced analytics",
                "Priority support",
                "Remove Folioo branding",
              ]}
              buttonText="Start Free Trial"
              featured={true}
              onButtonClick={() => onNavigate("login")}
            />
            <PricingCard
              name="Enterprise"
              price="Custom"
              period=""
              features={[
                "Everything in Pro",
                "Custom templates",
                "Team collaboration",
                "API access",
                "Dedicated support",
              ]}
              buttonText="Contact Sales"
              onButtonClick={() => onNavigate("login")}
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Build Your Portfolio?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of professionals who&apos;ve transformed their
            careers with Folioo
          </p>
          <button
            onClick={() => onNavigate("login")}
            className="px-8 py-4 bg-white text-[#4f46e5] rounded-xl font-semibold text-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            Get Started - It&apos;s Free
          </button>
          <p className="text-white/80 text-sm mt-4">No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] flex items-center justify-center">
                  <span className="text-white font-bold text-xl">F</span>
                </div>
                <span className="text-2xl font-bold">Folioo</span>
              </div>
              <p className="text-gray-400 mb-4">
                Transform your resume into a stunning portfolio website
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#templates"
                    className="hover:text-white transition-colors"
                  >
                    Templates
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Partners
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 Folioo. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all">
      <div className="w-16 h-16 rounded-xl bg-linear-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] flex items-center justify-center text-white mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}

function StepCard({ number, icon, title, description }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] text-white text-3xl font-bold mb-6">
        {number}
      </div>
      <div className="flex justify-center mb-4 text-[#4f46e5]">{icon}</div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}

function TemplateCard({ name, category, imageUrl }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all group">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-br from-[#4f46e5]/80 via-[#7c3aed]/80 to-[#fb923c]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="px-6 py-3 bg-white text-[#4f46e5] rounded-lg font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform">
            View Demo
          </button>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
          {category}
        </span>
      </div>
    </div>
  );
}

function TestimonialCard({ quote, name, title, company, imageUrl }) {
  return (
    <div className="bg-white p-8 rounded-2xl border-l-4 border-[#4f46e5] shadow-md">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-[#fb923c] text-[#fb923c]" />
        ))}
      </div>
      <p className="text-gray-700 italic mb-6">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-4">
        <Image
          src={imageUrl}
          alt={name}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-sm text-gray-500">{company}</p>
        </div>
      </div>
    </div>
  );
}

function PricingCard({
  name,
  price,
  period,
  features,
  buttonText,
  featured = false,
  onButtonClick,
}) {
  return (
    <div
      className={`bg-white p-8 rounded-2xl ${
        featured
          ? "border-2 border-[#4f46e5] shadow-xl scale-105"
          : "border border-gray-200"
      }`}
    >
      {featured && (
        <div className="inline-block px-3 py-1 bg-linear-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] text-white rounded-full text-sm font-semibold mb-4">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
      <div className="mb-6">
        <span className="text-5xl font-bold text-gray-900">{price}</span>
        {period && <span className="text-gray-600 ml-2">{period}</span>}
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onButtonClick}
        className={`w-full py-3 rounded-xl font-semibold transition-all ${
          featured
            ? "bg-linear-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] text-white hover:shadow-lg hover:-translate-y-0.5"
            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
}
