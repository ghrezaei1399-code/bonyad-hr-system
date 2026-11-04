/* ============================================================
   Smart Assistant — دستیار هوشمند ترکیبی
   ترکیب: HR Assistant (پاسخ‌گویی) + Search Agent (جستجو)
   آماده اتصال به API واقعی در آینده
   ============================================================ */

// ===== تنظیمات اتصال به API (برای آینده) =====
// در GitHub، مهندسی فناوری این را با اطلاعات واقعی پر می‌کند
const AI_CONFIG = {
  enabled: false,            // الان false — بعداً true می‌شود
  endpoint: '',              // آدرس API
  apiKey: '',                // کلید API
  model: 'gpt-4o-mini'       // نام مدل
};

// ===== تابع اتصال به API واقعی =====
async function callAI(query, context) {
  if (!AI_CONFIG.enabled || !AI_CONFIG.endpoint) {
    return null; // API وصل نشده
  }
  try {
    const response = await fetch(AI_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + AI_CONFIG.apiKey
      },
      body: JSON.stringify({
        model: AI_CONFIG.model,
        messages: [
          {
            role: 'system',
            content: 'تو دستیار هوشمند اداره کل سرمایه انسانی بنیاد شهید هستی. بر اساس اطلاعات زیر به سوال کاربر پاسخ بده:\n\n' + JSON.stringify(context)
          },
          { role: 'user', content: query }
        ]
      })
    });
    const data = await response.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (e) {
    console.warn('AI API error:', e);
    return null;
  }
}
// ===== Search Agent — جستجوی واقعی بدون لیست از پیش تعریف‌شده =====
function searchSiteKnowledge(query) {
  if (typeof SITE_KNOWLEDGE === 'undefined' || !SITE_KNOWLEDGE.pages) {
    return '⚠️ دانش سایت در دسترس نیست. لطفاً مطمئن شوید assets/js/site_knowledge.js در همان پوشه index.html قرار دارد.';
  }

  const q = query.trim().toLowerCase();
  const words = q.replace(/[؟?!.,،؛:]/g, ' ').split(/\s+/).filter(w => w.length > 1);
  if (words.length === 0) return 'لطفاً سوال خود را بنویسید.';

  // ===== ۱) جستجو در متن کامل صفحات =====
  const pageResults = [];
  for (const [pageFile, pageData] of Object.entries(SITE_KNOWLEDGE.pages)) {
    if (pageData.excluded) continue;
    // کل متن صفحه را به یک رشته تبدیل کن
    const fullText = (
      pageData.title + ' ' +
      pageData.description + ' ' +
      (pageData.keywords || []).join(' ') + ' ' +
      (pageData.sections || []).join(' ')
    ).toLowerCase();

    // امتیاز: تعداد کلماتی از سوال که در متن صفحه هست
    let score = 0;
    const matchedWords = [];
    words.forEach(w => {
      if (fullText.includes(w)) {
        score += 2;
        matchedWords.push(w);
      }
    });

    if (score > 0) {
      pageResults.push({ pageFile, pageData, score, matchedWords });
    }
  }
  pageResults.sort((a, b) => b.score - a.score);

  // ===== ۲) جستجو در تمام کلیدهای localStorage =====
  // هیچ لیست از پیش تعریف‌شده‌ای نیست — همه کلیدهای hr_* را می‌گردد
  const dataResults = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith('hr_')) continue;

    try {
      const data = JSON.parse(localStorage.getItem(key));
      if (!Array.isArray(data) || data.length === 0) continue;

      // کل متن داده‌ها را به رشته تبدیل کن
      const dataText = JSON.stringify(data).toLowerCase();

      // امتیاز: تعداد کلمات سوال که در داده‌ها هست
      let score = 0;
      words.forEach(w => {
        if (dataText.includes(w)) score += 1;
      });

      if (score > 0) {
        dataResults.push({ key, count: data.length, score, sample: data[0] });
      }
    } catch (e) { /* skip */ }
  }
  dataResults.sort((a, b) => b.score - a.score);

  // ===== ۳) ساخت پاسخ از نتایج =====
  // اولویت: صفحه‌ای که بیشترین تطابق را دارد
  if (pageResults.length > 0 && pageResults[0].score >= 2) {
    const best = pageResults[0].pageData;
    let response = `📄 **${best.title}**\n\n${best.description}\n\n`;
    if (!best.ready) response += `⏳ این بخش در حال ساخت است.\n\n`;
    response += `🔗 دسترسی: از دکمه «${best.title}» در صفحه اصلی.`;
    return response;
  }

  // بعد: داده‌هایی که بیشترین تطابق را دارند
  if (dataResults.length > 0) {
    let response = `📊 **اطلاعات مرتبط در سیستم:**\n\n`;
    dataResults.slice(0, 5).forEach(r => {
      const label = keyToLabel(r.key);
      response += `• ${label}: ${r.count} مورد ثبت شده\n`;
    });
    response += `\nبرای جزئیات بیشتر، به بخش مربوطه در صفحه اصلی مراجعه کنید.`;
    return response;
  }

  return 'متأسفم، پاسخ دقیقی در دانش سایت پیدا نکردم. می‌توانید سوال خود را با کلمات دیگری مطرح کنید.';
}

