import { Suspense } from "react";
import dynamic from 'next/dynamic';

const WaitlistPage = dynamic(() => import('@/components/AdminPanel/waitlist/waitlistPage'));

export default function UsersAdminPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WaitlistPage />
    </Suspense>
  );
}