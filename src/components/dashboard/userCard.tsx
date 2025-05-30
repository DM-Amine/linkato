
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'

import {
  LogOut,
  CircleUserRound ,
  
 
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
export default function UserCard (){

    const { data: session } = useSession()
    console.log("user session data..." + JSON.stringify(session));
    

    return(
<DropdownMenu>
          <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-2">
  {session?.user?.profileImage ? (
    <Image
      src={session.user.profileImage}
      alt="Profile"
      width={32}
      height={32}
      className="rounded-full object-cover h-8 w-8"
    />
  ) : (
    <span className="h-8 w-8 flex justify-center items-center rounded-full bg-primary-light text-primary font-semibold p-0">
      {session?.user?.name?.[0]?.toUpperCase() ?? 'A'}
    </span>
  )}
  <span>{session?.user?.name ?? ''}</span>
</Button>

          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 bg-neutral-100 dark:bg-neutral-800">
          <DropdownMenuItem asChild>
              <Link href={`/dashboard/profile/${session?.user?.userID}`} className="w-full cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center text-sm text-neutral-800 dark:text-neutral-200">
              <CircleUserRound  className=" h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer hover:bg-neutral-200 hover:text-error dark:hover:text-d-error dark:hover:bg-neutral-700 flex items-center text-sm text-neutral-800 dark:text-neutral-200">
              <LogOut className=" h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    )
}