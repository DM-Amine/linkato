"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import ProfileForm from "@/components/dashboard/profileForm";

import { Mail, Calendar } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface Profile {
  full_name: string;
  email: string;
  bio: string;
  profileImage: string;

  emailVerified: boolean;
  updatedAt: string;
}

interface FormData {
  full_name: string;
  email: string;
  bio?: string;
  profileImage?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  emailVerified?: boolean;
  updatedAt?: string; // ✅ correct
}

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const { id } = useParams();
console.log("session in profile page", JSON.stringify(session));

  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
    bio: "",
    profileImage: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    emailVerified: false,
    updatedAt: "",
  });

  useEffect(() => {
    if (status === "loading") return; // Wait for session

    if (status !== "authenticated" || session?.user?.userID !== id) {
      setIsLoading(false); // Allow Unauthorized to render
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/profile/${id}`);
        if (res.ok) {
          const data: Profile = await res.json(); // Type the response data
          setFormData({
            full_name: data.full_name || "",
            email: data.email || "",
            bio: data.bio || "",
            profileImage: data.profileImage || "",

            emailVerified: data.emailVerified || false,
            updatedAt: data.updatedAt || "",
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [status, session, id]);

  const handleUpdate = async () => {
    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      toast.error("New passwords do not match");
      return;
    }

    const payload: FormData = {
      full_name: formData.full_name,
      email: formData.email,
      bio: formData.bio,
      profileImage: formData.profileImage,
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,

      emailVerified: formData.emailVerified,
      updatedAt: formData.updatedAt,
    };

    const res = await fetch(`/api/profile/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Profile updated");

      await update({
        name: formData.full_name,
        email: formData.email,
        profileImage: formData.profileImage,
      });

      setFormData((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } else {
      toast.error(data.error || "Failed to update profile");
    }
  };

  // ⏳ Show loading state while waiting for session or profile data
  if (status === "loading" || (status === "authenticated" && isLoading)) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (!session || session.user.userID !== id) {
    return <p className="p-4 text-destructive font-semibold">Unauthorized</p>;
  }

  return (
    <div className="w-full mx-auto mt-2 p-4">
      <div className="header my-3 px-2 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800">
        <div className="flex sm:flex-row flex-col items-start gap-4">
          {isLoading ? (
            <Skeleton className="w-20 h-20 rounded-full bg-neutral-300 dark:bg-neutral-600" />
          ) : formData.profileImage ? (
            <div className="min-w-20 w-20 min-h-20 h-20  rounded-full overflow-hidden border-2">
              <Image
                src={formData.profileImage}
                alt="Profile image"
                width={80}
                height={80}
                className="profile-img object-cover min-w-full min-h-full"
              />
            </div>
          ) : (
            <span className="w-20 h-20 flex justify-center items-center rounded-full bg-primary-light text-primary font-semibold text-3xl">
              {formData.full_name?.[0]?.toUpperCase() ?? "A"}
            </span>
          )}

          <div className="profile-data w-full ">
            <div className="w-full justify-between flex  sm:flex-row flex-col">
              <div>
                <h2 className="text-xl font-semibold text-primary dark:text-d-primary flex items-center gap-2">
                  {isLoading ? (
                    <Skeleton className="w-40 h-5 bg-neutral-300 dark:bg-neutral-600" />
                  ) : (
                    formData.full_name
                  )}
                </h2>
                <p className="ml-1 text-sm my-1 flex items-center gap-1">
                  <Mail className="w-4 h-4 text-neutral-700 dark:text-neutral-400" />
                  {isLoading ? (
                    <Skeleton className="w-48 h-4 bg-neutral-300 dark:bg-neutral-600" />
                  ) : (
                    formData.email
                  )}
                </p>
              </div>
              <div className="border text-xs h-fit w-fit border-neutral-500 rounded-md px-1 py-0.5 flex items-center gap-1">
                <Calendar className="w-4 h-4 font-bold text-neutral-700 dark:text-neutral-400" />
                Updated:
                <span className="mt-0.5">
                  {new Date(formData.updatedAt || "").toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </span>
              </div>
            </div>
            <div className="bio border-t border-neutral-500 pt-2 mt-4">
              <h3 className="text-xs font-semibold flex items-center gap-1">
                BIO:
              </h3>
              {isLoading ? (
                <Skeleton className="h-4 w-full bg-neutral-300 dark:bg-neutral-600" />
              ) : (
                <h6 className="text-xs rounded-md">{formData.bio}</h6>
              )}
            </div>
          </div>
        </div>
      </div>

      

        <ProfileForm
          formData={formData}
          setFormData={setFormData}
          handleUpdate={handleUpdate}
          isLoading={isLoading}
        />
     
    </div>
  );
}
