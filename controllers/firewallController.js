const Rule = require('../models/Rule');

exports.createRule = async (req, res) => {
    try {
        const rule = new Rule({
            ...req.body,
            userId: req.user.id
        });
        await rule.save();
        res.status(201).json({
            success: true,
            message: 'Rule created successfully',
            rule
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to create rule',
            error: error.message
        });
    }
};

exports.getRules = async (req, res) => {
    try {
        const rules = await Rule.find({ userId: req.user.id });
        res.json(rules);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch rules',
            error: error.message
        });
    }
};

exports.simulatePacket = async (req, res) => {
    try {
        const packet = req.body;
        packet.port = parseInt(packet.port);

        const rules = await Rule.find({ userId: req.user.id });
        let action = 'deny';

        for (const rule of rules) {
            if (
                rule.protocol.toLowerCase() === packet.protocol.toLowerCase() &&
                rule.sourceIp === packet.sourceIp &&
                rule.destIp === packet.destIp &&
                rule.port === packet.port
            ) {
                action = rule.action;
                break;
            }
        }
        res.status(200).json({
            success: true,
            message: 'Simulation successful',
            action
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Simulation failed',
            error: error.message
        });
    }
};
