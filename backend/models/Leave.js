const mongoose = requrire('mongoose');

//Define Leave Schema
const leveSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required'],
        },
        leaveType: {
            type: String,
            enum: ['Sick Leave', 'Casual Leave', 'Paid Leave', 'Unpaid Leave'],
            required: [true, 'Leave Type is required'],
        },
        startDate: {
            type: Date,
            required: [true, 'start date is required'],
            default: Date.now,
        },
        endDate: {
            type: Date,
            required: [true, 'End date is required'],
        },
        reason: {
            type: String,
            required: [true, 'Reason is required'],
            trim: true,
        },
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected'],
            default: 'Pending',
        },
        appliedDate: {
            type: Date,
            default: Date.now,
        },
        approvedBy: {
            type: mongoose.Schema.type.ObjectId,
            ref: 'User',
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// Create and export Leave model
const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;