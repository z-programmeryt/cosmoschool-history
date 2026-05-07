import { useState, useEffect, useRef } from 'react';
import { 
  IconCalendar,
  IconBrandFacebook,
  IconBrandYoutube,
  IconHeadset,
  IconHome,
  IconVideo,
  IconDownload,
  IconDots,
  IconX,
  IconChevronDown,
  IconChevronUp,
  IconHistory,
  IconAward,
  IconSchool,
  IconUsers,
  IconSun,
  IconMoon,
  IconHeart,
  IconClock,
  IconMapPin,
  IconMail,
  IconPhone
} from '@tabler/icons-react';

// --- Custom Cursor ---
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && outlineRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        outlineRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseDown = () => {
       if (cursorRef.current) cursorRef.current.classList.add('scale-75');
    };
    const onMouseUp = () => {
       if (cursorRef.current) cursorRef.current.classList.remove('scale-75');
    };

    const handleHover = () => {
      if (cursorRef.current) cursorRef.current.classList.add('cursor-hover');
    };
    const handleUnhover = () => {
      if (cursorRef.current) cursorRef.current.classList.remove('cursor-hover');
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const hoverables = document.querySelectorAll('a, button, .cursor-pointer');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleUnhover);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleUnhover);
      });
    };
  }, []);

  return (
    <div className="hidden lg:block">
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={outlineRef} className="custom-cursor-outline" />
    </div>
  );
}

// --- Hooks ---
function useMagnetic(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };

    const onMouseLeave = () => {
      el.style.transform = `translate(0px, 0px)`;
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [ref]);
}

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
        {theme === 'light' && <IconSun className="w-5 h-5 text-gray-700" />}
        {theme === 'dark' && <IconMoon className="w-5 h-5 text-gray-300" />}
        {theme === 'system' && <div className="w-5 h-5" />}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'মেডিটেশন', href: 'https://meditation.quantummethod.org.bd/bn', icon: IconHome },
  { label: 'ভিডিও', href: 'https://video.quantummethod.org.bd/bn', icon: IconVideo },
  { label: 'ডাউনলোড', href: 'https://publication.quantummethod.org.bd/bn', icon: IconDownload },
  { label: 'যোগাযোগ', href: 'https://quantummethod.org.bd/bn/contacts', icon: IconHeadset },
  { label: 'আরো', href: 'https://cosmoschool.quantummethod.org.bd/bn', icon: IconDots },
];

const FOOTER_COLUMNS = [
  {
    links: [
      { label: 'মেডিটেশন', href: 'https://meditation.quantummethod.org.bd/bn' },
      { label: 'ব্যায়াম', href: 'https://yoga.quantummethod.org.bd/bn' },
      { label: 'হৃদরোগ', href: 'https://heart.quantummethod.org.bd/bn' },
      { label: 'অনুভূতি', href: 'https://feelings.quantummethod.org.bd/bn' },
      { label: 'রক্তদান', href: 'https://blood.quantummethod.org.bd/bn' },
      { label: 'হিলিং', href: 'https://healing.quantummethod.org.bd/bn' },
      { label: 'সাফল্য', href: 'https://success.quantummethod.org.bd/bn' },
    ]
  },
  {
    links: [
      { label: 'পরিবার', href: 'https://family.quantummethod.org.bd/bn' },
      { label: 'শিক্ষার্থী', href: 'https://student.quantummethod.org.bd' },
      { label: 'রমজান', href: 'https://ramadan.quantummethod.org.bd/bn' },
      { label: 'যাকাত', href: 'https://zakat.quantummethod.org.bd/bn' },
      { label: 'দান', href: 'https://charity.quantummethod.org.bd/bn' },
      { label: 'কসমোস্কুল', href: 'https://cosmoschool.quantummethod.org.bd/bn' },
      { label: 'কোয়ান্টামম', href: 'https://quantumom.quantummethod.org.bd' },
    ]
  },
  {
    links: [
      { label: 'আল কোরআন', href: 'https://alquran.org.bd/' },
      { label: 'ইভেন্ট', href: 'https://event.quantummethod.org.bd' },
      { label: 'প্রকাশনা', href: 'https://publication.quantummethod.org.bd/bn' },
      { label: 'দোয়া', href: 'https://wish.quantummethod.org.bd' },
      { label: 'ভিডিও', href: 'https://video.quantummethod.org.bd/bn' },
      { label: 'আর্টিকেল', href: 'https://article.quantummethod.org.bd/bn' },
      { label: 'মিডিয়া', href: 'https://media.quantummethod.org.bd/bn' },
    ]
  },
  {
    links: [
      { label: 'অবিচুয়ারী', href: 'https://obituary.quantummethod.org.bd/bn' },
      { label: 'কোয়ান্টাপিডিয়া', href: 'https://quantapedia.quantummethod.org.bd/bn' },
      { label: 'প্রশ্নোত্তর', href: 'https://question.quantummethod.org.bd/bn' },
      { label: 'অনলাইন দান', href: 'https://donate.quantummethod.org.bd/bn' },
      { label: 'কোরাম', href: 'https://qorum.quantummethod.org.bd/' },
      { label: 'গল্প', href: 'https://story.quantummethod.org.bd/bn' },
      { label: 'স্পিচ', href: 'https://speech.quantummethod.org.bd/bn' },
    ]
  },
  {
    links: [
      { label: 'বই', href: 'https://book.quantummethod.org.bd/bn' },
      { label: 'শুদ্ধাচার', href: 'https://manner.quantummethod.org.bd/bn' },
      { label: 'নিউজলেটার', href: 'https://newsletter.quantummethod.org.bd/' },
      { label: 'হাদীস', href: 'https://hadith.quantummethod.org.bd/bn' },
      { label: 'অটোসাজেশন', href: 'https://autosuggestion.quantummethod.org.bd/bn' },
      { label: 'ভার্চুয়াল ভাইরাস', href: 'https://virtualvirus.quantummethod.org.bd/bn' },
    ]
  }
];

