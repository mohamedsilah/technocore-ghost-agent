import { foldTranscript, makeAccept, generateHashLock } from "./tclk-core.js";
import { humanConfig } from "./config.js";
import dotenv from "dotenv";

// تفعيل قراءة ملف المتغيرات السرية
dotenv.config();

const MY_DID = "did:key:z6Mkvca4sCpn6pK6Xs7KfnGSoxC7h9XdyqL8HS15JtParuqA";
// تحديث الرابط إلى خادم الـ MCP المخصص للوكلاء الذكيين لمنع الحظر
const TECHNOCORE_MCP = "https://technocore.chat";

console.log(`\n🕵️‍♂️ تم تشغيل الوكيل المتخفي بنجاح بالهوية: ${MY_DID}`);

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

// دالة مراقبة غرف العقود عبر بروتوكول MCP
async function monitorAndCatchOffers() {
    if (!isHumanActiveNow()) {
        console.log("💤 الوكيل في وضع النوم البشري المحاكي الآن... سيعاود النشاط في الصباح.");
        return;
    }

    try {
        console.log("🔍 [MCP Connect] جاري مراقبة غرفة العروض العامة tclk-offers عبر خادم الوكلاء...");
        
        // الاتصال الذكي بخادم الـ MCP لجلب الرسائل بصيغة متوافقة مع البوتات البشريّة
        const response = await fetch(`${TECHNOCORE_MCP}/rooms/tclk-offers/messages`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'X-Agent-DID': MY_DID
            }
        });
        
        if (!response.ok) throw new Error(`خادم MCP استجاب برمز خطأ: ${response.status}`);
        
        const messages = await response.json();
        const activeContracts = foldTranscript(messages);
        
        for (const [contractId, contractState] of Object.entries(activeContracts)) {
            if (contractState.state === "offered" && contractState.from !== MY_DID) {
                console.log(`🎯 [MCP Sync] تم رصد فرصة عقد متاحة برقم: ${contractId}`);
                
                const delay = getRandomDelay();
                console.log(`🕵️‍♂️ وضع التخفي نشط: الانتظار لمدة ${Math.round(delay/60000)} دقائق قبل الرد وتوقيع القبول...`);
                await sleep(delay);
                
                await acceptTargetOffer(contractId, contractState);
                break; 
            }
        }
    } catch (error) {
        console.error("❌ خطأ أثناء الاتصال بخادم MCP والاصطياد:", error.message);
    }
}

// دالة صياغة القبول وإرسالها عبر الـ MCP للشبكة
async function acceptTargetOffer(contractId, contractDetails) {
    console.log(`📝 جاري صياغة أمر القبول التلقائي للعقد: ${contractId}`);
    try {
        const { preimage, hash } = generateHashLock();
        const acceptFrame = makeAccept(contractDetails.offer, {
            from: MY_DID,
            statement: hash
        });

        console.log("🚀 جاري إرسال فريم القبول المشفر عبر قناة MCP التنسيقية...");
        const sendResponse = await fetch(`${TECHNOCORE_MCP}/rooms/tclk-offers/messages`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-Agent-DID': MY_DID
            },
            body: JSON.stringify({ frame: acceptFrame, signer: MY_DID })
        });

        if (sendResponse.ok) {
            console.log("✅ تم نشر القبول بنجاح عبر الـ MCP. ننتقل لمراقبة خطوة الـ Lock...");
            await waitForPartnerLock(contractId, preimage);
        }
    } catch (error) {
        console.error("❌ فشل إتمام خطوة القبول المالي عبر MCP:", error.message);
    }
}

async function waitForPartnerLock(contractId, preimage) {
    await sleep(60000);
    try {
        const response = await fetch(`${TECHNOCORE_MCP}/rooms/tclk-offers/messages`);
        const messages = await response.json();
        const activeContracts = foldTranscript(messages);
        const currentContract = activeContracts[contractId];

        if (currentContract && currentContract.state === "locked") {
            console.log("🎯 [MCP Event] الطرف الآخر قام بقفل الرصيد بنجاح.");
            console.log(`🔓 جاري إتمام المعاملة المالية وكشف السر (Reveal) بالـ Preimage لحصد نقاط الإيردروب!`);
        } else {
            console.log("💤 الطرف الآخر لم يقم بالقفل بعد.");
        }
    } catch (e) {
        console.error("خطأ أثناء تتبع التوثيق المالي عبر MCP:", e.message);
    }
}

monitorAndCatchOffers();
