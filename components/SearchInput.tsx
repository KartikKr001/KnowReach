'use client'
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const Searchinput = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get('topic') || '';
  const [searchQuery, setSearchQuery] = useState(query);

  // Update URL in real-time whenever searchQuery changes
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if(searchQuery.trim()) {
        params.set('topic', searchQuery);
      } else {
        params.delete('topic');
      }
      router.push(`${pathName}?${params.toString()}`);
    }, 300); // ⏱Add debounce to reduce URL updates (400ms)

    return () => clearTimeout(delayDebounce); // Clean up timeout on next keystroke
  }, [searchQuery]);

  return (
    <div className='relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit'>
      <Image src="/icons/search.svg" alt="search" width={15} height={15} />
      <input 
        placeholder='Search Companions....' 
        className='outline-none' 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export default Searchinput;
