"use client";

import { useSearchParams } from "next/navigation";
import { CircleX, ArrowRight} from "lucide-react";

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="flex text-2xl text-error dark:text-error-l bg-error-l dark:bg-d-error-l border border-error dark:border-error-l rounded-lg pr-1 "> <span className="text-error dark:text-error-l p-1"><CircleX  /></span> Authentication Error</h1>
      {error && <p className="mt-2 text-gray-500">Error: {error}</p>}
      <a href="/auth/login" className=" flex mt-4 text-info underline">Go back to login <span> <ArrowRight /></span> </a>
    </div>
  );
}