const INTRO_TEXT = [
  `১৯৯৯ সালে বান্দরবানের লামা উপজেলার সরই ইউনিয়নে কোয়ান্টামের মেডিটেশন কেন্দ্র 'কোয়ান্টামমের' গোড়াপত্তন হয়। সভ্যতার প্রায় কোনো ছোঁয়াই লাগে নি এমন একটি জনপদে কাজ করতে গিয়ে দেখা গেল— যুগ যুগের লালিত ভ্রান্ত বিশ্বাস, কুসংস্কার আর গোঁড়ামিই হলো সেখানকার মানুষের মূল সমস্যা। আর একমাত্র শিক্ষাই পারে তা দূর করতে।`,
  `একটা পরিসংখ্যানে দেখা গেছে, প্রতি এক বছর একটি শিশুর স্কুলে পড়া মানে তার উপার্জন ক্ষমতা ১০-২০% বৃদ্ধি পাওয়া। তার মানে দারিদ্র্য থেকে, শোষণ থেকে, অবিদ্যা আর ভ্রান্ত সংস্কার থেকে সে তখনই মুক্তি পাবে, যখন সে শিক্ষিত হবে।`,
  `শত শত বছর ধরে অনেক আদিবাসীদের একটি সংস্কার ছিল মৃত্যুর পর মৃতের দেহসমেত তার ঘরটি পুড়িয়ে দেয়া। হয়তো একজন বাবা মারা গেছে। তার ছেলের তখন প্রথম কর্তব্যই হয়— বাবা যে ঘরখানা করে গেছে সমস্ত মাল-সামানসহ সেই ঘরটি পুড়িয়ে দেয়া। অর্থাৎ বাবা তো গেলেনই। সেইসাথে বছরের পর বছরের তিল তিল শ্রমে বাবার যৎকিঞ্চিত সঞ্চয় তা-ও গেলো।`,
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
    year: 'জুলাই ১৯৯৮',
    title: 'কোয়ান্টামমের যাত্রা শুরু',
    description: 'এই ধ্যানঘরটি স্থাপনের মধ্য দিয়েই সূচিত হয় কোয়ান্টামমের যাত্রা। বান্দরবানের লামার সরই অঞ্চলে প্রকৃতির নিবিড় সান্নিধ্যে এই কেন্দ্রটি গড়ে ওঠে।',
    image: 'https://files.quantummethod.org.bd/resize/1000/-/media/image/static_content/old_dhan_ghar_20170426.jpg'
  },
  {
    year: 'নভেম্বর ২০০০',
    title: 'অনানুষ্ঠানিক শুরু',
    description: 'যে সাতটি শিশুকে নিয়ে অনানুষ্ঠানিকভাবে শুরু হয়েছিল শিশুকাননের যাত্রা, তাদের নিয়ে গড়ে ওঠে এক নতুন স্বপ্ন।',
    image: 'https://files.quantummethod.org.bd/resize/1000/-/media/image/static_content/1st__students_cosmo_school_20170426.jpg'
  },
  {
    year: 'এপ্রিল ২০০১',
    title: 'আনুষ্ঠানিকভাবে শিশুকানন স্কুলের উদ্বোধন',
    description: '২০০১ সালের ১৮ এপ্রিল আনুষ্ঠানিকভাবে শিশুকাননের উদ্বোধন করেন বান্দরবানের অতিরিক্ত জেলা প্রশাসক দিলীপ কুমার চৌধুরী। সরই ইউনিয়নে আগত তিনিই প্রথম জেলা পর্যায়ের উর্ধ্বতন কর্মকর্তা।',
    image: 'https://files.quantummethod.org.bd/resize/1000/-/media/image/static_content/sisu_kanon_inugration_20170426.jpg'
  },
  {
    year: '২০০২',
    title: 'প্রথমবারের মতো বিজয় দিবসের জাতীয় অনুষ্ঠানে',
    description: 'লামা উপজেলায় অনুষ্ঠিত বিজয়দিবসের প্যারেড ও ডিসপ্লেতে প্রথমবারের মতো অংশ নেয় কোয়ান্টাম শিশুকানন এবং প্যারেডে প্রথম ও ডিসপ্লেতে দ্বিতীয় স্থান অধিকার করে। এরপর আর পেছনে ফিরে তাকাতে হয়নি।',
    image: 'https://files.quantummethod.org.bd/resize/1000/-/media/image/static_content/1st_national_parade_bandarban_20170426.jpg'
  },
  {
    year: '২০০৪',
    title: 'জেনারেটর ও প্রাথমিক বৃত্তি',
    description: 'জেনারেটর স্থাপনের মাধ্যমে সন্ধ্যার পর আলোকিত করার ব্যবস্থা করা হয়। প্রথমবারের মতো প্রাথমিক বৃত্তি পরীক্ষায় অংশ নেয় শিশুকাননের শিক্ষার্থীরা।',
    image: 'https://files.quantummethod.org.bd/resize/1000/-/media/image/static_content/quanta_schlorship_20170427.jpg'
  },
  {
    year: '২০০৫',
    title: 'দরবার হল ও শিশুপার্ক',
    description: 'নির্মিত হয় ৩৬০০ বর্গফুটের দরবার হল। সুপরিসর কোনো উন্মুক্ত স্থাপনা লামায় এটাই প্রথম। খাবার গ্রহণ, সান্ধ্যকালীন পাঠচর্চা বা সাংস্কৃতিক পরিবেশনার জন্য ব্যবহৃত হতো এই দরবারটি।',
    image: 'https://files.quantummethod.org.bd/resize/1000/-/media/image/static_content/dorbar_20170430.jpg'
  },
  {
    year: '২০০৬',
    title: 'আবদুল্লাহ আবু সায়ীদ পাঠাগার উদ্বোধন',
    description: 'বিশ্বসাহিত্য কেন্দ্রের প্রতিষ্ঠাতা অধ্যাপক আবদুল্লাহ আবু সায়ীদের নামানুসারে এই পাঠাগারটির নামকরণ করা হয়।',
    image: 'https://files.quantummethod.org.bd/resize/1000/-/media/image/static_content/library_inauguration_20170430a.jpg'
  },
  {
    year: '২০০৭',
    title: 'ভ্যালি ইকরানে শিশুকানন ও স্বপ্নান স্কুল',
    description: 'ছাত্রসংখ্যা বাড়ায় ভ্যালি ইকরানে নির্মিত হয় নূর হল, খান হল ও খেলার মাঠ। ৫ মার্চ ২০০৭ সালে ২৮ জন ছাত্র-ছাত্রী নিয়ে \'স্বপ্নান স্কুল\' শুরু হয়।',
    image: 'https://files.quantummethod.org.bd/resize/1000/-/media/image/static_content/valley_iqran_20170430.jpg'
  },
  {
    year: '২০০৮',
    title: 'প্রথমবারের মতো এ প্লাস',
    description: 'এসএসসি পরীক্ষায় দুজন জিপিএ ৫ পেয়ে উত্তীর্ণ হয়। তাদের মধ্যে সুমথং ২০১৭ সালে এমবিবিএস সম্পন্ন করে বর্তমানে চিকিৎসক।',
    image: 'https://files.quantummethod.org.bd/resize/1000/-/media/image/static_content/a___rally_20170430.jpg'
  },
  {
    year: '২০০৯',
    title: 'বছরটা ছিল কোয়ান্টাম কসমো স্কুলের',
    description: 'গিরি ফিকরানে টিলার ধাপে ধাপে প্রকৃতিবান্ধব নির্মাণশৈলীতে গড়ে ওঠে নতুন স্কুলভবন। জাতীয় আন্তঃস্কুল খো খো টুর্নামেন্টে চ্যাম্পিয়ন হয় শিশুকানন।',
    image: 'https://files.quantummethod.org.bd/resize/1000/-/media/image/static_content/fikran_campus_20170430.jpg'
  },
  {
    year: '২০১০',
    title: 'গ্রাউন্ড অলিম্পিয়ান',
    description: 'সমুদ্রপৃষ্ঠ থেকে হাজার ফুট উচ্চতায় বাংলাদেশের সবচেয়ে উঁচু খেলার মাঠ গ্রাউন্ড অলিম্পিয়ান-এর উদ্বোধন হয়।',
    image: 'https://files.quantummethod.org.bd/resize/1000/-/media/image/static_content/ground_olympion_inauguration_20170430.jpg'
  },
  {
    year: '২০১১',
    title: 'নামকরণ হলো কোয়ান্টাম কসমো স্কুল',
    description: 'পুরো স্কুল ও পাঠদান কার্যক্রম স্থানান্তরিত হয় গিরি ফিকরান ক্যাম্পাসে। প্রথমবারের মতো চালু হয় এসএসসি সেকশন।',
    image: 'https://files.quantummethod.org.bd/resize/1000/-/media/image/static_content/giri_fikran_20170430.jpg'
  },
  {
    year: '২০১২',
    title: 'কলেজ কার্যক্রম শুরু',
    description: 'বাণিজ্য বিভাগে সাত জন কোয়ান্টাকে নিয়ে শুরু হয় কলেজের কার্যক্রম। এখন তারা কোয়ান্টামমে থেকেই উচ্চমাধ্যমিক পড়ার সুযোগ লাভ করে।',
    image: 'https://files.quantummethod.org.bd/resize/1000/-/media/image/static_content/cosmo_college_20170430.jpg'
  },
  {
    year: '২০১৩',
    title: 'নতুন শিক্ষাঙ্গন নির্মাণের সূচনা',
    description: 'ভ্যালি কোরবান-এ বিস্তৃত উপত্যকায় শুরু হয় নতুন শিক্ষাঙ্গন নির্মাণের কাজ। বঞ্চিত শিশুদের জন্য এটি এক বিশাল সুযোগ।',
    image: 'https://files.quantummethod.org.bd/resize/1000/-/media/image/static_content/hikman__campus_20170430.jpg'
  },
  {
    year: '২০১৪',
    title: 'মেয়েশিশুদের কার্যক্রম শুরু',
    description: 'আবাসন ও পাঠদানের প্রস্তুতি সম্পন্ন করে আনুষ্ঠানিকভাবে শুরু হয় \'শিশুসদন\' (ছাত্রী কার্যক্রম)।',
    image: 'https://files.quantummethod.org.bd/resize/1000/-/media/image/static_content/shishu_sadan_20170430.jpg'
  },
  {
    year: '২০১৫',
    title: 'জাতীয় কুচকাওয়াজে প্রথম পুরস্কার',
    description: 'রাজধানী ঢাকায় জাতীয় শিশুকিশোর সমাবেশ ও কুচকাওয়াজে ২৫০-টিরও বেশি স্কুলের মধ্যে প্রথম স্থান অর্জন।',
    image: 'https://files.quantummethod.org.bd/resize/1000/-/media/image/static_content/independant_day_pared_20150326.jpg'
  },
  {
    year: '২০১৬',
    title: 'বিজয়ী মেয়েরা',
    description: 'মেয়েরা প্রথমবারের মতো ১৬ ডিসেম্বর কুচকাওয়াজে অংশগ্রহণ করে বিশেষ পারদর্শিতা পুরষ্কার অর্জন করে।',
    image: 'https://files.quantummethod.org.bd/resize/1000/-/media/image/static_content/news__quanta_bijoy_dibos_2016_12_16_07.jpg'
  },
  {
    year: '২০১৭',
    title: '১০০০ নতুন শিশুর আবাসন',
    description: 'সবুজায়ন প্রাঙ্গনে এক হাজার নতুন শিশুর আবাসন ও শিক্ষা প্রদানের উপযোগী বিস্তৃত ক্যাম্পাসের সূচনা।',
    image: 'https://files.quantummethod.org.bd/resize/1000/-/media/image/static_content/shobujayon_campus_2017_20181229.jpg'
  },
  {
    year: '২০১৮',
    title: 'সিঙ্গাপুর ওপেন জিমন্যাস্টিকসে ব্রোঞ্জ',
    description: 'সিঙ্গাপুর ওপেন জিমন্যাস্টিকসে এক ক্ষুদে কোয়ান্টা ব্রোঞ্জ পদক অর্জন করে বিশ্বদরবারে দেশের নাম উজ্জ্বল করে।',
    image: 'https://files.quantummethod.org.bd/resize/1000/-/media/image/static_content/quanta_success_gymnastics_in_singapore_20180604a.jpg'
  }
];

