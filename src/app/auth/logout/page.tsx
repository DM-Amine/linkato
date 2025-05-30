"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Are you sure you want to sign out?</h1>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Yes, Sign Out
      </button>
    </div>
  );
}
