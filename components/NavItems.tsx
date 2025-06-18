"use client"
import { cn } from '@/lib/utils'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const items = [
    {label : "Home",href:'/'},
    {label : 'Companinons',href:'/companions'},
    {label : 'My Journey',href:'/my-journey'},
]


const NavItems = () => {
    const pathname = usePathname();
    return (
        <div className='flex item-center gap-4'>
            {items.map((nav_item)=>(
            <Link href={nav_item.href} key={nav_item.label} className={cn(pathname === nav_item.href && 'text-primary font-semibold')}>
                {nav_item.label}
            </Link>
            ))}
            {/* <SignedOut>
            <SignInButton />
            <SignUpButton />
            </SignedOut>
            <SignedIn>
            <UserButton />
            </SignedIn> */}
        </div>
    )
}

export default NavItems