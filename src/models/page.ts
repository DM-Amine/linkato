import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
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
            platform: {
                type: String,
                required: [true, 'Platform is required'],
                enum: ['twitter', 'facebook', 'instagram', 'linkedin', 'github', 'youtube', 'tiktok', 'website', 'other'],
                lowercase: true,
                trim: true,
            },
            url: {
                type: String,
                required: [true, 'URL is required'],
                trim: true,
            },
        }],
        default: [],
        _id: false,
    },
    links: {
        type: [{
            title: {
                type: String,
                required: [true, 'Link title is required'],
                trim: true,
                maxLength: [100, 'Link title cannot exceed 100 characters'],
            },
            url: {
                type: String,
                required: [true, 'Link URL is required'],
                trim: true,
            },
        }],
        default: [],
        _id: false,
    },
    theme: {
        type: String,
        default: 'default',
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Page = mongoose.models.Page || mongoose.model('Page', pageSchema);

export default Page;
