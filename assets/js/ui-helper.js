window.UI_TRANSLATIONS = {
  'پنل مدیریت ارشد (مدیرکل)': 'Senior Management Panel (Director)',
  'تغییر رمز': 'Change Password',
  'مدیریت اتوماسیون اداری': 'Office Automation Management',
  'خلاصه وضعیت اداره کل': 'Department Status Summary',
  '۱۲ حکم': '12 decrees',
  '۵ مورد': '5 cases',
  '۳ دوره': '3 courses',
  'دستور به هوش تحلیل‌گر (تحلیل داده‌ها و پیش‌بینی)': 'Command to Data Analyzer',
  'دریافت خروجی گزارش‌ها': 'Export Reports',
  'خروجی Excel': 'Excel Export',
  'خروجی Word': 'Word Export',
  'خروجی PDF': 'PDF Export',
  'تخصیص کد به مشاورین': 'Assign Codes to Consultants',
  'نام مشاور': 'Consultant Name',
  'افزودن': 'Add',
  'ارسال دستور به مشاور و گزارش‌ها': 'Send Order to Consultant and Reports',
  'عنوان دستور': 'Order Title',
  'گزارش‌های دریافتی از مشاورین': 'Received Reports from Consultants',
  'صدور کد اصلاح حکم': 'Issue Decree Revision Code',
  'نام و نام خانوادگی': 'Full Name',
  'کد پرسنلی': 'Personnel Code',
  'صدور کد': 'Issue Code',
  'درخواست‌های پرسنل': 'Personnel Requests',
  'بارگذاری دستی': 'Manual Load',
  'احکام جدید ارسالی': 'New Decrees Submitted',
  'گزارش‌های اکوسیستم توانمندسازی': 'Empowerment Ecosystem Reports',
  'مدیریت دستاوردها': 'Achievements Management',
  'فقط متن': 'Text Only',
  'ثبت و انتشار در صفحه اصلی': 'Submit and Publish on Home Page',
  'دستاوردهای ثبت‌شده': 'Registered Achievements',
  'برون‌بری JSON': 'Export JSON',
  'درون‌ریزی JSON': 'Import JSON',
  'گزارش تحلیلی هم‌اندیشی': 'Brainstorming Analytical Report',
  'عنوان موضوع هم‌اندیشی': 'Brainstorming Topic Title',
  'شرح موضوع...': 'Topic description...',
  'ایجاد موضوع هم‌اندیشی': 'Create Brainstorming Topic',
  'موضوعات و نظرات': 'Topics and Comments',
  'عنوان دستاورد (مثلاً: انتخاب کارمند برتر)': 'Achievement Title (e.g., Employee of the Month)',
  'توضیح دستاورد (اختیاری)...': 'Achievement Description (optional)...',
  'نام فرد/واحد (مثلاً: علی رضایی — کارگزینی)': 'Person/Unit Name (e.g., Ali Rezaei — Personnel)',
  'کد مشاور (مثلاً C-101)': 'Consultant Code (e.g., C-101)',
  'شرح کامل دستور...': 'Full order description...'
};(function() {
  'use strict';

  // ===== ۱. پاک‌سازی داده‌های تست =====
  if (!localStorage.getItem('ui_cleaned_v3')) {
    ['hr_personnel','hr_admin_requests','hr_admin_referrals','hr_personal_queries',
     'hr_eco_challenges','hr_eco_knowledge','hr_eco_courses','hr_eco_content','hr_eco_work',
     'hr_eco_reports','hr_steering_tasks','hr_training_records','hr_pending_decrees',
     'hr_decree_editors','hr_consultants','hr_tasks','hr_reports','hr_brainstorm_topics',
     'hr_brainstorm_ideas','hr_brainstorm_reports','hr_achievements'
    ].forEach(function(k){ localStorage.removeItem(k); });
    localStorage.setItem('ui_cleaned_v3','1');
  }

  // ===== ۲. CSS جهانی =====
  var style = document.createElement('style');
  style.textContent = `
    .header-logo { background:transparent !important; width:75px !important; height:75px !important; padding:0 !important; }
    @media (max-width:600px) { .header-logo { width:60px !important; height:60px !important; } }
    .bonyad-toolbar {
      position: sticky; top: 0; z-index: 999;
      display: flex; align-items: center; justify-content: flex-start;
      gap: 8px; padding: 10px 20px;
      background: linear-gradient(135deg, #1a2a4a 0%, #2a3f6b 100%);
      box-shadow: 0 4px 15px rgba(0,0,0,0.25);
      margin: -20px -20px 20px -20px;
    }
    @media (max-width: 600px) {
      .bonyad-toolbar { margin: -10px -10px 10px -10px; padding: 8px 10px; gap: 6px; }
    }
    .bonyad-toolbar button, .bonyad-toolbar a {
      background: rgba(255,255,255,0.15);
      color: #fff;
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 10px;
      padding: 8px 14px;
      font-size: 1.2rem;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s;
      font-family: inherit;
      display: flex; align-items: center; justify-content: center;
    }
    .bonyad-toolbar button:hover, .bonyad-toolbar a:hover {
      background: #d4a843;
      color: #1a2a4a;
      transform: translateY(-2px);
    }
    @media (max-width: 600px) {
      .bonyad-toolbar button, .bonyad-toolbar a { padding: 8px 10px; font-size: 1rem; }
    }
  `;
  document.head.appendChild(style);

  // ===== ۳. نوار دکمه‌های استاندارد =====
  window.addEventListener('DOMContentLoaded', function() {
    var path = window.location.pathname;
    var isHome = (path.indexOf('index.html') !== -1 || path === '/' || path.endsWith('/'));
    var isWelcome = path.indexOf('welcome.html') !== -1;
    if (isWelcome) return;

    // حذف هر نوار قبلی (برای اطمینان)
    var old = document.querySelector('.bonyad-toolbar');
    if (old) old.remove();

    // ساخت نوار جدید
    var toolbar = document.createElement('div');
    toolbar.className = 'bonyad-toolbar';

    if (!isHome) {
      var homeBtn = document.createElement('a');
      homeBtn.href = 'index.html';
      homeBtn.title = 'صفحه اصلی';
      homeBtn.textContent = '🏠';
      toolbar.appendChild(homeBtn);

      var backBtn = document.createElement('button');
      backBtn.title = 'برگشت';
      backBtn.textContent = '⬅️';
      backBtn.onclick = function(){ history.back(); };
      toolbar.appendChild(backBtn);
    }

    var themeBtn = document.createElement('button');
    themeBtn.title = 'تم شب/روز';
    themeBtn.textContent = '🌓';
    themeBtn.onclick = function() {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    };
    toolbar.appendChild(themeBtn);

    var langBtn = document.createElement('button');
    langBtn.title = 'تغییر زبان';
    langBtn.textContent = '🌐';
    langBtn.onclick = function() {
      var cur = localStorage.getItem('lang') || 'fa';
      var next = cur === 'fa' ? 'en' : 'fa';
      localStorage.setItem('lang', next);
      applyLangToAll(next);
    };
    toolbar.appendChild(langBtn);

    // قرار دادن نوار در بالای body (قبل از header)
    document.body.insertBefore(toolbar, document.body.firstChild);
  });

  // ===== ۴. سیستم ترجمه کامل =====
  var DICT = {
    'خوش آمدید':'Welcome',
    'کارشناس گرامی':'Dear Expert','پرسنل گرامی':'Dear Employee',
    'رئیس رفاه':'Welfare Chief','رئیس اکوسیستم':'Ecosystem Chief',
    'کاربر تست':'Test User','کارشناس تست':'Test Expert',
    'کارگزینی':'Personnel','آموزش':'Education','رفاه':'Welfare',
    'جبران خدمت':'Compensation','فناوری اطلاعات':'IT',
    'سوالی ثبت نشده است.':'No queries registered.',
    'موردی یافت نشد':'Nothing found','موردی ثبت نشده است.':'Nothing registered.',
    'درخواستی ثبت نکرده‌اید.':'You have no requests.',
    'هشدار جدیدی ندارید.':'No new alerts.',
    'در انتظار':'Pending','پاسخ داده شده':'Answered',
    'تایید شده':'Approved','رد شده':'Rejected','ارجاع به مدیرکل':'Referred to Director',
    'در انتظار بررسی':'Pending Review','سوال':'Query','درخواست':'Request','پاسخ':'Answer',
    'ارجاع به':'Referred to','نمره':'Score','وضعیت':'Status','استاد':'Instructor',
    'شروع':'Start','مدت':'Duration','ساعت':'Hours','دوره':'Course',
    'ثبت‌نام شده':'Enrolled','قبول':'Passed','تکمیل شده':'Completed',
    'سابقه آموزشی ثبت نشده است.':'No training records.','ابتدا وارد شوید.':'Please log in first.',
    'حکم شما همراه با مستندات ارسال شد':'Your decree has been sent',
    'مدیرکل پس از بررسی، نتیجه را اعلام می‌کند.':'The Director will announce the result after review.',
    'ثبت حکم دیگر':'Submit another','بازگشت به صفحه اصلی':'Back to Home',
    'پیش‌نمایش حکم نهایی':'Final Draft Preview',
    'مستندات پشتیبان را بارگذاری کنید':'Upload supporting documents',
    'فایلی انتخاب نشده':'No file selected','برای انتخاب فایل کلیک کنید':'Click to select file',
    'تایید و ارسال به مدیرکل':'Confirm & Send to Director','ویرایش پاسخ‌ها':'Edit Answers',
    'ورود':'Enter','ورود به بخش':'Enter Section',
    'تغییر حقوق':'Salary Change','تغییر پست':'Position Change',
    'بازنویسی کل':'Full Rewrite','اجرای حکم':'Execute Decree','ابلاغ':'Notify',
    'مزایا':'Benefits','حقوق':'Salary','پست':'Position','پایه':'Base',
    'صدور احکام':'Decree Issuance','دستیار احکام':'Decree Assistant',
    'مدیریت دستاوردها':'Achievements Management',
    'گزارش‌های اکوسیستم توانمندسازی':'Empowerment Ecosystem Reports',
    'درخواست‌های پرسنل':'Personnel Requests',
    'پنل مدیریت ارشد (مدیرکل)':'Senior Management Panel (Director)',
    'خلاصه وضعیت اداره کل':'Department Status Summary',
    'مدیریت اتوماسیون اداری':'Office Automation Management',
    'دستور به هوش تحلیل‌گر':'Command to Data Analyzer',
    'دریافت خروجی گزارش‌ها':'Export Reports',
    'تخصیص کد به مشاورین':'Assign Codes to Consultants',
    'ارسال دستور به مشاور':'Send Order to Consultant',
    'صدور کد اصلاح حکم':'Issue Decree Revision Code',
    'احکام جدید ارسالی':'New Decrees Submitted',
    'گزارش تحلیلی هم‌اندیشی':'Brainstorming Analytical Report',
    'گزارش‌های دریافتی از مشاورین':'Received Reports from Consultants',
    'موضوعات و نظرات':'Topics and Comments'
  };

  function translateText_OLD(text, lang) {
    if (!text || !text.trim()) return text;
    if (lang === 'fa') return text;
    var trimmed = text.trim();
    if (DICT[trimmed]) return text.replace(trimmed, DICT[trimmed]);
    for (var k in DICT) {
      if (trimmed.indexOf(k) !== -1) {
        return text.replace(k, DICT[k]);
      }
    }
    return text;
  }

  function walkAndTranslate(root, lang) {
    if (!root) return;
    var scope = (root.querySelectorAll) ? root : document.body;
    var els = scope.querySelectorAll('[data-fa]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var fa = el.getAttribute('data-fa');
      var en = el.getAttribute('data-en');
      if (!en) continue;
      el.textContent = (lang === 'fa') ? fa : en;
    }
    var walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, null, false);
    var node;
    while ((node = walker.nextNode())) {
      var t = node.nodeValue;
      if (!t || !t.trim()) continue;
      if (node.parentElement && node.parentElement.hasAttribute('data-fa')) continue;
      if (lang === 'en' && window.DICT && window.DICT[t.trim()]) {
        node.nodeValue = window.DICT[t.trim()];
      }
    }
  }

  function applyLangToAll(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'fa') ? 'rtl' : 'ltr';
  document.body.setAttribute('dir', (lang === 'fa') ? 'rtl' : 'ltr');

  // اعمال مستقیم روی همه data-fa
  var all = document.querySelectorAll('[data-fa]');
  for (var i = 0; i < all.length; i++) {
    var el = all[i];
    var fa = el.getAttribute('data-fa');
    var en = el.getAttribute('data-en') || fa;
    if (lang === 'fa') {
      el.textContent = fa;
    } else {
      el.textContent = en;
    }
  }

  // placeholder
  var allPh = document.querySelectorAll('[data-fa-placeholder]');
  for (var j = 0; j < allPh.length; j++) {
    var pel = allPh[j];
    var pfa = pel.getAttribute('data-fa-placeholder');
    var pen = pel.getAttribute('data-en-placeholder') || pfa;
    pel.placeholder = (lang === 'fa') ? pfa : pen;
  }

  // اعداد
  if (lang === 'en') {
    document.querySelectorAll('.stat-card .num, #achCounter, .progress-label').forEach(function(el) {
      el.textContent = el.textContent.replace(/[۰-۹]/g, function(d) { return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d); });
    });
  }
}

  window.applyLangToAll = applyLangToAll;
  window.toggleLang = function(){
    var next = localStorage.getItem('lang') === 'en' ? 'fa' : 'en';
    localStorage.setItem('lang', next);
    applyLangToAll(next);
    if (window.applyDynamicTranslations) applyDynamicTranslations(next);
  };
  window.toggleTheme = function(){
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  };

  // ===== ۵. رصد تغییرات DOM =====
  var observer = new MutationObserver(function(muts){
    var lang = localStorage.getItem('lang') || 'fa';
    muts.forEach(function(m){
      var _curLang = localStorage.getItem('lang') || 'fa';
      if (_curLang === 'en' && window.applyDynamicTranslations) { setTimeout(function(){ window.applyDynamicTranslations('en'); }, 50); }
      
      if (m.type === 'childList') {
        m.addedNodes.forEach(function(n){
          if (n.nodeType === 1) walkAndTranslate(n, lang);
        });
      }
    });
  });

  // ===== ۶. مقداردهی اولیه =====
  