const SUCCESS_STORIES = [
  {
    title: 'পাবলিক পরীক্ষায় শতভাগ সাফল্য',
    description: 'জেএসসি, এসএসসি ও এইচএসসি পরীক্ষায় নিয়মিত শতভাগ পাসের রেকর্ড।',
    image: 'https://cosmoschool.quantummethod.org.bd/assets/images/quantum-cosmo-school.jpg'
  },
  {
    title: 'জাতীয় ক্রীড়াক্ষেত্রে শ্রেষ্ঠত্ব',
    description: 'হ্যান্ডবল, ফুটবল ও অ্যাথলেটিক্সে জাতীয় পর্যায়ে একাধিকবার চ্যাম্পিয়ন হওয়ার গৌরব।',
    image: 'https://cosmoschool.quantummethod.org.bd/assets/images/quantum-cosmo-school.jpg'
  },
  {
    title: 'উচ্চশিক্ষায় অগ্রযাত্রা',
    description: 'এখানকার শিক্ষার্থীরা বুয়েট, মেডিকেল ও ঢাকা বিশ্ববিদ্যালয়সহ শীর্ষ প্রতিষ্ঠানে অধ্যয়নরত।',
    image: 'https://cosmoschool.quantummethod.org.bd/assets/images/quantum-cosmo-school.jpg'
  }
];

