"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const items = [
    {label : "Home",href:'/'},
    {label : 'Companinons',href:'/companions'},
    {label : 'My Journey',href:'/my-journey'},
    {label : 'Sign In',href:'/sign-in'},
]


const NavItems = () => {
    const pathname = usePathname();
  return (
    <div className='flex item-center gap-4'>
        {items.map((nav_item)=>{
            return (
                <Link href={nav_item.href} key={nav_item.label} className={cn(pathname === nav_item.href && 'text-primary font-semibold')}>
                    {nav_item.label}
                </Link>
            )
        })}
    </div>
  )
}

export default NavItems