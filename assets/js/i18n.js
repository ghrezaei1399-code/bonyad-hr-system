(function(){
  const DICT = {
    "برگشت":"Back","بازگشت":"Back","بازگشت به سایت":"Back to site","خانه":"Home",
    "تم":"Theme","زبان":"Language","روشن":"Light","تیره":"Dark","خروج":"Logout","ورود":"Login",
    "ذخیره":"Save","ذخیره پیش‌نویس":"Save Draft","ارسال":"Send","ارسال به رئیس اکوسیستم":"Send to Eco Chief",
    "لغو":"Cancel","تأیید":"Confirm","جستجو":"Search","بستن":"Close","افزودن":"Add","حذف":"Delete","ویرایش":"Edit",
    "وظایف کمیته":"Committee Tasks","ثبت طرح درس":"New Lesson Plan","دوره‌های اکوسیستم":"Ecosystem Courses",
    "سوابق آموزشی":"Training Records","سوابق آموزشی من":"My Training Records",
    "ارجاعات ادمین":"Admin Referrals","درخواست‌های کارگزینی":"Personnel Requests",
    "عنوان دوره":"Course Title","استاد / مدرس":"Instructor","تاریخ شروع":"Start Date","مدت (ساعت)":"Hours",
    "شاخص‌های ارزیابی (با کاما)":"Indicators (comma)","توضیحات / سرفصل‌ها":"Description / Syllabus",
    "مخاطبین (از پرسنل)":"Audience (Personnel)","مخاطبین":"Audience","شاخص‌ها":"Indicators",
    "وظیفه‌ای ثبت نشده.":"No tasks.","موردی یافت نشد":"Nothing found","پرسنل":"Personnel","دوره":"Course",
    "تاریخ":"Date","وضعیت":"Status","عملیات":"Action","موضوع":"Subject","ارجاع‌دهنده":"From","انجام شد":"Done",
    "در جریان":"In progress","باز":"Open","فعال":"Active","غیرفعال":"Inactive",
    "اکوسیستم توانمندسازی":"Empowerment Ecosystem","اکوسیستم یادگیری":"Learning Ecosystem",
    "بانک هوشمندسازی":"Smart AI Bank","کمیته راهبری":"Steering Committee",
    "پنل مدیریت":"Admin Panel","مشاوران":"Consultants","احکام":"Decrees","ایده‌پردازی":"Brainstorming",
    "آموزش":"Learning","راهنمای یادگیری":"Learning Guide","امتیاز":"Score","نمره":"Grade",
    "میزان رضایت شما از این صفحه چقدر است؟":"How satisfied are you with this page?",
    "ثبت رضایتمندی":"Rate us","مشاهده":"View","ثبت":"Submit","نام":"Name","عنوان":"Title","کد":"Code"
  };
  const EN2FA = Object.fromEntries(Object.entries(DICT).map(([k,v])=>[v,k]));
  const getLang = ()=> localStorage.getItem('ui_lang') || 'fa';
  const t = (fa)=> getLang()==='fa' ? fa : (DICT[fa] || fa);
  const tEn = (en)=> getLang()==='en' ? en : (EN2FA[en] || en);

  function apply(){
    const lang = getLang();
    document.documentElement.lang = lang;
    document.documentElement.dir  = lang==='fa' ? 'rtl' : 'ltr';
    // 1) data-fa / data-en (روش smart_bank)
    document.querySelectorAll('[data-fa]').forEach(el=>{
      const v = lang==='fa' ? el.getAttribute('data-fa') : (el.getAttribute('data-en') || DICT[el.getAttribute('data-fa')] || el.getAttribute('data-fa'));
      el.textContent = v;
    });
    // 2) data-i18n (روش key-based)
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const k = el.getAttribute('data-i18n');
      el.textContent = DICT[k] ? (lang==='fa'? k : DICT[k]) : (lang==='fa'? k : k);
    });
    // 3) data-i18n-ph
    document.querySelectorAll('[data-i18n-ph]').forEach(el=>{
      const k = el.getAttribute('data-i18n-ph');
      el.placeholder = lang==='fa'? k : (DICT[k]||k);
    });
    // 4) جستجوی عمومی متن‌های فارسی (fallback)
    document.querySelectorAll('button, a, h1, h2, h3, th, label, option, span').forEach(el=>{
      if(el.children.length>0) return;
      if(el.hasAttribute('data-fa')||el.hasAttribute('data-i18n')) return;
      const txt = el.textContent.trim();
      if(!txt || !DICT[txt]) return;
      if(lang==='en'){ el.textContent = DICT[txt]; }
      else if(EN2FA[txt]){ el.textContent = EN2FA[txt]; }
    });
    const lb = document.querySelector('#btnLang');
    if(lb) lb.textContent = lang==='fa' ? '🌐 EN' : '🌐 FA';
  }

  window.i18n = {
    t, apply,
    get lang(){ return getLang(); },
    setLang(l){ localStorage.setItem('ui_lang', l); apply(); },
    toggle(){ this.setLang(getLang()==='fa'?'en':'fa'); }
  };

  // هماهنگی با توابع محلی صفحات موجود (toggleLang)
  window.toggleLang = function(){ window.i18n.toggle(); };

  document.addEventListener('DOMContentLoaded', apply);
  if(document.readyState!=='loading') apply();
})();