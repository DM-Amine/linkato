"use client";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";

export default function SignIn() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  if (session) {
    redirect("/dashboard/pages");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        setError("Incorrect email or password. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
        console.error(result.error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  mx-2">
      <div className="w-full max-w-md border border-neutral-500 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 px-5 py-3 rounded-3xl shadow-lg ">
        <h2 className="text-2xl font-semibold text-center text-neutral-700 dark:text-neutral-300 mb-6">
          Login In
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4 relative">
            <label className="block text-neutral-700 dark:text-neutral-300 mb-2 text-sm sm:text-base">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full py-2 pl-10 pr-3 text-sm sm:text-base"
            />
            <div className="absolute inset-y-0 left-3 mt-7.5 flex items-center pointer-events-none">
              <Mail className="text-neutral-500 dark:text-neutral-400" size={18} />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label className="block text-neutral-700 dark:text-neutral-300 mb-2 text-sm sm:text-base">
              Password
            </label>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 pl-10 pr-10 text-sm sm:text-base"
            />
            <div className="absolute inset-y-0 left-3 mt-7.5 flex items-center pointer-events-none">
              <Lock className="text-neutral-500 dark:text-neutral-400" size={18} />
            </div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 mt-8 flex items-center text-neutral-500 dark:text-neutral-400"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="text-sm text-error dark:text-d-error mb-4">{error}</div>
          )}
          
          {/* Submit */}
          <Button className="w-full h-fit py-2  text-sm sm:text-base">
            Sign In
          </Button>
        </form>
{/* Divider */}
          <div className="flex my-3 justify-between items-center">
            <div className="my-4 w-full text-center text-sm text-neutral-500 dark:text-neutral-400 border-t"></div>
            <span className="mx-2 text-xl">or</span>
            <div className="my-4 w-full text-center text-sm text-neutral-500 dark:text-neutral-400 border-t"></div>
          </div>
        {/* Google Sign-In */}
        <Button
          type="button"
          variant="outline"
          className="w-full mt-3 flex bg-neutral-300 dark:bg-neutral-700 hover:dark:bg-neutral-800  items-center justify-center gap-2 h-fit py-2 text-sm font-medium"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        >
          <Image src="/icons/auth/google-logo.svg" alt="Google" width={20} height={20} />
          Continue with Google
        </Button>

        <div className="mt-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-info dark:text-d-info">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
