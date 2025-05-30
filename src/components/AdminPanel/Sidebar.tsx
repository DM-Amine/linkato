'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import {
  House,
  Users,
  Loader,
  Mails,
  ArrowRightFromLine,
  ArrowLeftFromLine
} from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/adminPanel', icon: House },
  { name: 'Users', href: '/adminPanel/users', icon: Users },
  { name: 'Waitlist', href: '/adminPanel/waitlist', icon: Loader },
  { name: 'Contact', href: '/adminPanel/contact', icon: Mails },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(true) // Assume collapsed by default
  const [hydrated, setHydrated] = useState(false)  // Know when client mounted

  useEffect(() => {
    setHydrated(true)

    const checkScreen = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true)
      } else {
        setCollapsed(false)
      }
    }

    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  return (
    <aside
      className={`fixed lg:static top-0 left-0 z-40 pt-14 lg:pt-12 bg-neutral-200 dark:bg-neutral-900 ${
        collapsed ? 'w-10' : 'w-48'
      } h-screen flex flex-col border-r border-neutral-400 dark:border-neutral-600 transition-all duration-300`}
    >
      {/* Toggle Button */}
      <div className="flex flex-col px-1.5 w-full">
        <Button
          variant="ghost"
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1 mb-2 mt-1 text-neutral-700 dark:text-neutral-300 flex ${
            collapsed ? 'justify-center' : 'justify-end'
          } hover:bg-neutral-300 dark:hover:bg-neutral-800 rounded`}
        >
          {collapsed ? (
            <ArrowRightFromLine size={18} />
          ) : (
            <ArrowLeftFromLine size={18} />
          )}
        </Button>

        {/* Navigation */}
        <div className="space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={` ${collapsed ? 'w-fit ':'w-full'} flex  items-center   gap-2 px-1.5 py-1 rounded-md text-sm font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-primary-light/30 dark:bg-d-primary-light/20 text-primary dark:text-d-primary'
                  : 'text-neutral-800 dark:text-neutral-200 hover:text-primary hover:bg-neutral-100 hover:dark:bg-neutral-800  dark:hover:text-primary dark:hover:bg-neural-800'
              }`}
              onClick={() => setCollapsed(true)}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {/* Hide name if collapsed */}
              {!collapsed && hydrated && <span>{item.name}</span>}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}