function applyPartialTranslations(lang) {
  if (lang !== 'en' || !window.UI_TRANSLATIONS) return;
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  var node;
  var changed = false;
  while ((node = walker.nextNode())) {
    var t = node.nodeValue;
    if (!t || !t.trim()) continue;
    var newT = t;
    for (var key in window.UI_TRANSLATIONS) {
      if (newT.indexOf(key) !== -1) {
        newT = newT.split(key).join(window.UI_TRANSLATIONS[key]);
      }
    }
    if (newT !== t) { node.nodeValue = newT; changed = true; }
  }
  return changed;
}
window.addEventListener('DOMContentLoaded', function() {
    var lang = localStorage.getItem('lang') || 'fa';
    applyLangToAll(lang);
    if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');
    if (window.applyDynamicTranslations) setTimeout(function(){ window.applyDynamicTranslations(lang); }, 100);
    applyPartialTranslations(lang);
    observer.observe(document.body, { childList:true, subtree:true });
  });

  
// ===== دیکشنری ترجمه پویا =====
window.DYNAMIC_DICT = {
  'شاخص رضایت کارکنان': 'Employee Satisfaction Index',
  '(کلیک برای جزئیات ▾)': '(Click for details ▾)',
  'میانگین کل': 'Overall Average',
  'صفحه': 'Page',
  'میانگین': 'Average',
  'درصد': 'Percent',
  'تعداد': 'Count',
  'پنل مدیریت': 'Admin Panel',
  'دستیار احکام': 'Decree Assistant',
  'صفحه اصلی': 'Home',
  'اکوسیستم توانمندسازی': 'Empowerment Ecosystem',
  'کارگزینی شخصی': 'My Personnel',
  'کارگزینی هوشمند': 'Smart Personnel',
  'میز رئیس رفاه': 'Welfare Chief Desk',
  '— ابتدا مشاور اضافه کنید —': '— Please add a consultant first —',
  '📨 ارسال دستور': '📨 Send Order',
  'توجه مهم': 'Important Note',
  'برای جلوگیری از پر شدن حافظه مرورگر، لطفاً فایل‌ها': 'To avoid filling browser storage, please',
  'عکس': 'Image',
  'ویدیو/موشن/پادکست': 'Video/Motion/Podcast',
  'پاورپوینت': 'PowerPoint',
  'به PDF تبدیل کنید و سپس فشرده کنید.': 'Convert to PDF and compress.',
  'حجم پیشنهادی هر فایل': 'Recommended file size',
  'حداکثر ۵۰۰ کیلوبایت — وگرنه ذخیره‌سازی ممکن است با': 'Max 500 KB — otherwise storage may',
  '🖼️ عکس': '🖼️ Image',
  '🎥 ویدیو': '🎥 Video',
  '📊 پاورپوینت': '📊 PowerPoint',
  '🎞️ موشن‌گرافی': '🎞️ Motion Graphics',
  '🎙️ پادکست': '🎙️ Podcast',
  'مشاهده گزارش': 'View Report',
  'هنوز': 'No',
  'ثبت شد': 'registered',
  'نظر': 'comment',
  'نظرات': 'comments',
  'برای تست: 1001': 'For test: 1001',
  'کلیک برای': 'Click for',
  'جزئیات': 'details',
  'کلیک': 'Click',
  'نمایش': 'Show',
  'پنهان': 'Hide'
};

