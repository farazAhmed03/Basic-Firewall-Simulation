const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
    protocol: { type: String, required: true },
    sourceIp: { type: String, required: true },
    destIp: { type: String, required: true },
    port: { type: Number, required: true },
    action: { type: String, enum: ['permit', 'deny'], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Rule', ruleSchema);