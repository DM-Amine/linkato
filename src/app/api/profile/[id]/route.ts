import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

// GET
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await context.params;

  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isOwner = session.user?.userID === id;
  const isAdminOrMod = session.user?.role === "admin" || session.user?.role === "moderator";

  if (!isOwner && !isAdminOrMod) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const user = await User.findOne({ userID: id }).select("-password");
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const normalizedUser = {
    full_name: user.full_name || "",
    email: user.email || "",
    bio: user.bio ?? "",
    profileImage: user.profileImage ?? "",
    subscription: {
      plan: user.subscription?.plan || "Free",
    },
    emailVerified: user.emailVerified ?? false,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
    userID: user.userID,
    role: user.role,
    isActive: user.isActive,
  };

  return NextResponse.json(normalizedUser, { status: 200 });
}

// PUT
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await context.params;

  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isOwner = session.user?.userID === id;
  const isAdminOrMod = session.user?.role === "admin" || session.user?.role === "moderator";

  if (!isOwner && !isAdminOrMod) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  // ✅ Validate bio length
  if (body.bio && body.bio.length > 300) {
    return NextResponse.json(
      { error: "Bio must be less than or equal to 300 characters." },
      { status: 400 }
    );
  }

  // ✅ Password update validation
  if (body.oldPassword || body.newPassword || body.confirmPassword) {
    if (!body.oldPassword || !body.newPassword || !body.confirmPassword) {
      return NextResponse.json(
        { error: "All password fields must be provided." },
        { status: 400 }
      );
    }

    if (body.newPassword !== body.confirmPassword) {
      return NextResponse.json(
        { error: "New password and confirm password must match." },
        { status: 400 }
      );
    }
  }

  const user = await User.findOne({ userID: id });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const updateData: Record<string, unknown> = { ...body };

  if (body.oldPassword && body.newPassword && body.confirmPassword) {
    const isMatch = await bcrypt.compare(body.oldPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Old password is incorrect." }, { status: 400 });
    }
    updateData.password = await bcrypt.hash(body.newPassword, 10);
  }

  const updatedUser = await User.findOneAndUpdate(
    { userID: id },
    { $set: updateData },
    { new: true }
  ).select("-password");

  if (!updatedUser) {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }

  return NextResponse.json(updatedUser, { status: 200 });
}