window.applyDynamicTranslations = function(lang) {
  var isEn = (lang === 'en');
  var dict = window.DYNAMIC_DICT;
  var reverse = {};
  if (!isEn) {
    for (var k in dict) { reverse[dict[k]] = k; }
  }
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  var node, changed = 0;
  while ((node = walker.nextNode())) {
    var t = node.nodeValue;
    if (!t || !t.trim()) continue;
    var newT = t;
    var source = isEn ? dict : reverse;
    for (var key in source) {
      if (newT.indexOf(key) !== -1) {
        newT = newT.split(key).join(source[key]);
      }
    }
    if (newT !== t) { node.nodeValue = newT; changed++; }
  }
  return changed;
};

window.DYNAMIC_DICT['📊 خلاصه وضعیت اداره کل'] = '📊 Department Status Summary';
window.DYNAMIC_DICT['🏆 مدیریت دستاوردها'] = '🏆 Achievements Management';
window.DYNAMIC_DICT['📨 درخواست‌های پرسنل'] = '📨 Personnel Requests';
window.DYNAMIC_DICT['احکام صادر شده امروز'] = 'Decrees issued today';
window.DYNAMIC_DICT['درخواست‌های مرخصی در انتظار'] = 'Pending leave requests';
window.DYNAMIC_DICT['دوره‌های آموزشی فعال'] = 'Active training courses';
window.DYNAMIC_DICT['۱۲ حکم'] = '12 decrees';
window.DYNAMIC_DICT['۵ مورد'] = '5 cases';
window.DYNAMIC_DICT['۳ دوره'] = '3 courses';
window.DYNAMIC_DICT['از ۵'] = 'out of 5';
window.DYNAMIC_DICT['میانگین'] = 'Average';
window.DYNAMIC_DICT['درصد'] = 'Percent';
window.DYNAMIC_DICT['تعداد'] = 'Count';
window.DYNAMIC_DICT['صفحه'] = 'Page';
window.DYNAMIC_DICT['Overall Average'] = 'میانگین کل';
window.DYNAMIC_DICT['دستاوردها و افتخارات اداره کل را به صفحه اصلی ارسال کنید'] = 'Submit department achievements to the home page';
window.DYNAMIC_DICT['توجه مهم'] = 'Important Note';
window.DYNAMIC_DICT['را قبل از آپلود با ابزارهای فشرده‌سازی کوچک کنید'] = 'before uploading';
window.DYNAMIC_DICT['(رایگان)'] = '(free)';
window.DYNAMIC_DICT['یا'] = 'or';
window.DYNAMIC_DICT['خطا مواجه شود'] = 'encounter an error';
window.DYNAMIC_DICT['عنوان دستاورد'] = 'Achievement Title';
window.DYNAMIC_DICT['توضیح دستاورد'] = 'Achievement Description';
window.DYNAMIC_DICT['(اختیاری)'] = '(optional)';
window.DYNAMIC_DICT['نام فرد/واحد'] = 'Person/Unit Name';
window.DYNAMIC_DICT['هنوز دستاوردی ثبت نشده است'] = 'No achievement registered yet';
window.DYNAMIC_DICT['هنوز موضوعی ایجاد نشده است'] = 'No topic created yet';
window.DYNAMIC_DICT['هنوز مشاوری ثبت نشده است'] = 'No consultant registered yet';
window.DYNAMIC_DICT['هنوز کدی صادر نشده است'] = 'No code issued yet';
window.DYNAMIC_DICT['هنوز درخواستی از پرسنل دریافت نشده است'] = 'No request received yet';
window.DYNAMIC_DICT['هنوز حکمی ارسال نشده است'] = 'No decree submitted yet';
window.DYNAMIC_DICT['هنوز گزارشی دریافت نشده است'] = 'No report received yet';
window.DYNAMIC_DICT['گزارشی از اکوسیستم دریافت نشده است'] = 'No report from the ecosystem';
window.DYNAMIC_DICT['موضوعات هم‌اندیشی و نظرات کارکنان را مدیریت کنید'] = 'Manage brainstorming topics and employee comments';
window.DYNAMIC_DICT['عنوان موضوع هم‌اندیشی'] = 'Brainstorming Topic Title';
window.DYNAMIC_DICT['شرح موضوع'] = 'Topic Description';
window.DYNAMIC_DICT['No file chosen'] = 'فایلی انتخاب نشده';

console.log('✅ ui-helper.js v3 بارگذاری شد');
})();
