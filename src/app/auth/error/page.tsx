// Inside src/app/auth/error/page.tsx or wherever you use `useSearchParams`
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import the component that uses `useSearchParams`
const ErrorPageComponent = dynamic(() => import('@/components/auth/errror'));

export default function ErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorPageComponent />
    </Suspense>
  );
}
