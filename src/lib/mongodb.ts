// lib/mongodb.ts

import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Extend the NodeJS global type to include your custom `mongoose` property
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB(): Promise<Mongoose> {
  if (cached.conn) {
    console.log('[MongoDB] Using cached connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('[MongoDB] Connecting to database...');
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log('[MongoDB] Connected successfully');
        return mongoose;
      })
      .catch((err) => {
        console.error('[MongoDB] Connection error:', err.message);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('[MongoDB] Final connection error:', err.message);
      throw err;
    } else {
      console.error('[MongoDB] Final connection error:', err);
      throw new Error('An unknown error occurred while connecting to MongoDB');
    }
  }
  
}

export default connectDB;
