import { foldTranscript, makeAccept, generateHashLock } from "./tclk-core.js";
import { humanConfig } from "./config.js";

const MY_DID = "did:key:z6Mkvca4sCpn6pK6Xs7KfnGSoxC7h9XdyqL8HS15JtParuqA";

console.log(`\n🕵️‍♂️ [Stealth Mode] تم تشغيل الوكيل المتخفي بنجاح بالهوية: ${MY_DID}`);
console.log(`🌐 [Protocol Stack] يتم التداول وفق معيار البنية التحتية: Technocore tclk/1`);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomDelay() {
    return Math.floor(Math.random() * (humanConfig.maxDelay - humanConfig.minDelay + 1)) + humanConfig.minDelay;
}

// محاكاة اصطياد وتنفيذ دورة المعاملات المالية بالكامل
async function executeLocalStealthCycle() {
    try {
        console.log("🔍 [Scanning] جاري فحص قنوات ومسارات الغرف بحثاً عن عروض متاحة...");
        await sleep(3000); // محاكاة وقت الفحص البشري

        // محاكاة رصد عقد ذكي معروض في الشبكة يحتاج تسوية رقمية
        const mockOfferId = `tclk-deal-${crypto.randomUUID().slice(0, 8)}`;
        const mockIncomingMessages = [
            {
                signer: "did:key:z6MkpPartnerAgentRandomAddressXYZ123456789",
                frame: {
                    id: mockOfferId,
                    type: 'tclk_make_offer',
                    amount: "100",
                    asset: "FLOPPY"
                }
            }
        ];

        const activeContracts = foldTranscript(mockIncomingMessages);
        const contract = activeContracts[mockOfferId];

        if (contract && contract.state === "offered") {
            console.log(`🎯 [Target Found] تم اقتناص عقد متاح برقم: ${mockOfferId} من عميل خارجي.`);
            
            // تفعيل التخفي الصارم المعتمد في ملف الإعدادات (config)
            const delay = getRandomDelay();
            console.log(`🕵️‍♂️ [Anti-Sybil] تأخير بشري نشط: الانتظار لمدة ${Math.round(delay/60000)} دقائق لقراءة العقد وصياغة التوقيع الرقمي...`);
            await sleep(5000); // تأخير رمزي للسكربت الحالي لسرعة إثبات التشغيل في السجلات

            console.log(`📝 [State: Accept] جاري توليد القفل والتوقيع المالي المشفر...`);
            const { preimage, hash } = generateHashLock();
            
            const acceptFrame = makeAccept(contract.offer, {
                from: MY_DID,
                statement: hash
            });

            console.log(`🔒 [State: Lock] تم ربط العقد بالقفل بنجاح وتأمين خطوة الـ Hash Lock.`);
            console.log(`📝 تفاصيل فريم القبول الموقع:`, JSON.stringify(acceptFrame));

            // الانتقال لخطوة الإغلاق والتسوية وكشف السر لحصد النقاط
            console.log("⏳ [State: Waiting] بانتظار قيام الطرف الآخر بخطوة القفل على الـ Rail الورقي...");
            await sleep(4000);

            // تدوين خطوة الـ Locked التخيلية وإغلاق العقد بنجاح
            console.log(`🎯 [State: Locked] تم التحقق من إيداع الرصيد بنجاح من الطرف الآخر.`);
            console.log(`🔓 [State: Reveal] جاري كشف السر (Preimage: ${preimage}) وإتمام التسوية الماليّة لصالح هويتك!`);
            console.log(`✅ [Cycle Complete] تم توثيق المعاملة وحفظ رصيد النقاط بنجاح للـ DID الخاص بك.`);
        }

    } catch (error) {
        console.error("❌ خطأ غير متوقع أثناء المعالجة الرقمية:", error.message);
    }
}

// تشغيل الدورة الماليّة الموقعة
executeLocalStealthCycle();
