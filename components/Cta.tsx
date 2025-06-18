import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Cta = () => {
  return (
    <section className='cta-section'>
      <div className='cta-badge'>Start learning your way.</div>
      <h2 className='text-3xl font-bold'>Build a Personalize  Learning Companion</h2>
      <p>Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun.</p>
      <Image src={'/images/cta.svg'} width={362} height={232} alt='cta'/>
      <Link href={'/companion'}>
        <Button className='btn-primary'>
          <Image src={'/icons/plus.svg'} width={12} height={12} alt='plus'/>
          Create Your Companion
        </Button>
      </Link>
    </section>
  )
}

export default Cta