// --- Hero Component ---
function Hero() {
  const title = "কোয়ান্টাম কসমো স্কুল ও কলেজ";
  const subtitle = "একটু একটু করে পথ চলা...";
  const words = title.split(' ');
  const btn1Ref = useRef<HTMLAnchorElement>(null);
  const btn2Ref = useRef<HTMLAnchorElement>(null);

  useMagnetic(btn1Ref);
  useMagnetic(btn2Ref);

  return (
    <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://cosmoschool.quantummethod.org.bd/assets/images/quantum-cosmo-school.jpg"
          alt="Quantum Cosmo School Campus"
          className="w-full h-full object-cover animate-heroZoom"
          loading="eager"
        />
        <div className="absolute inset-0 hero-overlay z-10" />
      </div>

      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-10 flex justify-center animate-fadeInUp">
          <div className="h-1.5 w-20 sm:w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent rounded-full animate-shimmer-gold" />
        </div>
        <h1 className="text-4xl sm:text-7xl lg:text-9xl font-black text-white mb-4 sm:mb-6 drop-shadow-2xl serif-font word-reveal leading-[1.1]">
          {words.map((word, i) => (
            <span key={i} className={word === "কসমো" || word === "স্কুল" || word === "ও" || word === "কলেজ" ? "text-gradient-gold-animated" : ""} style={{ animationDelay: `${i * 0.1}s` }}>{word}&nbsp;</span>
          ))}
        </h1>
        <div className="flex justify-center mb-10 sm:mb-16 reveal-bottom delay-300">
           <p className="text-base sm:text-2xl text-white tracking-[0.3em] font-bold uppercase border-y-2 border-white/30 py-3 px-10 drop-shadow-2xl">
             একটু একটু করে পথ চলা...
           </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center reveal-bottom delay-700 px-6">
          <a
            ref={btn1Ref}
            href="#intro"
            className="w-full sm:w-auto group px-8 sm:px-12 py-4 sm:py-5 bg-[#065f46] hover:bg-[#047857] text-white rounded-2xl sm:rounded-full font-bold text-base sm:text-xl shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 magnetic-btn"
          >
            ইতিহাস দেখুন
            <IconChevronDown className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-y-1 transition-transform" />
          </a>
          <div className="w-full sm:w-auto">
            <DonateButton 
              text="সহযোগিতা করুন" 
              className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-xl rounded-2xl sm:rounded-full" 
            />
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 animate-bounce opacity-80 cursor-pointer" onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}>
        <span className="text-white text-[10px] font-black tracking-[0.4em] uppercase mb-1">স্ক্রল করুন</span>
        <IconChevronDown className="w-6 h-6 text-white" />
      </div>
    </section>
  );
}

