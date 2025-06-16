import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import Cta from '@/components/Cta'
import { Button } from '@/components/ui/button'
import React from 'react'

const Page = () =>{
  return (
    <main>
      <h1 className='text-2xl underline'>Dashboard</h1>
      {/* <Button>
        Let's get started
      </Button> */}
      <section className='home-section '>
        <CompanionCard id="1" heading='Neura the Brain Explorer' topic='Neural Network of Brain' duration={45} subject="Science" color='#ffda6e'/>
        <CompanionCard id="2" heading='Countsy the Number Wizard' topic='Derivatives & Integrals' duration={30} subject="Maths" color='#e5d0ff'/>
        <CompanionCard id="3" heading='Verba the Vocabulary Builder' topic="English Literature" duration={30} subject="Language" color='#bde7ff'/>
      </section>

      <section className="home-section">
        <CompanionList />
        <Cta/>
      </section>
        
    </main>
  )
}

export default Page