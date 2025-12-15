const mangoose = require('mongoose');

//Define Attendance Schema
const attendanceSchema = new mangoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required'],
        },
        date: {
            type: Date,
            required: [true, 'Date is required'],
            default: Date.now,
        },
        checkIn: {
            type: String,
            required: [true, 'Check-in time is required'],
        },
        checkOut: {
            type: String,
            default: 0,
        },
        totalHours: {
            type: Number,
            default:0,
        },
        status: {
            type: String,
            enum: ['Present', 'Absent', 'Half-Day'],
            default: 'Present',
        },
    },
    {
        timestamps: true,
    }
);


// Create and export Attendance model
const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;