// Sticky Mobile Actions
function StickyMobileActions({ progress }: { progress: number }) {
  const visible = progress > 5;

  return (
    <div className={`fixed bottom-6 left-6 right-6 z-[150] flex gap-3 sm:hidden transition-all duration-500 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}>
      <a
        href="https://cosmoschool.quantummethod.org.bd/bn"
        className="flex-1 bg-white/95 backdrop-blur-xl text-[#0f172a] font-bold py-4 rounded-2xl shadow-2xl flex items-center justify-center gap-2 border border-white/20 active:scale-95 transition-transform"
      >
        <IconChevronDown className="w-5 h-5 rotate-90" />
        <span className="whitespace-nowrap">মূল সাইট</span>
      </a>
      <div className="flex-[1.5]">
        <DonateButton text="সহযোগিতা" className="w-full py-4 rounded-2xl shadow-2xl" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────


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
            // Adding the class 'reveal' triggers the animation defined in index.css
            // For .reveal-left.reveal or .reveal.reveal selectors
            entry.target.classList.add('reveal');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal-left, .reveal-right').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function DonateButton({ text = "ডোনেট করুন", className = "" }: { text?: string; className?: string }) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  useMagnetic(btnRef);

  return (
    <a
      ref={btnRef}
      href="https://donate.quantummethod.org.bd/bn"
      target="_blank"
      rel="noopener noreferrer"
      className={`donate-btn-premium group relative flex items-center justify-center gap-2 px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-2xl transition-all hover:scale-105 active:scale-95 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#dc2626] via-[#ef4444] to-[#b91c1c] opacity-100 group-hover:opacity-90 transition-opacity" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <IconHeart className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:scale-125 group-hover:animate-pulse" />
      <span className="relative z-10 tracking-wider whitespace-nowrap">{text}</span>
      
      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />
    </a>
  );
}

// Navbar
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrolled, visible } = useNavScroll();

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 navbar-glass ${
          scrolled ? 'scrolled' : ''
        } ${visible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logos */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a href="https://www.quantummethod.org.bd/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 sm:gap-2">
                <img
                  src="https://files.quantummethod.org.bd/resize/30/-/media/image/static_content/homepage_menu_logo_20240624.png"
                  alt="Quantum Logo"
                  className="h-6 sm:h-8 w-auto"
                />
                <div className="h-5 sm:h-6 w-px bg-gray-300 dark:bg-gray-700" />
                <img
                  src="https://files.quantummethod.org.bd/resize/30/-/media/image/static_content/cosmoschool_nav_menu_20250416.png"
                  alt="Cosmo School Logo"
                  className="h-6 sm:h-8 w-auto"
                />
              </a>
              <span className="text-xs sm:text-sm font-bold text-[#065f46] dark:text-emerald-400 leading-tight max-w-[120px] sm:max-w-none">
                কোয়ান্টাম কসমো স্কুল ও কলেজ
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-[#065f46] dark:hover:text-emerald-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <ThemeToggle />
              <DonateButton />
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                className="p-2 rounded-lg text-gray-700 dark:text-gray-200 z-50 relative"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                   <span className={`h-0.5 w-6 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                   <span className={`h-0.5 w-6 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
                   <span className={`h-0.5 w-6 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile App-Style Menu */}
      <div className={`mobile-app-menu ${menuOpen ? 'open' : ''}`}>
        <div className="flex flex-col h-full overflow-y-auto pb-10">
          {/* Menu Header */}
          <div className="flex items-center justify-between px-6 pt-12 pb-8 sticky top-0 bg-white/10 backdrop-blur-md z-30">
            <div className="flex items-center gap-3">
              <img
                src="https://files.quantummethod.org.bd/resize/30/-/media/image/static_content/cosmoschool_nav_menu_20250416.png"
                alt="Logo"
                className="h-10 w-auto"
              />
              <span className="text-lg font-bold text-[#065f46] dark:text-emerald-400 serif-font">মেনু</span>
            </div>
            <button 
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
            >
              <IconX className="w-6 h-6" />
            </button>
          </div>

          <div className="px-6 flex flex-col gap-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-2">নেভিগেশন</p>
            {NAV_LINKS.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                className="mobile-menu-item flex items-center gap-4 px-5 py-4 rounded-2xl bg-gray-50/50 dark:bg-slate-800/50 text-lg font-bold text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-slate-700 active:scale-[0.98] transition-all"
                style={{ animationDelay: `${idx * 50}ms` }}
                onClick={() => setMenuOpen(false)}
              >
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-700 shadow-sm text-[#065f46] dark:text-emerald-400">
                  <link.icon className="w-5 h-5" />
                </div>
                <span>{link.label}</span>
                <IconChevronDown className="w-5 h-5 ml-auto -rotate-90 text-gray-300" />
              </a>
            ))}
            
            <div className="mt-4" style={{ animationDelay: `${NAV_LINKS.length * 50}ms` }}>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">সহযোগিতা</p>
               <DonateButton text="ডোনেট করুন" className="w-full py-5 text-xl rounded-2xl shadow-xl" />
            </div>
          </div>
          
          <div className="mt-12 px-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 px-2 text-center">আমাদের সাথে যুক্ত থাকুন</p>
            <div className="flex justify-center gap-6">
              <a href="https://www.facebook.com/QuantumMethodBd" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm border border-blue-100 dark:border-blue-900/30">
                <IconBrandFacebook className="w-7 h-7" />
              </a>
              <a href="https://www.youtube.com/quantummethod" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400 shadow-sm border border-red-100 dark:border-red-900/30">
                <IconBrandYoutube className="w-7 h-7" />
              </a>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-100 dark:border-slate-800 text-center">
              <p className="text-sm text-gray-400 font-medium">কোয়ান্টাম কসমো স্কুল ও কলেজ</p>
              <p className="text-xs text-gray-300 mt-1 uppercase tracking-widest">© ২০২৬ সর্বস্বত্ব সংরক্ষিত</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


// Intro Section
function IntroSection() {
  return (
    <section id="intro" className="py-24 sm:py-32 bg-[#fcfcf7] dark:bg-slate-900 transition-colors relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-emerald-50/40 dark:bg-emerald-900/10 rounded-full blur-[100px] -mr-60 -mt-60" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-[#d4af37]/10 dark:bg-gold-900/5 rounded-full blur-[100px] -ml-60 -mb-60" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="reveal-left">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#065f46]/10 dark:bg-[#065f46]/30 text-[#065f46] dark:text-emerald-400 font-bold text-sm sm:text-base mb-8 shadow-sm border border-[#065f46]/10 dark:border-emerald-800">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] animate-pulse" />
              সূচনা ও প্রেক্ষাপট
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#0f172a] dark:text-white mb-10 leading-[1.2] serif-font">
              অশিক্ষা ও কুসংস্কার দূর করাই <br /> 
              <span className="text-[#065f46] dark:text-emerald-500">আমাদের মূল লক্ষ্য</span>
            </h2>
            <div className="space-y-6 sm:space-y-10 intro-quote p-6 sm:p-12 rounded-[2rem] sm:rounded-[3rem] shadow-2xl border border-white/50 dark:border-slate-800 backdrop-blur-md bg-white/40 dark:bg-slate-800/40">
              {INTRO_TEXT.map((p, idx) => (
                <p key={idx} className="text-base sm:text-xl text-[#0f172a]/80 dark:text-gray-300 leading-relaxed text-justify">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div className="relative reveal-right mt-12 lg:mt-0">
            <div className="aspect-[3/4] sm:aspect-[4/5] rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden shadow-2xl ring-1 ring-[#0f172a]/5 dark:ring-gray-700 group">
              <img
                src="https://cosmoschool.quantummethod.org.bd/assets/images/quantum-cosmo-school.jpg"
                alt="কোয়ান্টাম কসমো স্কুলের শিক্ষার্থীরা"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-8 sm:-bottom-12 -right-4 sm:-right-12 bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-[2rem] sm:rounded-[3rem] shadow-2xl max-w-[16rem] sm:max-w-xs border border-[#065f46]/5 dark:border-emerald-900/30 animate-float flex flex-col items-center">
              <IconAward className="w-10 h-10 sm:w-16 sm:h-16 text-[#d4af37] mb-3 sm:mb-4" />
              <div className="text-5xl sm:text-7xl font-extrabold text-[#065f46] dark:text-emerald-500 mb-2 sm:mb-4 serif-font text-center">২৫+</div>
              <div className="text-gray-600 dark:text-gray-400 font-bold text-base sm:text-xl leading-snug text-center">বছরের নিরবচ্ছিন্ন অগ্রযাত্রা ও সাফল্যের ইতিহাস।</div>
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
    <section className="py-24 sm:py-32 bg-gradient-to-br from-[#fcfcf7] via-white to-[#d4af37]/5 dark:from-slate-900 dark:via-slate-800 dark:to-slate-950 transition-colors border-y border-[#065f46]/10 dark:border-emerald-900/20 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="bg-blob top-0 left-0 opacity-40 mix-blend-multiply dark:mix-blend-overlay" />
      <div className="bg-blob bottom-0 right-0 opacity-20 delay-1000 mix-blend-multiply dark:mix-blend-overlay" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 stagger-1">
          {STATS.map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-white/60 dark:bg-slate-800/80 backdrop-blur-xl rounded-[2rem] sm:rounded-[3rem] p-10 sm:p-14 text-center shadow-2xl ring-1 ring-[#065f46]/5 dark:ring-emerald-900/20 hover:shadow-3xl transition-all duration-700 group hover:-translate-y-3 reveal tilt-card"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="flex justify-center mb-6 sm:mb-8 transform group-hover:scale-125 transition-transform duration-500">
                {idx === 0 && <IconCalendar className="w-10 h-10 sm:w-14 sm:h-14 text-[#d4af37]" />}
                {idx === 1 && <IconHistory className="w-10 h-10 sm:w-14 sm:h-14 text-[#d4af37]" />}
                {idx === 2 && <IconSchool className="w-10 h-10 sm:w-14 sm:h-14 text-[#d4af37]" />}
                {idx === 3 && <IconUsers className="w-10 h-10 sm:w-14 sm:h-14 text-[#d4af37]" />}
              </div>
              <div className="text-5xl sm:text-7xl font-black text-[#0f172a] dark:text-emerald-400 mb-4 sm:mb-6 group-hover:scale-110 transition-transform serif-font">
                {stat.value}
              </div>
              <div className="text-[#0f172a]/60 dark:text-gray-400 font-bold uppercase tracking-[0.25em] text-xs sm:text-sm">
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const progress = useScrollProgress();

  return (
    <section id="history" className="py-24 sm:py-32 bg-[#fcfcf7] dark:bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 sm:mb-24 reveal">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#0f172a] dark:text-white mb-6 serif-font">আমাদের পথচলার ইতিহাস</h2>
          <div className="h-1 w-24 bg-[#d4af37] mx-auto rounded-full" />
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-800 -translate-x-1/2 rounded-full overflow-hidden">
             <div 
               className="timeline-glow" 
               style={{ height: `${progress}%`, background: 'linear-gradient(180deg, #d4af37, #065f46)' }} 
             />
          </div>

          <div className="space-y-12 sm:space-y-24">
            {TIMELINE_DATA.map((item, idx) => (
              <div key={idx} className={`relative flex flex-col sm:flex-row items-center ${idx % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}>
                {/* Dot */}
                <div className="absolute left-4 sm:left-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white dark:bg-slate-900 border-4 border-[#065f46] dark:border-emerald-500 rounded-full z-10 -translate-x-1/2 shadow-lg transition-transform duration-500 group-hover:scale-125" />
                
                {/* Content */}
                <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${idx % 2 === 0 ? 'sm:pr-16 lg:pr-24' : 'sm:pl-16 lg:pl-24'}`}>
                  <div className={`timeline-card p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] reveal-${idx % 2 === 0 ? 'left' : 'right'} group hover:shadow-3xl transition-all duration-500 border-[#065f46]/5 dark:border-emerald-900/20 bg-white dark:bg-slate-800`}>
                    <div 
                      className="relative aspect-video rounded-2xl sm:rounded-[2rem] overflow-hidden mb-6 sm:mb-8 cursor-zoom-in"
                      onClick={() => setSelectedImage(item.image)}
                    >
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
                        <span className="year-badge px-6 py-2 rounded-full text-sm sm:text-base bg-[#065f46] dark:bg-emerald-600">
                          {item.year}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-[#0f172a] dark:text-white serif-font">{item.title}</h3>
                    <p className="text-[#0f172a]/70 dark:text-gray-400 text-sm sm:text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Image Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 lightbox-overlay backdrop-blur-2xl"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full">
            <button 
              className="absolute -top-16 right-0 text-white hover:text-emerald-400 transition-colors p-2"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={selectedImage} 
              alt="History Snapshot" 
              className="w-full h-auto rounded-3xl shadow-2xl animate-scaleIn ring-1 ring-white/20" 
            />
          </div>
        </div>
      )}
    </section>
  );
}

// Success Stories Section
function SuccessStories() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <section className="py-32 bg-gray-50 dark:bg-slate-900/50 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20 reveal">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 serif-font">অসাধারণ সব সাফল্য</h2>
          <p className="text-gray-600 dark:text-gray-400 text-xl max-w-2xl mx-auto">শিক্ষার পাশাপাশি সহ-শিক্ষা কার্যক্রমেও আমাদের নিরন্তর জয়যাত্রা</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {SUCCESS_STORIES.map((story, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all group reveal border border-gray-100 dark:border-slate-700">
              <div 
                className="aspect-[4/3] overflow-hidden relative cursor-pointer"
                onClick={() => setLightboxImage(story.image)}
              >
                <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 shadow-2xl">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-5 serif-font leading-tight">{story.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{story.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Overlay */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 lightbox-overlay"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-5xl w-full">
            <button 
              className="absolute -top-12 right-0 text-white hover:text-emerald-400 transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img src={lightboxImage} alt="Success" className="w-full h-auto rounded-2xl shadow-2xl animate-scaleIn" />
          </div>
        </div>
      )}
    </section>
  );
}

// --- Legal Modals ---
function LegalModal({ isOpen, onClose, title, content }: { isOpen: boolean, onClose: () => void, title: string, content: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[80vh] overflow-y-auto rounded-[2.5rem] p-8 sm:p-12 shadow-2xl border border-gray-100 dark:border-slate-800 animate-scaleIn">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
          <IconX className="w-6 h-6 text-gray-500" />
        </button>
        <h2 className="text-3xl font-bold mb-8 serif-font text-gradient-gold">{title}</h2>
        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 space-y-6 text-justify">
          {content}
        </div>
        <div className="mt-12 flex justify-end">
          <button onClick={onClose} className="px-8 py-3 bg-[#065f46] text-white font-bold rounded-full hover:bg-[#047857] transition-all">বন্ধ করুন</button>
        </div>
      </div>
    </div>
  );
}

const PRIVACY_CONTENT = (
  <>
    <p>কোয়ান্টাম কসমো স্কুল ও কলেজ আপনার গোপনীয়তাকে অত্যন্ত গুরুত্ব সহকারে বিবেচনা করে। এই প্রাইভেসি পলিসি ডকুমেন্টে আমরা কোন ধরনের তথ্য সংগ্রহ করি এবং তা কীভাবে ব্যবহার করি সে সম্পর্কে বিস্তারিত আলোচনা করা হয়েছে।</p>
    <h3 className="text-xl font-bold text-[#065f46] dark:text-emerald-400 mt-6">১. তথ্য সংগ্রহ</h3>
    <p>আমরা আমাদের ওয়েবসাইট ভিজিটরদের ব্যক্তিগত তথ্য (যেমন নাম, ইমেইল) শুধুমাত্র তখনই সংগ্রহ করি যখন আপনি স্বেচ্ছায় আমাদের কোনো ফর্ম পূরণ করেন বা ডোনেট করেন।</p>
    <h3 className="text-xl font-bold text-[#065f46] dark:text-emerald-400 mt-6">২. তথ্যের ব্যবহার</h3>
    <p>সংগৃহীত তথ্যগুলো আমাদের ওয়েবসাইটের অভিজ্ঞতা উন্নত করতে, আপনার জিজ্ঞাসার উত্তর দিতে এবং ডোনেশন সংক্রান্ত যোগাযোগের জন্য ব্যবহার করা হয়।</p>
    <h3 className="text-xl font-bold text-[#065f46] dark:text-emerald-400 mt-6">৩. কুকিজ (Cookies)</h3>
    <p>গুগল অ্যাডসেন্স এবং এনালিটিক্স ব্যবহারের সুবিধার্থে আমরা কুকিজ ব্যবহার করতে পারি। এটি ব্যবহারকারীদের ব্রাউজিং অভ্যাসের ওপর ভিত্তি করে আরও ভালো অ্যাড দেখাতে সাহায্য করে।</p>
  </>
);

const TERMS_CONTENT = (
  <>
    <p>আমাদের ওয়েবসাইট ব্যবহার করার মাধ্যমে আপনি নিচের শর্তাবলি মেনে নিতে সম্মত হচ্ছেন।</p>
    <h3 className="text-xl font-bold text-[#065f46] dark:text-emerald-400 mt-6">১. ব্যবহারের শর্ত</h3>
    <p>এই সাইটের সমস্ত কন্টেন্ট (টেক্সট, ছবি, ভিডিও) কোয়ান্টাম কসমো স্কুল ও কলেজের নিজস্ব সম্পদ। অনুমতি ছাড়া এগুলো বাণিজ্যিক উদ্দেশ্যে ব্যবহার করা আইনত দণ্ডনীয়।</p>
    <h3 className="text-xl font-bold text-[#065f46] dark:text-emerald-400 mt-6">২. ডোনেশন পলিসি</h3>
    <p>ডোনেশনের মাধ্যমে প্রাপ্ত অর্থ শিশুদের শিক্ষা ও আবাসন সহায়তায় ব্যয় করা হয়। ডোনেশন সম্পন্ন হওয়ার পর তা সাধারণত রিফান্ডযোগ্য নয়।</p>
    <h3 className="text-xl font-bold text-[#065f46] dark:text-emerald-400 mt-6">৩. দায়বদ্ধতা</h3>
    <p>আমরা সাইটের তথ্য নির্ভুল রাখার সর্বোচ্চ চেষ্টা করি, তবে টেকনিক্যাল ত্রুটি বা তথ্যের ভুলবশত অসঙ্গতির জন্য আমরা দায়বদ্ধ নই।</p>
  </>
);

function Footer() {
  const [modal, setModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="bg-[#0f172a] text-white pt-24 pb-12 relative overflow-hidden transition-colors border-t border-[#065f46]/20">
      {/* Decorative Blobs for Footer */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-900/10 rounded-full blur-[120px] -mr-80 -mt-80" />
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-[#d4af37]/5 rounded-full blur-[120px] -ml-80 -mb-80" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 mb-20">
          {/* Brand Mission Column */}
          <div className="lg:col-span-4 reveal-left">
            <div className="flex items-center gap-4 mb-8">
              <img
                src="https://files.quantummethod.org.bd/resize/30/-/media/image/static_content/cosmoschool_nav_menu_20250416.png"
                alt="Cosmo School Logo"
                className="h-14 sm:h-16 w-auto"
              />
              <div className="h-10 w-px bg-white/20" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gradient-gold serif-font leading-tight">
                কোয়ান্টাম কসমো <br /> স্কুল ও কলেজ
              </h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed mb-10 text-justify">
              ১৯৯৯ সাল থেকে বান্দরবানের লামায় আদিবাসী ও বঞ্চিত শিশুদের আলোকিত মানুষ হিসেবে গড়ে তোলার এক নিরন্তর মিশন। আপনার সহযোগিতা এই শিশুদের আগামীর স্বপ্নকে সফল করতে পারে।
            </p>
            <div className="flex gap-5">
              <a href="https://www.facebook.com/QuantumMethodBd" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#065f46] hover:scale-110 transition-all border border-white/10 group">
                <IconBrandFacebook className="w-6 h-6 text-white/70 group-hover:text-white" />
              </a>
              <a href="https://www.youtube.com/quantummethod" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all border border-white/10 group">
                <IconBrandYoutube className="w-6 h-6 text-white/70 group-hover:text-white" />
              </a>
              <a href="https://quantummethod.org.bd/bn/contacts" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#d4af37] hover:scale-110 transition-all border border-white/10 group">
                <IconHeadset className="w-6 h-6 text-white/70 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-10 stagger-1">
            {FOOTER_COLUMNS.map((col, idx) => (
              <div key={idx} className="flex flex-col gap-5">
                <h3 className="text-[#d4af37] font-bold text-sm uppercase tracking-[0.2em] mb-2 px-2 border-l-2 border-[#065f46]">
                   {idx === 0 && 'মেইন সাইট'}
                   {idx === 1 && 'শিক্ষা'}
                   {idx === 2 && 'সেবা'}
                   {idx === 3 && 'রিসোর্স'}
                   {idx === 4 && 'অন্যান্য'}
                </h3>
                <div className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white hover:translate-x-1 transition-all text-sm sm:text-base font-medium px-2"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Dashboard */}
        <div className="grid lg:grid-cols-3 gap-8 border-t border-white/5 pt-16 mb-16">
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-[#065f46]/50 transition-colors group">
            <div className="p-3 rounded-2xl bg-[#065f46]/20 w-fit mb-6 text-[#d4af37] group-hover:scale-110 transition-transform">
              <IconMapPin className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 serif-font">ঠিকানা</h3>
            <p className="text-slate-400 leading-relaxed">কোয়ান্টাম কসমো স্কুল ও কলেজ, সরই, লামা, বান্দরবান - ৩২৭৪</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-[#065f46]/50 transition-colors group">
            <div className="p-3 rounded-2xl bg-[#065f46]/20 w-fit mb-6 text-[#d4af37] group-hover:scale-110 transition-transform">
              <IconPhone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 serif-font">যোগাযোগ</h3>
            <div className="space-y-2">
              <p className="text-slate-400 font-medium">+৮৮ ০১৩১৩ ৪৮৬৫৩০</p>
              <p className="text-slate-400 font-medium">+৮৮ ০১৮৮৫ ৩১৮০৮৩</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-[#065f46]/50 transition-colors group flex flex-col items-center justify-center text-center">
             <IconHeart className="w-12 h-12 text-[#dc2626] mb-6 animate-pulse" />
             <h3 className="text-xl font-bold mb-6 serif-font">আমাদের পাশে দাঁড়ান</h3>
             <DonateButton text="ডোনেট করুন" className="w-full py-4 text-lg" />
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-sm sm:text-base">
            &copy; {new Date().getFullYear()} কোয়ান্টাম কসমো স্কুল ও কলেজ. সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex gap-8 text-slate-500 text-sm">
            <button onClick={() => setModal('privacy')} className="hover:text-white transition-colors">প্রাইভেসি পলিসি</button>
            <button onClick={() => setModal('terms')} className="hover:text-white transition-colors">শর্তাবলি</button>
          </div>
        </div>
      </div>

      <LegalModal 
        isOpen={modal === 'privacy'} 
        onClose={() => setModal(null)} 
        title="প্রাইভেসি পলিসি" 
        content={PRIVACY_CONTENT} 
      />
      <LegalModal 
        isOpen={modal === 'terms'} 
        onClose={() => setModal(null)} 
        title="শর্তাবলি ও ব্যবহারবিধি" 
        content={TERMS_CONTENT} 
      />
    </footer>
  );
}

// Main App
export default function App() {
  const progress = useScrollProgress();
  const scrollToTopRef = useRef<HTMLButtonElement>(null);
  useScrollReveal();
  useMagnetic(scrollToTopRef);

  useEffect(() => {
    const handleScroll = () => {
      const glow = document.querySelector('.timeline-glow') as HTMLElement;
      if (glow) {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        glow.style.height = `${scrolled}%`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-['Hind_Siliguri'] transition-colors duration-700 selection:bg-emerald-200 dark:selection:bg-emerald-900">
      <CustomCursor />
      
      <div 
        className="fixed top-0 left-0 right-0 z-[100] h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-300" 
        style={{ width: `${progress}%` }} 
      />
      
      <Navbar />
      
      <main id="main">
        <Hero />
        <div className="section-divider mx-auto w-4/5 opacity-30" />
        <IntroSection />
        
        {/* SVG Divider */}
        <div className="relative h-24 bg-white dark:bg-slate-900 overflow-hidden">
          <svg className="section-divider-svg text-emerald-50 dark:text-slate-800/50" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,122.7C672,128,768,192,864,208C960,224,1056,192,1152,160C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <StatsSection />
        
        <div className="section-divider mx-auto w-4/5 opacity-30" />
        <TimelineSection />
        <SuccessStories />
      </main>
      
      <Footer />
      
      {/* Scroll to Top */}
      <button
        ref={scrollToTopRef}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-24 sm:bottom-10 right-6 sm:right-10 z-[140] w-14 h-14 bg-[#065f46] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 transform ${progress > 10 ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'} hover:scale-110 active:scale-95 group magnetic-btn`}
        aria-label="উপরে যান"
      >
        <IconChevronUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
      </button>

      {/* Sticky Mobile Actions */}
      <StickyMobileActions progress={progress} />
    </div>
  );
}
