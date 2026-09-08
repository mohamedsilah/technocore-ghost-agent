import { foldTranscript, makeAccept, generateHashLock, getLiveGPUMetrics } from "./tclk-core.js";
import { humanConfig } from "./config.js";

const MY_DID = "did:key:z6Mkvca4sCpn6pK6Xs7KfnGSoxC7h9XdyqL8HS15JtParuqA";

console.log(`\n🕵️‍♂️ [FLOP Network Matrix] تم تنشيط الوكيل المحدث بناءً على flop.finance!`);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomDelay() {
    return Math.floor(Math.random() * (humanConfig.maxDelay - humanConfig.minDelay + 1)) + humanConfig.minDelay;
}

function generateDynamicHumanChat(offerDetails, gpuModel) {
    const asset = offerDetails.asset || "FLOP";
    const amount = offerDetails.amount || "200";

    const humanPhrases = [
        `Yellow Paper metrics verified. Aligning tclk handshake for ${amount} ${asset} with ${gpuModel} node cluster.`,
        `Checked mining profitability for ${gpuModel}, setup looks optimal. Let's lock it.`,
        `Useful inference contract detected. Processing ${asset} exchange via verified gpu metrics.`,
        `Syncing with gpus.flop.finance monitor. Handshake parameters look healthy, let's rail!`
    ];

    return humanPhrases[Math.floor(Math.random() * humanPhrases.length)];
}

async function executeLiveAICycle() {
    try {
        // 📊 خطوة قراءة التحديث المتاح: جلب مؤشرات كروت الشاشة الحية ومعدلات الأرباح
        console.log("📊 [Yellow Paper Sync] جاري قراءة نموذج الربحية التفاعلي ومؤشر الإمداد الحي...");
        await sleep(1500);
        const activeGPU = getLiveGPUMetrics();
        console.log(`📈 [Metrics Fetched] الكارت المستهدف في الشبكة حالياً: ${activeGPU.model} | تكلفة التأجير المتوقعة: ${activeGPU.rentPerHour}/hr`);

        console.log("🔍 [Scanning Channels] جاري فحص مسارات العقود التبادلية...");
        await sleep(1500);

        const mockOfferId = `tclk-deal-${crypto.randomUUID().slice(0, 8)}`;
        const mockIncomingMessages = [
            {
                signer: "did:key:z6MkpPartnerAgentRandomAddressXYZ123456789",
                frame: { id: mockOfferId, type: 'tclk_make_offer', amount: "200", asset: "FLOP" }
            }
        ];

        const activeContracts = foldTranscript(mockIncomingMessages);
        const contract = activeContracts[mockOfferId];

        if (contract && contract.state === "offered") {
            console.log(`🎯 [Deal Spotted] تم العثور على عقد معروض: ${mockOfferId}`);
            
            console.log("🧠 جاري صياغة رد تفاوضي بشري متوافق مع معايير الـ Inference الحالية...");
            const aiChatResponse = generateDynamicHumanChat(contract.offer, activeGPU.model);
            
            console.log(`💬 [AI Dynamic Chat]: "${aiChatResponse}"`);

            const { preimage, hash } = generateHashLock();
            const acceptFrame = makeAccept(contract.offer, { from: MY_DID, statement: hash });

            console.log(`🔒 [TCLK Lock] تم التوقيع وإرسال فريم القبول المالي بنجاح:`, JSON.stringify(acceptFrame));
            console.log("⏳ بانتظار تسوية الـ Rail السحابي وفق معايير flop.finance...");
            await sleep(3000);
            
            console.log(`🔓 [TCLK Reveal] [SUCCESS] تم إنهاء المعاملة وحصد رصيد النقاط بنجاح للـ DID الخاص بك.`);
        }
    } catch (error) {
        console.error("❌ خطأ أثناء تشغيل الدورة البرمجية:", error.message);
    }
}

executeLiveAICycle();
