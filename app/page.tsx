import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import Cta from '@/components/Cta'
import { Button } from '@/components/ui/button'
import { recentSessions } from '@/constants'
import React from 'react'

const Page = () =>{
  return (
    <main>
      <h1 className='text-2xl underline'>Dashboard</h1>
      {/* <Button>
        Let's get started
      </Button> */}
      <section className='home-section '>
        <CompanionCard id="1" name='Neura the Brain Explorer' topic='Neural Network of Brain' duration={45} subject="Science"/>
        <CompanionCard id="2" name='Countsy the Number Wizard' topic='Derivatives & Integrals' duration={30} subject="Maths" />
        <CompanionCard id="3" name='Verba the Vocabulary Builder' topic="English Literature" duration={30} subject="Language"/>
      </section>

      <section className="home-section">
        <CompanionList 
            classNames="w-2/3 max-lg:w-full"
            title='Recently completed lessons' 
            companions={recentSessions}
          />
        <Cta/>
      </section>
        
    </main>
  )
}

export default Page