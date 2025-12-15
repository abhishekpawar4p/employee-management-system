//Import Packages
const mongoose = require('mangoose');
const bcrypt = require('bcrypt');

//Define Schema
const userSchema = new mongoose.Schema(
{
    name: {
        type: String, //Must be text
        required:[true, 'name is required'], //cannot be empty, shows errors if missing
        trim: true, //Removes extra spaces(e.g, " John"becomes"John)
    },
    email: {
        type:String,
        required: [true, 'Email is required'],
        unique: true, //No two users can have same email (prevents duplicates)
        lowercase: true, //Converts to lowercase (e.g., "JOHN@EXAMPLE.COM" → "john@example.com")
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [6, 'Password must be atleast 6 characters'] //Password must be at least 6 characters
    },
    role: {
        type: String,
        enum: ['Admin', 'HR', 'Employee'], //Only these 3 values are allowed (validation)
        default: 'Employee', //If not specified, role will be 'Employee'
    },
    position: {
        type: String,
        required: [true, 'Position is required'],
      },
      salary: {
        type: Number,
        required: [true, 'Salary is required'],
      },
      joiningDate: {
        type: Date,
        default: Date.now,
      },
},
{
    timestamps: true, 
}
);

//Hash password before saving to database
userSchema.pre('save', async function (next) {
    //only hash if pasword is new or modified
    if (!this.isModified('password')) {
        return next();
    }

    try{
        //generate salt (random string added to password)
        const salt = await bcrypt.genSalt(10);

        // Hash the password with the salt
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }catch(error) {
        next (error);
    }
});


//Method to compare password during login
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
};

//Create ans export User model
const User = mongoose.model('User', userSchema);

module.exports = User;
