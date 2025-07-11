import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import Cta from '@/components/Cta'
import { getAllCompanions, getRecentSessions } from '@/lib/actions/companions.actions'
import React from 'react'

const Page = async () =>{
  const companions = await getAllCompanions({limit:3});
  const recentSessions = await getRecentSessions(10);
  console.log("companions: ",companions);
  return (
    <main>
      <h1 className='text-2xl underline'>Popular Companions</h1>
      {/* <Button>
        Let's get started
      </Button> */}
      <section className='home-section '>
        {
          companions.map((companion) => (
            <CompanionCard 
              key={companion.id}
              {...companion}
              />
          ))
        }
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