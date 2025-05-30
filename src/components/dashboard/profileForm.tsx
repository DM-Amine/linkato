"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Save, User, Mail, Key, Lock, Eye, EyeOff, ImageIcon } from "lucide-react";

interface FormData {
  full_name: string;
  email: string;
  bio?: string;
  profileImage?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

interface ProfileFormProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    handleUpdate: () => void;
    isLoading: boolean;
  }
  

export default function ProfileForm({
  formData,
  setFormData,
  handleUpdate,
  isLoading,
}: ProfileFormProps) {
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleUpdate();
      }}
      className="space-y-4 mt-12"
    >
      <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
        Edit Profile:
      </h1>

      {/* Full Name */}
      <div className="relative">
      <Label className="mb-1">
        full name
      </Label>
        <User className="absolute left-3 top-7 w-4 h-4 text-neutral-700 dark:text-neutral-400" />
        <Input
          className="pl-9"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, full_name: e.target.value }))
          }
          required
        />
      </div>

      {/* Email */}
      <div className="relative">
      <Label className="mb-1">
        email
      </Label>
        <Mail className="absolute left-3 top-7 w-4 h-4 text-neutral-700 dark:text-neutral-400" />
        <Input
          className="pl-9"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          required
        />
      </div>

      {/* Bio */}
      <div className="relative">
      <Label className="mb-1">
        bio
      </Label>
        <Textarea
          placeholder="Bio"
          value={formData.bio}
          maxLength={300}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, bio: e.target.value }))
          }
        />
        <div className="text-sm">
          {300 - (formData.bio?.length ?? 0)}/300
        </div>
      </div>

      {/* Profile Image */}
      
      <div className="relative">
      <Label className="mb-1">
        profile image
      </Label>
        <ImageIcon className="absolute left-3 top-7 w-4 h-4 text-neutral-700 dark:text-neutral-400" />
        <Input
          className="pl-9"
          placeholder="Profile Image URL"
          value={formData.profileImage}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, profileImage: e.target.value }))
          }
        />
      </div>

      {/* Password Section */}
      <p className="mt-18 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
        Change Password
      </p>

      {/* Old Password */}
      <div className="relative">
        <Key className="absolute left-3 top-3 w-4 h-4 text-neutral-700 dark:text-neutral-400" />
        <Input
          className="pl-9 pr-10"
          placeholder="Old Password"
          type={showPasswords.old ? "text" : "password"}
          value={formData.oldPassword}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, oldPassword: e.target.value }))
          }
        />
        <div
          className="absolute right-3 top-3 cursor-pointer text-neutral-700 dark:text-neutral-400"
          onClick={() =>
            setShowPasswords((prev) => ({ ...prev, old: !prev.old }))
          }
        >
          {showPasswords.old ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </div>
      </div>

      {/* New Password */}
      <div className="relative">
        <Lock className="absolute left-3 top-3 w-4 h-4 text-neutral-700 dark:text-neutral-400" />
        <Input
          className="pl-9 pr-10"
          placeholder="New Password"
          type={showPasswords.new ? "text" : "password"}
          value={formData.newPassword}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, newPassword: e.target.value }))
          }
        />
        <div
          className="absolute right-3 top-3 cursor-pointer text-neutral-700 dark:text-neutral-400"
          onClick={() =>
            setShowPasswords((prev) => ({ ...prev, new: !prev.new }))
          }
        >
          {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </div>
      </div>

      {/* Confirm New Password */}
      <div className="relative">
        <Lock className="absolute left-3 top-3 w-4 h-4 text-neutral-700 dark:text-neutral-400" />
        <Input
          className="pl-9 pr-10"
          placeholder="Confirm New Password"
          type={showPasswords.confirm ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))
          }
        />
        <div
          className="absolute right-3 top-3 cursor-pointer text-neutral-700 dark:text-neutral-400"
          onClick={() =>
            setShowPasswords((prev) => ({ ...prev, confirm: !prev.confirm }))
          }
        >
          {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </div>
      </div>

      {/* Save Changes Button */}
      <Button
        type="submit"
        variant={"default"}

        className="max-w-fit text-neutral-200 mt-4 flex items-center gap-2"
        disabled={isLoading}
      >
        <Save className="w-4 h-4" />
        Save
      </Button>
    </form>
  );
}
