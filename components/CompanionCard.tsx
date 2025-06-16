'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'



const CompanionCard = ({id,subject,heading,duration,topic,color}:{color:string,subject:string,heading:string,duration:number,topic:string,id:string}) => {
    const [bookmark,setBookmark] = useState(false);
    return (
        <div className="companion-card" style={{backgroundColor: color}}>
            <div className="flex justify-between items-center">
                <div className='subject-badge'>{subject}</div>
                <Button onClick={() => setBookmark(!bookmark)}>
                    <Image src={bookmark ? '/icons/bookmark-filled.svg':'/icons/bookmark.svg'} 
                        alt="bookmark" 
                        width={12.5} 
                        height={15} 
                    />
                </Button>
            </div>
            <h2 className='text-2xl font-bold'>{heading}</h2>
            <p className='text-sm'>Topic: {topic}</p>
            <div className="flex items-center gap-2">
                <Image src="/icons/clock.svg" alt="time" width={13.5} height={13.5} />
                <p className='text-sm'>{duration} mins duration</p>
            </div>
            <Link href={`/companions/${id}`} >
                <Button className='btn-primary w-full justify-center'>Launch Lesson</Button>
            </Link>
        </div>
    )
}

export default CompanionCard