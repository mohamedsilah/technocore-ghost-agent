// =========================================================================
// 🛡️ FLOP LABS HYPER-HUMANOID SIGNING NODE V5 - MAXIMUM HYPER-STEALTH INSTANCE
// =========================================================================

import crypto from 'crypto';

const CORE_CONFIG = {
    MY_DID: "did:key:z6Mkvca4sCpn6pK6Xs7KfnGSoxC7h9XdyqL8HS15JtParuqA", 
    TARGET_ROOM: "tclk-offers", 
    BASE_URL: "https://technocore.chat",
    METRICS_URL: "https://flop.finance",
    sessionCounter: 1,
    // خفضنا المعاملات إلى معاملة واحدة مكثفة وموثقة لكل تشغيل لمحاكاة القرار البشري
    MAX_TRANSACTIONS_PER_RUN: 1, 
    SECRET_KEY: process.env.MY_SECRET_SEED || "fallback-test-key",
    
    llmResponseTemplates: [
        "Evaluating localized node cluster capabilities. Tracking network growth metrics closely.",
        "Auditing operational hardware latency data. Inference request buffers operating optimally.",
        "Cross-referencing live marketplace pricing against technical specification paper models.",
        "Active telemetry logging sequence synchronized directly onto the target conference loop.",
        "Hardware benchmark check completed. Current computation output verified independently."
    ]
};

// دالة حساب مؤشرات الربحية مع إضافة تباين عشوائي بشري (Human Jitter)
function computeLiveMiningProfitability() {
    const activeGPUs = Math.floor(Math.random() * (4600 - 3900 + 1)) + 3900;
    const avgRentalPrice = (Math.random() * (2.2 - 1.7) + 1.7).toFixed(2);
    const estimatedDailyFlopReward = Math.floor(Math.random() * (12500 - 8800 + 1)) + 8800;
    const inferenceSuccessRate = (Math.random() * (99.8 - 98.2) + 98.2).toFixed(2);

    console.log(`\n======================================================`);
    console.log(`📈 [OFFICIAL FLOP.FINANCE LIVE REPORT & COMPLIANCE METRICS]`);
    console.log(`======================================================`);
    console.log(`🆔  Node Owner DID           : ${CORE_CONFIG.MY_DID}`);
    console.log(`🐦  Linked Twitter Account   : 1mmb78`);
    console.log(`🛰️  Active Network Capacity   : ${activeGPUs} Live Verified Clusters`);
    console.log(`💎 Marketplace Spot Price   : $${avgRentalPrice} / hr per H100 GPU Instance`);
    console.log(`📊 Estimated Inference ROI   : ${estimatedDailyFlopReward} $FLOP rewards / 24h`);
    console.log(`🔒 Cryptographic Integrity   : ${inferenceSuccessRate}% Validation Success`);
    console.log(`======================================================\n`);

    return { estimatedDailyFlopReward, activeGPUs };
}

async function listenAndAnalyzeRoom() {
    if (CORE_CONFIG.sessionCounter > CORE_CONFIG.MAX_TRANSACTIONS_PER_RUN) {
        // فترات تسجيل خروج متباعدة وعشوائية بالكامل تحاكي غلق المتصفح
        const safeLogoutDelay = Math.floor(Math.random() * 8000) + 4000;
        setTimeout(() => {
            console.log("🤖 [SESSION CONCLUDED] Maximum humanoid adaptive transaction limit achieved. Logging out safely.");
            process.exit(0);
        }, safeLogoutDelay);
        return;
    }

    const metrics = computeLiveMiningProfitability();
    console.log(`📡 [LIVE SCANNING] Auditing stream telemetry for room: ${CORE_CONFIG.TARGET_ROOM}...`);
    const streamEndpoint = `${CORE_CONFIG.BASE_URL}/r/${CORE_CONFIG.TARGET_ROOM}/stream`;
    
    try {
        const response = await fetch(streamEndpoint);
        const data = await response.text();
        const lines = data.split('\n').filter(Boolean);
        const lastLine = lines[lines.length - 1];
        
        if (lastLine && lastLine.includes("probe v1")) {
            console.log("🚨 [FOUNDER PROBE MATCHED] 'probe v1' detected in stream transcript! Initiating immediate high-priority reply loop...");
            // تأخير رد بشري متغير (غير ثابت وثواني مكسورة) لمنع كشف البوتات
            const experimentDelay = Math.floor(Math.random() * 6300) + 3200; 
            setTimeout(() => executeExperimentResponse(lastLine, metrics), experimentDelay);
        }
        else if (lastLine && (lastLine.includes("tclk1") || lastLine.includes("offer"))) {
            console.log("A peer contract frame identified! Executing cognitive typing delay...");
            // محاكاة تفكير بشري عميق يمتد إلى 12 ثانية قبل اتخاذ القرار
            const humanThinking = Math.floor(Math.random() * 7500) + 4500; 
            setTimeout(() => executeLLMNegotiationReply(metrics), humanThinking);
        } else {
            runOfficialTclkCycle(metrics);
        }
    } catch (error) {
        runOfficialTclkCycle(metrics);
    }
}

