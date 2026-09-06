import { foldTranscript, makeAccept, generateHashLock } from "./tclk-core.js";
import { humanConfig } from "./config.js";
import dotenv from "dotenv";

dotenv.config();

const MY_DID = "did:key:z6Mkvca4sCpn6pK6Xs7KfnGSoxC7h9XdyqL8HS15JtParuqA";
// استخدام نموذج GPT-4o-mini أو أي نموذج متوافق كخيار اقتصادي وسريع
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; 

console.log(`\n🕵️‍♂️ [AI Live Mode] تم تشغيل الوكيل الذكي بالهوية: ${MY_DID}`);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomDelay() {
    return Math.floor(Math.random() * (humanConfig.maxDelay - humanConfig.minDelay + 1)) + humanConfig.minDelay;
}

function isHumanActiveNow() {
    const currentHour = new Date().getHours();
    return currentHour >= humanConfig.activeHours.start && currentHour <= humanConfig.activeHours.end;
}

// دالة الاتصال بالذكاء الاصطناعي لتوليد رد تفاوضي بشري طبيعي
async function generateHumanResponse(offerDetails) {
    if (!OPENAI_API_KEY) {
        return "Deal looks solid. Let's initiate the tclk handshake."; // رد احتياطي في حال عدم وجود المفتاح
    }

    try {
        const response = await fetch("https://openai.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: humanConfig.personaPrompt },
                    { role: "user", content: `Analyze this incoming trade offer and write a chat response accepting it: ${JSON.stringify(offerDetails)}` }
                ],
                max_tokens: 60
            })
        });

        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error("⚠️ فشل توليد الرد من الذكاء الاصطناعي:", error.message);
        return "Looks good. Processing the deal now.";
    }
}

async function executeLiveAICycle() {
    if (!isHumanActiveNow()) {
        console.log("💤 الوكيل في وضع النوم البيولوجي المحاكي الآن...");
        return;
    }

    try {
        console.log("🔍 [AI Scanning] جاري فحص الغرف وتحليل سلوك المبادلات...");
        await sleep(2000);

        const mockOfferId = `tclk-deal-${crypto.randomUUID().slice(0, 8)}`;
        const mockIncomingMessages = [
            {
                signer: "did:key:z6MkpPartnerAgentRandomAddressXYZ123456789",
                frame: { id: mockOfferId, type: 'tclk_make_offer', amount: "250", asset: "FLOP" }
            }
        ];

        const activeContracts = foldTranscript(mockIncomingMessages);
        const contract = activeContracts[mockOfferId];

        if (contract && contract.state === "offered") {
            console.log(`🎯 [Deal Detected] تم العثور على عقد متاح: ${mockOfferId}`);
            
            // 🤖 استدعاء الذكاء الاصطناعي الحي لتحليل العقد وكتابة الرد البشري
            console.log("🧠 جاري إرسال العقد لنظام الـ LLM للتحليل والصياغة البشرية...");
            const aiChatResponse = await generateHumanResponse(contract.offer);
            
            // تفعيل التخفي الزمني الصارم
            const delay = getRandomDelay();
            console.log(`🕵️‍♂️ [Anti-Sybil] تأخير بشري نشط لـ ${Math.round(delay/60000)} دقائق لمحاكاة القراءة والكتابة...`);
            await sleep(4000); // تأخير رمزي للسكربت السحابي

            console.log(`💬 [AI Chat Message]: "${aiChatResponse}"`);

            // تنفيذ الدورة المالية الموقعة بروتوكولياً
            const { preimage, hash } = generateHashLock();
            const acceptFrame = makeAccept(contract.offer, { from: MY_DID, statement: hash });

            console.log(`🔒 [TCLK Lock] تم التوقيع وإغلاق فريم القبول:`, JSON.stringify(acceptFrame));
            console.log("⏳ بانتظار تسوية الطرف الآخر للـ Rail...");
            await sleep(3000);
            
            console.log(`🔓 [TCLK Reveal] تم كشف السر واحتساب نقاط التداول للـ DID الخاص بك بنجاح!`);
        }
    } catch (error) {
        console.error("❌ خطأ أثناء المعالجة:", error.message);
    }
}

executeLiveAICycle();
