'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { getSubjectColor } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { addBookmark, removeBookmark } from '@/lib/actions/companions.actions'



const CompanionCard = ({id,subject,name,duration,topic,bookmarked}:{subject:string,name:string,bookmarked:string,duration:number,topic:string,id:string}) => {
    const pathname = usePathname();
    const handleBookmark = async () => {
        if (bookmarked) {
        await removeBookmark(id, pathname);
        } else {
        await addBookmark(id, pathname);
        }
    };
    const [from,to] = getSubjectColor(subject);
    return (
        <div className="companion-card" style={
            {
                background: `linear-gradient(to right, ${from}, ${to})`
                // backgroundColor: getSubjectColor(subject)
            }}>
            <div className="flex justify-between items-center">
                <div className='subject-badge'>{subject}</div>
                {/* <Button onClick={() => handleBookmark}>
                    <Image src={bookmarked ? '/icons/bookmark-filled.svg':'/icons/bookmark.svg'} 
                        alt="bookmark" 
                        width={12.5} 
                        height={15} 
                    />
                </Button> */}
            </div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-sm">{topic}</p>
            <div className="flex items-center gap-2">
                <Image
                src="/icons/clock.svg"
                alt="duration"
                width={13.5}
                height={13.5}
                />
                <p className="text-sm">{duration} minutes</p>
            </div>
            <Link href={`/companions/${id}`} >
                <Button className='btn-primary w-full justify-center'>Launch Lesson</Button>
            </Link>
        </div>
    )
}

export default CompanionCard