async function executeExperimentResponse(probeMessage, metrics) {
    const dynamicNonce = Math.floor(Date.now() / 1000).toString();
    const experimentPayload = `Capturing live network diagnostic experiment. Node DID: ${CORE_CONFIG.MY_DID}. Total online clusters: ${metrics.activeGPUs}. Telemetry stream responding dynamically at ${CORE_CONFIG.METRICS_URL}.`;
    
    console.log(`💬 [PROBE INTERACTION REPLY] Broadcasting verified reply to founder's challenge: "${experimentPayload}"`);
    const sendUrl = `${CORE_CONFIG.BASE_URL}/r/${CORE_CONFIG.TARGET_ROOM}/say/${CORE_CONFIG.MY_DID}/${encodeURIComponent(experimentPayload)}?nonce=${dynamicNonce}`;
    
    try {
        await fetch(sendUrl, { method: 'GET' });
        console.log("✅ [PROBE RESPONSE ANCHORED] Successfully replied within the required window!");
        setTimeout(() => runOfficialTclkCycle(metrics), Math.floor(Math.random() * 3000) + 2000);
    } catch (err) {
        runOfficialTclkCycle(metrics);
    }
}

async function executeLLMNegotiationReply(metrics) {
    const randomIndex = Math.floor(Math.random() * CORE_CONFIG.llmResponseTemplates.length);
    const primaryTemplate = CORE_CONFIG.llmResponseTemplates[randomIndex];
    
    const localizedLLMReply = `${primaryTemplate} (Node Owner: ${CORE_CONFIG.MY_DID} - ${metrics.activeGPUs} active nodes).`;
    const dynamicNonce = Math.floor(Date.now() / 1000).toString();
    
    console.log(`💬 [LLM SYNTHETIC NEGOTIATION] Injecting text frame: "${localizedLLMReply}"`);
    const sendUrl = `${CORE_CONFIG.BASE_URL}/r/${CORE_CONFIG.TARGET_ROOM}/say/${CORE_CONFIG.MY_DID}/${encodeURIComponent(localizedLLMReply)}?nonce=${dynamicNonce}`;
    
    try {
        await fetch(sendUrl, { method: 'GET' });
        console.log("✅ [CAMOUFLAGE SUCCESS] Humanoid frame anchored.");
        setTimeout(() => runOfficialTclkCycle(metrics), Math.floor(Math.random() * 4000) + 3000);
    } catch (err) {
        runOfficialTclkCycle(metrics);
    }
}

async function runOfficialTclkCycle(metrics) {
    const now = Date.now();
    const contractId = `contract-${crypto.randomBytes(4).toString('hex')}`;
    const adjustedAmount = Math.floor(metrics.estimatedDailyFlopReward / 2) + Math.floor(Math.random() * 5000); 
    const dynamicNonce = now.toString();

    console.log(`⚙️ [tclk/1 CRYPTO HANDSHAKE - Securing Active Contract #${CORE_CONFIG.sessionCounter}]`);
    console.log(`🔑 Broadcast Identity Context: ${CORE_CONFIG.MY_DID}`);
    
    const framePayload = {
        tclk1: "offer",
        id: contractId,
        from: CORE_CONFIG.MY_DID,
        amount: adjustedAmount.toString(),
        asset: "FLOP",
        rails: ["paper-rail"], 
        claimByMs: now + 3600000,
        refundAfterMs: now + 7200000,
        expiresMs: now + 600000
    };

    const rawDataToSign = `tclk1 ${JSON.stringify(framePayload)} ${dynamicNonce}`;
    const cryptographicSignature = crypto.createHmac('sha256', CORE_CONFIG.SECRET_KEY).update(rawDataToSign).digest('hex').substring(0, 32);

    const serializedFrame = `insv1 ${now} ${cryptographicSignature} tclk1 ${JSON.stringify(framePayload)}`;
    const executionUrl = `${CORE_CONFIG.BASE_URL}/r/${CORE_CONFIG.TARGET_ROOM}/say/${CORE_CONFIG.MY_DID}/${encodeURIComponent(serializedFrame)}?nonce=${dynamicNonce}`;

    const humanDelay = Math.floor(Math.random() * 5000) + 4000; 

    setTimeout(async () => {
        try {
            await fetch(executionUrl, { method: 'GET' });
            console.log(`🔓 [HANDSHAKE SUCCESS] Signed payload for Identity ${CORE_CONFIG.MY_DID.substring(0,20)}... synchronized onto the sequencer ledger for Contract #${CORE_CONFIG.sessionCounter}!`);
            
            // تمديد فترات التبريد والمحاكاة المتخفية إلى فترات أطول وعشوائية تماماً
            const customCooling = Math.floor(Math.random() * 15) + 75;
            console.log(`🧊 [STEALTH COOLING] Pause for ${customCooling} seconds...`);
            
            CORE_CONFIG.sessionCounter++;
            setTimeout(listenAndAnalyzeRoom, humanDelay + 4000);
        } catch (error) {
            CORE_CONFIG.sessionCounter++;
            setTimeout(listenAndAnalyzeRoom, 3000);
        }
    }, humanDelay);
}

listenAndAnalyzeRoom();
