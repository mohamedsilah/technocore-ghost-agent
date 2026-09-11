import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// استدعاء حزمة الشبكة بشكل آمن ومتوافق مع الموديلات الحديثة
const tclk = require('@flop-labs/tclk');

async function getPoints() {
    const myDID = "did:key:z6Mkvca4sCpn6pK6Xs7KfnGSoxC7h9XdyqL8HS15JtParuqA";
    
    console.log("🔄 جاري التوصيل بالشبكة وفحص الرصيد للـ DID الخاص بك...");
    
    try {
        // الاتصال بموثق الشبكة وجلب الرصيد الإجمالي
        const balanceInfo = await tclk.getBalance(myDID);
        
        console.log("\n================================================");
        console.log(`✅ تم جلب البيانات بنجاح لـ: ${myDID}`);
        console.log(`💰 إجمالي النقاط المحصودة (Total Reward Points): ${balanceInfo.points || 0}`);
        console.log(`🎮 عدد الصفقات الناجحة (Total Settled Deals): ${balanceInfo.dealsCount || 0}`);
        console.log("================================================\n");
        
    } catch (error) {
        console.error("❌ حدث خطأ أثناء جلب الرصيد من الشبكة:", error.message);
    }
}

getPoints();
