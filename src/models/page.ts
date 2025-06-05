import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'id is required'],
        trim: true,
        unique: true,
    },
    userID: {
        type: String,
        required: [true, 'id is required'],
        trim: true,
        unique: true,
    },
    name: {
        type: String,
        required: [false, 'name is required'],
        trim: true,
        maxLength: [50, 'name cannot be more than 50 characters'],
    },
    slug: { 
        type: String,
        required: [true, 'Slug is required'],
        lowercase: true,
        trim: true,
        unique: true,
    },
    avatar: {
        type: String,
        default: '',
        trim: true,
    },
    coverImage: {
        type: String,
        default: '',
        trim: true,
    },
    bio: {
        type: String,
        default: '',
        trim: true,
        maxLength: [300, 'Bio cannot exceed 300 characters'],
    },
    socials: {
        type: [{
            id: {
                type: String,
                required: [false, 'Social id is required'],
                trim: true,
            },
            platform: {
                type: String,
               
                enum: ['twitter', 'facebook', 'instagram', 'linkedin', 'github', 'youtube', 'tiktok', 'website', 'other'],
                lowercase: true,
                trim: true,
            },
            url: {
                type: String,
               
                trim: true,
            },
        }],
        default: [],
        _id: false,
    },
    links: {
        type: [{
             id: {
                type: String,
            },
            index: {
            type: Number,
            required: true,
            },
            title: {
                type: String,
               
                trim: true,
                maxLength: [100, 'Link title cannot exceed 100 characters'],
            },
            url: {
                type: String,
              
                trim: true,
            },
        }],
        default: [],
        _id: false,
    },
    theme: {
        type: String,
        default: 'minimal-light',
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Page = mongoose.models.Page || mongoose.model('Page', pageSchema);

export default Page;