// تبدیل کلید localStorage به برچسب فارسی
function keyToLabel(key) {
  const map = {
    'hr_consultants': 'مشاورین',
    'hr_tasks': 'دستورات',
    'hr_reports': 'گزارش‌ها',
    'hr_brainstorm_topics': 'موضوعات هم‌اندیشی',
    'hr_brainstorm_ideas': 'نظرات هم‌اندیشی',
    'hr_personnel': 'پرونده‌های پرسنلی',
    'hr_pending_decrees': 'احکام',
    'hr_decree_editors': 'کدهای اصلاح حکم',
    'hr_leaves': 'مرخصی‌ها',
    'hr_admin_requests': 'درخواست‌های اداری',
    'hr_personal_queries': 'سوالات پرسنل',
    'hr_learning_messages': 'پیام‌های آموزشی',
    'hr_learning_requests': 'درخواست‌های آموزشی',
    'hr_learning_results': 'نتایج آموزشی',
    'hr_ican_cases': 'موارد توانمندی',
    'hr_knowledge_entries': 'دانش‌های ثبت‌شده',
    'hr_knowledge_outputs': 'محتوهای تولیدشده',
    'hr_surveys': 'نظرسنجی‌ها',
    'hr_settings': 'تنظیمات'
  };
  return map[key] || key;
}

// ===== تابع اصلی — ترکیب API + جستجو =====
async function smartAssistantRespond(query) {
  const q = query.trim();
  if (!q) return 'لطفاً سوال خود را بنویسید.';

  // سلام و احوال‌پرسی
  if (/^(سلام|درود|خوش آمدید|hi|hello)/i.test(q)) {
    return 'سلام! به سامانه یکپارچه سرمایه انسانی خوش آمدید. من دستیار هوشمند شما هستم — ترکیبی از HR Assistant و Search Agent. به تمام صفحات و داده‌های سایت (به‌جز داشبورد مدیریت) دسترسی دارم. سوال خود را بپرسید. 🌟';
  }
  if (/^(ممنون|تشکر|سپاس|thanks)/i.test(q)) {
    return 'خواهش می‌کنم! در خدمت شما هستم. اگر سوال دیگری دارید، بپرسید. 🌟';
  }

  // ۱) اول API واقعی (اگر وصل شده باشد)
  try {
    const aiAnswer = await callAI(q, SITE_KNOWLEDGE);
    if (aiAnswer) return aiAnswer;
  } catch (e) {
    // API خطا داد — برو سراغ جستجو
  }

  // ۲) اگر API نبود، Search Agent جستجو می‌کند
  return searchSiteKnowledge(q);
}

// ===== صدور به window برای استفاده در index.html =====
window.getBotResponse = smartAssistantRespond;
window.smartAssistantRespond = smartAssistantRespond;
window.callAI = callAI;
window.searchSiteKnowledge = searchSiteKnowledge;
window.AI_CONFIG = AI_CONFIG;