import type { NextAuthOptions, User as NextAuthUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import connectDB from "@/lib/mongodb";
import type { JWT } from "next-auth/jwt";


declare module "next-auth" {
  interface Session {
    user: CustomSessionUser; 
  }

  interface User {
    userID: string;
    role: string;
    profileImage?: string;
  }

  interface JWT {
    userID?: string;
    role?: string;
    profileImage?: string;
    name?: string;
    email?: string;
  }
}


interface CustomUser extends NextAuthUser {
  userID: string;
  role: string;
  profileImage?: string;
}

interface CustomToken extends JWT {
  userID?: string;
  role?: string;
  profileImage?: string;
  name?: string;
  email?: string;
}

interface CustomSessionUser {
  name?: string;
  email?: string;
  role?: string;
  userID?: string;
  profileImage?: string;
}

export const options: NextAuthOptions = {
  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        await connectDB();
      
        const { email, password } = credentials ?? {};
        if (!email || !password) return null;
      
        try {
          const user = await User.findOne({ email });
      
          if (!user) return null;
      
          // Ensure the user signed up with credentials
          if (user.provider !== 'credentials') {
            throw new Error('Please sign in using your original provider (e.g., Google).');
          }
      
          if (!user.password) {
            throw new Error('Password is not set for this account.');
          }
      
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) return null;
      
          return {
            id: user._id.toString(),
            userID: user.userID,
            name: user.full_name,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage,
          } satisfies CustomUser;
        } catch (err) {
          console.error("Login error:", err);
          return null;
        }
      }
      
    }),
  ], 

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      const customToken = token as CustomToken;
  
      if (user) {
        const customUser = user as CustomUser;
        customToken.userID = customUser.userID;
        customToken.role = customUser.role;
        customToken.name = customUser.name ?? undefined;
        customToken.email = customUser.email ?? undefined;
        customToken.profileImage = customUser.profileImage;
      }
  
      if (trigger === "update" && session) {
        customToken.name = session.name;
        customToken.email = session.email;
        if (session.profileImage) {
          customToken.profileImage = session.profileImage;
        }
      }
  
      // Return the customToken to make sure it's passed to the session callback
      return customToken;
    },
  
    async session({ session, token }) {
      const customToken = token as CustomToken;
      const user = session.user as CustomSessionUser;
      user.name = customToken.name;
      user.email = customToken.email;
      user.role = customToken.role;
      user.userID = customToken.userID;
      user.profileImage = customToken.profileImage;
      return session;
    },

    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await connectDB();
          const existingUser = await User.findOne({ email: user.email });
    
          if (!existingUser) {
            const { v4: uuidv4 } = await import("uuid");
           
    
            const userID = uuidv4();
    
            await User.create({
              userID,
              full_name: user.name || "user name",
              email: user.email,
              profileImage: user.image || "",
              role: "user",
              emailVerified: true,
              provider: 'google',
              subscription: {
                plan: "free",
                status: "inactive",
              },
            });
            
           
          }
    
          const fullUser = await User.findOne({ email: user.email });
    
          if (fullUser) {
            (user as CustomUser).userID = fullUser.userID;
            (user as CustomUser).role = fullUser.role;
            (user as CustomUser).profileImage = fullUser.profileImage;
          }
        } catch (err) {
          console.error("Error during Google sign-in:", err);
          return false;
        }
      }
    
      return true;
    }

  },
  pages: {
    signIn: "/auth/login",    
    signOut: "/auth/logout",  
    error: "/auth/error",     
    newUser: "/auth/signup",  
  },
};
