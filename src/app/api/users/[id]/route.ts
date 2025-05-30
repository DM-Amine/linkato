import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";

// GET
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Database connection
    await connectDB();

    // Validate param
    const { id } = await context.params; // Await the params to resolve the promise
    if (!id) {
      console.warn("Missing user ID param in request");
      return NextResponse.json(
        { success: false, message: "Missing user ID parameter" },
        { status: 400 }
      );
    }

    // Find the user by userID (not _id)
    const user = await User.findOne({ userID: id }).select("full_name userID subscription");

    if (!user) {
      console.warn(`User not found for userID: ${id}`);
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Successful response with subscription plan and status
    return NextResponse.json(
      {
        success: true,
        data: {
          userID: user.userID,
          name: user.full_name,
          subscription: {
            plan: user.subscription?.plan || "free", // Defaults to 'free' if no subscription
            status: user.subscription?.status || "inactive", // Defaults to 'inactive'
          },
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching user:", error.message);
    } else {
      console.error("Error fetching user:", error);
    }

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


// DELETE
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params; // Await the params to resolve the promise

    const deletedUser = await User.findOneAndDelete({ userID: id });

    if (!deletedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Changed from 'any' to 'unknown'
    if (error instanceof Error) {
      console.error("Error deleting user:", error.message);
    } else {
      console.error("Error deleting user:", error);
    }

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params; // Await the params to resolve the promise
    const body = await req.json();

    // Prepare fields to update
    const updatedData: Partial<{
      full_name: string;
      email: string;
      password: string;
      role: string;
      isActive: boolean;
      subscription: {
        plan: string;
        status: string;
      };
    }> = {};

    if (body.full_name) updatedData.full_name = body.full_name;
    if (body.email) updatedData.email = body.email;

    if (body.password) {
      // Hash the password if it's provided
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(body.password, salt); // Hash the password
    }

    if (body.role) updatedData.role = body.role;
    if (typeof body.isActive === 'boolean') updatedData.isActive = body.isActive; // Update isActive

    // Only update subscription if it is provided in the request
    if (body.subscription) {
      updatedData.subscription = {
        plan: body.subscription.plan || updatedData.subscription?.plan || 'free',
        status: body.subscription.status || updatedData.subscription?.status || 'inactive',
      };
    }

    // Find and update the user, including necessary fields in the response
    const updatedUser = await User.findOneAndUpdate(
      { userID: id },
      updatedData,
      {
        new: true,
      }
    ).select(
      "userID full_name email role isActive subscription emailVerified"
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Return the updated user with the required fields, including subscription details
    return NextResponse.json({
      success: true,
      updatedUser: {
        userID: updatedUser.userID,
        full_name: updatedUser.full_name,
        email: updatedUser.email,
        role: updatedUser.role,
        isActive: updatedUser.isActive,
        subscription: updatedUser.subscription,
        emailVerified: updatedUser.emailVerified,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating user:", error.message);
    } else {
      console.error("Error updating user:", error);
    }

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
