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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
  { label: 'কোয়ান্টাম কসমো স্কুল', href: 'https://cosmoschool.quantummethod.org.bd/bn' },
];

const INTRO_TEXT = [
  `১৯৯৯ সালে বান্দরবানের লামা উপজেলার সরই ইউনিয়নে কোয়ান্টামের মেডিটেশন কেন্দ্র 'কোয়ান্টামমের' গোড়াপত্তন হয়। সভ্যতার প্রায় কোনো ছোঁয়াই লাগে নি এমন একটি জনপদে কাজ করতে গিয়ে দেখা গেল— যুগ যুগের লালিত ভ্রান্ত বিশ্বাস, কুসংস্কার আর গোঁড়ামিই হলো সেখানকার মানুষের মূল সমস্যা। আর একমাত্র শিক্ষাই পারে তা দূর করতে।`,
  `একটা পরিসংখ্যানে দেখা গেছে, প্রতি এক বছর একটি শিশুর স্কুলে পড়া মানে তার উপার্জন ক্ষমতা ১০-২০% বৃদ্ধি পাওয়া। তার মানে দারিদ্র্য থেকে, শোষণ থেকে, অবিদ্যা আর ভ্রান্ত সংস্কার থেকে সে তখনই মুক্তি পাবে, যখন সে শিক্ষিত হবে।`,
  `শত শত বছর ধরে অনেক আদিবাসীদের একটি সংস্কার ছিল মৃত্যুর পর মৃতের দেহসমেত তার ঘরটি পুড়িয়ে দেয়া। হয়তো একজন বাবা মারা গেছে। তার ছেলের তখন প্রথম কর্তব্যই হয়— বাবা যে ঘরখানা করে গেছে সমস্ত মাল-সামানসহ সেই ঘরটি পুড়িয়ে দেয়া। অর্থাৎ বাবা তো গেলেনই। সেইসাথে বছরের পর বছরের তিল তিল শ্রমে বাবার যৎকিঞ্চিত সঞ্চয় তা-ও গেলো।`,
  `আবার ম্যালেরিয়া হলে এরা কখনো ডাক্তারের কাছে নিয়ে যায়। কারণ তাদের ধারণা— ম্যালেরিয়া হয় অশুভ আত্মার প্রভাবে যা সারাতে পারবে ওঝা কিংবা বদ্যি; ডাক্তার নয়। ফলে ম্যালেরিয়ায় আক্রান্ত হয়ে মৃত্যু পাবর্ত্য এলাকায় খুব সাধারণ ঘটনা।`,
  `কোয়ান্টাম বিশ্বাস করল— এই মানুষদেরকে যদি উপযুক্ত শিক্ষা দেয়া যায়, নৈতিক ও মানবিক গুণে গুণাণ্বিত করা যায় তাহলে সমস্ত অবিদ্যা-কুসংস্কার ঝেড়ে ফেলে এরা শুধু নিজে আলোকিত হবে তা নয়, স্ব স্ব জনগোষ্ঠীকেও করে তুলবে আলোকিত, সমৃদ্ধ, স্বনির্ভর। কোয়ান্টাম বিশ্বাস করে জাতি-ধর্ম-বিত্ব নির্বিশেষে প্রতিটি মানুষেরই রয়েছে মেধা বিকাশের অধিকার।`,
];

const STATS = [
  { value: '১৯৯৯', label: 'প্রতিষ্ঠাকাল' },
  { value: '২৫+', label: 'বছরের পথচলা' },
  { value: '৪,৫০০+', label: 'শিশুর আবাসন' },
  { value: '২', label: 'ক্যাম্পাস' },
];

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
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 5.42 4 7.5c0 2.04 1.42 3.86 3.55 3.86l5.45 5.99L12 21.35z" />
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12zm0-1.44v-6.965h-3.964l-.632-3.66h3.332v-2.353c0-1.821.814-2.475 2.475-2.475h2.39l-.631-3.66h-3.028c-.329 0-1.598.235-1.598 1.598v8.383H11.966v3.66h3.403v3.66h-3.403v8.383H22.17v-8.384h-3.403z"/>
    </svg>
  );
}

