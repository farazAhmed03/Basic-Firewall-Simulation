const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    ip: {
        type: String,
        required: true
    },

    port: {
        type: String,
        required: true
    },

    result: {
        type: String,
        enum: ['allowed', 'blocked'],
        required: true
    },

    checkedAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Log', logSchema);
