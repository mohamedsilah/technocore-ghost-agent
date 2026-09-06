import crypto from 'crypto';

// دالة تفكيك وفرز المعاملات داخل غرف الدردشة لتجنب المكرر والخاطئ
export function foldTranscript(messages) {
    const contracts = {};
    if (!Array.isArray(messages)) return contracts;
    
    // فرز الرسائل التنسيقية وبناء حالة العقد المالي
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

// دالة توليد القفل والتوقيع المشفر السري محلياً
export function generateHashLock() {
    const preimage = crypto.randomBytes(32).toString('hex');
    const hash = crypto.createHash('sha256').update(Buffer.from(preimage, 'hex')).digest('hex');
    return { preimage, hash };
}

// دالة بناء فريم القبول الرسمي المالي tclk/1
export function makeAccept(offerFrame, options) {
    return {
        id: offerFrame.id,
        type: 'tclk_accept_offer',
        from: options.from,
        statement: options.statement,
        timestamp: Date.now()
    };
}
