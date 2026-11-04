/* ============================================================
   دانش سایت — ایندکس صفحات و داده‌ها
   آماده برای اتصال به API واقعی در آینده
   ============================================================ */

const SITE_KNOWLEDGE = {
  pages: {
    'personnel_hub.html': {
      title: 'کارگزینی',
      keywords: ['کارگزینی', 'پرونده', 'مرخصی', 'اداری', 'پرسنل', 'کارمند'],
      description: 'صفحه کارگزینی با دو ماژول: کارگزینی هوشمند (ویژه کارشناسان) و کارگزینی شخصی (ویژه پرسنل). شامل مدیریت پرونده پرسنلی، ثبت مرخصی، امور اداری و پیگیری درخواست‌ها.',
      sections: ['کارگزینی هوشمند', 'کارگزینی شخصی'],
      dataKeys: ['hr_personnel', 'hr_leaves', 'hr_admin_requests', 'hr_personal_queries'],
      ready: false
    },
    'consultants.html': {
      title: 'مشاورین',
      keywords: ['مشاور', 'مشاوره', 'گزارش', 'دستور'],
      description: 'ارتباط با مشاوران متخصص. شامل ورود با کد مشاور، مشاهده دستورات، آپلود گزارش کار و دریافت کد رهگیری.',
      sections: ['ورود مشاور', 'دستورات', 'آپلود گزارش'],
      dataKeys: ['hr_consultants', 'hr_tasks', 'hr_reports'],
      ready: true
    },
    'brainstorming.html': {
      title: 'هم‌اندیشی',
      keywords: ['هم‌اندیشی', 'ایده', 'طوفان فکری', 'نظر', 'پیشنهاد'],
      description: 'فضای ایده‌پردازی جمعی. شامل موضوع هم‌اندیشی امروز، ثبت نظر با کد رهگیری، و مشاهده نظرات سایر همکاران.',
      sections: ['موضوع امروز', 'ثبت نظر', 'نظرات همکاران'],
      dataKeys: ['hr_brainstorm_topics', 'hr_brainstorm_ideas'],
      ready: true
    },
    'decrees.html': {
      title: 'دستیار احکام',
      keywords: ['حکم', 'احکام', 'اصلاح', 'بازنویسی', 'پرسنلی'],
      description: 'اصلاح و بازنویسی احکام پرسنلی. شامل ورود با کد اصلاح حکم، چت هوشمند برای بازنویسی، و ارسال برای ادمین.',
      sections: ['ورود با کد', 'چت بازنویسی', 'ارسال برای ادمین'],
      dataKeys: ['hr_decree_editors', 'hr_pending_decrees'],
      ready: true
    },
    'admin.html': {
      title: 'داشبورد هوشمند مدیریت',
      keywords: ['مدیریت', 'مدیرکل', 'داشبورد', 'پنل', 'گزارش'],
      description: 'داشبورد ویژه مدیرکل. شامل اتوماسیون اداری، تحلیل هوشمند، خروجی گزارش، مدیریت مشاورین، مدیریت مرخصی و احکام.',
      sections: ['اتوماسیون', 'تحلیل', 'خروجی', 'مدیریت مشاورین', 'احکام'],
      dataKeys: [],
      ready: true,
      excluded: true
    },
    'learning.html': {
      title: 'اکوسیستم یادگیری شخصی',
      keywords: ['یادگیری', 'آموزش', 'دوره', 'مهارت', 'باغ دانش'],
      description: 'اکوسیستم یادگیری شخصی. شامل پیام‌های آموزشی، اعلام نیاز آموزشی، نتایج دوره‌ها و پرونده آموزشی.',
      sections: ['پیام‌های آموزشی', 'اعلام نیاز', 'نتایج', 'پرونده آموزشی'],
      dataKeys: ['hr_learning_messages', 'hr_learning_requests', 'hr_learning_results'],
      ready: false
    },
    'ican.html': {
      title: 'من می‌توانم',
      keywords: ['توانمندی', 'توانایی', 'ارتقا', 'جابجایی', 'پست بالاتر'],
      description: 'ثبت توانمندی‌ها. شامل ثبت توانایی کار متفاوت، احراز پست بالاتر، جابجایی درون‌سازمانی و شهرستانی، و پیگیری وضعیت.',
      sections: ['ثبت توانمندی', 'پیگیری'],
      dataKeys: ['hr_ican_cases'],
      ready: false
    },
    'knowledge.html': {
      title: 'دانش و تجربه من',
      keywords: ['دانش', 'تجربه', 'ثبت تجربه', 'انتشار', 'روابط عمومی', 'محتوا'],
      description: 'ثبت دانش و تجربه پرسنل. شامل ثبت تجربه در لحظه، تبدیل هوشمند به محتوای آموزشی/مجله/رسانه، و ارسال برای انتشار.',
      sections: ['ثبت دانش', 'تبدیل هوشمند', 'انتشار'],
      dataKeys: ['hr_knowledge_entries', 'hr_knowledge_outputs'],
      ready: false
    }
  },

  // توابع کمکی برای خواندن داده‌ها
  getData(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; }
    catch { return []; }
  },

  // تابع آینده: اتصال به API واقعی
  // مهندسی فناوری بعداً این را با fetch به API واقعی پر می‌کند
  async fetchFromAPI(/* endpoint */) {
    // placeholder — در نسخه واقعی:
    // return await fetch(endpoint).then(r => r.json());
    return null;
  }
};