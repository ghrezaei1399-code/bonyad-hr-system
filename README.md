# سامانه یکپارچه اداره کل سرمایه انسانی

نمونه اولیه (Prototype) سامانه یکپارچه اداره کل سرمایه انسانی بنیاد شهید و امور ایثارگران.

## درباره پروژه

این سامانه بر اساس نظریه‌های هوشمندسازی منابع انسانی، با هدف تبدیل کارگزینی از یک واحد «پردازشگر احکام» به «مرکز تحلیل و تصمیم‌یاری» طراحی شده است.

## فناوری‌ها

- HTML/CSS/JavaScript خالص
- ذخیره‌سازی: localStorage
- کتابخانه نمودار: Chart.js
- فونت: Vazirmatn

## صفحات

| صفحه | توضیح |
|---|---|
| `index.html` | صفحه اصلی و دستیار هوشمند |
| `smart_wayfinder.html` | مسیریاب هوشمند اداره کل |
| `admin.html` | پنل مدیریت ارشد |
| `personnel_hub.html` | کارگزینی |
| `smart_hr.html` | کارگزینی هوشمند |
| `my_hr.html` | کارگزینی شخصی |
| `welfare_chief.html` | میز رئیس رفاه |
| `decrees.html` | دستیار احکام |
| `brainstorming.html` | هم‌اندیشی |
| `consultants.html` | مشاورین |
| `smart_bank.html` | بانک هوشمندسازی |
| `learning_ecosystem.html` | اکوسیستم توانمندسازی |
| `learning_guide.html` | راهنمای توانمندسازی |
| `steering_committee.html` | کمیته راهبری |

## ساختار فایل‌ها

bonyad-hr-system/
├── index.html
├── admin.html
├── ...
├── assets/
│ ├── js/
│ │ ├── i18n.js
│ │ ├── site_knowledge.js
│ │ └── smart_assistant.js
│ └── data/
│ └── achievements.json
├── logo.png
├── poster1.png
└── poster2.png

## اجرای محلی

```bash
python -m http.server 8000
bonyad-hr-system/
├── index.html
├── admin.html
├── ...
├── assets/
│ ├── js/
│ │ ├── i18n.js
│ │ ├── site_knowledge.js
│ │ └── smart_assistant.js
│ └── data/
│ └── achievements.json
├── logo.png
├── poster1.png
└── poster2.png

text

## اجرای محلی

```bash
python -m http.server 8000
سپس در مرورگر:

text
http://localhost:8000/
استقرار
سایت روی GitHub Pages منتشر می‌شود:

text
https://ghrezaei1399.github.io/bonyad-hr-system/
کدهای دسترسی نمونه
نقش	کد
پرسنل	1001 تا 1005
رئیس اکوسیستم	1002
رئیس رفاه	1003
کمیته راهبری	SC-101
مدیرکل	رمز admin
وضعیت
نمونه اولیه (Prototype) — در حال توسعه.

مجوز
این پروژه نمونه اولیه داخلی است.
