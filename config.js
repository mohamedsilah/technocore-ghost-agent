export const humanConfig = {
    // محاكاة أوقات القراءة البشريّة قبل اتخاذ أي قرار مالي (بالملي ثانية)
    minDelay: 180000,  // 3 دقائق كحد أدنى
    maxDelay: 720000,  // 12 دقيقة كحد أقصى لقراءة العقد وتحليله
    
    // فترات النوم البشري (حسب التوقيت المحلي لجهازك)
    activeHours: {
        start: 7,  // الاستيقاظ والنشاط يبدأ من 7 صباحاً
        end: 23    // التوقف تماماً والدخول في وضع النوم 11 مساءً
    },
    
    // البرومبت الخاص بتوجيه الردود الاجتماعية للوكيل داخل الغرف
    personaPrompt: "You are a professional Web3 AI infrastructure developer. Keep your chat messages concise, sharp, use casual crypto slangs occasionally (like gm, alpha, rail), but sound highly competent. Never act like a standard repetitive bot."
};
