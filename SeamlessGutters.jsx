import { useState, useEffect, useRef } from 'react';
import {
  Phone, MessageSquare, Menu, X, Star, ArrowRight, ArrowUpRight,
  Check, ChevronRight, ChevronLeft, MapPin, Mail, Shield,
  Award, Users, Hammer, Droplets, Wrench, Home, Calendar,
  Sparkles, Wind, TreePine, CloudRain, Calculator, Play
} from 'lucide-react';

export default function SeamlessGuttersHomepage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [estimateOpen, setEstimateOpen] = useState(false);
  const [estimateStep, setEstimateStep] = useState(0);
  const [estimateData, setEstimateData] = useState({
    service: null,
    size: null,
    stories: null,
    complexity: null,
  });

  // Inject Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700;9..144,900&family=Manrope:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Animated counters
  const Counter = ({ to, suffix = '', duration = 2000 }) => {
    const [val, setVal] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);
    useEffect(() => {
      const obs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.floor(eased * to));
            if (p < 1) requestAnimationFrame(tick);
            else setVal(to);
          };
          requestAnimationFrame(tick);
        }
      }, { threshold: 0.4 });
      if (ref.current) obs.observe(ref.current);
      return () => obs.disconnect();
    }, [to, duration]);
    return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
  };

  const services = [
    {
      icon: Hammer,
      title: 'Seamless Gutter Installation',
      desc: 'Continuous aluminum gutters formed on-site to your exact run lengths. Zero seams, zero leaks.',
      photo: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=900&q=80',
    },
    {
      icon: Wrench,
      title: 'Gutter Replacement',
      desc: 'Old gutters failing? We pull, dispose, and replace in a single day with cleanup included.',
      photo: 'https://images.unsplash.com/photo-1632759145355-8b8f3ed9aafa?w=900&q=80',
    },
    {
      icon: Shield,
      title: 'Gutter Guards',
      desc: 'Stop fir needles, leaves, and PNW moss before they cost you a roof. Lifetime guard options.',
      photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    },
    {
      icon: Home,
      title: 'Soffit & Fascia Repair',
      desc: 'Rotted wood behind your gutters? We rebuild it with primed cedar or composite, then re-hang clean.',
      photo: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80',
    },
  ];

  const cities = [
    'Bellevue', 'Kirkland', 'Redmond', 'Bothell', 'Mill Creek',
    'Mukilteo', 'Edmonds', 'Lynnwood', 'Mercer Island', 'Sammamish',
    'Everett', 'Marysville', 'Lake Stevens', 'Snohomish', 'Monroe',
    'Issaquah', 'Woodinville', 'Shoreline', 'Tacoma', 'Puyallup',
    'Olympia', 'Bremerton',
  ];

  const galleryItems = [
    { city: 'Edmonds, WA', service: 'installation', label: 'Craftsman 6" K-style', img: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=900&q=80' },
    { city: 'Bellevue, WA', service: 'replacement', label: 'Modern split-level replace', img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80' },
    { city: 'Mill Creek, WA', service: 'guards', label: 'Cedar tree canopy guards', img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=900&q=80' },
    { city: 'Snohomish, WA', service: 'soffit', label: 'Farmhouse fascia rebuild', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80' },
    { city: 'Kirkland, WA', service: 'installation', label: '6" runs, copper downspouts', img: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=900&q=80' },
    { city: 'Lynnwood, WA', service: 'replacement', label: 'Two-story full replace', img: 'https://images.unsplash.com/photo-1592595896616-c37162298647?w=900&q=80' },
  ];

  const filteredGallery = galleryFilter === 'all'
    ? galleryItems
    : galleryItems.filter((g) => g.service === galleryFilter);

  const reviews = [
    { name: 'Karen M.', city: 'Edmonds', text: 'Three quotes, they were the lowest by $1,800 and finished the job in one day. Crew was respectful, cleaned up perfectly. Already recommended to two neighbors.', rating: 5 },
    { name: 'Marcus D.', city: 'Bellevue', text: 'After two storms damaged our old gutters, these guys came out same week, replaced everything with 6-inch, and added guards. The price was honest and the workmanship is clearly miles above what was on the house before.', rating: 5 },
    { name: 'Linda T.', city: 'Mill Creek', text: 'Senior discount, on-time arrival, and they explained everything. Felt like dealing with a family business in the best way possible.', rating: 5 },
  ];

  const estimateRange = () => {
    if (!estimateData.service || !estimateData.size || !estimateData.stories || !estimateData.complexity) return null;
    const baseRanges = {
      install: [1800, 3200],
      replace: [2200, 3800],
      guards: [1200, 2400],
      combo: [3000, 5500],
    };
    const sizeMult = { small: 0.85, medium: 1, large: 1.4 };
    const storiesMult = { one: 1, two: 1.25 };
    const complexMult = { simple: 1, some: 1.15, complex: 1.35 };
    const [lo, hi] = baseRanges[estimateData.service];
    const m = sizeMult[estimateData.size] * storiesMult[estimateData.stories] * complexMult[estimateData.complexity];
    return [Math.round((lo * m) / 50) * 50, Math.round((hi * m) / 50) * 50];
  };

  const resetEstimate = () => {
    setEstimateData({ service: null, size: null, stories: null, complexity: null });
    setEstimateStep(0);
  };

  const PHONE = '(253) 498-5575';
  const PHONE_RAW = '12534985575';

  return (
    <div className="font-['Manrope'] bg-[#F5F1EA] text-[#1B1E22] min-h-screen overflow-x-hidden">
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0%,100% { opacity: 0.2; } 50% { opacity: 0.6; } }
        .marquee-track { animation: marquee 60s linear infinite; }
        .fade-up { animation: fadeUp 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
        .grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E");
        }
        .copper-stroke { -webkit-text-stroke: 1px #B96A3B; color: transparent; }
        details > summary { list-style: none; cursor: pointer; }
        details > summary::-webkit-details-marker { display: none; }
      `}</style>

      {/* HEADER */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#1F3D2E]/95 backdrop-blur-xl border-b border-[#B96A3B]/20' : 'bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
          <a href="#top" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-sm bg-[#B96A3B] flex items-center justify-center font-['Fraunces'] text-white text-xl font-semibold tracking-tight">S</div>
            <div className="leading-none">
              <div className="font-['Fraunces'] text-white text-lg font-semibold tracking-tight">Seamless Gutters</div>
              <div className="text-[10px] tracking-[0.2em] text-[#B96A3B] uppercase font-medium">4 Less · Pacific NW</div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-8 text-sm text-white/85">
            {['Services', 'Service Areas', 'Gallery', 'Reviews', 'About', 'Blog'].map((n) => (
              <a key={n} href={`#${n.toLowerCase().replace(' ', '-')}`} className="hover:text-[#B96A3B] transition-colors relative group">
                {n}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#B96A3B] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={`tel:${PHONE_RAW}`} className="hidden md:flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium">
              <Phone className="w-4 h-4" />{PHONE}
            </a>
            <button onClick={() => setEstimateOpen(true)} className="hidden md:inline-flex items-center gap-2 bg-[#B96A3B] hover:bg-[#a25c30] text-white px-5 py-2.5 text-sm font-semibold transition-all hover:translate-y-[-1px] shadow-lg shadow-[#B96A3B]/20">
              Free Estimate <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => setMobileNav(!mobileNav)} className="lg:hidden text-white p-2" aria-label="Menu">
              {mobileNav ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileNav && (
          <div className="lg:hidden bg-[#1F3D2E] border-t border-white/10 px-6 py-6 space-y-4">
            {['Services', 'Service Areas', 'Gallery', 'Reviews', 'About', 'Blog'].map((n) => (
              <a key={n} href={`#${n.toLowerCase().replace(' ', '-')}`} className="block text-white/85 text-base" onClick={() => setMobileNav(false)}>{n}</a>
            ))}
            <a href={`tel:${PHONE_RAW}`} className="flex items-center gap-2 text-[#B96A3B] font-semibold pt-3 border-t border-white/10">
              <Phone className="w-4 h-4" /> {PHONE}
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-[100svh] flex items-end pt-20">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=2400&q=85" alt="Pacific Northwest home with seamless gutters" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1F3D2E]/90 via-[#1F3D2E]/55 to-[#1F3D2E]/95" />
          <div className="absolute inset-0 grain opacity-20 mix-blend-overlay" />
        </div>
        <div className="relative max-w-[1400px] w-full mx-auto px-6 lg:px-10 pb-16 lg:pb-24">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8 fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="h-px w-12 bg-[#B96A3B]" />
              <span className="text-[#B96A3B] text-xs tracking-[0.3em] uppercase font-semibold">Pacific Northwest · Family Owned · 30+ Years</span>
            </div>
            <h1 className="font-['Fraunces'] text-white font-light leading-[0.95] tracking-tight fade-up" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', animationDelay: '0.25s', fontVariationSettings: '"opsz" 144' }}>
              Seamless gutters,<br />built for <span className="italic font-normal text-[#B96A3B]">Seattle rain.</span>
            </h1>
            <p className="text-white/85 text-lg lg:text-xl mt-8 max-w-xl leading-relaxed fade-up" style={{ animationDelay: '0.45s' }}>
              Same-week estimates from Marysville to Olympia. Locally owned, fairly priced, installed in a day. Backed by a 5-star reputation across six counties.
            </p>
            <div className="flex flex-wrap gap-4 mt-10 fade-up" style={{ animationDelay: '0.6s' }}>
              <button onClick={() => setEstimateOpen(true)} className="group inline-flex items-center gap-3 bg-[#B96A3B] hover:bg-[#a25c30] text-white px-8 py-4 font-semibold transition-all hover:translate-y-[-2px] shadow-2xl shadow-black/20">
                Get a Free Estimate <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href={`tel:${PHONE_RAW}`} className="inline-flex items-center gap-3 border border-white/40 hover:border-white text-white px-8 py-4 font-semibold transition-all hover:bg-white/5">
                <Phone className="w-5 h-5" />{PHONE}
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 mt-14 pt-8 border-t border-white/15 fade-up" style={{ animationDelay: '0.8s' }}>
              {[
                { icon: Star, label: '5.0 ★ Google Rating' },
                { icon: Shield, label: 'Licensed & Insured WA' },
                { icon: Award, label: 'Family Owned Since 1994' },
                { icon: Users, label: 'Senior + Veteran Discount' },
              ].map(({ icon: Ic, label }, i) => (
                <div key={i} className="flex items-center gap-2.5 text-white/80 text-sm">
                  <Ic className="w-4 h-4 text-[#B96A3B] flex-shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 hidden lg:flex items-center gap-3 text-white/70 text-xs">
          <div className="w-1.5 h-1.5 rounded-full bg-[#B96A3B] animate-pulse" />
          Now booking estimates in <span className="text-white">Edmonds, Bothell, Bellevue</span>
        </div>
      </section>

      {/* CITY MARQUEE */}
      <section className="bg-[#15291F] py-6 border-y border-[#B96A3B]/20 overflow-hidden">
        <div className="flex items-center gap-3 px-6 lg:px-10 mb-2 max-w-[1400px] mx-auto">
          <MapPin className="w-3.5 h-3.5 text-[#B96A3B]" />
          <span className="text-[#B96A3B] text-[10px] tracking-[0.3em] uppercase font-semibold">Serving</span>
        </div>
        <div className="flex marquee-track whitespace-nowrap">
          {[...cities, ...cities].map((c, i) => (
            <span key={i} className="font-['Fraunces'] text-white/40 hover:text-[#B96A3B] text-3xl md:text-4xl font-light italic px-8 transition-colors">
              {c} <span className="text-[#B96A3B] not-italic mx-1">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 lg:py-32 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-16">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 text-[#B96A3B] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
              <span className="h-px w-8 bg-[#B96A3B]" /> What We Do
            </span>
            <h2 className="font-['Fraunces'] text-5xl md:text-6xl font-light leading-[1.05] text-[#1F3D2E]">
              Built for the<br /><span className="italic">rain belt.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <p className="text-[#1B1E22]/75 text-lg leading-relaxed">
              Every job is custom-formed continuous aluminum, sized to actually move the volume of water the Pacific Northwest throws at your roof. We don't sell sectional kits. We don't subcontract. We show up, build it on your driveway, and install it in a day.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {services.map((s, i) => {
            const Ic = s.icon;
            return (
              <a key={i} href="#" className="group relative overflow-hidden bg-white border border-[#1F3D2E]/10 hover:border-[#B96A3B]/40 transition-all duration-500">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#1F3D2E]">
                  <img src={s.photo} alt={s.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F3D2E]/80 via-transparent to-transparent" />
                  <div className="absolute top-5 left-5 w-12 h-12 rounded-sm bg-[#B96A3B] flex items-center justify-center text-white">
                    <Ic className="w-5 h-5" />
                  </div>
                  <div className="absolute top-5 right-5 text-white/70 text-xs tracking-[0.2em] uppercase font-semibold">0{i + 1} / 04</div>
                </div>
                <div className="p-7">
                  <h3 className="font-['Fraunces'] text-2xl text-[#1F3D2E] mb-3 leading-tight">{s.title}</h3>
                  <p className="text-[#1B1E22]/70 leading-relaxed mb-5 text-[15px]">{s.desc}</p>
                  <span className="inline-flex items-center gap-2 text-[#B96A3B] font-semibold text-sm group-hover:gap-3 transition-all">
                    Learn more <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[#1F3D2E] text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 grain opacity-10" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 text-[#B96A3B] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
                <span className="h-px w-8 bg-[#B96A3B]" /> The Process
              </span>
              <h2 className="font-['Fraunces'] text-5xl md:text-6xl font-light leading-[1.05]">
                From estimate to<br />installed in <span className="italic text-[#B96A3B]">one week.</span>
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex items-end">
              <p className="text-white/70 leading-relaxed">No sales tactics. No "today only" pricing pressure. Just an honest written estimate that's good for a full year.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
            {[
              { step: '01', title: 'Free written estimate', body: 'Submit online or call. Our estimator visits within 5 days, walks the property, and gives you a flat written quote — valid for 12 months.', icon: Calendar },
              { step: '02', title: 'Built on your driveway', body: 'The morning of install, our truck-mounted gutter machine extrudes continuous runs to your exact lengths. No seams between corners.', icon: Hammer },
              { step: '03', title: 'Installed in a day', body: 'Most homes finish in 4–6 hours. Old gutters hauled away, downspouts tied to existing drains, every leaf and screw cleaned up.', icon: Check },
            ].map((p, i) => (
              <div key={i} className="relative">
                <div className="font-['Fraunces'] text-7xl font-light copper-stroke leading-none mb-6">{p.step}</div>
                <div className="w-12 h-px bg-[#B96A3B] mb-5" />
                <h3 className="font-['Fraunces'] text-2xl mb-3">{p.title}</h3>
                <p className="text-white/70 leading-relaxed text-[15px]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STACK */}
      <section className="py-20 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12">
          {[
            { val: 30, suffix: '+', label: 'Years on the ladder' },
            { val: 5000, suffix: '+', label: 'Homes protected' },
            { val: 5, suffix: '.0 ★', label: 'Google rating' },
            { val: 6, suffix: '', label: 'Counties served' },
          ].map((s, i) => (
            <div key={i} className={`px-4 lg:px-8 ${i > 0 ? 'lg:border-l border-[#1F3D2E]/15' : ''}`}>
              <div className="font-['Fraunces'] text-6xl lg:text-7xl font-light text-[#1F3D2E] leading-none mb-3">
                <Counter to={s.val} suffix={s.suffix} />
              </div>
              <div className="text-[#1B1E22]/65 text-sm tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY PNW */}
      <section className="bg-[#F5F1EA] py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/5] relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1542317854-2fbc18cc4d63?w=1400&q=85" alt="Pacific Northwest forest in rain" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F3D2E]/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-[#B96A3B] text-white p-8 max-w-xs hidden md:block">
              <CloudRain className="w-8 h-8 mb-4" />
              <div className="font-['Fraunces'] text-3xl font-light mb-2 leading-tight">35–60"</div>
              <div className="text-sm text-white/90 leading-relaxed">annual rainfall across our service area — among the wettest in the lower 48.</div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <span className="inline-flex items-center gap-2 text-[#B96A3B] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
              <span className="h-px w-8 bg-[#B96A3B]" /> Why It Matters
            </span>
            <h2 className="font-['Fraunces'] text-4xl md:text-5xl font-light leading-[1.1] text-[#1F3D2E] mb-6">
              PNW rain doesn't behave like rain anywhere else.
            </h2>
            <p className="text-[#1B1E22]/75 leading-relaxed mb-8 text-[17px]">
              Between October and April, our region absorbs sustained, days-long downpours under massive Doug fir and cedar canopies. The result: clog rates and gutter volumes most national contractors aren't sized for.
            </p>
            <div className="space-y-5">
              {[
                { icon: TreePine, title: 'Fir needles & moss', body: 'Clog faster and rot faster than any debris in dry climates.' },
                { icon: Droplets, title: 'Sustained downpour volume', body: 'Most PNW homes need 6" gutters to keep up — not the standard 5".' },
                { icon: Wind, title: 'Soft cedar fascia', body: 'Wet PNW air destroys backing wood. We replace it before re-hanging.' },
              ].map((p, i) => {
                const Ic = p.icon;
                return (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-sm bg-[#1F3D2E] text-[#B96A3B] flex items-center justify-center flex-shrink-0">
                      <Ic className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-['Fraunces'] text-lg text-[#1F3D2E] mb-1">{p.title}</div>
                      <p className="text-[#1B1E22]/70 text-[15px] leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 lg:py-32 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 text-[#B96A3B] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
              <span className="h-px w-8 bg-[#B96A3B]" /> Recent Work
            </span>
            <h2 className="font-['Fraunces'] text-5xl md:text-6xl font-light leading-[1.05] text-[#1F3D2E]">From the field.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'installation', label: 'Installation' },
              { id: 'replacement', label: 'Replacement' },
              { id: 'guards', label: 'Guards' },
              { id: 'soffit', label: 'Soffit/Fascia' },
            ].map((f) => (
              <button key={f.id} onClick={() => setGalleryFilter(f.id)} className={`px-4 py-2 text-sm font-medium border transition-all ${galleryFilter === f.id ? 'bg-[#1F3D2E] text-white border-[#1F3D2E]' : 'bg-transparent text-[#1F3D2E] border-[#1F3D2E]/25 hover:border-[#1F3D2E]'}`}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGallery.map((g, i) => (
            <a key={i} href="#" className="group relative overflow-hidden aspect-[4/5] bg-[#1F3D2E]">
              <img src={g.img} alt={`${g.label} in ${g.city}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F3D2E] via-[#1F3D2E]/30 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 text-white">
                <div className="text-[#B96A3B] text-[10px] tracking-[0.25em] uppercase font-semibold mb-2">{g.city}</div>
                <div className="font-['Fraunces'] text-lg lg:text-xl leading-tight">{g.label}</div>
              </div>
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/0 group-hover:bg-[#B96A3B] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#" className="inline-flex items-center gap-2 text-[#1F3D2E] hover:text-[#B96A3B] font-semibold transition-colors group">
            View full project archive <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* DISCOUNT BAND */}
      <section className="bg-[#1F3D2E] py-16 relative overflow-hidden">
        <div className="absolute inset-0 grain opacity-10" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-10 lg:gap-20">
          {[
            { tag: 'Senior Discount', body: '10% off for homeowners 65+. We grew up in this region — we take care of the people who built it.', icon: Users },
            { tag: 'Veteran & Active Duty', body: 'Thank you for your service. 10% off every job, every time. Just mention it on your estimate.', icon: Award },
          ].map((d, i) => {
            const Ic = d.icon;
            return (
              <div key={i} className="flex items-start gap-6 text-white">
                <div className="w-14 h-14 border border-[#B96A3B] text-[#B96A3B] flex items-center justify-center flex-shrink-0">
                  <Ic className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[#B96A3B] text-xs tracking-[0.3em] uppercase font-semibold mb-2">{d.tag}</div>
                  <p className="font-['Fraunces'] text-xl md:text-2xl font-light leading-snug">{d.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 lg:py-32 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 text-[#B96A3B] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
              <span className="h-px w-8 bg-[#B96A3B]" /> What Neighbors Say
            </span>
            <h2 className="font-['Fraunces'] text-5xl md:text-6xl font-light leading-[1.05] text-[#1F3D2E]">
              Five stars,<br /><span className="italic">earned slowly.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <div className="flex items-center gap-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (<Star key={i} className="w-6 h-6 fill-[#B96A3B] text-[#B96A3B]" />))}
              </div>
              <div className="text-[#1B1E22]/75">
                <span className="font-['Fraunces'] text-2xl text-[#1F3D2E]">5.0</span>
                <span className="ml-2 text-sm">on Google · 200+ reviews</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white border border-[#1F3D2E]/10 p-7 hover:border-[#B96A3B]/40 transition-colors">
              <div className="flex mb-5">
                {[...Array(r.rating)].map((_, j) => (<Star key={j} className="w-4 h-4 fill-[#B96A3B] text-[#B96A3B]" />))}
              </div>
              <p className="text-[#1B1E22]/85 leading-relaxed mb-6 text-[15px]">"{r.text}"</p>
              <div className="pt-5 border-t border-[#1F3D2E]/10">
                <div className="font-['Fraunces'] text-lg text-[#1F3D2E]">{r.name}</div>
                <div className="text-xs text-[#B96A3B] tracking-[0.2em] uppercase font-semibold mt-1">{r.city}, WA</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INSTANT ESTIMATOR */}
      <section className="bg-gradient-to-br from-[#1F3D2E] to-[#15291F] py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 grain opacity-10" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 text-white">
            <span className="inline-flex items-center gap-2 text-[#B96A3B] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
              <Calculator className="w-3.5 h-3.5" /> Instant Range Estimate
            </span>
            <h2 className="font-['Fraunces'] text-5xl md:text-6xl font-light leading-[1.05] mb-6">
              Roughly,<br /><span className="italic text-[#B96A3B]">how much?</span>
            </h2>
            <p className="text-white/75 leading-relaxed mb-8">
              Four quick questions. No email required. We'll show you a real ballpark range before you commit to a free in-person estimate.
            </p>
            <ul className="space-y-3 text-white/70 text-[15px]">
              {[
                'Based on 30 years of real PNW pricing data',
                'No spam, no follow-up unless you ask',
                'Final quote is always written, flat, and good for 12 months',
              ].map((b, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <Check className="w-4 h-4 text-[#B96A3B] flex-shrink-0 mt-1" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <EstimatorWidget step={estimateStep} setStep={setEstimateStep} data={estimateData} setData={setEstimateData} range={estimateRange()} reset={resetEstimate} openFull={() => setEstimateOpen(true)} />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 lg:py-32 bg-[#F5F1EA]">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 text-center">
          <span className="inline-flex items-center gap-2 text-[#B96A3B] text-xs tracking-[0.3em] uppercase font-semibold mb-6">
            <span className="h-px w-8 bg-[#B96A3B]" /> Get Started <span className="h-px w-8 bg-[#B96A3B]" />
          </span>
          <h2 className="font-['Fraunces'] text-5xl md:text-7xl font-light leading-[1.05] text-[#1F3D2E] mb-8">Ready when you are.</h2>
          <p className="text-[#1B1E22]/75 text-lg max-w-2xl mx-auto mb-10">
            Free written estimates, valid for 12 months. Most homeowners hear back within the same day, and we book installs within a week.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setEstimateOpen(true)} className="inline-flex items-center gap-3 bg-[#1F3D2E] hover:bg-[#15291F] text-white px-8 py-4 font-semibold transition-all hover:translate-y-[-2px] shadow-xl shadow-black/10">
              Request Free Estimate <ArrowRight className="w-5 h-5" />
            </button>
            <a href={`tel:${PHONE_RAW}`} className="inline-flex items-center gap-3 bg-[#B96A3B] hover:bg-[#a25c30] text-white px-8 py-4 font-semibold transition-all hover:translate-y-[-2px]">
              <Phone className="w-5 h-5" /> {PHONE}
            </a>
            <a href="sms:+12534985575" className="inline-flex items-center gap-3 border border-[#1F3D2E]/30 hover:border-[#1F3D2E] text-[#1F3D2E] px-8 py-4 font-semibold transition-all">
              <MessageSquare className="w-5 h-5" /> Text Us
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1B1E22] text-white pt-20 pb-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-sm bg-[#B96A3B] flex items-center justify-center font-['Fraunces'] text-white text-xl font-semibold">S</div>
                <div className="leading-none">
                  <div className="font-['Fraunces'] text-lg font-semibold">Seamless Gutters 4 Less</div>
                  <div className="text-[10px] tracking-[0.2em] text-[#B96A3B] uppercase font-medium mt-1">Pacific Northwest</div>
                </div>
              </div>
              <p className="text-white/60 leading-relaxed text-sm mb-6 max-w-sm">
                Locally owned. Family operated. Built for Pacific Northwest rain since 1994. Six counties. One number. Zero subcontractors.
              </p>
              <div className="space-y-3 text-sm">
                <a href={`tel:${PHONE_RAW}`} className="flex items-center gap-3 text-white/85 hover:text-[#B96A3B]">
                  <Phone className="w-4 h-4 text-[#B96A3B]" /> {PHONE}
                </a>
                <a href="mailto:info@seamlessgutters4less.com" className="flex items-center gap-3 text-white/85 hover:text-[#B96A3B]">
                  <Mail className="w-4 h-4 text-[#B96A3B]" /> info@seamlessgutters4less.com
                </a>
                <div className="flex items-center gap-3 text-white/85">
                  <MapPin className="w-4 h-4 text-[#B96A3B]" /> Tacoma, Washington
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="text-[10px] tracking-[0.25em] text-[#B96A3B] uppercase font-semibold mb-5">Services</div>
              <ul className="space-y-3 text-sm text-white/70">
                {['Gutter Installation', 'Gutter Replacement', 'Gutter Guards', 'Soffit & Fascia', 'Gutter Cleaning'].map((s) => (
                  <li key={s}><a href="#" className="hover:text-white">{s}</a></li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-3">
              <div className="text-[10px] tracking-[0.25em] text-[#B96A3B] uppercase font-semibold mb-5">Top Service Areas</div>
              <ul className="space-y-3 text-sm text-white/70 grid grid-cols-2 gap-x-4">
                {['Bellevue', 'Edmonds', 'Bothell', 'Kirkland', 'Lynnwood', 'Mill Creek', 'Mukilteo', 'Everett', 'Seattle', 'Tacoma'].map((s) => (
                  <li key={s}><a href="#" className="hover:text-white">{s}, WA</a></li>
                ))}
                <li className="col-span-2 pt-2"><a href="#" className="text-[#B96A3B] hover:text-white inline-flex items-center gap-1">See all areas <ChevronRight className="w-3 h-3" /></a></li>
              </ul>
            </div>
            <div className="lg:col-span-3">
              <div className="text-[10px] tracking-[0.25em] text-[#B96A3B] uppercase font-semibold mb-5">Company</div>
              <ul className="space-y-3 text-sm text-white/70">
                {['About', 'Reviews', 'Project Gallery', 'Financing', 'Blog', 'Contact', 'FAQ'].map((s) => (
                  <li key={s}><a href="#" className="hover:text-white">{s}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row justify-between gap-4 text-xs text-white/40">
            <div>© {new Date().getFullYear()} Seamless Gutters 4 Less, LLC · WA Lic #SEAMLG**XXXX · All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Terms of Use</a>
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Sitemap</a>
              <a href="#" className="hover:text-white">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY CTA */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#1F3D2E] border-t border-[#B96A3B]/30 grid grid-cols-3 text-white text-xs">
        <a href={`tel:${PHONE_RAW}`} className="flex flex-col items-center justify-center gap-1 py-3 border-r border-white/10">
          <Phone className="w-4 h-4 text-[#B96A3B]" /> Call
        </a>
        <a href="sms:+12534985575" className="flex flex-col items-center justify-center gap-1 py-3 border-r border-white/10">
          <MessageSquare className="w-4 h-4 text-[#B96A3B]" /> Text
        </a>
        <button onClick={() => setEstimateOpen(true)} className="flex flex-col items-center justify-center gap-1 py-3 bg-[#B96A3B]">
          <Calculator className="w-4 h-4" /> Estimate
        </button>
      </div>

      {/* ESTIMATE MODAL */}
      {estimateOpen && (
        <div className="fixed inset-0 z-[60] bg-[#1B1E22]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#F5F1EA] max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button onClick={() => setEstimateOpen(false)} className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#1F3D2E] text-white flex items-center justify-center z-10" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
            <div className="p-8 lg:p-12">
              <div className="text-[#B96A3B] text-xs tracking-[0.3em] uppercase font-semibold mb-3">Free Estimate Request</div>
              <h3 className="font-['Fraunces'] text-3xl lg:text-4xl font-light text-[#1F3D2E] mb-3">Tell us about your home.</h3>
              <p className="text-[#1B1E22]/70 mb-8 text-sm">Live Jobber form will embed here. For prototype: this modal demonstrates layout & flow.</p>
              <div className="space-y-4">
                {['Full Name', 'Phone Number', 'Property Address', 'Email'].map((l) => (
                  <div key={l}>
                    <label className="block text-xs tracking-[0.15em] uppercase font-semibold text-[#1F3D2E] mb-2">{l}</label>
                    <input className="w-full bg-white border border-[#1F3D2E]/15 px-4 py-3 text-[#1B1E22] focus:border-[#B96A3B] focus:outline-none transition-colors" placeholder={`Enter ${l.toLowerCase()}`} />
                  </div>
                ))}
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase font-semibold text-[#1F3D2E] mb-2">What do you need?</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Installation', 'Replacement', 'Guards', 'Soffit/Fascia'].map((s) => (
                      <button key={s} className="bg-white border border-[#1F3D2E]/15 hover:border-[#B96A3B] px-4 py-3 text-sm text-left transition-colors">{s}</button>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-[#B96A3B] hover:bg-[#a25c30] text-white py-4 font-semibold transition-colors mt-2">Submit Request</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ====================================================================
   ESTIMATOR WIDGET
   ==================================================================== */

function EstimatorWidget({ step, setStep, data, setData, range, reset, openFull }) {
  const totalSteps = 4;
  const progress = ((step + (range ? 1 : 0)) / (totalSteps + 1)) * 100;

  const Choice = ({ active, onClick, children, sub }) => (
    <button onClick={onClick} className={`text-left p-5 border transition-all ${active ? 'bg-[#B96A3B] border-[#B96A3B] text-white' : 'bg-white/5 border-white/15 text-white hover:bg-white/10 hover:border-white/30'}`}>
      <div className="font-['Fraunces'] text-lg lg:text-xl mb-1">{children}</div>
      {sub && <div className={`text-xs ${active ? 'text-white/85' : 'text-white/55'}`}>{sub}</div>}
    </button>
  );

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-7 lg:p-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-px bg-white/15 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-[#B96A3B] transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="text-white/50 text-xs tracking-[0.2em] uppercase">{range ? 'Result' : `${step + 1} / ${totalSteps}`}</div>
      </div>

      {!range && step === 0 && (
        <div>
          <div className="text-[#B96A3B] text-xs tracking-[0.25em] uppercase font-semibold mb-3">Question 1 of 4</div>
          <h3 className="font-['Fraunces'] text-3xl text-white font-light mb-6">What service do you need?</h3>
          <div className="grid grid-cols-2 gap-3">
            <Choice active={data.service === 'install'} onClick={() => { setData({ ...data, service: 'install' }); setStep(1); }} sub="New seamless gutters">Installation</Choice>
            <Choice active={data.service === 'replace'} onClick={() => { setData({ ...data, service: 'replace' }); setStep(1); }} sub="Pull old, install new">Replacement</Choice>
            <Choice active={data.service === 'guards'} onClick={() => { setData({ ...data, service: 'guards' }); setStep(1); }} sub="Add to existing">Gutter Guards</Choice>
            <Choice active={data.service === 'combo'} onClick={() => { setData({ ...data, service: 'combo' }); setStep(1); }} sub="New gutters + guards">Combo Package</Choice>
          </div>
        </div>
      )}

      {!range && step === 1 && (
        <div>
          <div className="text-[#B96A3B] text-xs tracking-[0.25em] uppercase font-semibold mb-3">Question 2 of 4</div>
          <h3 className="font-['Fraunces'] text-3xl text-white font-light mb-6">How big is your home?</h3>
          <div className="grid gap-3">
            <Choice active={data.size === 'small'} onClick={() => { setData({ ...data, size: 'small' }); setStep(2); }} sub="Cottage, small bungalow, ~1,500 sqft">Small</Choice>
            <Choice active={data.size === 'medium'} onClick={() => { setData({ ...data, size: 'medium' }); setStep(2); }} sub="Average home, 1,500–3,000 sqft">Medium</Choice>
            <Choice active={data.size === 'large'} onClick={() => { setData({ ...data, size: 'large' }); setStep(2); }} sub="Large home or estate, 3,000+ sqft">Large</Choice>
          </div>
        </div>
      )}

      {!range && step === 2 && (
        <div>
          <div className="text-[#B96A3B] text-xs tracking-[0.25em] uppercase font-semibold mb-3">Question 3 of 4</div>
          <h3 className="font-['Fraunces'] text-3xl text-white font-light mb-6">Single or two-story?</h3>
          <div className="grid grid-cols-2 gap-3">
            <Choice active={data.stories === 'one'} onClick={() => { setData({ ...data, stories: 'one' }); setStep(3); }} sub="Single-story">One Story</Choice>
            <Choice active={data.stories === 'two'} onClick={() => { setData({ ...data, stories: 'two' }); setStep(3); }} sub="Two or more stories">Two+ Stories</Choice>
          </div>
        </div>
      )}

      {!range && step === 3 && (
        <div>
          <div className="text-[#B96A3B] text-xs tracking-[0.25em] uppercase font-semibold mb-3">Question 4 of 4</div>
          <h3 className="font-['Fraunces'] text-3xl text-white font-light mb-6">Roof complexity?</h3>
          <div className="grid gap-3">
            <Choice active={data.complexity === 'simple'} onClick={() => setData({ ...data, complexity: 'simple' })} sub="Basic gable or hip — no dormers">Simple</Choice>
            <Choice active={data.complexity === 'some'} onClick={() => setData({ ...data, complexity: 'some' })} sub="A few hips, valleys, or dormers">Some Complexity</Choice>
            <Choice active={data.complexity === 'complex'} onClick={() => setData({ ...data, complexity: 'complex' })} sub="Many angles, multiple rooflines, dormers">Complex</Choice>
          </div>
          <div className="flex justify-end mt-6">
            <button disabled={!data.complexity} onClick={() => setStep(4)} className="inline-flex items-center gap-2 bg-[#B96A3B] disabled:bg-white/10 disabled:text-white/40 hover:bg-[#a25c30] text-white px-6 py-3 font-semibold transition-colors">
              See estimate <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {range && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#B96A3B]" />
            <div className="text-[#B96A3B] text-xs tracking-[0.25em] uppercase font-semibold">Your estimated range</div>
          </div>
          <div className="font-['Fraunces'] text-5xl lg:text-6xl text-white font-light leading-none mb-6">
            ${range[0].toLocaleString()}<span className="text-white/50 text-3xl mx-2">—</span>${range[1].toLocaleString()}
          </div>
          <p className="text-white/70 leading-relaxed mb-6 text-[15px]">
            This is a real PNW pricing range for a home like yours. Your exact written quote will be free, on-site, and good for 12 months. Most homeowners land in the middle third of this range.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <button onClick={openFull} className="inline-flex items-center justify-center gap-2 bg-[#B96A3B] hover:bg-[#a25c30] text-white px-6 py-4 font-semibold transition-colors">
              Get Free Exact Estimate <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={reset} className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white/60 text-white px-6 py-4 font-semibold transition-colors">
              <ChevronLeft className="w-4 h-4" /> Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
