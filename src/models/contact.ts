import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        maxLength: [50, 'Full name cannot be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true ,
        maxLength: [100, 'Email cannot be more than 100 characters'],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
    },
    subject: {
        type: String,
        required: [true, 'Subject is required'],
        trim: true,
        maxLength: [100, 'Subject cannot be more than 100 characters']
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
        maxLength: [500, 'Message cannot be more than 500 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['unread', 'read'],
        default: 'unread'
    }
},{ timestamps: true });

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact; 