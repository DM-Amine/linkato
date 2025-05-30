import mongoose, { Document, Schema } from 'mongoose';

export interface IWaitlist extends Document {
  email: string;
  ipAddress?: string;
  location?: {
    country: string;
    city: string;
  };
  userAgent?: string;
  referrer?: string;
  language?: string;
  isMobile?: boolean;
  browser?: string;
  browserInfo?: {
    isBrave?: boolean;
    isDuckDuckGo?: boolean;
    browserName?: string;
  };
  os?: string;
  signupPath?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const WaitlistSchema = new Schema<IWaitlist>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    ipAddress: { type: String },
    location: {
      country: { type: String, default: 'Unknown' },
      city: { type: String, default: 'Unknown' },
    },
    userAgent: { type: String },
    referrer: { type: String },
    language: { type: String },
    isMobile: { type: Boolean },
    browser: { type: String },  

    os: { type: String },
    signupPath: { type: String },
    utm: {
      source: { type: String },
      medium: { type: String },
      campaign: { type: String },
    },
  },
  { timestamps: true }
);


export default mongoose.models.Waitlist || mongoose.model<IWaitlist>('Waitlist', WaitlistSchema);
