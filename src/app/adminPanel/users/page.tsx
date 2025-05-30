
import { Suspense } from "react";
import dynamic from 'next/dynamic';

const UsersPage = dynamic(() => import('@/components/AdminPanel/users/usersPage'));

export default function UsersAdminPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UsersPage />
    </Suspense>
  );
}
