"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import { ArrowUpRight, Check, Upload, Palette, Globe } from "lucide-react";
import { BlurText, SplitText, SpotlightCard, AuroraBackground } from "@/components/ReactBits";

/* ═══════ Hook: scroll‑triggered visibility ═══════ */
function useInView(opts = {}) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); ob.unobserve(e.target); } },
      { threshold: 0.1, ...opts },
    );
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return [ref, vis];
}

/* ═══════════════════ MAIN ═══════════════════ */
export default function Homepage({ onNavigate }) {
  return (
    <div className="min-h-screen text-white selection:bg-[#c084fc] selection:text-black font-sans relative">
      
      {/* Optimized Fixed Background Video */}
      <div className="fixed inset-0 -z-50 w-full h-full bg-[#0a0a0a] overflow-hidden pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-50 will-change-transform"
          style={{ transform: "translateZ(0)" }} // Hardware acceleration to prevent lag
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        {/* Cinematic dark overlay for text contrast and blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]" />
      </div>

      <Navbar onNavigate={onNavigate} />
      <Hero onNavigate={onNavigate} />
      <ValueProp />
      <TargetAudience />
      <Features />
      <Process />
      <Templates />
      <Pricing onNavigate={onNavigate} />
      <Footer />
    </div>
  );
}

/* ═══════════════════ HERO ═══════════════════ */
function Hero({ onNavigate }) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 px-6 lg:px-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full z-10 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div className="anim-in d1">
          <p className="text-[13px] text-white/50 uppercase tracking-[0.1em] mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc]" />
            Folioo AI Builder
          </p>
          <h1 className="text-[clamp(3rem,6vw,6rem)] font-normal leading-[1] tracking-tight mb-8">
            <BlurText text="Portfolios that" delay={0} /> <br />
            <span className="italic text-[#c084fc]">
              <SplitText text="speak louder." delay={0.2} />
            </span>
          </h1>
          <p className="text-lg text-white/40 max-w-md mb-10 font-light leading-relaxed anim-in d4">
            Upload your resume and our AI crafts a stunning, professional portfolio website in minutes. Zero coding required.
          </p>
          <div className="flex items-center gap-6 anim-in d5">
            <button
              onClick={() => onNavigate("login")}
              className="group px-7 py-3.5 bg-[#c084fc] text-[#0a0a0a] rounded-full font-semibold text-[15px] hover:bg-[#d8b4fe] transition-colors flex items-center gap-2"
            >
              Build your portfolio
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=faces&fit=crop&w=100&h=100",
                  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=faces&fit=crop&w=100&h=100",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=faces&fit=crop&w=100&h=100"
                ].map((src, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0a0a] overflow-hidden bg-[#111]">
                     <img src={src} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-[12px] text-white/40 leading-tight">
                Trusted by <br /><span className="text-white/80 font-medium">2,500+</span> pros
              </div>
            </div>
          </div>
        </div>

        <div className="relative anim-in d3">
          <SpotlightCard className="rounded-3xl border border-white/5 bg-[#111] p-2">
            <div className="rounded-2xl overflow-hidden relative aspect-[4/3] bg-[#050505]">
              {/* RESTORED PREVIOUS IMAGE (modern.png) */}
              <img 
                src="/modern.png" 
                alt="Portfolio Preview" 
                className="object-cover object-top w-full h-full group-hover:scale-105 transition-transform duration-1000" 
              />
            </div>
            
            <div className="absolute -left-6 top-1/4 p-4 rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 flex flex-col items-center gap-2 shadow-2xl">
              <p className="text-xs text-white/40">Build time</p>
              <p className="text-xl text-[#c084fc] font-medium">30s</p>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ VALUE PROP ═══════════════════ */
function ValueProp() {
  const [ref, vis] = useInView();
  return (
    <section ref={ref} className="py-24 px-6 lg:px-10 border-t border-white/5">
      <div className={`max-w-[1400px] mx-auto text-center ${vis ? 'anim-in' : 'opacity-0'}`}>
        <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.1] max-w-4xl mx-auto">
          We don&apos;t just build websites. <br />
          We craft <span className="italic text-[#c084fc]">digital identities</span> for your career goals.
        </h2>
      </div>
    </section>
  );
}

/* ═══════════════════ TARGET AUDIENCE ═══════════════════ */
function TargetAudience() {
  const [ref, vis] = useInView();
  const audiences = [
    { num: "01", title: "Software Engineers", desc: "Showcase GitHub repos, tech stacks, and side projects effortlessly." },
    { num: "02", title: "Product Designers", desc: "Highlight case studies, Figma files, and your design process." },
    { num: "03", title: "Marketing Pros", desc: "Display campaign results, KPIs, and strategic initiatives." },
    { num: "04", title: "Founders & Leaders", desc: "Tell your professional story and build personal brand authority." },
  ];

  return (
    <section id="services" ref={ref} className="py-24 px-6 lg:px-10 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto">
        <div className={`mb-16 ${vis ? 'anim-in' : 'opacity-0'}`}>
          <p className="text-lg font-light">We do our best <br/><span className="italic text-[#c084fc]">work with</span></p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 border-t border-white/10 pt-16 relative">
          {audiences.map((aud, i) => (
            <div key={aud.num} className={`flex gap-6 relative z-10 ${vis ? 'anim-in' : 'opacity-0'}`} style={{ animationDelay: `${i * 100}ms` }}>
              <div className="text-5xl font-light text-[#c084fc]/30">{aud.num}</div>
              <div>
                <h3 className="text-2xl font-normal mb-3">{aud.title}</h3>
                <p className="text-white/40 leading-relaxed font-light">{aud.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ FEATURES (The actual grid section the user wanted filled) ═══════════════════ */
function Features() {
  const [ref, vis] = useInView();
  
  // Adding assets directly into the features grid as requested
  const features = [
    { 
      title: "AI Resume Parsing", 
      desc: "Instant extraction", 
      img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop" // Laptop coding 
    },
    { 
      title: "Custom Themes", 
      desc: "Light & dark modes", 
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" // 3D abstract
    },
    { 
      title: "Analytics", 
      desc: "Visitor tracking", 
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" // Dashboard/Charts
    },
    { 
      title: "Custom Domains", 
      desc: "Connect your own URL", 
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop" // Globe/Internet
    },
  ];

  return (
    <section ref={ref} className="py-24 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
        <div className={`sticky top-32 ${vis ? 'anim-in' : 'opacity-0'}`}>
          <h2 className="text-[clamp(2.5rem,4vw,4rem)] font-normal leading-[1.1] mb-8">
            Features that <br />
            <span className="italic text-[#c084fc]">speak for themselves</span>
          </h2>
          <p className="text-white/40 text-lg font-light mb-8 max-w-md">
            Everything you need to stand out in today&apos;s competitive job market, packaged in one seamless platform.
          </p>
          <button className="px-6 py-3 rounded-full border border-white/20 text-sm hover:bg-white/5 transition-colors">
            View all features
          </button>
        </div>

        {/* The Grid with images filling the cards like the Nymera reference */}
        <div className="grid grid-cols-2 gap-4">
          {features.map((f, i) => (
            <SpotlightCard key={f.title} className={`aspect-[4/5] bg-[#0c0c0c] rounded-3xl overflow-hidden border border-white/5 group flex flex-col ${vis ? 'anim-in' : 'opacity-0'}`} style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex-1 relative overflow-hidden">
                <img 
                  src={f.img} 
                  alt={f.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] to-transparent" />
              </div>
              <div className="p-8 pt-0 relative z-10">
                <h3 className="text-xl mb-1">{f.title}</h3>
                <p className="text-white/30 text-sm font-light">{f.desc}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ PROCESS ═══════════════════ */
function Process() {
  const [ref, vis] = useInView();
  
  return (
    <section id="process" ref={ref} className="py-24 px-6 lg:px-10 border-t border-white/5 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto">
        <div className={`mb-16 ${vis ? 'anim-in' : 'opacity-0'}`}>
          <h2 className="text-4xl font-normal">The <span className="italic text-[#c084fc]">Process</span></h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Upload size={24}/>, title: "Upload", desc: "Drop your PDF or DOCX resume. Our AI reads it in seconds." },
            { icon: <Palette size={24}/>, title: "Customize", desc: "Select a template, tweak colors, and adjust typography." },
            { icon: <Globe size={24}/>, title: "Publish", desc: "Go live with a custom link and start sharing immediately." }
          ].map((step, i) => (
            <SpotlightCard key={step.title} className={`p-8 rounded-3xl bg-[#0c0c0c] border border-white/5 ${vis ? 'anim-in' : 'opacity-0'}`} style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#c084fc] mb-6">
                {step.icon}
              </div>
              <h3 className="text-2xl mb-3">{step.title}</h3>
              <p className="text-white/40 font-light leading-relaxed">{step.desc}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ TEMPLATES ═══════════════════ */
function Templates() {
  const [ref, vis] = useInView();
  return (
    <section id="work" ref={ref} className="py-24 px-6 lg:px-10 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        <div className={`flex justify-between items-end mb-16 ${vis ? 'anim-in' : 'opacity-0'}`}>
          <h2 className="text-4xl font-normal">Selected <span className="italic text-[#c084fc]">Templates</span></h2>
          <button className="hidden sm:flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
            View all <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* RESTORED PREVIOUS IMAGES (modern.png and editorial.png) */}
          {[
            { img: "/modern.png", title: "Modern Developer" },
            { img: "/editorial.png", title: "Creative Editorial" }
          ].map((tpl, i) => (
            <div key={tpl.title} className={`group cursor-pointer ${vis ? 'anim-in' : 'opacity-0'}`} style={{ animationDelay: `${i * 150}ms` }}>
              <SpotlightCard className="rounded-3xl overflow-hidden bg-[#111] aspect-[4/3] relative mb-6 border border-white/5">
                <img src={tpl.img} alt={tpl.title} className="object-cover object-top w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              </SpotlightCard>
              <div className="flex justify-between items-center px-2">
                <h3 className="text-xl font-normal">{tpl.title}</h3>
                <ArrowUpRight className="text-white/20 group-hover:text-[#c084fc] transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ PRICING ═══════════════════ */
function Pricing({ onNavigate }) {
  const [ref, vis] = useInView();
  return (
    <section id="pricing" ref={ref} className="py-32 px-6 lg:px-10 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto">
        <div className={`text-center mb-20 ${vis ? 'anim-in' : 'opacity-0'}`}>
          <h2 className="text-[clamp(2.5rem,4vw,4rem)] font-normal mb-6">
            Simple <span className="italic text-[#c084fc]">Pricing</span>
          </h2>
          <p className="text-white/40 text-lg font-light">Start for free, upgrade when you need to.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            { name: "Free", price: "$0", desc: "Perfect to get started.", feats: ["1 Portfolio", "Basic Templates", "Folioo Subdomain"] },
            { name: "Pro", price: "$9", desc: "For serious professionals.", feats: ["Unlimited Portfolios", "Premium Templates", "Custom Domains", "Analytics"], highlight: true }
          ].map((plan, i) => (
            <SpotlightCard key={plan.name} className={`p-10 rounded-3xl ${plan.highlight ? 'bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-[#c084fc]/30 shadow-2xl shadow-[#c084fc]/5' : 'bg-[#0c0c0c] border border-white/5'} ${vis ? 'anim-in' : 'opacity-0'}`} style={{ animationDelay: `${i * 100}ms` }}>
              <h3 className="text-2xl font-normal mb-2">{plan.name}</h3>
              <p className="text-white/40 mb-8">{plan.desc}</p>
              <div className="text-5xl font-light mb-10">{plan.price}<span className="text-lg text-white/20">/mo</span></div>
              
              <ul className="space-y-4 mb-10">
                {plan.feats.map(f => (
                  <li key={f} className="flex items-center gap-3 text-white/60 font-light">
                    <Check size={18} className="text-[#c084fc]" /> {f}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => onNavigate("login")}
                className={`w-full py-4 rounded-full font-medium transition-colors ${plan.highlight ? 'bg-[#c084fc] text-[#0a0a0a] hover:bg-[#d8b4fe]' : 'bg-white/5 hover:bg-white/10 relative z-20'}`}
              >
                Get Started
              </button>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ FOOTER ═══════════════════ */
function Footer() {
  return (
    <footer className="bg-[#0a0a0a] py-16 px-6 lg:px-10 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <img src="/folioo_logo.png" alt="Folioo" width="90" height="90" className="object-contain opacity-80" />
        </div>
        <div className="flex gap-8 text-sm text-white/40 font-light">
          <a href="#" className="hover:text-white transition-colors relative z-20">Twitter</a>
          <a href="#" className="hover:text-white transition-colors relative z-20">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors relative z-20">Dribbble</a>
        </div>
      </div>
    </footer>
  );
}
