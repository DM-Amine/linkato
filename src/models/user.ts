// src/models/user.ts
import { Schema, Document, model, models } from "mongoose";


export interface IUser extends Document {
  userID: string;
  full_name: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  profileImage?: string;
  bio?: string;
  subscription: {
    plan: string;
    status: string;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    currentPeriodEnd?: Date;
  };
  emailVerified: boolean;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    userID: { type: String, required: true },
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true , lowercase: true,trim: true },
    password: {
      type: String,
      required: false, 
    },
    role: { type: String, enum: ["admin", "user", "moderator"], default: "user" },
    isActive: { type: Boolean, default: true },

    profileImage: { type: String, default: "" },
    bio: {
      type: String,
      default: "",
      maxlength: [300, "Bio must be 300 characters or less."],
    },
    subscription: {
      plan: {
        type: String,
        enum: ["free", "professional", "business"], 
        default: "free",
        description: "The subscription plan of the user",
      },
      status: {
        type: String,
        enum: ["active", "canceled", "trial", "inactive"],
        default: "inactive",
        description: "The current status of the subscription",
      },
      lemonsqueszyCustomerId: {
        type: String,
        required: false, // You may need this for integration with 'Lemonsqueszy' (e.g., a payment gateway)
        description: "Unique identifier for the user in the Lemonsqueszy system",
      },
      lemonsqueszySubscriptionId: {
        type: String,
        required: false, // Unique subscription ID from Lemonsqueszy for the user
        description: "Unique subscription ID from Lemonsqueszy",
      },
      currentPeriodEnd: {
        type: Date,
        required: false, // Optional, but useful to track the subscription renewal/expiration
        description: "The end date of the current subscription period",
      },
      trialEndDate: {
        type: Date,
        required: false, // Added field to track the trial end date for better subscription management
        description: "The end date of the user's trial period (if applicable)",
      },
      createdAt: {
        type: Date,
        default: Date.now,
        description: "The date when the subscription was created",
      },
      updatedAt: {
        type: Date,
        default: Date.now,
        description: "The date when the subscription was last updated",
      },
    },
    provider: {
      type: String,
      enum: ['credentials', 'google'],
      default: 'credentials',
    },
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);


const User = models.User || model<IUser>("User", UserSchema);

export default User;
