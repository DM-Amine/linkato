"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: name, email, password }),
      });

      const text = await res.text();
      try {
        const result = JSON.parse(text);
        if (res.ok) {
          // Automatically sign in the user after successful registration
          const signInRes = await signIn("credentials", {
            redirect: false,
            email,
            password,
          });
        
          if (signInRes?.ok) {
            router.push("/dashboard/pages");
          } else {
            setError("Failed to sign in after signup. Please try logging in.");
          }
        }
         else {
          setError(result.error || "An unexpected error occurred. Please try again.");
        }
      } catch {
        console.error("Failed to parse JSON:", text);
        setError("Server returned unexpected response");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen mx-2">
      <div className="w-full max-w-md border border-neutral-500 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 rounded-2xl shadow-md px-5 py-3">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold text-neutral-700 dark:text-neutral-300 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="relative">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Full Name
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="pl-10"
            />
            <User className="absolute left-3 top-8 text-neutral-500 dark:text-neutral-400" size={18} />
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="pl-10"
            />
            <Mail className="absolute left-3 top-8 text-neutral-500 dark:text-neutral-400" size={18} />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Password
            </label>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-10 pr-10"
            />
            <Lock className="absolute left-3 top-8 text-neutral-500 dark:text-neutral-400" size={18} />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-neutral-500 dark:text-neutral-400"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-sm text-error dark:text-d-error">{error}</div>
          )}

          {/* Submit Button */}
          <Button className="w-full h-fit py-2 text-sm font-medium  ">
            Create Account
          </Button>
        </form>

        {/* Divider */}
        <div className="flex my-3 justify-between items-center">
        <div className="my-4 w-full text-center text-sm text-neutral-500 dark:text-neutral-400 border-t"></div>
          <span className="mx-2 text-xl">or</span>
          <div className="my-4 w-full text-center text-sm text-neutral-500 dark:text-neutral-400 border-t"></div>
        </div>

        {/* Google Sign-up */}
        <Button
          type="button"
          variant="outline"
          className="w-full flex  items-center justify-center gap-2 h-fit py-2 text-sm font-medium"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        >
          <Image src="/icons/auth/google-logo.svg" alt="Google" width={20} height={20} />
          Continue with Google
        </Button>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-info dark:text-d-info hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
 