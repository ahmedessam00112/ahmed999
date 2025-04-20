// قايمة المواد (6 مواد: رياضة 1، رياضة 2، فيزياء، كيمياء، إنجليزي، عربي)
const subjects = [
    { name: "رياضة 1", lessons: Array.from({length: 30}, (_, i) => `درس ${i + 1} - رياضة 1`), reviews: Array.from({length: 4}, (_, i) => `مراجعة ${i + 1} - رياضة 1`) },
    { name: "رياضة 2", lessons: Array.from({length: 30}, (_, i) => `درس ${i + 1} - رياضة 2`), reviews: Array.from({length: 4}, (_, i) => `مراجعة ${i + 1} - رياضة 2`) },
    { name: "فيزياء", lessons: Array.from({length: 30}, (_, i) => `درس ${i + 1} - فيزياء`), reviews: Array.from({length: 4}, (_, i) => `مراجعة ${i + 1} - فيزياء`) },
    { name: "كيمياء", lessons: Array.from({length: 30}, (_, i) => `درس ${i + 1} - كيمياء`), reviews: Array.from({length: 4}, (_, i) => `مراجعة ${i + 1} - كيمياء`) },
    { name: "إنجليزي", lessons: Array.from({length: 30}, (_, i) => `درس ${i + 1} - إنجليزي`), reviews: Array.from({length: 4}, (_, i) => `مراجعة ${i + 1} - إنجليزي`) },
    { name: "عربي", lessons: Array.from({length: 30}, (_, i) => `درس ${i + 1} - عربي`), reviews: Array.from({length: 4}, (_, i) => `مراجعة ${i + 1} - عربي`) }
];

// جدول يومي ديناميكي (8 وحدات يوميًا موزعة على 5 حصص مع ساعات واضحة)
function generateDailySchedule() {
    const scheduleDiv = document.getElementById("daily-schedule");
    const day = Math.floor((Date.now() - new Date("April 20, 2025").getTime()) / (1000 * 60 * 60 * 24));
    const lessonIndex = day % 30; // لأن كل مادة عندها 30 درس
    const reviewIndex = Math.floor(day / 7) % 4; // مراجعة كل أسبوع
    let scheduleHtml = `
        <h3>حصة 1 (7:00 ص - 10:00 ص)</h3>
        <ul>
            <li><input type="checkbox"> ${subjects[0].lessons[lessonIndex]} </li>
            <li><input type="checkbox"> ${subjects[2].lessons[lessonIndex]} </li>
        </ul>
        <h3>حصة 2 (10:30 ص - 1:30 م)</h3>
        <ul>
            <li><input type="checkbox"> ${subjects[3].lessons[lessonIndex]} </li>
        </ul>
        <h3>حصة 3 (2:00 م - 5:00 م)</h3>
        <ul>
            <li><input type="checkbox"> ${subjects[4].lessons[lessonIndex]} </li>
            <li><input type="checkbox"> ${subjects[5].lessons[lessonIndex]} </li>
        </ul>
        <h3>حصة 4 (5:30 م - 8:30 م)</h3>
        <ul>
            <li><input type="checkbox"> ${subjects[1].lessons[lessonIndex]} </li>
        </ul>
        <h3>حصة 5 (9:00 م - 12:00 ص)</h3>
        <ul>
            <li><input type="checkbox"> ${subjects[0].reviews[reviewIndex]} </li>
            <li><input type="checkbox"> ${subjects[1].reviews[reviewIndex]} </li>
        </ul>
    `;
    scheduleDiv.innerHTML = scheduleHtml;
}
generateDailySchedule();

// عداد الامتحانات
const examDate = new Date("June 15, 2025 00:00:00").getTime();
function updateCountdown() {
    const now = new Date().getTime();
    const distance = examDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById("countdown").innerText = `فاضل ${days} يوم على الامتحانات!`;
}
setInterval(updateCountdown, 1000 * 60 * 60 * 24);
updateCountdown();

// تتبع التقدم
let completedLessons = 0;
let completedReviews = 0;
function updateProgress() {
    const checkboxes = document.querySelectorAll("#daily-schedule input:checked");
    checkboxes.forEach(checkbox => {
        if (!checkbox.dataset.counted) {
            if (checkbox.parentElement.textContent.includes("مراجعة")) {
                completedReviews++;
            } else {
                completedLessons++;
            }
            checkbox.dataset.counted = "true";
        }
    });
    document.getElementById("lessons").innerText = `${completedLessons}/180`;
    document.getElementById("reviews").innerText = `${completedReviews}/24`;
    const progress = ((completedLessons + completedReviews) / 204) * 100;
    document.getElementById("progress-bar").style.width = `${progress}%`;

    // المكافآت
    const stars = Math.floor(completedLessons / 10);
    document.getElementById("rewards").innerText = `المكافآت: ${stars} نجمة 🌟`;
}

// Pomodoro Timer (3 ساعات لكل حصة)
function startPomodoro() {
    let time = 3 * 60 * 60; // 3 ساعات
    const timer = setInterval(() => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        document.getElementById("pomodoro").innerText = `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        time--;
        if (time < 0) {
            clearInterval(timer);
            document.getElementById("pomodoro").innerText = "خلّصت الحصة! خد استراحة! 😎";
        }
    }, 1000);
}

// تحفيز يومي
const quotes = [
    "وَتَوَكَّلْ عَلَى اللَّهِ",
    "سَنُرِيهِمْ آيَاتِنَا فِي الْآفَاقِ",
    "إِنَّ مَعَ الْعُسْرِ يُسْرًا"
];
const blessings = [
    "الحمد لله على نعمة الوقت!",
    "الحمد لله على نعمة العقل!",
    "الحمد لله على نعمة الصحة!"
];
function updateMotivation() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)];
    document.getElementById("quote").innerText = randomQuote;
    document.getElementById("blessing").innerText = randomBlessing;
}
updateMotivation();
setInterval(updateMotivation, 1000 * 60 * 60 * 24);

// ربط بالهاردوير
const hardwareLinks = {
    "رياضة 1": "التفاضل: بيستخدم في تصميم الروبوتات!",
    "رياضة 2": "المتجهات: بتستخدم في برمجة الأجهزة!",
    "فيزياء": "الكهرباء: الدوائر دي زي اللي في معالج الكمبيوتر!",
    "كيمياء": "التفاعلات: بتستخدم في تصنيع البطاريات!",
    "إنجليزي": "اللغة: هتساعدك تفهم كتالوجات الأجهزة!",
    "عربي": "البلاغة: بتساعدك توصل أفكارك زي تصميم دائرة!"
};
function updateHardwareLink() {
    const day = Math.floor((Date.now() - new Date("April 20, 2025").getTime()) / (1000 * 60 * 60 * 24));
    const subject = subjects[day % subjects.length].name;
    document.getElementById("hardware-link").innerText = hardwareLinks[subject] || "ذاكر بجد، وهتلاقي الهاردوير في كل حاجة!";
}
updateHardwareLink();