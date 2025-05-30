'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'

export default function ClientPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/client')
    }
  });

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.userID) {
      redirect(`/dashboard/profile/${session.user.userID}`);
    }
  }, [status, session]);

  return (
    <section className="flex flex-col gap-6 justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
    </section>
  )
  
}
