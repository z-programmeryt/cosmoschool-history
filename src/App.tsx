import { useState, useEffect, useRef } from 'react';

// ─────────────────────────────────────────────
// THEME MANAGEMENT
// ─────────────────────────────────────────────
type Theme = 'light' | 'dark' | 'system';

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme;
      return stored || 'system';
    }
    return 'system';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
}

// ─────────────────────────────────────────────
// THEME TOGGLE COMPONENT
// ─────────────────────────────────────────────
function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative">
      <button
        onClick={() => {
          const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
          setTheme(next);
        }}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'light' && (
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
        {theme === 'dark' && (
          <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
        {theme === 'system' && (
          <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'মেডিটেশন', href: 'https://meditation.quantummethod.org.bd/bn' },
  { label: 'ভিডিও', href: 'https://video.quantummethod.org.bd/bn' },
  { label: 'ডাউনলোড', href: 'https://publication.quantummethod.org.bd/bn' },
  { label: 'যোগাযোগ', href: 'https://quantummethod.org.bd/bn/contacts' },
  { label: 'আরো', href: 'https://cosmoschool.quantummethod.org.bd/bn' },
];

const INTRO_TEXT = [
  `১৯৯৯ সালে বান্দরবানের লামা উপজেলার সরই ইউনিয়নে কোয়ান্টামের মেডিটেশন কেন্দ্র 'কোয়ান্টামমের' গোড়াপত্তন হয়। সভ্যতার প্রায় কোনো ছোঁয়াই লাগে নি এমন একটি জনপদে কাজ করতে গিয়ে দেখা গেল— যুগ যুগের লালিত ভ্রান্ত বিশ্বাস, কুসংস্কার আর গোঁড়ামিই হলো সেখানকার মানুষের মূল সমস্যা। আর একমাত্র শিক্ষাই পারে তা দূর করতে।`,
  `একটা পরিসংখ্যানে দেখা গেছে, প্রতি এক বছর একটি শিশুর স্কুলে পড়া মানে তার উপার্জন ক্ষমতা ১০-২০% বৃদ্ধি পাওয়া। তার মানে দারিদ্র্য থেকে, শোষণ থেকে, অবিদ্যা আর ভ্রান্ত সংস্কার থেকে সে তখনই মুক্তি পাবে, যখন সে শিক্ষিত হবে।`,
  `শত শত বছর ধরে অনেক আদিবাসীদের একটি সংস্কার ছিল মৃত্যুর পর মৃতের দেহসমেত তার ঘরটি পুড়িয়ে দেয়া। হয়তো একজন বাবা মারা গেছে। তার ছেলের তখন প্রথম কর্তব্যই হয়— বাবা যে ঘরখানা করে গেছে সমস্ত মাল-সামানসহ সেই ঘরটি পুড়িয়ে দেয়া। অর্থাৎ বাবা তো গেলেনই। সেইসাথে বছরের পর বছরের তিল তিল শ্রমে বাবার যৎকিঞ্চিত সঞ্চয় তা-ও গেলো।`,
  `কোয়ান্টাম বিশ্বাস করল— এই মানুষদেরকে যদি উপযুক্ত শিক্ষা দেয়া যায়, নৈতিক ও মানবিক গুণে গুণাণ্বিত করা যায় তাহলে সমস্ত অবিদ্যা-কুসংস্কার ঝেড়ে ফেলে এরা শুধু নিজে আলোকিত হবে তা নয়, স্ব স্ব জনগোষ্ঠীকেও করে তুলবে আলোকিত, সমৃদ্ধ, স্বনির্ভর। কোয়ান্টাম বিশ্বাস করে জাতি-ধর্ম-বিত্ত নির্বিশেষে প্রতিটি মানুষেরই রয়েছে মেধা বিকাশের অধিকার।`,
];

const STATS = [
  { value: '২০০১', label: 'প্রতিষ্ঠাকাল' },
  { value: '২৫+', label: 'বছরের পথচলা' },
  { value: '৪,৫০০+', label: 'শিশুর আবাসন' },
  { value: '২২+', label: 'জাতিগোষ্ঠী' },
];

const TIMELINE_DATA = [
  {
    year: '২০০১',
    title: 'যাত্রার শুরু',
    description: 'বান্দরবানের লামার দুর্গম সরই অঞ্চলে মাত্র সাতজন শিশু নিয়ে বাঁশের কুঁড়েঘরে স্কুলটির যাত্রা শুরু হয়। বিদ্যুৎ বা আধুনিক কোনো সুবিধাই তখন ছিল না।',
    icon: 'start'
  },
  {
    year: '২০১২',
    title: 'কলেজ শাখা উদ্বোধন',
    description: 'প্রাথমিক ও মাধ্যমিক গণ্ডি পেরিয়ে শিক্ষার আলো আরও ছড়িয়ে দিতে কলেজ শাখা চালু করা হয়।',
    icon: 'college'
  },
  {
    year: '২০১৫-১৮',
    title: 'ক্রীড়ায় সেরা সাফল্য',
    description: 'টানা তিন বছর দেশের সেরা ক্রীড়া শিক্ষা প্রতিষ্ঠানের মর্যাদা লাভ। জাতীয় শিশু-কিশোর সমাবেশে প্যারেডে টানা শ্রেষ্ঠত্ব অর্জন।',
    icon: 'sports'
  },
  {
    year: '২০১৮',
    title: 'স্বতন্ত্র এইচএসসি পরীক্ষা',
    description: 'কোয়ান্টাম কসমো স্কুল ও কলেজের শিক্ষার্থীরা নিজস্ব প্রতিষ্ঠান থেকেই সরাসরি এইচএসসি পরীক্ষায় অংশগ্রহণ শুরু করে।',
    icon: 'exam'
  },
  {
    year: '২০২৩-২৪',
    title: 'রজত জয়ন্তী ও সাফল্য',
    description: '২৫ বছরের গৌরবময় পথচলা। ১০০% পাসের রেকর্ডসহ পার্বত্য অঞ্চলের অন্যতম সেরা শিক্ষা প্রতিষ্ঠানে রূপান্তর।',
    icon: 'success'
  }
];

// ─────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────
function IconSchool({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 5l9 5.5-9 5.5-9-5.5Z" />
      <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M5 12v6.5c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V12" />
      <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M9 19.5v-6h6v6" />
    </svg>
  );
}

function IconCalendar({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M8 2v3M16 2v3M3 9h18" />
      <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M5 5h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function IconUsers({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 0 0-4-4h-4" />
      <circle cx="17" cy="7" r="4" />
    </svg>
  );
}

function IconHeart({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 5.42 4 7.5 4c1.74 0 3.41.81 4.5 2.09C13.09 4.81 14.76 4 16.5 4 19.58 4 22 6.42 22 9.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function IconChevronUp({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────
function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      setVisible(currentScrollY < lastScrollY.current || currentScrollY < 50);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrolled, visible };
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

// Navbar
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrolled, visible } = useNavScroll();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      } ${visible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logos */}
          <div className="flex items-center gap-3">
            <a href="https://www.quantummethod.org.bd/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <img
                src="https://files.quantummethod.org.bd/resize/30/-/media/image/static_content/homepage_menu_logo_20240624.png"
                alt="Quantum Logo"
                className="h-8 w-auto"
              />
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 hidden sm:block" />
              <img
                src="https://files.quantummethod.org.bd/resize/30/-/media/image/static_content/cosmoschool_nav_menu_20250416.png"
                alt="Cosmo School Logo"
                className="h-8 w-auto"
              />
            </a>
            <span className="hidden lg:block text-sm font-bold text-emerald-800 dark:text-emerald-400">
              কোয়ান্টাম কসমো স্কুল ও কলেজ
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle />
            <a
              href="https://quantummethod.org.bd/bn/donation/general"
              className="donate-btn flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold text-white"
            >
              <IconHeart className="w-4 h-4" />
              <span>ডোনেট</span>
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              className="p-2 rounded-lg text-gray-700 dark:text-gray-200"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-xl"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://quantummethod.org.bd/bn/donation/general"
              className="mx-4 mt-2 donate-btn flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-bold text-white"
            >
              <IconHeart className="w-4 h-4" /> ডোনেট করুন
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

// Hero Section
function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://cosmoschool.quantummethod.org.bd/assets/images/quantum-cosmo-school.jpg"
          alt="Campus"
          className="w-full h-full object-cover scale-110 animate-heroZoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-900/90" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight animate-fadeInUp">
          কোয়ান্টাম <span className="text-gradient-gold">কসমো স্কুল ও কলেজ</span>
        </h1>
        <p className="text-xl sm:text-2xl text-white/90 font-medium mb-8 max-w-3xl mx-auto animate-fadeInUp delay-200">
          ১৯৯৯ সাল থেকে পার্বত্য বাংলাদেশের দুর্গম পাহাড়ের বুকে শিক্ষার আলো জ্বালানোর অনন্য এক মহাকাব্য।
        </p>
        <div className="flex flex-wrap justify-center gap-4 animate-fadeInUp delay-400">
          <a href="#intro" className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-lg shadow-xl transition-all hover:-translate-y-1">
            ইতিহাস দেখুন
          </a>
          <a href="https://cosmoschool.quantummethod.org.bd/bn" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-full font-bold text-lg backdrop-blur-sm transition-all">
            মূল ওয়েবসাইট
          </a>
        </div>
      </div>
    </section>
  );
}

// Intro Section
function IntroSection() {
  return (
    <section id="intro" className="py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              সূচনা ও প্রেক্ষাপট
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
              অশিক্ষা ও কুসংস্কার দূর করাই <br /> <span className="text-emerald-600">আমাদের মূল লক্ষ্য</span>
            </h2>
            <div className="space-y-6">
              {INTRO_TEXT.map((p, idx) => (
                <p key={idx} className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div className="relative reveal-right">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://cosmoschool.quantummethod.org.bd/assets/images/quantum-cosmo-school.jpg"
                alt="Students"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl max-w-xs hidden sm:block">
              <div className="text-5xl font-bold text-emerald-600 mb-2">২৫+</div>
              <div className="text-gray-500 dark:text-gray-400 font-medium">বছরের নিরবচ্ছিন্ন অগ্রযাত্রা ও সাফল্যের ইতিহাস।</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  return (
    <section className="py-24 bg-emerald-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => (
            <div key={idx} className="text-center reveal">
              <div className="text-4xl sm:text-5xl font-extrabold text-emerald-700 dark:text-emerald-500 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-semibold tracking-wide uppercase text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Timeline Section
function TimelineSection() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-20 reveal">
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">গৌরবময় পথচলা</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">সময়ের পরিক্রমায় কোয়ান্টাম কসমো স্কুলের রূপান্তরের গল্প</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-emerald-100 dark:bg-emerald-900/30 -translate-x-1/2 hidden md:block" />

          <div className="space-y-16">
            {TIMELINE_DATA.map((item, idx) => (
              <div key={idx} className={`relative flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Year Bubble */}
                <div className="md:absolute md:left-1/2 md:-translate-x-1/2 z-10 w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-xl ring-8 ring-white dark:ring-slate-900">
                  {item.year.slice(0, 4)}
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-1/2 p-8 rounded-3xl bg-gray-50 dark:bg-slate-800 shadow-xl reveal-${idx % 2 === 0 ? 'left' : 'right'}`}>
                  <h3 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <img
          src="https://files.quantummethod.org.bd/resize/30/-/media/image/static_content/cosmoschool_nav_menu_20250416.png"
          alt="Logo"
          className="h-16 w-auto mx-auto mb-8 invert"
        />
        <h2 className="text-3xl font-bold mb-4">কোয়ান্টাম কসমো স্কুল ও কলেজ</h2>
        <p className="text-slate-400 max-w-2xl mx-auto mb-12">
          ১৯৯৯ সাল থেকে পার্বত্য বাংলাদেশের দুর্গম পাহাড়ের বুকে শিক্ষার আলো জ্বালানোর অনন্য এক মহাকাব্য।
        </p>
        <div className="flex justify-center gap-6 mb-12">
          <a href="https://www.facebook.com/QuantumMethodBd" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-emerald-600 transition-all">
            FB
          </a>
          <a href="https://www.youtube.com/quantummethod" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-emerald-600 transition-all">
            YT
          </a>
        </div>
        <div className="border-t border-white/10 pt-8 text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} কোয়ান্টাম মেথড. সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
}

// Main App
export default function App() {
  const progress = useScrollProgress();
  useScrollReveal();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-['Hind_Siliguri'] transition-colors duration-500">
      <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-emerald-500 transition-all duration-300" style={{ width: `${progress}%` }} />
      <Navbar />
      <main>
        <Hero />
        <IntroSection />
        <StatsSection />
        <TimelineSection />
      </main>
      <Footer />
      
      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-50 p-4 bg-emerald-600 text-white rounded-full shadow-2xl hover:bg-emerald-700 transition-all hover:scale-110 active:scale-95"
      >
        <IconChevronUp className="w-6 h-6" />
      </button>
    </div>
  );
}
