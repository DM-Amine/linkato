'use client'


import { ThemeSwitcher } from '../theme-switcher/theme-switcher'
import UserCard from "@/components/AdminPanel/userCard"


export default function AdminPanelNavbar() {

  

  return (
    <header className="px-4 py-1.5 flex justify-between items-center bg-neutral-200 dark:bg-neutral-900 border-b border-neutral-400 dark:border-neutral-600">
      <div>
        <h1 className='font-semibold text-neutral-800 dark:text-neutral-200 '>Lunitea
          <span className='ml-2 font-normal text-xs px-1 py-0.5 rounded-md  bg-info/60 border border-info'>Admin Panel</span>
        </h1>
      </div>
      <div className="flex  items-center justify-between ">
        <ThemeSwitcher/>
        <UserCard/>
      </div>
    </header>
  )
}
