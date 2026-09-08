import crypto from 'crypto';

// فرز المعاملات وبناء حالة العقد المالي المتوافق مع شبكة FLOP
export function foldTranscript(messages) {
    const contracts = {};
    if (!Array.isArray(messages)) return contracts;
    
    for (const msg of messages) {
        if (msg && msg.frame && msg.frame.id) {
            const f = msg.frame;
            if (f.type === 'tclk_make_offer') {
                contracts[f.id] = { state: 'offered', from: msg.signer, offer: f };
            } else if (f.type === 'tclk_accept_offer' && contracts[f.id]) {
                contracts[f.id].state = 'accepted';
                contracts[f.id].acceptor = msg.signer;
            } else if (f.type === 'tclk_lock_funds' && contracts[f.id]) {
                contracts[f.id].state = 'locked';
            }
        }
    }
    return contracts;
}

export function generateHashLock() {
    const preimage = crypto.randomBytes(32).toString('hex');
    const hash = crypto.createHash('sha256').update(Buffer.from(preimage, 'hex')).digest('hex');
    return { preimage, hash };
}

export function makeAccept(offerFrame, options) {
    return {
        id: offerFrame.id,
        type: 'tclk_accept_offer',
        from: options.from,
        statement: options.statement,
        timestamp: Date.now()
    };
}

// 🌐 إضافة دالة مصفوفة جلب ومراقبة كروت الشاشة المتاحة حالياً بناءً على gpus.flop.finance
export function getLiveGPUMetrics() {
    const gpuInventory = [
        { model: "NVIDIA H100", rentPerHour: "$2.10", efficiencyScore: "98%" },
        { model: "NVIDIA A100", rentPerHour: "$1.25", efficiencyScore: "89%" },
        { model: "RTX 4090", rentPerHour: "$0.44", efficiencyScore: "76%" },
        { model: "RTX 3090", rentPerHour: "$0.22", efficiencyScore: "55%" }
    ];
    // اختيار عشوائي لمحاكاة القراءة الحية من السيرفر
    return gpuInventory[Math.floor(Math.random() * gpuInventory.length)];
}
