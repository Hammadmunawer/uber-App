const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 846400// Token will be removed after 1 days
    }
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);