function IconYouTube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.157C21.082 2.587 18.762.587 18.762.587c-2.354 0-3.614.736-4.614 1.836a3.016 3.016 0 0 0-2.122-2.157C11.082 2.587 8.762.587 8.762.587c-2.354 0-3.614.736-4.614 1.836a3.016 3.016 0 0 0-2.122-2.157C1.082 2.587-2.238 4.014-2.238 6.186c0 4.363 2.787 8.017 6.238 8.017s6.238-3.654 6.238-8.017c0-2.172-1.156-4.599-2.238-6.186zm4.614 8.017l1.836-5.817H8.018v3.425h3.614v-3.425h1.836v5.817z"/>
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

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
            entry.target.classList.add('reveal');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px 0px' }
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
      className={`fixed top-0 left-0 right-0 z-50 navbar-glass transition-all duration-400 ${
        scrolled ? 'scrolled' : ''
      } ${visible ? 'translate-y-0' : '-translate-y-full'}`}
      style={{ transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease' }}
      role="banner"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="প্রধান নেভিগেশন">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logos */}
          <div className="flex items-center gap-3">
            <a href="https://www.quantummethod.org.bd/" target="_blank" rel="noopener noreferrer" aria-label="কোয়ান্টাম মেথড">
              <img
                src="https://files.quantummethod.org.bd/resize/30/-/media/image/static_content/homepage_menu_logo_20240624.png"
                alt="Quantum Method Logo"
                className="h-8 w-auto object-contain"
                loading="eager"
                width="30"
                height="30"
              />
            </a>
            <div className="h-6 w-px bg-gray-200" aria-hidden="true" />
            <a href="/" aria-label="কোয়ান্টাম কসমো স্কুল">
              <img
                src="https://files.quantummethod.org.bd/resize/30/-/media/image/static_content/cosmoschool_nav_menu_20250416.png"
                alt="Cosmo School Logo"
                className="h-8 w-auto object-contain"
                loading="eager"
                width="30"
                height="30"
              />
            </a>
            <span className="hidden sm:block text-sm font-semibold text-emerald-800 ml-1">
              কোয়ান্টাম কসমো স্কুল ও কলেজ
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                role="listitem"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Donate + Mobile Menu */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <a
              href="#donate"
              className="donate-btn hidden sm:flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-bold text-white shadow-md"
              aria-label="ডোনেট করুন"
            >
              <IconHeart className="w-4 h-4" />
              <span>ডোনেট</span>
            </a>
            <button
              className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label="মেনু টগল"
            >
              <div className="w-5 h-5 flex flex-col justify-center gap-1.5">
                <span className={`block h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden mobile-menu border-t border-gray-100 dark:border-gray-800 py-3 animate-slideDown">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-all"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-2 pb-1 flex items-center justify-between">
              <a
                href="#donate"
                className="donate-btn flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold text-white"
                onClick={() => setMenuOpen(false)}
              >
                <IconHeart className="w-4 h-4" /> ডোনেট
              </a>
              <ThemeToggle />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

// Scroll Progress Bar
function ProgressBar({ progress }: { progress: number }) {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-300"
      style={{ transform: `translateX(-${100 - progress}%)` }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
}

// Hero Section
function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" role="banner">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://cosmoschool.quantummethod.org.bd/assets/images/quantum-cosmo-school.jpg"
          alt="কোয়ান্টাম কসমো স্কুল ও কলেজ - বান্দরবান"
          className="w-full h-full object-cover animate-heroZoom"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight hero-text-shadow animate-fadeInUp delay-200">
          কোয়ান্টাম{' '}
          <span className="text-gradient-gold" style={{ WebkitTextFillColor: 'initial' }}>
            <span style={{
              background: 'linear-gradient(135deg, #f9e08a 0%, #e8c96a 50%, #c9a84c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              কোয়ান্টাম কসমো স্কুল ও কলেজ
            </span>
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 font-light mb-6 hero-text-shadow animate-fadeInUp delay-300">
          একটু একটু করে পথ চলা...
        </p>

        <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed animate-fadeInUp delay-400">
          ১৯৯৯ সাল থেকে পার্বত্য বাংলাদেশের আদিবাসী ও বঞ্চিত শিশুদের শিক্ষা ও মানবিক বিকাশের ইতিহাস
        </p>
      </div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-emerald-100" aria-labelledby="stats-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-500" />
            <span className="text-emerald-700 text-sm font-semibold uppercase tracking-widest">পরিসংখ্যান</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            আমাদের পরিসংখ্যান
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            ২৫+ বছরের যাত্রায় শিক্ষার আলো জ্বালানোর মাইলফলক
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 reveal">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 text-center shadow-lg ring-1 ring-emerald-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-center mb-3">
                {stat.label.includes('প্রতিষ্ঠাকাল') && <IconCalendar className="w-8 h-8 text-emerald-600" />}
                {stat.label.includes('পথচলা') && <IconSchool className="w-8 h-8 text-emerald-600" />}
                {stat.label.includes('আবাসন') && <IconUsers className="w-8 h-8 text-emerald-600" />}
                {stat.label.includes('ক্যাম্পাস') && <IconSchool className="w-8 h-8 text-emerald-600" />}
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-emerald-700 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Back to Top Button
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-40 p-3 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-all duration-300 animate-float"
      aria-label="উপরে যান"
    >
      <IconChevronUp className="w-5 h-5" />
    </button>
  );
}

// ─────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────
export default function App() {
  const progress = useScrollProgress();
  useScrollReveal();

  return (
    <>
      {/* SEO: Skip to main content for accessibility */}
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:p-4 focus:bg-white focus:text-emerald-800">
        মূল বিষয়বস্তুতে যান
      </a>

      <ProgressBar progress={progress} />
      <Navbar />

      <main id="main">
        <Hero />
        <StatsSection />

        <div className="section-divider mx-8" aria-hidden="true" />
      </main>

      <BackToTop />
    </>
  );
}
