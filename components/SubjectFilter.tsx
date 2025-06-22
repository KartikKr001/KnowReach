'use client'
import React, { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { subjects } from '@/constants'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
const SubjectFilter = () => {
  const pathName = usePathname();
  const val = useSearchParams().get('subject') || '';
  const [subject,setSubject] = useState(val)
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(()=>{
    const params = new URLSearchParams(searchParams);
    if(subject === "all"){
      params.delete('subject');
    }
    else{
      params.set('subject',subject);
    }
    router.push(`${pathName}?${params.toString()}`)
  },[subject])
  return (
    <Select 
      onValueChange={setSubject} value={subject}
    >
      <SelectTrigger className="input capitalize">
        <SelectValue placeholder="Subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All subjects</SelectItem>
        {subjects.map((subject) => (
          <SelectItem key={subject} value={subject}
            className="capitalize">
            {subject}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SubjectFilter