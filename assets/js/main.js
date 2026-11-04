document.addEventListener('DOMContentLoaded', function() {
    
    // مدیریت Splash Screen (نمایش ۳ ثانیه‌ای)
    const splash = document.getElementById('splashScreen');
    
    setTimeout(function() {
        if (splash) {
            splash.classList.add('hidden');
            // حذف کامل المان از DOM پس از پایان انیمیشن
            setTimeout(function() {
                if (splash.parentNode) {
                    splash.parentNode.removeChild(splash);
                }
            }, 1000);
        }
    }, 3000);

    // در اینجا می‌توانید منطق‌های تعاملی دیگر مانند باز کردن مودال چت را اضافه کنید
    const assistantBtn = document.querySelector('.assistant-btn');
    if (assistantBtn) {
        assistantBtn.addEventListener('click', function() {
            alert('دستیار هوشمند در حال آماده‌سازی است... (این یک نمونه اولیه است)');
        });
    }
});